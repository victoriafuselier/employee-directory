console.log('Hello Victoria. Your file is linked');

const modalCloseBtn = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');
const cards = document.querySelectorAll('.card');

modalCloseBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

cards.forEach(function(element) {
    element.addEventListener("click", function() {
        overlay.classList.remove('hidden');
    });
});