document.addEventListener('DOMContentLoaded', initCategorySearch);

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function initCategorySearch() {
  let dictionaryData = JSON.parse(localStorage.getItem('dictionaryData'));

  const categoryLinksContainer = document.querySelector('.container');
  const searchResultsList = document.getElementById('searchResultsList');
  const searchResultsCategory = document.getElementById('searchResultsCategory');
  const searchQueryMessage = document.getElementById('searchQueryMessage');

  function markSelectedCategory(categoryLink) {
    const categoryLinks = categoryLinksContainer.querySelectorAll('.category-link');
    categoryLinks.forEach((link) => {
      // link.removeAttribute('transition-style', 'in:wipe:right');
      link.classList.remove('selected');
    });
    categoryLink.classList.add('selected');
    // categoryLink.setAttribute('transition-style', 'in:wipe:right');
  }

  function displayWords(words) {
    searchResultsList.innerHTML = words
      .map(
        ({ word, translation, category: wordCategories, definition }) => `
        <li>
          <p style="font-size: 30px; margin: 0;">${word} [${wordCategories.join(', ')}]</p>
          <p style="color: orange; font-size: 20px;">${translation}</p>
          <p style="font-size: 25px;">${definition}</p>
        </li>
      `
      )
      .join('');
  }

  function filterWordsByCategoryAndSort(category) {
    const filteredWords = dictionaryData.words.filter(
      ({ category: wordCategories }) => wordCategories.includes(category)
    );
      filteredWords.sort((a, b) => a.word.localeCompare(b.word));
      searchResultsCategory.style.display = 'block';
      displayWords(filteredWords);
  }

  const categoryLinks = categoryLinksContainer.querySelectorAll('.category-link');
  categoryLinks.forEach((categoryLink) => {
    categoryLink.addEventListener('click', () => {
      const category = categoryLink.textContent;
      filterWordsByCategoryAndSort(category);
      markSelectedCategory(categoryLink);
    });
  });
}
