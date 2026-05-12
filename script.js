const analysisData = {
  core: {
    kicker: "Core loop",
    title: "Fast puzzle loop with different emotional framing.",
    observation:
      "Both titles keep the core action simple, but they package motivation differently: Toon Blast leans on toy-like immediacy while Royal Match leans on a clearer renovation fantasy.",
    games: {
      toon: {
        name: "Toon Blast",
        initial: "TB",
        summary:
          "A character-led puzzle experience where quick readable boards and playful feedback keep the loop light.",
        scores: [
          ["Board readability", 88],
          ["Session speed", 92],
          ["Character identity", 82],
          ["Long-term goal clarity", 70]
        ]
      },
      royal: {
        name: "Royal Match",
        initial: "RM",
        summary:
          "A puzzle loop connected to castle restoration, giving each level a more visible sense of forward progress.",
        scores: [
          ["Board readability", 90],
          ["Session speed", 86],
          ["Character identity", 78],
          ["Long-term goal clarity", 90]
        ]
      }
    }
  },
  level: {
    kicker: "Level design",
    title: "Both games rely on clarity, but pressure is introduced through different systems.",
    observation:
      "Toon Blast benefits from clean objective communication and snappy resolution. Royal Match adds stronger tension through save-the-king moments and more explicit failure pressure.",
    games: {
      toon: {
        name: "Toon Blast",
        initial: "TB",
        summary:
          "Readable goals and fast visual feedback make each attempt feel approachable, even when the challenge rises.",
        scores: [
          ["Goal clarity", 90],
          ["Difficulty ramp", 78],
          ["Feedback speed", 94],
          ["Pressure moments", 66]
        ]
      },
      royal: {
        name: "Royal Match",
        initial: "RM",
        summary:
          "Clear level goals are paired with dramatic failure states, which makes the same match puzzle structure feel higher stakes.",
        scores: [
          ["Goal clarity", 88],
          ["Difficulty ramp", 84],
          ["Feedback speed", 88],
          ["Pressure moments", 91]
        ]
      }
    }
  },
  meta: {
    kicker: "Meta systems",
    title: "Progression works best when rewards explain why one more level matters.",
    observation:
      "The strongest distinction is the meta layer. Royal Match turns progress into visible world-building, while Toon Blast keeps attention closer to character charm, events, and puzzle completion.",
    games: {
      toon: {
        name: "Toon Blast",
        initial: "TB",
        summary:
          "Events and team features extend play without making the meta layer feel heavier than the core puzzle loop.",
        scores: [
          ["Event variety", 82],
          ["Reward clarity", 76],
          ["Social hooks", 80],
          ["World progression", 62]
        ]
      },
      royal: {
        name: "Royal Match",
        initial: "RM",
        summary:
          "Restoration progress, episode structure, and polished rewards give the player a stronger outside-the-board objective.",
        scores: [
          ["Event variety", 86],
          ["Reward clarity", 88],
          ["Social hooks", 76],
          ["World progression", 94]
        ]
      }
    }
  },
  market: {
    kicker: "Market fit",
    title: "The genre is crowded, so distinct packaging becomes a product advantage.",
    observation:
      "Both games understand short-session mobile behavior. The strategic difference is how each title earns memory: Toon Blast through playful brand simplicity, Royal Match through premium polish and aspirational progression.",
    games: {
      toon: {
        name: "Toon Blast",
        initial: "TB",
        summary:
          "The brand feels lightweight, familiar, and easy to return to, which supports broad casual appeal.",
        scores: [
          ["Casual accessibility", 93],
          ["Brand memorability", 84],
          ["Premium feel", 72],
          ["Retention cues", 78]
        ]
      },
      royal: {
        name: "Royal Match",
        initial: "RM",
        summary:
          "The polished presentation and renovation fantasy help the product stand apart in a mature match-puzzle market.",
        scores: [
          ["Casual accessibility", 89],
          ["Brand memorability", 86],
          ["Premium feel", 94],
          ["Retention cues", 88]
        ]
      }
    }
  }
};

const state = {
  lens: "core",
  game: "toon"
};

const lensButtons = document.querySelectorAll("[data-lens]");
const gameButtons = document.querySelectorAll("[data-game]");
const lensKicker = document.getElementById("lensKicker");
const lensTitle = document.getElementById("lensTitle");
const lensObservation = document.getElementById("lensObservation");
const gameInitial = document.getElementById("gameInitial");
const gameName = document.getElementById("gameName");
const gameSummary = document.getElementById("gameSummary");
const scoreList = document.getElementById("scoreList");

function renderScores(scores) {
  scoreList.innerHTML = scores
    .map(([label, score]) => {
      return `
        <div class="score-row">
          <div class="score-meta">
            <span>${label}</span>
            <span>${score}</span>
          </div>
          <div class="score-track" aria-hidden="true">
            <div class="score-fill" style="--score: ${score}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function render() {
  const lens = analysisData[state.lens];
  const game = lens.games[state.game];

  lensKicker.textContent = lens.kicker;
  lensTitle.textContent = lens.title;
  lensObservation.textContent = lens.observation;
  gameInitial.textContent = game.initial;
  gameInitial.className = `game-badge ${state.game === "toon" ? "toon" : "royal"}`;
  gameName.textContent = game.name;
  gameSummary.textContent = game.summary;
  renderScores(game.scores);

  lensButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lens === state.lens);
  });

  gameButtons.forEach((button) => {
    const isActive = button.dataset.game === state.game;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

lensButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.lens = button.dataset.lens;
    render();
  });
});

gameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.game = button.dataset.game;
    render();
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
render();
