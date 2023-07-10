let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const body = document.querySelector('body');
const searchBar = document.getElementById("search-bar");

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    let modalHTML = '';
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);
    modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="modal-container">
            <button class="arrow" id="back-button"><</button>
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
                <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
            <button class="arrow" id="forward-button">></button>
        </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;
    body.style.overflow = "hidden";
    
    
    const backButton = document.getElementById('back-button');
    const forwardButton = document.getElementById('forward-button');

    if (parseInt(index) === 0) {
        backButton.classList.add('hidden');
        backButton.disabled = false;
    }

    if (parseInt(index) === 11) {
        forwardButton.classList.add('hidden');
        forwardButton.disabled = true;
    }

    backButton.addEventListener('click', e => {
        displayModal(parseInt(index)-1);
    });
    
    forwardButton.addEventListener('click', e => {
        displayModal(parseInt(index)+1);
    });
}

function searchFunction() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const names = document.getElementsByTagName("h2");
    
    for (let i = 0; i < names.length; i++) {
        let namesFilter = names[i].textContent.toLowerCase();
        if (namesFilter.includes(searchInput)) {
            names[i].parentNode.parentNode.style.display = '';
        } else {
            names[i].parentNode.parentNode.style.display = 'none';
        }
    }
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the grid container itself
    if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
    body.style.overflow = "auto";
});


modalContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
searchBar.addEventListener("keyup", searchFunction);