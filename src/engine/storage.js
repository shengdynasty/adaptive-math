/**
 * PERSISTENCE LAYER
 * ------------------------------------------------------------------
 * Stores the student's progress on the device using IndexedDB (via
 * Dexie, a small wrapper that makes IndexedDB pleasant to use).
 *
 * WHY THIS MATTERS FOR THE PROJECT:
 * Storing progress locally is what lets the app keep working with no
 * internet AND remember the student between sessions. A student can
 * close the app, lose signal for a week, reopen it, and their ratings
 * and mastery are still there. That is the SDG 9 / SDG 10 story made
 * concrete — no server, no account, no connection required.
 *
 * DATA MODEL — a single record per skill:
 *   skillId        string, primary key
 *   rating         current Elo rating on this skill
 *   recentResults  array of booleans (recent answers, most recent last)
 *   attempts       total questions answered on this skill
 *   correct        total correct on this skill
 *   mastered       boolean
 *
 * Plus a session log of every answer, useful for the dashboard and
 * for the optional export feature.
 */

import Dexie from 'dexie';
import { DEFAULT_RATING } from '../engine/elo.js';
import { SKILLS } from '../data/questions.js';

export const db = new Dexie('AdaptiveMathDB');

db.version(1).stores({
  // 'skillId' is the primary key; other fields are not indexed.
  skillProgress: 'skillId',
  // '++id' is an auto-incrementing primary key for the answer log.
  answerLog: '++id, skillId, timestamp',
});

/**
 * Load progress for every skill. If a skill has never been seen,
 * return a fresh default record for it so the UI always has data.
 *
 * @returns {Promise<Object>} map of skillId -> progress record
 */
export async function loadAllProgress() {
  const stored = await db.skillProgress.toArray();
  const byId = {};
  for (const row of stored) byId[row.skillId] = row;

  const result = {};
  for (const skill of SKILLS) {
    result[skill.id] = byId[skill.id] || {
      skillId: skill.id,
      rating: DEFAULT_RATING,
      recentResults: [],
      attempts: 0,
      correct: 0,
      mastered: false,
    };
  }
  return result;
}

/**
 * Save one skill's progress record (creates or overwrites).
 *
 * @param {object} record  a full skillProgress record
 */
export async function saveProgress(record) {
  await db.skillProgress.put(record);
}

/**
 * Append one answer to the session log.
 *
 * @param {object} entry  { skillId, questionId, wasCorrect, ratingAfter }
 */
export async function logAnswer(entry) {
  await db.answerLog.add({ ...entry, timestamp: Date.now() });
}

/**
 * Read the full answer log, oldest first.
 *
 * @returns {Promise<Array>}
 */
export async function getAnswerLog() {
  return db.answerLog.orderBy('timestamp').toArray();
}

/**
 * Wipe all stored data. Wire this to a "reset" button so judges (and
 * you, while testing) can start from a clean slate.
 */
export async function resetAllData() {
  await db.skillProgress.clear();
  await db.answerLog.clear();
}

/**
 * Export all progress as a JSON string. This backs the optional
 * "export progress" feature — a student with no internet could hand
 * their progress to a teacher's device via a file or QR code.
 *
 * @returns {Promise<string>}
 */
export async function exportData() {
  const skillProgress = await db.skillProgress.toArray();
  const answerLog = await db.answerLog.toArray();
  return JSON.stringify({ skillProgress, answerLog, exportedAt: Date.now() }, null, 2);
}
