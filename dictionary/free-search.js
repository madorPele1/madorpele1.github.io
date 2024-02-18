window.addEventListener('load', initApp)

function topFunction() {
  // Scroll to the top of the page smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

async function initApp() {
  const searchButton = document.getElementById('searchBtn')
  const searchInput = document.getElementById('searchInput')
  const searchResultsContainer = document.getElementById('searchResultsIndex')
  const searchResultsList = document.getElementById('searchResultsList')
  const searchQueryMessage = document.getElementById('searchQueryMessage')
  const mainContentContainer = document.getElementById('mainContent')

  let response = await fetch('dictionary.json')
  let dictionaryData = await response.json()
  localStorage.setItem('dictionaryData', JSON.stringify(dictionaryData))

  searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.toLowerCase()
    const filteredWords = dictionaryData.words.filter(({ word }) =>
      word.toLowerCase().includes(searchTerm)
    )

    searchQueryMessage.textContent = `תוצאות חיפוש עבור: ${searchTerm}`
    displaySearchResults(filteredWords)

    mainContentContainer.style.display = 'none'
    searchResultsContainer.style.display = 'block'
  })

  function displaySearchResults(words) {
    searchResultsList.innerHTML = words
      .map(
        ({ word, translation, category: wordClass, definition }) => `
        <li>
        <p style="font-size: 40px; margin: 0; font-weight: bolder; display: inline">${word}</p>
        <p style="font-size: 30px; margin: 0; display: inline;">[${wordClass.join(
          ', '
        )}]</p>
        <p style="color: orange; font-size: 20px;">${translation}</p>
        <p style="font-size: 25px;">${definition}</p>
      </li>
    `
      )
      .join('')
  }
}
