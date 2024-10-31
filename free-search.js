window.addEventListener('load', initApp);

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
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
        ({ word, translation, category: wordClass, definition }, index) => `
        <li>
          <button onclick="menuCollapsing(${index})" class="collapsible-menu-btn" style="cursor: pointer; font-size: 30px; font-weight: bolder; border-color: transparent; background: transparent;">+</button>
          <p onclick="menuCollapsing(${index})" style="font-size: 30px; margin: 0; font-weight: bolder; display: inline">${word}</p>
          <p style="font-size: 30px; margin: 0; display: inline;">[${wordClass.join(', ')}]</p>
          <div class="collapsible-menu" style="display: none">
            <p style="color: orange; font-size: 20px;">${translation}</p>
            <p style="font-size: 25px;">${highlightSearchTerm(definition, searchTerm)}</p>
          </div>
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

