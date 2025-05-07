// LATERAL MENU
const navbar = document.getElementById('navbar__list')
const burgerMenu = document.getElementById('navbar__burger-menu')
const closeIcon = document.getElementById('list-element__close-logo')

document.addEventListener('click', (e) => {
    const target = e.target.closest('navbar')

    if (e.target === burgerMenu) {
        navbar.classList.add('show-navbar-list')
    } else if (e.target === closeIcon) {
        navbar.classList.remove('show-navbar-list')
    } else if (navbar.classList.contains('show-navbar-list') && !target) {
        navbar.classList.remove('show-navbar-list')
    }
})