import React from 'react';
import { ratingToProgress } from '../engine/elo.js';
import { exportData } from '../engine/storage.js';

/**
 * DASHBOARD — the home screen.
 * ------------------------------------------------------------------
 * Lists every skill with the student's current level, accuracy, and
 * mastery status. This is the "real learning" view — a student and a
 * teacher can see exactly where the student stands and what to work
 * on next.
 *
 * Skills are shown in curriculum order so the difficulty progression
 * is visible. A mastered skill is marked; the rest show a progress
 * bar driven by the student's Elo rating.
 */

const SKILL_ICONS = {
  'evaluate':   '=',
  'like-terms': '+',
  'one-step':   '1',
  'two-step':   '2',
  'distribute': 'D',
  'both-sides': 'X',
};

export default function Dashboard({ skills, progress, onSelectSkill, onReset }) {
  /** Export progress to a downloadable file (the offline-sync story). */
  async function handleExport() {
    const json = await exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'adaptive-math-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Sort skills by their intended teaching order.
  const ordered = [...skills].sort((a, b) => a.order - b.order);

  const masteredCount = ordered.filter((s) => progress[s.id]?.mastered).length;
  const totalAnswered = ordered.reduce(
    (sum, s) => sum + (progress[s.id]?.attempts ?? 0), 0
  );

  return (
    <div className="dashboard">
      <p className="dashboard-intro">
        Pick a skill to practise. Questions adapt to your level as you go,
        and your progress is saved on this device — no account, no internet needed.
      </p>

      {totalAnswered > 0 && (
        <div className="dashboard-summary">
          <span className="summary-chip">{masteredCount} / {ordered.length} mastered</span>
          <span className="summary-chip">{totalAnswered} answered</span>
        </div>
      )}

      <ul className="skill-list">
        {ordered.map((skill) => {
          const record   = progress[skill.id];
          const pct      = ratingToProgress(record.rating);
          const accuracy =
            record.attempts > 0
              ? Math.round((record.correct / record.attempts) * 100)
              : null;

          return (
            <li key={skill.id} className="skill-item">
              <button
                className="skill-button"
                onClick={() => onSelectSkill(skill.id)}
              >
                <div className="skill-row">
                  <span className="skill-icon">{SKILL_ICONS[skill.id]}</span>
                  <span className="skill-name">{skill.name}</span>
                  {record.mastered && (
                    <span className="mastery-badge">Mastered</span>
                  )}
                </div>
                <div className="skill-progress">
                  <div className="skill-progress-track">
                    <div
                      className="skill-progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="skill-meta">
                  {accuracy === null
                    ? 'Not started'
                    : `${accuracy}% accuracy \u00b7 ${record.attempts} answered`}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="dashboard-actions">
        <button className="btn btn-ghost" onClick={handleExport}>
          Export progress
        </button>
        <button className="btn btn-ghost btn-danger" onClick={onReset}>
          Reset all data
        </button>
      </div>
    </div>
  );
}
