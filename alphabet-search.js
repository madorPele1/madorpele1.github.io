window.addEventListener('load', initAlphabetSearch)

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function menuCollapsing(index) {
  let collapsibleMenu = document.getElementsByClassName("collapsible-menu");
  let collapsibleMenuBtn = document.getElementsByClassName("collapsible-menu-btn");

  if (collapsibleMenu[index].style.display === "block") {
    collapsibleMenu[index].style.display = "none";
    collapsibleMenuBtn[index].innerHTML = "+";
  } else {
    collapsibleMenu[index].style.display = "block";
    collapsibleMenuBtn[index].innerHTML = "-";
  }
}

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
        ({ word, translation, category: wordCategories, definition }, index) => `
      <li>
        <button onclick="menuCollapsing(${index})" class="collapsible-menu-btn" style="cursor: pointer; font-size: 30px; font-weight: bolder; border-color: transparent; background: transparent;">+</button>
        <p onclick="menuCollapsing(${index})" style="cursor: pointer; font-size: 30px; margin: 0; display: inline;">${word} [${wordCategories.join(
          ', '
        )}]</p>
       <div class="collapsible-menu" style="display: none">
            <p style="color: orange; font-size: 20px;">${translation}</p>
            <p style="font-size: 25px;">${definition}</p>
        </div>
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
