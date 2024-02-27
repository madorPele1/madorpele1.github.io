window.addEventListener('load', initApp);

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

async function initApp() {
  const searchButton = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResultsContainer = document.getElementById('searchResultsIndex');
  const searchResultsList = document.getElementById('searchResultsList');
  const searchQueryMessage = document.getElementById('searchQueryMessage');
  const mainContentContainer = document.getElementById('mainContent');

  let response = await fetch('dictionary.json');
  let dictionaryData = await response.json();
  localStorage.setItem('dictionaryData', JSON.stringify(dictionaryData));

  searchButton.addEventListener('click', search);
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      search();
    }
  });

  function search() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredWords = dictionaryData.words.filter(({ word, definition, translation }) =>
      word.toLowerCase().includes(searchTerm) || definition.toLowerCase().includes(searchTerm) || translation.toLowerCase().includes(searchTerm)
    );

    searchQueryMessage.textContent = `תוצאות חיפוש עבור: ${searchTerm}`;
    displaySearchResults(filteredWords, searchTerm);

    mainContentContainer.style.display = 'none';
    searchResultsContainer.style.display = 'block';
  }

  function displaySearchResults(words, searchTerm) {
    searchResultsList.innerHTML = words
      .map(
        ({ word, translation, category: wordClass, definition }) => `
        <li>
          <p style="font-size: 40px; margin: 0; font-weight: bolder; display: inline">${word}</p>
          <p style="font-size: 30px; margin: 0; display: inline;">[${wordClass.join(', ')}]</p>
          <p style="color: orange; font-size: 20px;">${translation}</p>
          <p style="font-size: 25px;">${highlightSearchTerm(definition, searchTerm)}</p>
        </li>
      `
      )
      .join('');
  }

  function highlightSearchTerm(text, searchTerm) {
    const regex = new RegExp(searchTerm, 'gi');
    return text.replace(regex, '<strong>$&</strong>');
  }
}

