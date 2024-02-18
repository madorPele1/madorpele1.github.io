window.addEventListener('load', openMenu)

function openMenu() {
  const hamburgerMenu = document.getElementById('hamburger-menu')
  const menuMobile = document.getElementById('mobile-nav-links')
  const closeMenuBtn = document.getElementById('x-btn')

  hamburgerMenu.addEventListener('click', () => {
    menuMobile.style.display = 'flex'
  })

  closeMenuBtn.addEventListener('click', () => {
    menuMobile.style.display = 'none'
  })
}
