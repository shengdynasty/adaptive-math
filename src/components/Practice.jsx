import React, { useState, useEffect } from 'react';
import { ratingToProgress } from '../engine/elo.js';

/**
 * PRACTICE — the question-answering screen.
 * ------------------------------------------------------------------
 * Shows one question, grades the student's answer locally, shows
 * feedback with an explanation, then lets them continue to the next
 * (adaptively chosen) question.
 *
 * Grading is done here, on the device. For numeric questions we trim
 * and compare as strings; for multiple-choice we compare the chosen
 * option. No answer ever leaves the device.
 */
export default function Practice({ skill, question, rating, mastered, onAnswer, onExit }) {
  const [typedAnswer, setTypedAnswer]     = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  // null = not yet answered; otherwise { correct: bool }
  const [feedback, setFeedback]           = useState(null);
  // consecutive correct answers this session on this skill
  const [streak, setStreak]               = useState(0);
  // whether we've shown the mastery overlay yet (so it only pops once)
  const [masteryShown, setMasteryShown]   = useState(false);

  // Reset input state whenever a new question arrives.
  useEffect(() => {
    setTypedAnswer('');
    setSelectedChoice(null);
    setFeedback(null);
  }, [question]);

  // Show mastery overlay when the skill is first mastered.
  useEffect(() => {
    if (mastered && !masteryShown) {
      setMasteryShown(true);
    }
  }, [mastered]);

  if (!question) {
    return (
      <div className="practice">
        <p className="done-message">
          You have answered every question in this skill. Great work!
        </p>
        <button className="btn" onClick={onExit}>
          Back to skills
        </button>
      </div>
    );
  }

  /** Compare the student's answer to the correct one. */
  function checkAnswer() {
    let studentAnswer;
    if (question.type === 'multiple-choice') {
      studentAnswer = selectedChoice;
    } else {
      studentAnswer = typedAnswer.trim();
    }
    if (studentAnswer === null || studentAnswer === '') return;

    const correct =
      String(studentAnswer).toLowerCase() ===
      String(question.answer).toLowerCase();
    setFeedback({ correct });
  }

  /** Move on — hand the result to App, which adapts the next question. */
  function next() {
    setStreak(feedback.correct ? streak + 1 : 0);
    onAnswer(feedback.correct);
  }

  const answered = feedback !== null;

  return (
    <>
      {/* Mastery celebration overlay */}
      {masteryShown && (
        <div className="mastery-overlay" onClick={() => setMasteryShown(false)}>
          <div className="mastery-card" onClick={(e) => e.stopPropagation()}>
            <h2>Skill Mastered!</h2>
            <p>
              You've mastered <strong>{skill.name}</strong>. Your rating crossed
              the mastery threshold with a strong recent streak. Keep it up!
            </p>
            <button className="btn" onClick={() => setMasteryShown(false)}>
              Keep practising
            </button>
          </div>
        </div>
      )}

      <div className="practice">
        <div className="practice-top">
          <button className="btn btn-ghost" onClick={onExit}>
            &larr; Skills
          </button>
          <div className="practice-meta">
            <span className="skill-label">{skill.name}</span>
            {streak >= 2 && (
              <span className="streak-badge">{streak} streak</span>
            )}
          </div>
        </div>

        {/* The rating bar gives the student a visible sense of progress. */}
        <div className="rating-bar" aria-label="Your level on this skill">
          <div
            className="rating-bar-fill"
            style={{ width: `${ratingToProgress(rating)}%` }}
          />
        </div>

        <div className="question-card">
          <p className="question-prompt">{question.prompt}</p>

          {question.type === 'multiple-choice' ? (
            <div className="choices">
              {question.choices.map((choice) => (
                <button
                  key={choice}
                  className={
                    'choice' + (selectedChoice === choice ? ' choice-selected' : '')
                  }
                  disabled={answered}
                  onClick={() => setSelectedChoice(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            <input
              className="answer-input"
              type="text"
              inputMode="numeric"
              placeholder="Your answer"
              value={typedAnswer}
              disabled={answered}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !answered) checkAnswer();
              }}
            />
          )}

          {!answered && (
            <button className="btn" onClick={checkAnswer}>
              Check answer
            </button>
          )}

          {answered && (
            <div
              className={
                'feedback ' + (feedback.correct ? 'feedback-correct' : 'feedback-wrong')
              }
            >
              <p className="feedback-headline">
                {feedback.correct ? 'Correct!' : 'Not quite.'}
              </p>
              <p className="feedback-explanation">{question.explanation}</p>
              {!feedback.correct && (
                <p className="feedback-answer">
                  Answer: <strong>{question.answer}</strong>
                </p>
              )}
              <button className="btn" onClick={next}>
                Next question
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
