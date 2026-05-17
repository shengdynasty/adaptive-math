# Adaptive Math — Learn Anywhere

An offline-first adaptive math learning app. It works **with or without an
internet connection**, **adapts every question to the individual student's
level**, and runs on the cheapest smartphone — so a student's connectivity
and budget no longer decide their education.

> Built for the prompt *"How can we use technology to improve access to
> quality education worldwide?"* — addressing UN Sustainable Development
> Goals 4, 9 and 10.

---

## The problem

Around 2.6 billion people still lack reliable internet access. The barrier
to quality education for many learners is not a shortage of content — it is
that the content assumes a fast connection, a modern device, and a teacher
free to give one-on-one attention. Most education apps quietly require all
three.

## The approach

This app is built around three deliberate decisions:

**It works fully offline.** After the first load, the entire app — lessons,
questions, the adaptive engine — is cached on the device by a service
worker. A student can lose signal for a week, reopen the app, and keep
learning. Progress is stored locally in the browser, so there is no account
and no server to reach.

**It adapts to the individual.** A human tutor adjusts to the student in
front of them; software can do this at no cost. The app uses an Elo-style
rating system (see *How the adaptive engine works* below) to estimate what
each student knows, per skill, and to serve each question at the edge of
their ability — hard enough to be worth doing, not so hard as to
discourage.

**It runs on minimal hardware.** It is a small static web app. No app-store
install, no high-end phone required — just a browser.

## How this maps to the Sustainable Development Goals

- **SDG 4 — Quality Education.** The adaptive engine targets genuine
  mastery: a student practises each skill until their rating shows they can
  reliably handle questions above the average difficulty, not until a video
  finishes playing.
- **SDG 9 — Industry, Innovation and Infrastructure.** The offline-first
  architecture is the innovation. The app delivers a personalised learning
  experience across exactly the weak infrastructure — no reliable internet,
  low-end devices — that normally locks learners out.
- **SDG 10 — Reduced Inequalities.** By removing the internet connection,
  the account, and the expensive device as requirements, the app narrows
  the gap between students who have those things and students who do not.

## How the adaptive engine works

Each student has a **rating** for each skill; each question has a fixed
**difficulty**. Both use the Elo system (the method used to rank chess
players).

1. **Expected score.** Before a question, the engine computes the
   probability the student answers correctly, from the gap between their
   rating and the question's difficulty.
2. **Update.** After the answer, the student's rating moves toward reality:
   up if they were right, down if wrong — and by *more* when the result was
   surprising (e.g. getting a hard question right).
3. **Question selection.** The next question is chosen with a difficulty
   slightly *above* the student's current rating, targeting roughly a 70%
   success rate — challenging but not discouraging.
4. **Mastery.** A skill counts as mastered once the rating clears a
   threshold *and* the most recent answers were all correct.

The full engine is in `src/engine/elo.js`, documented line by line, with a
test suite in `src/engine/elo.test.js`.

## Project structure

```
src/
  engine/
    elo.js          the adaptive mastery engine (Elo rating system)
    elo.test.js     test suite for the engine — run with: npm test
    storage.js      offline persistence via IndexedDB (Dexie)
  data/
    questions.js    the early-algebra question bank
  components/
    Practice.jsx    the question-answering screen
    Dashboard.jsx   per-skill progress overview
    OfflineBadge.jsx  live online/offline indicator
  App.jsx           top-level state and the adaptive loop
  main.jsx          React entry point
  styles/app.css    stylesheet
vite.config.js      build config + PWA / service-worker setup
```

## Running it

```bash
npm install      # install dependencies
npm test         # run the adaptive-engine test suite
npm run dev      # start the dev server
npm run build    # produce the production build in dist/
npm run preview  # serve the production build locally
```

### Seeing the offline capability

1. `npm run build` then `npm run preview`.
2. Open the app in the browser and use it once.
3. Open DevTools → Network → set to **Offline**.
4. Reload the page. The app still loads and works completely — the
   indicator in the corner switches to "Offline — still working".

## Deploying

The production build in `dist/` is a static site. It can be deployed for
free on Netlify, Vercel, or GitHub Pages. The build uses a relative base
path, so it works from any sub-path without configuration.

## Possible next steps

- Expand the question bank and add more skill areas.
- Add an import counterpart to the existing progress export, so a teacher
  could collect a whole class's progress from devices that were never
  online.
- Add spoken-audio question prompts for low-literacy or visually impaired
  learners.
