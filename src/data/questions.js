/**
 * EARLY ALGEBRA QUESTION BANK
 * ------------------------------------------------------------------
 * SKILL PROGRESSION (easy -> hard):
 *   1. evaluate    — substitute a number for x and compute
 *   2. like-terms  — combine like terms in an expression
 *   3. one-step    — solve one-step equations
 *   4. two-step    — solve two-step equations
 *   5. distribute  — equations using the distributive property
 *   6. both-sides  — variables on both sides of the equation
 *
 * QUESTION SCHEMA:
 *   id          unique string
 *   skill       one of the skill ids above
 *   difficulty  Elo difficulty rating (higher = harder)
 *   type        'numeric' (typed answer) or 'multiple-choice'
 *   prompt      the question text
 *   choices     array of strings (multiple-choice only)
 *   answer      the correct answer (string; compared case-insensitively
 *               and trimmed for numeric)
 *   explanation shown after the student answers
 */

export const SKILLS = [
  { id: 'evaluate',   name: 'Evaluating Expressions',  order: 1 },
  { id: 'like-terms', name: 'Combining Like Terms',    order: 2 },
  { id: 'one-step',   name: 'One-Step Equations',      order: 3 },
  { id: 'two-step',   name: 'Two-Step Equations',      order: 4 },
  { id: 'distribute', name: 'Distributive Property',   order: 5 },
  { id: 'both-sides', name: 'Variables on Both Sides', order: 6 },
];

