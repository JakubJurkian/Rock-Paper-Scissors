const $rockBtn = $('.rock');
const $paperBtn = $('.paper');
const $scissorsBtn = $('.scissors');
const $userChoiceImg = $('.user-choice-img');
const $computerChoiceImg = $('.computer-choice-img');
const $resetBtn = $('.reset-btn');
const $clearBtn = $('.clear-btn');
const $resultBtn = $('.result-btn');
const $resultText = $('.text-result');
const $userAvatar = $('.user img');
const $computerAvatar = $('.computer img');
const $userPointsField = $('.user-points');
const $computerPointsField = $('.computer-points');

const COMPUTER_POSSIBLE_CHOICES = ['rock', 'paper', 'scissors'];

let selectingBtnAfterCheckingResult = false;

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

const newGame = async () => {
  $clearBtn.attr('disabled', true);
  await loading(800);
  userChoice = null;
  computerChoice = null;
  selectingBtnAfterCheckingResult = false;

  if ($resultText.hasClass('text-result-show')) {
    $resultText.removeClass('text-result-show');
  }

  if (
    $userChoiceImg.hasClass('choice-img-show') &&
    $computerChoiceImg.hasClass('choice-img-show')
  ) {
    $userChoiceImg.removeClass('choice-img-show');
    $computerChoiceImg.removeClass('choice-img-show');
  }
  await loading(450);
  $userChoiceImg.attr('src', `./assets/images/field.svg`);
  $computerChoiceImg.attr('src', `./assets/images/field.svg`);
  $resultText.text(null);
};

const updatePoints = async (pointsField, points, avatar) => {
  await loading(300);
  points += 1;
  pointsField.addClass('hide');
  await loading(200);
  pointsField.text(points);
  pointsField.removeClass('hide');
  avatar.addClass('zoom-in');
  await loading(400);
  avatar.removeClass('zoom-in');
  return points;
};

const addingPoints = async (user, computer) => {
  const result = gameResult(user, computer);
  if (result === 'You won!') {
    userPoints = await updatePoints($userPointsField, userPoints, $userAvatar);
  }
  if (result === 'You lost!') {
    computerPoints = await updatePoints(
      $computerPointsField,
      computerPoints,
      $computerAvatar
    );
  }
};

const selectHandler = async (playerChoiceImg, choice = null) => {
  if (selectingBtnAfterCheckingResult) return;

  if (playerChoiceImg.hasClass('choice-img-show')) {
    playerChoiceImg.removeClass('choice-img-show');
    await loading(300);
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
  $resultBtn.attr('disabled', false);
};

$rockBtn.on('click', () => selectHandler($userChoiceImg, 'rock'));
$paperBtn.on('click', () => selectHandler($userChoiceImg, 'paper'));
$scissorsBtn.on('click', () => selectHandler($userChoiceImg, 'scissors'));

$resultBtn.on('click', async () => {
  if (!userChoice) return;

  await loading(800);

  selectHandler($computerChoiceImg);
  $resultText.text(gameResult(userChoice, computerChoice));
  addingPoints(userChoice, computerChoice);
  $resultBtn.attr('disabled', true);
  $clearBtn.attr('disabled', false);
  if (userPoints > 0 || computerPoints > 0) {
    $resetBtn.attr('disabled', false);
  }
  $resultText.addClass('text-result-show');

  selectingBtnAfterCheckingResult = true;
});

$resetBtn.on('click', async () => {
  await newGame();
  userPoints = 0;
  computerPoints = 0;
  $userPointsField.text(userPoints);
  $computerPointsField.text(computerPoints);
  $resetBtn.attr('disabled', true);
  $clearBtn.attr('disabled', true);
});

$clearBtn.on('click', async () => {
  await newGame();
  $clearBtn.attr('disabled', true);
});

const loading = (miliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};
