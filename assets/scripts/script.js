const $rockBtn = $('.rock');
const $paperBtn = $('.paper');
const $scissorsBtn = $('.scissors');
const $resetBtn = $('.reset-btn');
const $clearBtn = $('.clear-btn');
const $resultBtn = $('.result-btn');
const $resultText = $('.text-result');
const $userAvatar = $('.user img');
const $computerAvatar = $('.computer img');
const $userPointsField = $('.user-points');
const $computerPointsField = $('.computer-points');
const $computerChoiceImg = $('.computer-choice-img');
const $userChoiceImg = $('.user-choice-img');

const COMPUTER_POSSIBLE_CHOICES = ['rock', 'paper', 'scissors'];

let userChoice = null,
  computerChoice = null;
let userPoints = 0,
  computerPoints = 0;
let selectingBtnAfterCheckingResult = false;

const gameResult = (user, computer) => {
  const outcomes = {
    rock: { rock: 'Draw!', scissors: 'You won!', paper: 'You lost!' },
    paper: { paper: 'Draw!', rock: 'You won!', scissors: 'You lost!' },
    scissors: { scissors: 'Draw!', paper: 'You won!', rock: 'You lost!' },
  };
  return outcomes[user][computer];
};

const newGame = async ($btn) => {
  $btn.addClass('lds-dual-ring');
  await loading(800);
  userChoice = null;
  computerChoice = null;
  $clearBtn.attr('disabled', true);
  $resultBtn.attr('disabled', true);
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
  $btn.removeClass('lds-dual-ring');
};

const updatePoints = async ($pointsField, points, $avatar) => {
  await loading(300);
  points += 1;
  $pointsField.text(points);

  $pointsField.addClass('hide');
  await loading(200);
  $pointsField.removeClass('hide');

  $avatar.addClass('zoom-in');
  await loading(400);
  $avatar.removeClass('zoom-in');
  return points;
};

const handlePoints = async (user, computer) => {
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

const selectHandler = async ($playerChoiceImg, choice = null) => {
  if (selectingBtnAfterCheckingResult) return;

  if ($playerChoiceImg.hasClass('choice-img-show')) {
    $playerChoiceImg.removeClass('choice-img-show');
    await loading(300);
  }

  if ($playerChoiceImg === $computerChoiceImg) {
    computerChoice =
      COMPUTER_POSSIBLE_CHOICES[
        Math.floor(Math.random() * COMPUTER_POSSIBLE_CHOICES.length)
      ];
    $playerChoiceImg.css('transform', 'scaleX(-1)');
  } else {
    userChoice = choice;
  }

  $playerChoiceImg.attr(
    'src',
    `./assets/images/${choice ? choice : computerChoice}.svg`
  );
  $playerChoiceImg.addClass('choice-img-show');
  $resultBtn.attr('disabled', false);
};

$rockBtn.on('click', () => selectHandler($userChoiceImg, 'rock'));
$paperBtn.on('click', () => selectHandler($userChoiceImg, 'paper'));
$scissorsBtn.on('click', () => selectHandler($userChoiceImg, 'scissors'));

$resultBtn.on('click', async () => {
  if (!userChoice) return;
  $resultBtn.text('');
  $resultBtn.addClass('lds-dual-ring');
  await loading(800);
  selectHandler($computerChoiceImg);
  $resultText.text(gameResult(userChoice, computerChoice));
  $resultBtn.attr('disabled', true);
  $clearBtn.attr('disabled', false);

  $resultText.addClass('text-result-show');
  $resultBtn.removeClass('lds-dual-ring');
  $resultBtn.text('Run Game');

  await handlePoints(userChoice, computerChoice);
  if (userPoints > 0 || computerPoints > 0) {
    $resetBtn.attr('disabled', false);
  }

  selectingBtnAfterCheckingResult = true;
});

$resetBtn.on('click', async () => {
  userPoints = 0;
  computerPoints = 0;
  $resetBtn.attr('disabled', true);
  $clearBtn.attr('disabled', true);

  $resetBtn.text('');
  $userPointsField.addClass('hide');
  $computerPointsField.addClass('hide');
  await newGame($resetBtn);
  $userPointsField.text(userPoints);
  $computerPointsField.text(computerPoints);
  $userPointsField.removeClass('hide');
  $computerPointsField.removeClass('hide');
  $resetBtn.text('Reset Game');
});

$clearBtn.on('click', async () => {
  $clearBtn.text('');
  await newGame($clearBtn);
  $clearBtn.attr('disabled', true);
  $clearBtn.text('New Game');
});

const loading = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