export const QUESTIONS = [
  // --- Skill 1: evaluating expressions ----------------------------
  {
    id: 'ev1', skill: 'evaluate', difficulty: 700, type: 'numeric',
    prompt: 'Evaluate 3x + 2 when x = 4.',
    answer: '14',
    explanation: 'Plug 4 in for x: 3(4) + 2 = 12 + 2 = 14.',
  },
  {
    id: 'ev2', skill: 'evaluate', difficulty: 780, type: 'numeric',
    prompt: 'Evaluate 5x \u2212 7 when x = 3.',
    answer: '8',
    explanation: 'Plug 3 in for x: 5(3) \u2212 7 = 15 \u2212 7 = 8.',
  },
  {
    id: 'ev3', skill: 'evaluate', difficulty: 880, type: 'numeric',
    prompt: 'Evaluate 2x + 3y when x = 5 and y = 2.',
    answer: '16',
    explanation: 'Plug in both values: 2(5) + 3(2) = 10 + 6 = 16.',
  },
  {
    id: 'ev4', skill: 'evaluate', difficulty: 980, type: 'numeric',
    prompt: 'Evaluate x\u00b2 \u2212 4x when x = 6.',
    answer: '12',
    explanation: 'Plug in 6: 6\u00b2 = 36, then 4(6) = 24. So 36 \u2212 24 = 12.',
  },
  {
    id: 'ev5', skill: 'evaluate', difficulty: 1050, type: 'multiple-choice',
    prompt: 'Evaluate (4x \u2212 2) \u00f7 2 when x = 5.',
    choices: ['7', '8', '9', '10'],
    answer: '9',
    explanation: 'Plug in x = 5: 4(5) \u2212 2 = 18, then 18 \u00f7 2 = 9.',
  },
  {
    id: 'ev6', skill: 'evaluate', difficulty: 730, type: 'numeric',
    prompt: 'Evaluate 2x when x = \u22123.',
    answer: '-6',
    explanation: '2 times \u22123 equals \u22126. Watch the sign when x is negative.',
  },
  {
    id: 'ev7', skill: 'evaluate', difficulty: 860, type: 'numeric',
    prompt: 'Evaluate x\u00b2 + 2 when x = 3.',
    answer: '11',
    explanation: '3\u00b2 = 9, then add 2 to get 11.',
  },
  {
    id: 'ev8', skill: 'evaluate', difficulty: 940, type: 'numeric',
    prompt: 'Evaluate 3x \u2212 2y when x = 2 and y = 4.',
    answer: '-2',
    explanation: '3(2) = 6 and 2(4) = 8. Then 6 \u2212 8 = \u22122.',
  },
  {
    id: 'ev9', skill: 'evaluate', difficulty: 1090, type: 'multiple-choice',
    prompt: 'Evaluate (x + 3)\u00b2 when x = 2.',
    choices: ['16', '25', '30', '34'],
    answer: '25',
    explanation: 'Add inside first: 2 + 3 = 5. Then 5\u00b2 = 25.',
  },

  // --- Skill 2: combining like terms ------------------------------
  {
    id: 'lt1', skill: 'like-terms', difficulty: 820, type: 'numeric',
    prompt: 'Simplify 4x + 3x. Enter the coefficient of x.',
    answer: '7',
    explanation: '4 and 3 are both x coefficients, so add them: 4 + 3 = 7.',
  },
  {
    id: 'lt2', skill: 'like-terms', difficulty: 900, type: 'numeric',
    prompt: 'Simplify 9x \u2212 2x. Enter the coefficient of x.',
    answer: '7',
    explanation: 'Same variable, so subtract the coefficients: 9 \u2212 2 = 7.',
  },
  {
    id: 'lt3', skill: 'like-terms', difficulty: 1000, type: 'multiple-choice',
    prompt: 'Simplify 5x + 3 + 2x \u2212 1.',
    choices: ['7x + 2', '7x + 4', '10x + 2', '5x + 2'],
    answer: '7x + 2',
    explanation: 'x terms: 5x + 2x = 7x. Constants: 3 \u2212 1 = 2. Answer: 7x + 2.',
  },
  {
    id: 'lt4', skill: 'like-terms', difficulty: 1120, type: 'multiple-choice',
    prompt: 'Simplify 6y \u2212 4 + 2y + 9.',
    choices: ['8y + 5', '8y + 13', '4y + 5', '8y \u2212 5'],
    answer: '8y + 5',
    explanation: 'y terms: 6y + 2y = 8y. Constants: \u22124 + 9 = +5. Answer: 8y + 5.',
  },
  {
    id: 'lt5', skill: 'like-terms', difficulty: 870, type: 'numeric',
    prompt: 'Simplify 8x \u2212 5 + 2x \u2212 1. Enter the coefficient of x.',
    answer: '10',
    explanation: 'x terms: 8x + 2x = 10x. The coefficient of x is 10.',
  },
  {
    id: 'lt6', skill: 'like-terms', difficulty: 950, type: 'multiple-choice',
    prompt: 'Simplify 3x + 5 \u2212 x \u2212 2.',
    choices: ['2x + 3', '2x + 7', '4x + 3', '2x \u2212 3'],
    answer: '2x + 3',
    explanation: 'x terms: 3x \u2212 x = 2x. Constants: 5 \u2212 2 = 3. Answer: 2x + 3.',
  },
  {
    id: 'lt7', skill: 'like-terms', difficulty: 1060, type: 'multiple-choice',
    prompt: 'Simplify 4a + 2b \u2212 a + 3b.',
    choices: ['3a + 5b', '5a + 3b', '3a \u2212 5b', '7ab'],
    answer: '3a + 5b',
    explanation: 'a terms: 4a \u2212 a = 3a. b terms: 2b + 3b = 5b. Answer: 3a + 5b.',
  },
  {
    id: 'lt8', skill: 'like-terms', difficulty: 1040, type: 'numeric',
    prompt: 'Simplify 5y + 3 \u2212 2y \u2212 3. Enter the coefficient of y.',
    answer: '3',
    explanation: 'y terms: 5y \u2212 2y = 3y. Constants: 3 \u2212 3 = 0. So just 3y, and the coefficient is 3.',
  },
  {
    id: 'lt9', skill: 'like-terms', difficulty: 1200, type: 'multiple-choice',
    prompt: 'Simplify 2x\u00b2 + 3x \u2212 x\u00b2 + x.',
    choices: ['x\u00b2 + 4x', '2x\u00b2 + 4x', 'x\u00b2 + 4', '3x\u00b2 + 4x'],
    answer: 'x\u00b2 + 4x',
    explanation: 'x\u00b2 terms: 2x\u00b2 \u2212 x\u00b2 = x\u00b2. x terms: 3x + x = 4x. Answer: x\u00b2 + 4x.',
  },

  // --- Skill 3: one-step equations --------------------------------
  {
    id: 'os1', skill: 'one-step', difficulty: 880, type: 'numeric',
    prompt: 'Solve for x:  x + 5 = 12',
    answer: '7',
    explanation: 'Subtract 5 from both sides: x = 12 \u2212 5 = 7.',
  },
  {
    id: 'os2', skill: 'one-step', difficulty: 950, type: 'numeric',
    prompt: 'Solve for x:  x \u2212 8 = 3',
    answer: '11',
    explanation: 'Add 8 to both sides: x = 3 + 8 = 11.',
  },
  {
    id: 'os3', skill: 'one-step', difficulty: 1030, type: 'numeric',
    prompt: 'Solve for x:  4x = 36',
    answer: '9',
    explanation: 'Divide both sides by 4: x = 36 \u00f7 4 = 9.',
  },
  {
    id: 'os4', skill: 'one-step', difficulty: 1110, type: 'numeric',
    prompt: 'Solve for x:  x \u00f7 3 = 7',
    answer: '21',
    explanation: 'Multiply both sides by 3: x = 7 \u00d7 3 = 21.',
  },
  {
    id: 'os5', skill: 'one-step', difficulty: 960, type: 'numeric',
    prompt: 'Solve for x:  x + 13 = 8',
    answer: '-5',
    explanation: 'Subtract 13 from both sides: x = 8 \u2212 13 = \u22125.',
  },
  {
    id: 'os6', skill: 'one-step', difficulty: 1020, type: 'numeric',
    prompt: 'Solve for x:  2x = \u221214',
    answer: '-7',
    explanation: 'Divide both sides by 2: x = \u221214 \u00f7 2 = \u22127.',
  },
  {
    id: 'os7', skill: 'one-step', difficulty: 1080, type: 'numeric',
    prompt: 'Solve for x:  \u22123x = 15',
    answer: '-5',
    explanation: 'Divide both sides by \u22123: x = 15 \u00f7 (\u22123) = \u22125. Dividing by a negative flips the sign.',
  },
  {
    id: 'os8', skill: 'one-step', difficulty: 1130, type: 'numeric',
    prompt: 'Solve for x:  x \u00f7 4 = \u22123',
    answer: '-12',
    explanation: 'Multiply both sides by 4: x = \u22123 \u00d7 4 = \u221212.',
  },
  {
    id: 'os9', skill: 'one-step', difficulty: 1000, type: 'numeric',
    prompt: 'Solve for x:  \u2212x = 9',
    answer: '-9',
    explanation: 'Multiply both sides by \u22121: x = \u22129.',
  },

  // --- Skill 4: two-step equations --------------------------------
  {
    id: 'ts1', skill: 'two-step', difficulty: 1080, type: 'numeric',
    prompt: 'Solve for x:  2x + 3 = 11',
    answer: '4',
    explanation: 'Subtract 3 from both sides: 2x = 8. Then divide by 2: x = 4.',
  },
  {
    id: 'ts2', skill: 'two-step', difficulty: 1160, type: 'numeric',
    prompt: 'Solve for x:  5x \u2212 4 = 21',
    answer: '5',
    explanation: 'Add 4 to both sides: 5x = 25. Then divide by 5: x = 5.',
  },
  {
    id: 'ts3', skill: 'two-step', difficulty: 1240, type: 'numeric',
    prompt: 'Solve for x:  3x + 7 = 1',
    answer: '-2',
    explanation: 'Subtract 7: 3x = \u22126. Divide by 3: x = \u22122.',
  },
  {
    id: 'ts4', skill: 'two-step', difficulty: 1300, type: 'multiple-choice',
    prompt: 'Solve for x:  x \u00f7 2 \u2212 5 = 1',
    choices: ['8', '10', '12', '14'],
    answer: '12',
    explanation: 'Add 5 to both sides: x/2 = 6. Multiply by 2: x = 12.',
  },
  {
    id: 'ts5', skill: 'two-step', difficulty: 1100, type: 'numeric',
    prompt: 'Solve for x:  3x \u2212 9 = 0',
    answer: '3',
    explanation: 'Add 9 to both sides: 3x = 9. Divide by 3: x = 3.',
  },
  {
    id: 'ts6', skill: 'two-step', difficulty: 1210, type: 'numeric',
    prompt: 'Solve for x:  x \u00f7 3 + 2 = 7',
    answer: '15',
    explanation: 'Subtract 2: x/3 = 5. Multiply both sides by 3: x = 15.',
  },
  {
    id: 'ts7', skill: 'two-step', difficulty: 1290, type: 'numeric',
    prompt: 'Solve for x:  4x + 12 = \u22124',
    answer: '-4',
    explanation: 'Subtract 12: 4x = \u221216. Divide by 4: x = \u22124.',
  },
  {
    id: 'ts8', skill: 'two-step', difficulty: 1350, type: 'multiple-choice',
    prompt: 'Solve for x:  6 \u2212 2x = 10',
    choices: ['\u22124', '\u22122', '2', '4'],
    answer: '-2',
    explanation: 'Subtract 6 from both sides: \u22122x = 4. Divide by \u22122: x = \u22122. Careful with the negatives!',
  },
  {
    id: 'ts9', skill: 'two-step', difficulty: 1320, type: 'numeric',
    prompt: 'Solve for x:  \u22123x + 1 = 16',
    answer: '-5',
    explanation: 'Subtract 1: \u22123x = 15. Divide by \u22123: x = \u22125.',
  },

  // --- Skill 5: distributive property -----------------------------
  {
    id: 'di1', skill: 'distribute', difficulty: 1200, type: 'numeric',
    prompt: 'Solve for x:  2(x + 3) = 14',
    answer: '4',
    explanation: 'Distribute: 2x + 6 = 14. Subtract 6: 2x = 8. Divide by 2: x = 4.',
  },
  {
    id: 'di2', skill: 'distribute', difficulty: 1290, type: 'numeric',
    prompt: 'Solve for x:  3(x \u2212 2) = 18',
    answer: '8',
    explanation: 'Distribute: 3x \u2212 6 = 18. Add 6: 3x = 24. Divide by 3: x = 8.',
  },
  {
    id: 'di3', skill: 'distribute', difficulty: 1380, type: 'multiple-choice',
    prompt: 'Solve for x:  4(2x + 1) = 28',
    choices: ['2', '3', '4', '5'],
    answer: '3',
    explanation: 'Distribute: 8x + 4 = 28. Subtract 4: 8x = 24. Divide by 8: x = 3.',
  },
  {
    id: 'di4', skill: 'distribute', difficulty: 1260, type: 'numeric',
    prompt: 'Solve for x:  5(x \u2212 4) = 20',
    answer: '8',
    explanation: 'Distribute: 5x \u2212 20 = 20. Add 20: 5x = 40. Divide by 5: x = 8.',
  },
  {
    id: 'di5', skill: 'distribute', difficulty: 1340, type: 'numeric',
    prompt: 'Solve for x:  2(3x \u2212 1) = 22',
    answer: '4',
    explanation: 'Distribute: 6x \u2212 2 = 22. Add 2: 6x = 24. Divide by 6: x = 4.',
  },
  {
    id: 'di6', skill: 'distribute', difficulty: 1420, type: 'numeric',
    prompt: 'Solve for x:  \u2212(2x + 6) = 8',
    answer: '-7',
    explanation: 'Distribute the negative: \u22122x \u2212 6 = 8. Add 6: \u22122x = 14. Divide by \u22122: x = \u22127.',
  },
  {
    id: 'di7', skill: 'distribute', difficulty: 1480, type: 'numeric',
    prompt: 'Solve for x:  3(x + 2) + x = 14',
    answer: '2',
    explanation: 'Distribute: 3x + 6 + x = 14. Combine x terms: 4x + 6 = 14. Subtract 6: 4x = 8. Divide: x = 2.',
  },
  {
    id: 'di8', skill: 'distribute', difficulty: 1540, type: 'multiple-choice',
    prompt: 'Solve for x:  4(x \u2212 1) = 2(x + 5)',
    choices: ['5', '6', '7', '8'],
    answer: '7',
    explanation: 'Left side: 4x \u2212 4. Right side: 2x + 10. Subtract 2x: 2x \u2212 4 = 10. Add 4: 2x = 14. Divide: x = 7.',
  },
  {
    id: 'di9', skill: 'distribute', difficulty: 1310, type: 'numeric',
    prompt: 'Solve for x:  5(2x \u2212 3) = 35',
    answer: '5',
    explanation: 'Distribute: 10x \u2212 15 = 35. Add 15: 10x = 50. Divide by 10: x = 5.',
  },

  // --- Skill 6: variables on both sides ---------------------------
  {
    id: 'bs1', skill: 'both-sides', difficulty: 1320, type: 'numeric',
    prompt: 'Solve for x:  5x = 2x + 9',
    answer: '3',
    explanation: 'Subtract 2x from both sides: 3x = 9. Divide by 3: x = 3.',
  },
  {
    id: 'bs2', skill: 'both-sides', difficulty: 1420, type: 'numeric',
    prompt: 'Solve for x:  7x \u2212 4 = 3x + 12',
    answer: '4',
    explanation: 'Subtract 3x: 4x \u2212 4 = 12. Add 4: 4x = 16. Divide by 4: x = 4.',
  },
  {
    id: 'bs3', skill: 'both-sides', difficulty: 1520, type: 'multiple-choice',
    prompt: 'Solve for x:  6x + 5 = 2x + 25',
    choices: ['3', '4', '5', '6'],
    answer: '5',
    explanation: 'Subtract 2x: 4x + 5 = 25. Subtract 5: 4x = 20. Divide by 4: x = 5.',
  },
  {
    id: 'bs4', skill: 'both-sides', difficulty: 1360, type: 'numeric',
    prompt: 'Solve for x:  3x + 4 = x + 12',
    answer: '4',
    explanation: 'Subtract x from both sides: 2x + 4 = 12. Subtract 4: 2x = 8. Divide: x = 4.',
  },
  {
    id: 'bs5', skill: 'both-sides', difficulty: 1440, type: 'numeric',
    prompt: 'Solve for x:  9x \u2212 1 = 5x + 11',
    answer: '3',
    explanation: 'Subtract 5x from both sides: 4x \u2212 1 = 11. Add 1: 4x = 12. Divide: x = 3.',
  },
  {
    id: 'bs6', skill: 'both-sides', difficulty: 1500, type: 'numeric',
    prompt: 'Solve for x:  4x + 1 = 6x \u2212 9',
    answer: '5',
    explanation: 'Subtract 4x: 1 = 2x \u2212 9. Add 9: 10 = 2x. Divide by 2: x = 5.',
  },
  {
    id: 'bs7', skill: 'both-sides', difficulty: 1570, type: 'numeric',
    prompt: 'Solve for x:  2(x + 4) = x + 10',
    answer: '2',
    explanation: 'Distribute: 2x + 8 = x + 10. Subtract x: x + 8 = 10. Subtract 8: x = 2.',
  },
  {
    id: 'bs8', skill: 'both-sides', difficulty: 1400, type: 'numeric',
    prompt: 'Solve for x:  5x + 2 = 3x + 14',
    answer: '6',
    explanation: 'Subtract 3x from both sides: 2x + 2 = 14. Subtract 2: 2x = 12. Divide: x = 6.',
  },
  {
    id: 'bs9', skill: 'both-sides', difficulty: 1350, type: 'numeric',
    prompt: 'Solve for x:  3x \u2212 7 = x + 9',
    answer: '8',
    explanation: 'Subtract x: 2x \u2212 7 = 9. Add 7: 2x = 16. Divide by 2: x = 8.',
  },
];

/** Return all questions belonging to one skill. */
export function questionsForSkill(skillId) {
  return QUESTIONS.filter((q) => q.skill === skillId);
}
