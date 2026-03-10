document.addEventListener("DOMContentLoaded", () => {
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const userChoiceElem = document.getElementById("user-choice");
  const computerChoiceElem = document.getElementById("computer-choice");
  const outcomeElem = document.getElementById("outcome");

  const settingsBtn = document.getElementById("settingsBtn");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsOverlay = document.getElementById("settingsOverlay");
  const closeSettingsBtn = document.getElementById("closeSettings");

  const soundToggle = document.getElementById("soundToggle");
  const resetScoreBtn = document.getElementById("resetScore");
  const playerScoreElem = document.getElementById("playerScore");
  const cpuScoreElem = document.getElementById("cpuScore");

  let playerScore = 0;
  let cpuScore = 0;
  let difficulty = "easy";
  let soundEnabled = true;

  const iconMap = {
    rock: '<i class="fa-solid fa-hand-fist"></i> Rock',
    paper: '<i class="fa-solid fa-hand"></i> Paper',
    scissors: '<i class="fa-solid fa-hand-scissors"></i> Scissors'
  };

  function updateScoreDisplay() {
    playerScoreElem.textContent = playerScore;
    cpuScoreElem.textContent = cpuScore;
  }

  function resetResultPanel() {
    userChoiceElem.textContent = "Waiting for your move...";
    computerChoiceElem.textContent = "Ready to play";
    outcomeElem.textContent = "Make your choice to begin";
    outcomeElem.className = "";

    choiceButtons.forEach((button) => button.classList.remove("active"));
  }

  function animateElement(element) {
    element.classList.remove("animate-in");
    void element.offsetWidth;
    element.classList.add("animate-in");
  }

  function setActiveButton(activeButton) {
    choiceButtons.forEach((button) => button.classList.remove("active"));
    activeButton.classList.add("active");
  }

  function openSettings() {
    settingsPanel.classList.add("open");
    settingsOverlay.classList.add("show");
  }

  function closeSettings() {
    settingsPanel.classList.remove("open");
    settingsOverlay.classList.remove("show");
  }

  function toggleSettings() {
    if (settingsPanel.classList.contains("open")) {
      closeSettings();
    } else {
      openSettings();
    }
  }

  function playSound(result) {
    const audio = new Audio();

    if (result === "win") {
      audio.src = "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3";
    } else if (result === "lose") {
      audio.src = "https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3";
    } else {
      audio.src = "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3";
    }

    audio.volume = 0.35;
    audio.play().catch(() => {});
  }

  function playGame(userChoice) {
    const choices = ["rock", "paper", "scissors"];
    let computerChoice = "";

    if (difficulty === "easy") {
      computerChoice = choices[Math.floor(Math.random() * choices.length)];
    } else {
      const winMap = {
        rock: "paper",
        paper: "scissors",
        scissors: "rock"
      };

      if (Math.random() < 0.6) {
        computerChoice = winMap[userChoice];
      } else {
        computerChoice = choices[Math.floor(Math.random() * choices.length)];
      }
    }

    userChoiceElem.innerHTML = iconMap[userChoice];
    computerChoiceElem.innerHTML = iconMap[computerChoice];

    let resultText = "";
    let resultClass = "";

    if (userChoice === computerChoice) {
      resultText = "It's a tie!";
      resultClass = "tie";
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      resultText = "You win!";
      resultClass = "win";
      playerScore++;
    } else {
      resultText = "You lose!";
      resultClass = "lose";
      cpuScore++;
    }

    outcomeElem.textContent = resultText;
    outcomeElem.className = "";
    outcomeElem.classList.add(resultClass);

    updateScoreDisplay();

    animateElement(userChoiceElem);
    animateElement(computerChoiceElem);
    animateElement(outcomeElem);

    if (soundEnabled) {
      playSound(resultClass);
    }
  }

  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userChoice = button.dataset.choice;
      playGame(userChoice);
      setActiveButton(button);
    });
  });

  settingsBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSettings();
  });

  closeSettingsBtn.addEventListener("click", () => {
    closeSettings();
  });

  settingsOverlay.addEventListener("click", () => {
    closeSettings();
  });

  resetScoreBtn.addEventListener("click", () => {
    playerScore = 0;
    cpuScore = 0;
    updateScoreDisplay();
    resetResultPanel();
  });

  soundToggle.addEventListener("change", () => {
    soundEnabled = soundToggle.checked;
  });

  document.querySelectorAll('input[name="theme"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
      if (event.target.value === "light") {
        document.body.classList.add("light");
      } else {
        document.body.classList.remove("light");
      }
    });
  });

  document.querySelectorAll('input[name="difficulty"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
      difficulty = event.target.value;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSettings();
    }
  });

  updateScoreDisplay();
});