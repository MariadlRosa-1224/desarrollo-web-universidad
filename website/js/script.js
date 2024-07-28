const formFriends = document.getElementById('formFriends');
const txtUser = document.getElementById('txtUser');
const txtName = document.getElementById('txtName');
const txtImage = document.getElementById('txtImage');
const txtPet = document.getElementById('txtPet');

const table = document.getElementById('tableFriends');

const petList = document.getElementById('petList');

const people = [];

//clase Person

class Person {
    constructor(user, name, image, pets) {
        this.user = user;
        this.name = name;
        this.image = image;
        this.pets = pets;
    }
}


formFriends.addEventListener('submit', (e) => {
    e.preventDefault();

    
    //crear la persona
    
    const person = new Person(txtUser.value, txtName.value, txtImage.value, []);
    console.log(person);

    //si la persona existe y la mascota no existe, agregar la mascota

    if (people.find(person => person.user === txtUser.value)) {
        const existingPerson = people.find(person => person.user === txtUser.value);
        if (!existingPerson.pets.includes(txtPet.value)) {
            existingPerson.pets.push(txtPet.value);
            console.log(existingPerson.pets);
        }
        return;
    }

    //agregar la persona al arreglo

    people.push(person);

    
    // llenar la tabla
    
    const tr = document.createElement('tr');

    const tdUser = document.createElement('td');
    tdUser.textContent = txtUser.value;

    const tdName = document.createElement('td');
    tdName.textContent = txtName.value;

    const tdImage = document.createElement('td');
    tdImage.textContent = txtImage.value;

    const tdPet = document.createElement('td');

    // agregar la mascota a la persona

    const pet = txtPet.value;
    person.pets.push(pet);

    


    //agregar la persona a la tabla

    const btnPets = document.createElement('button');
    btnPets.textContent = 'Ver mascotas';
    tdPet.appendChild(btnPets);


    tr.appendChild(tdUser);
    tr.appendChild(tdName);
    tr.appendChild(tdImage);
    tr.appendChild(tdPet);


    table.appendChild(tr);
    formFriends.reset();


});

//add event listener to the button of see the person's pets

table.addEventListener('click', (e) => {

    if (e.target.tagName === 'BUTTON') {
        const row = e.target.parentNode.parentNode; //obtiene la fila
        console.log(row);
        const user = row.children[0].textContent; //obtiene el usuario
        console.log(user);

        const rowPerson = people.find(p => p.user === user);
        console.log(rowPerson);

        if (rowPerson) {
            showPets(rowPerson);
        }

    }

});

function showPets(user) {

    //Limpiar la lista de mascotas
    petList.innerHTML = '';

    let userPets = user.pets;

    //Recorrer las mascotas del usuario y agregarlas a la lista

    for (let pet of userPets) {
        const li = document.createElement('li');
        li.textContent = pet;
        petList.appendChild(li);
    }
    
}
