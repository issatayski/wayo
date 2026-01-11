// Слайдер на главной странице
let sliderImages = document.querySelectorAll('.slider img');
let current = 0;

function slider() {
    sliderImages.forEach((img, index) => img.classList.remove('active'));
    sliderImages[current].classList.add('active');
    current++;
    if(current >= sliderImages.length) current = 0;
}
slider();
setInterval(slider, 3000);

// Модальное окно выбора места
const modal = document.getElementById('modal');
const modalFlightName = document.getElementById('modal-flight-name');

function openModal(flight) {
    modal.style.display = 'block';
    modalFlightName.textContent = flight;
}

function closeModal() {
    modal.style.display = 'none';
}

// Закрытие модального окна при клике вне контента
window.onclick = function(event) {
    if(event.target === modal) closeModal();
}

// Гамбургер-меню
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
