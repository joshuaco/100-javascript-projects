const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');
const $input = document.querySelector('input');

const INITIAL_TIME = 30;

const TEXT =
  'lorem ipsum dolor sit amet person typing some keys for improve speed and accuracy';

let words = [];
let currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = TEXT.split(' ').slice(0, 32);
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime;

  $paragraph.innerHTML = words
    .map((word) => {
      const letters = word.split('');

      return `<word>
      ${letters.map((letter) => `<letter>${letter}</letter>`).join('')}
      </word>`;
    })
    .join('');

  const $firstWord = $paragraph.querySelector('word');
  $firstWord.classList.add('active');

  const $firstLetter = $firstWord.querySelector('letter');
  $firstLetter.classList.add('active');

  const timeInterval = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;

    if (currentTime <= 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function initEvents() {
  /* Only for testing */
  document.addEventListener('keydown', () => {
    $input.focus();
  });

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event) {
  const $currentWord = $paragraph.querySelector('word.active');
  const $currentLetter = $currentWord.querySelector('letter.active');

  if (event.key === ' ') {
    event.preventDefault();

    const $nextWord = $currentWord.nextElementSibling;
    const $nextLetter = $nextWord.querySelector('letter');

    if ($nextWord) {
      $currentWord.classList.remove('active', 'missed');
      $currentLetter.classList.remove('active');

      $nextWord.classList.add('active');
      $nextLetter.classList.add('active');
    }

    $input.value = '';

    const hasMissedLetters =
      $currentWord.querySelectorAll('letter:not(.correct)').length > 0;

    if (hasMissedLetters) {
      $currentWord.classList.add('missed');
    }
  }

  if (event.key === 'Backspace') {
    const $previousWord = $currentWord.previousElementSibling;
    const $previousLetter = $currentLetter.previousElementSibling;

    if (!$previousWord && !$previousLetter) {
      event.preventDefault();
      return;
    }

    const $wordMissed = $paragraph.querySelector('word.missed');
    if ($wordMissed && !$previousLetter) {
      $previousWord.classList.remove('missed');
      $previousWord.classList.add('active');

      const $letterToGoBack = $previousWord.querySelector('letter:last-child');

      $letterToGoBack.classList.add('active');
      $currentLetter.classList.remove('active', 'is-last');

      const previousWordLetters = Array.from(
        $previousWord.querySelectorAll('letter.correct, letter.incorrect')
      )
        .map((letter) => {
          return letter.classList.contains('correct') ? letter.innerText : '*';
        })
        .join('');

      console.log(previousWordLetters);

      $input.value = previousWordLetters;
    }
  }
}

function onKeyUp() {
  // Retrieve the current element with the class active
  const $currentWord = $paragraph.querySelector('word.active');
  const $currentLetter = $currentWord.querySelector('letter.active');

  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;

  const $allLetters = $currentWord.querySelectorAll('letter');

  $allLetters.forEach(($letter) =>
    $letter.classList.remove('correct', 'incorrect')
  );

  $input.value.split('').forEach((char, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];

    const isCorrect = char === letterToCheck;
    const letterClass = isCorrect ? 'correct' : 'incorrect';
    $letter.classList.add(letterClass);
  });

  $currentLetter.classList.remove('active', 'is-last');

  const inputLength = $input.value.length;
  const $nextActiveLetter = $allLetters[inputLength];

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add('active');
  } else {
    $currentLetter.classList.add('active', 'is-last');
    // TODO: gameOver if there isn't more words.
  }
}
