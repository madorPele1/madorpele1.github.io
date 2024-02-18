window.addEventListener('load', initAlphabetSearch)

function initAlphabetSearch() {
  let dictionaryData = JSON.parse(localStorage.getItem('dictionaryData'))

  const alphabetButtonsContainer = document.getElementById('alphabetButtons')
  const wordList = document.getElementById('wordList')

  function markSelectedAlphabetButton(button) {
    const alphabetButtons =
      alphabetButtonsContainer.querySelectorAll('.alphabet-button')
    alphabetButtons.forEach((btn) => {
      btn.classList.remove('selected')
    })
    button.classList.add('selected')
  }

  function displayWords(words) {
    wordList.innerHTML = words
      .map(
        ({ word, translation, category: wordCategories, definition }) => `
      <li>
        <p style="font-size: 30px; margin: 0;">${word} [${wordCategories.join(
          ', '
        )}]</p>
        <p style="color: orange; font-size: 20px;">${translation}</p>
        <p style="font-size: 25px;">${definition}</p>
      </li>
    `
      )
      .join('')
  }

  function filterWordsByLetter(letter) {
    const filteredWords = dictionaryData.words.filter(({ word }) =>
      word.toLowerCase().startsWith(letter.toLowerCase())
    )
    displayWords(filteredWords)
  }

  function createAlphabetButtons() {
    const alphabet = 'אבגדהוזחטיכלמנסעפצקרשת'
    alphabet.split('').forEach((letter) => {
      const button = document.createElement('button')
      button.textContent = letter
      button.classList.add('alphabet-button')
      button.addEventListener('click', () => {
        filterWordsByLetter(letter)
        markSelectedAlphabetButton(button)
      })
      alphabetButtonsContainer.appendChild(button)
    })
  }
  createAlphabetButtons()
}
