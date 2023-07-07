console.log('Hello Victoria. Your file is linked');

const modalCloseBtn = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');
const card = document.querySelector('.card');

card.addEventListener('click', () => {
    overlay.classList.remove('hidden');
});

modalCloseBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
});