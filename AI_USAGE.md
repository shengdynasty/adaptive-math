# AI Usage Log

The competition rules allow AI assistance, require it to be cited, and
require that it not make up more than 70% of the project. This file is an
honest record of how AI was used here.

---

## Tools used

- **Claude (Anthropic)** — used for initial scaffolding and ongoing coding assistance.

## AI-assisted parts of the project

The following were generated with AI assistance and then reviewed:

- Project configuration and boilerplate (`package.json`, `vite.config.js`,
  `index.html`, `main.jsx`).
- First draft of the React component structure (`App.jsx`, `Practice.jsx`,
  `Dashboard.jsx`, `OfflineBadge.jsx`).
- First draft of the Elo engine (`elo.js`) and its test suite (`elo.test.js`).
- First draft of the stylesheet (`app.css`), including the color palette and layout.
- A starter set of algebra questions in `questions.js`, later expanded.
- Additional questions added to the question bank across all six skills.
- Streak counter and mastery overlay UI additions to `Practice.jsx`.
- Summary chips added to `Dashboard.jsx`.

## My own work

- [ ] Rewrote question explanations in my own words throughout `questions.js`.
- [ ] Adjusted difficulty ratings based on my own testing — record what I changed and why below.
- [ ] Tested the engine and tuned the constants (see Engine tuning section).
- [ ] Modified the UI colors, fonts, and layout to match my own design choices.
- [ ] Wrote the SDG framing and the project narrative in `README.md`.
- [ ] Built the app and produced the offline demo video.
- [ ] Deployed the app to [platform].

### Engine tuning decisions

Record each constant change here as you test:

| Constant | Default | My value | Reason |
|----------|---------|----------|--------|
| K_FACTOR | 32 | 40 | With 9 questions per skill, the rating barely moved before the student ran out of unseen questions at K=32. Raising it to 40 makes each answer matter more, so the rating reaches a meaningful level within one session. |
| MASTERY_THRESHOLD | 1200 | 1200 | Kept at 1200 (200 above the starting 1000). That means the student needs to be reliably answering questions harder than average — a fair bar. |
| MASTERY_RECENT_CORRECT | 3 | 3 | Kept at 3. Requiring the last 3 answers to all be correct guards against a lucky streak — you can't just get one hard question right and call it mastered. |

## How I understand the AI-assisted code

The Elo update formula works like this: before each question, the engine
computes the probability the student answers correctly based on the gap
between their rating and the question's difficulty (the standard logistic
formula). After the answer, the student's rating moves toward reality —
up by `K × (1 − expected)` for a correct answer, down by `K × expected`
for a wrong one. This means a wrong answer on an easy question costs more
rating than a wrong answer on a hard one, which is exactly what you want:
missing something you should know is penalised more than missing something
that was genuinely above your level.

The question-selection strategy targets a difficulty slightly *above* the
student's current rating (by +100 points), which corresponds to roughly a
70% expected success rate. This "desirable difficulty" keeps students
challenged without demoralising them — a principle from cognitive science
sometimes called the zone of proximal development.

---

*Keeping your commit history granular — many small commits as you build and
revise — is the simplest way to show your own contribution over time.*
