const $rockBtn = $('.rock');
const $paperBtn = $('.paper');
const $scissorsBtn = $('.scissors');
const $playerChoiceBtn = $('.player-choice-img');

const selectHandler = async (choice) => {
  if ($playerChoiceBtn.hasClass('choice-img-show')) {
    $playerChoiceBtn.removeClass('choice-img-show');
  }

  $playerChoiceBtn.attr('src', `./assets/images/${choice}.svg`);
  $playerChoiceBtn.addClass('choice-img-show');
};

$rockBtn.on('click', () => selectHandler('rock'));
$paperBtn.on('click', () => selectHandler('paper'));
$scissorsBtn.on('click', () => selectHandler('scissors'));
