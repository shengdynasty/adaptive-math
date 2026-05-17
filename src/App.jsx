import React, { useState, useEffect, useCallback } from 'react';
import { SKILLS, questionsForSkill } from './data/questions.js';
import {
  updateRating,
  selectNextQuestion,
  isSkillMastered,
} from './engine/elo.js';
import {
  loadAllProgress,
  saveProgress,
  logAnswer,
  resetAllData,
} from './engine/storage.js';
import Practice from './components/Practice.jsx';
import Dashboard from './components/Dashboard.jsx';
import OfflineBadge from './components/OfflineBadge.jsx';

/**
 * APP — top-level component and state owner.
 * ------------------------------------------------------------------
 * Holds the per-skill progress map and the current question. Wires the
 * adaptive engine to the UI: when the student answers, it updates the
 * rating, persists it, checks for mastery, and serves the next
 * question.
 *
 * The whole flow runs client-side. There is no network call anywhere
 * in this file — that is the point.
 */
export default function App() {
  // progress: map of skillId -> progress record
  const [progress, setProgress] = useState(null);
  // which skill the student is practising; null = on the dashboard
  const [activeSkill, setActiveSkill] = useState(null);
  // the question currently on screen
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // ids answered this session, per skill, so we don't repeat
  const [answeredThisSession, setAnsweredThisSession] = useState({});

  // Load saved progress from IndexedDB once, on first mount.
  useEffect(() => {
    loadAllProgress().then(setProgress);
  }, []);

  /** Begin practising a skill: pick a first question at the student's level. */
  const startSkill = useCallback(
    (skillId) => {
      const record = progress[skillId];
      const pool = questionsForSkill(skillId);
      const seen = new Set(answeredThisSession[skillId] || []);
      const next = selectNextQuestion(record.rating, pool, seen);
      setActiveSkill(skillId);
      setCurrentQuestion(next);
    },
    [progress, answeredThisSession]
  );

  /**
   * Handle one answered question. This is the heart of the adaptive
   * loop — read it alongside the engine module.
   */
  const handleAnswer = useCallback(
    async (wasCorrect) => {
      const skillId = activeSkill;
      const record = progress[skillId];

      // 1. Update the student's rating for this skill.
      const newRating = updateRating(
        record.rating,
        currentQuestion.difficulty,
        wasCorrect
      );

      // 2. Track recent results (keep the last 5).
      const recent = [...record.recentResults, wasCorrect].slice(-5);

      // 3. Re-check mastery with the new numbers.
      const mastered = isSkillMastered(newRating, recent);

      // 4. Assemble and persist the updated record.
      const updated = {
        ...record,
        rating: newRating,
        recentResults: recent,
        attempts: record.attempts + 1,
        correct: record.correct + (wasCorrect ? 1 : 0),
        mastered,
      };
      const nextProgress = { ...progress, [skillId]: updated };
      setProgress(nextProgress);
      await saveProgress(updated);
      await logAnswer({
        skillId,
        questionId: currentQuestion.id,
        wasCorrect,
        ratingAfter: newRating,
      });

      // 5. Record that this question was seen this session.
      const seenList = [
        ...(answeredThisSession[skillId] || []),
        currentQuestion.id,
      ];
      const nextSeen = { ...answeredThisSession, [skillId]: seenList };
      setAnsweredThisSession(nextSeen);

      // 6. Serve the next question, adapted to the new rating.
      const pool = questionsForSkill(skillId);
      const next = selectNextQuestion(newRating, pool, new Set(seenList));
      setCurrentQuestion(next);
    },
    [activeSkill, currentQuestion, progress, answeredThisSession]
  );

  /** Return to the dashboard. */
  const exitToDashboard = useCallback(() => {
    setActiveSkill(null);
    setCurrentQuestion(null);
  }, []);

  /** Clear all data — wired to the reset button. */
  const handleReset = useCallback(async () => {
    await resetAllData();
    const fresh = await loadAllProgress();
    setProgress(fresh);
    setAnsweredThisSession({});
    exitToDashboard();
  }, [exitToDashboard]);

  if (!progress) {
    return <div className="loading">Loading your progress…</div>;
  }

  return (
    <div className="app">
      <OfflineBadge />
      <header className="app-header">
        <h1>Adaptive Math</h1>
        <p className="tagline">Learn anywhere — internet or not.</p>
      </header>

      {activeSkill ? (
        <Practice
          skill={SKILLS.find((s) => s.id === activeSkill)}
          question={currentQuestion}
          rating={progress[activeSkill].rating}
          mastered={progress[activeSkill].mastered}
          onAnswer={handleAnswer}
          onExit={exitToDashboard}
        />
      ) : (
        <Dashboard
          skills={SKILLS}
          progress={progress}
          onSelectSkill={startSkill}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
