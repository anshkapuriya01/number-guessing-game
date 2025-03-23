// DOM Elements
const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const restartButton = document.getElementById("restart-button");
const themeToggle = document.getElementById("theme-toggle");

// Game Variables
let targetNumber;
let attempts;
const maxAttempts = 10;

// Initialize the game
function initGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  message.textContent = "";
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
  guessInput.value = "";
  guessInput.disabled = false;
  submitButton.disabled = false;
  restartButton.style.display = "none";
}

// Check the user's guess
function checkGuess() {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (userGuess === targetNumber) {
    endGame(`🎉 Correct! You guessed the number in ${attempts} attempts.`);
  } else if (attempts >= maxAttempts) {
    endGame(`😢 Game over! The number was ${targetNumber}.`);
  } else {
    message.textContent = userGuess < targetNumber ? "Too low! 📉" : "Too high! 📈";
  }
}

// End the game
function endGame(resultMessage) {
  message.textContent = resultMessage;
  guessInput.disabled = true;
  submitButton.disabled = true;
  restartButton.style.display = "block";

  // Show alert box as an alternative to restart
  const restartConfirmed = confirm(`${resultMessage}\nDo you want to play again?`);
  if (restartConfirmed) {
    initGame();
  }
}

// Toggle between light and dark mode
function toggleTheme() {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode";
}

// Event Listeners
submitButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkGuess();
});
restartButton.addEventListener("click", initGame);
themeToggle.addEventListener("click", toggleTheme);



// Start the game
initGame();