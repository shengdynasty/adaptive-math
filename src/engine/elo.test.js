/**
 * TESTS FOR THE ADAPTIVE MASTERY ENGINE
 * ------------------------------------------------------------------
 * Run with:  node src/engine/elo.test.js
 *
 * These are plain assertion tests — no test framework needed, so there
 * is one fewer dependency and you can run them anywhere. If you prefer,
 * you can later port them to Vitest.
 *
 * Having tests for the engine is worth real points: it shows the core
 * logic is correct and that you understood it well enough to verify it.
 */

import assert from 'node:assert';
import {
  expectedScore,
  updateRating,
  selectNextQuestion,
  isSkillMastered,
  ratingToProgress,
  DEFAULT_RATING,
  MASTERY_THRESHOLD,
} from './elo.js';

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failed++;
    console.log(`  FAIL  ${name}`);
    console.log(`        ${err.message}`);
  }
}

console.log('\nAdaptive Mastery Engine — test run\n');

// --- expectedScore ------------------------------------------------
test('equal ratings give a 50% expected score', () => {
  assert.strictEqual(expectedScore(1000, 1000), 0.5);
});

test('a stronger student has a higher expected score', () => {
  const strong = expectedScore(1400, 1000);
  assert.ok(strong > 0.9, `expected >0.9, got ${strong}`);
});

test('a weaker student has a lower expected score', () => {
  const weak = expectedScore(1000, 1400);
  assert.ok(weak < 0.1, `expected <0.1, got ${weak}`);
});

test('expected score is always between 0 and 1', () => {
  for (let r = 0; r <= 2000; r += 250) {
    const s = expectedScore(r, 1000);
    assert.ok(s >= 0 && s <= 1, `out of range at rating ${r}: ${s}`);
  }
});

// --- updateRating -------------------------------------------------
test('a correct answer raises the rating', () => {
  const after = updateRating(1000, 1000, true);
  assert.ok(after > 1000, `expected >1000, got ${after}`);
});

test('a wrong answer lowers the rating', () => {
  const after = updateRating(1000, 1000, false);
  assert.ok(after < 1000, `expected <1000, got ${after}`);
});

test('beating a hard question gains more than beating an easy one', () => {
  const hardGain = updateRating(1000, 1400, true) - 1000;
  const easyGain = updateRating(1000, 600, true) - 1000;
  assert.ok(hardGain > easyGain, `hard ${hardGain} should beat easy ${easyGain}`);
});

test('losing to an easy question loses more than losing to a hard one', () => {
  const easyLoss = 1000 - updateRating(1000, 600, false);
  const hardLoss = 1000 - updateRating(1000, 1400, false);
  assert.ok(easyLoss > hardLoss, `easy loss ${easyLoss} should exceed hard loss ${hardLoss}`);
});

test('repeated correct answers converge upward over a session', () => {
  let rating = DEFAULT_RATING;
  for (let i = 0; i < 10; i++) {
    rating = updateRating(rating, 1100, true);
  }
  assert.ok(rating > 1150, `expected steady climb, ended at ${rating}`);
});

// --- selectNextQuestion ------------------------------------------
const sampleQuestions = [
  { id: 'q1', difficulty: 700 },
  { id: 'q2', difficulty: 1000 },
  { id: 'q3', difficulty: 1300 },
  { id: 'q4', difficulty: 1600 },
];

test('picks a question near the student rating, aimed slightly above', () => {
  const q = selectNextQuestion(1000, sampleQuestions);
  // target is 1100, so q2 (1000) or q3 (1300) — q2 is closest.
  assert.strictEqual(q.id, 'q2');
});

test('skips already-answered questions when alternatives exist', () => {
  const answered = new Set(['q2']);
  const q = selectNextQuestion(1000, sampleQuestions, answered);
  assert.notStrictEqual(q.id, 'q2');
});

test('falls back to answered questions when all are seen', () => {
  const answered = new Set(['q1', 'q2', 'q3', 'q4']);
  const q = selectNextQuestion(1000, sampleQuestions, answered);
  assert.ok(q !== null, 'should still return a question');
});

test('returns null for an empty question pool', () => {
  assert.strictEqual(selectNextQuestion(1000, []), null);
});

// --- isSkillMastered ---------------------------------------------
test('not mastered when rating is below threshold', () => {
  assert.strictEqual(isSkillMastered(1100, [true, true, true]), false);
});

test('not mastered when recent answers are not all correct', () => {
  assert.strictEqual(isSkillMastered(1250, [true, false, true]), false);
});

test('mastered when rating is high and recent answers are correct', () => {
  assert.strictEqual(isSkillMastered(1250, [true, true, true]), true);
});

test('not mastered with too few recent answers', () => {
  assert.strictEqual(isSkillMastered(1300, [true]), false);
});

// --- ratingToProgress --------------------------------------------
test('starting rating maps to 0% progress', () => {
  assert.strictEqual(ratingToProgress(DEFAULT_RATING), 0);
});

test('mastery threshold maps to 100% progress', () => {
  assert.strictEqual(ratingToProgress(MASTERY_THRESHOLD), 100);
});

test('progress is clamped and never negative or above 100', () => {
  assert.strictEqual(ratingToProgress(500), 0);
  assert.strictEqual(ratingToProgress(2000), 100);
});

// --- summary ------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
