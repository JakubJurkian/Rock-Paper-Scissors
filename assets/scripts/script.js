const $rockBtn = $('.rock');
const $paperBtn = $('.paper');
const $scissorsBtn = $('.scissors');
const $userChoiceImg = $('.user-choice-img');
const $computerChoiceImg = $('.computer-choice-img');
const $resultbtn = $('.result-btn');
const $resultText = $('.text-result');
const $userAvatar = $('.user img');
const $computerAvatar = $('.computer img');
const $userPointsField = $('.user-points');
const $computerPointsField = $('.computer-points');

const COMPUTER_POSSIBLE_CHOICES = ['rock', 'paper', 'scissors'];

let userChoice = null,
  computerChoice = null;
let userPoints = 0,
  computerPoints = 0;

const gameResult = (user, computer) => {
  if (
    (user === 'rock' && computer === 'rock') ||
    (user === 'paper' && computer === 'paper') ||
    (user === 'scissors' && computer === 'scissors')
  )
    return 'Draw!';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return 'You won!';
  }
  if (
    (user === 'scissors' && computer === 'rock') ||
    (user === 'rock' && computer === 'paper') ||
    (user === 'paper' && computer === 'scissors')
  ) {
    return 'You lost!';
  }
};

const updatePoints = (pointsField, points, avatar) => {
  points += 1;
  pointsField.text(points);
  return points;
};

const addingPoints = (user, computer) => {
  const result = gameResult(user, computer);
  if (result === 'You won!') {
    userPoints = updatePoints($userPointsField, userPoints, $userAvatar);
  }
  if (result === 'You lost!') {
    computerPoints = updatePoints(
      $computerPointsField,
      computerPoints,
      $computerAvatar
    );
  }
};

const selectHandler = (playerChoiceImg, choice = null) => {
  if (playerChoiceImg.hasClass('choice-img-show')) {
    playerChoiceImg.removeClass('choice-img-show');
  }

  if (playerChoiceImg === $computerChoiceImg) {
    computerChoice =
      COMPUTER_POSSIBLE_CHOICES[
        Math.floor(Math.random() * COMPUTER_POSSIBLE_CHOICES.length)
      ];
    playerChoiceImg.css('transform', 'scaleX(-1)');
  } else {
    userChoice = choice;
  }

  playerChoiceImg.attr(
    'src',
    `./assets/images/${choice ? choice : computerChoice}.svg`
  );
  playerChoiceImg.addClass('choice-img-show');
};

$rockBtn.on('click', () => selectHandler($userChoiceImg, 'rock'));
$paperBtn.on('click', () => selectHandler($userChoiceImg, 'paper'));
$scissorsBtn.on('click', () => selectHandler($userChoiceImg, 'scissors'));

$resultbtn.on('click', () => {
  if (!userChoice) return;

  selectHandler($computerChoiceImg);
  $resultText.text(gameResult(userChoice, computerChoice));
  addingPoints(userChoice, computerChoice);
});
