
/* Treehouse FSJS Techdegree
 * Project 5 - Employee Directory
 * Author @ barbara Vega */




//API Resource Link: https://randomuser.me
//API Resource Documentation: https://randomuser.me/documentation

// link with query string for 12 random users that includes their image, Name, Email, Phone, Nationality, date of birth, and Location
//https://randomuser.me/api/?results=12&inc=picture,name,email,location,dob,phone&nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,ir,no,nl,nz,tr,us';




// Global Variables
const urlAPI = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,dob,phone&nat=au,br,ca,ch,de,dk,es,fi,fr,gb,ie,ir,no,nl,nz,tr,us';
let employees = [];
let galleryDiv = document.getElementById('gallery');



// Fetch Data from the RandomUser.me API, parse to Jason, pass to displayEmployees Function.
fetch(urlAPI)
  .then (response => response.json())
  .then (response => response.results)
  .then (displayEmployees);



// This function loops through each employee and stores their name, email, location, and picture to variables.  Then it creates and inserts the html using the employee's data
function displayEmployees(employeeData){
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let employeeName = employee.name;
        let employeeEmail = employee.email;
        let employeeLocation = employee.location.city + ', ' + employee.location.state;
        let employeeImageLarge = employee.picture.large;
  
 //adds employee information to the employeeHTML Variable   
        employeeHTML += `
            <div class="card" data-index="${index}">
                <div class="card-img-container">
                <img class="card-img" src="${employeeImageLarge}" alt="profile picture">
                </div>
                <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employeeName.first} ${employeeName.last}</h3>
                <p class="card-text">${employeeEmail}</p>
                <p class="card-text cap">${employeeLocation}</p>
                </div>
            </div>
         `;
    });
    galleryDiv.insertAdjacentHTML('beforeend', employeeHTML);
};


// Creates Modal Container
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
document.body.appendChild(modalContainer);
modalContainer.style.display = 'none';



// When an employee is clicked a modal window will pop up
galleryDiv.addEventListener('click', e => {
    if(e.target !== galleryDiv){
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
    });

    


// This function creates the modal display with the profile picture, name, email, city, Phone Number, address, and birthday
function displayModal(index) {
    
    // object destructuring 
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    
    let date = new Date(dob.date);
    

// code for converting month and date of birthdate into two digit form found here:
//https://bobbyhadz.com/blog/javascript-get-month-and-date-in-2-digit-format

    let modalHTML = `

    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${city}</p>
        <hr>
        <p class="modal-text">${phone}</p>
        <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p class="modal-text">Birthday: ${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}</p>
    </div>
    </div>
    `;

    modalContainer.innerHTML= modalHTML;
    modalContainer.style.display = 'block';

    // Close the modal button code
    let modalClose = document.getElementById('modal-close-btn');
    modalClose.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

}





