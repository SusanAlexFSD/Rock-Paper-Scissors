function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Update Results Dynamically
    const userChoiceElem = document.getElementById('user-choice');
    const computerChoiceElem = document.getElementById('computer-choice');
    const outcomeElem = document.getElementById('outcome');

    userChoiceElem.textContent = `You chose: ${userChoice}`;
    computerChoiceElem.textContent = `The computer chose: ${computerChoice}`;

    // Determine winner
    let result;
    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }

    outcomeElem.textContent = result;

    // Apply fade-in effect
    userChoiceElem.style.animation = 'fadeIn 0.5s ease';
    computerChoiceElem.style.animation = 'fadeIn 0.5s ease';
    outcomeElem.style.animation = 'fadeIn 0.5s ease';
}
