// Слайдер на главной странице
let sliderImages = document.querySelectorAll('.slider img');
let current = 0;

function slider() {
    sliderImages.forEach((img, index) => {
        img.classList.remove('active');
    });
    sliderImages[current].classList.add('active');
    current++;
    if(current >= sliderImages.length) current = 0;
}

slider();
setInterval(slider, 3000); // автопрокрутка каждые 3 секунды
