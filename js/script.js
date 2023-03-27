const API_BASE = "http://92.220.233.201:3398";

const form = document.querySelector("#pet-form");
const petname = document.querySelector("#petname");
const petage = document.querySelector("#petage");
const ownername = document.querySelector("#ownername");
const species = document.querySelector("#species");

const listPets = document.querySelector("#list-pets");

form.addEventListener("submit", storePet);

// CRUD

// CREATE = OPPRETT
// READ = LES
// UPDATE = OPPDATER
// DELETE = SLETT

let storedPet = {};

function storePet(event) {
	event.preventDefault();

	storedPet = {
		petname: petname.value,
		petage: petage.value,
		ownername: ownername.value,
		species: species.value,
	};

	createPet();
}

// CREATE: Create a new pet
async function createPet() {
	await fetch(`${API_BASE}/pet`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(storedPet),
	});
}
// READ: Retrieve all pets
async function getPets() {
	await fetch(`${API_BASE}/pets`)
		.then((response) => response.json())
		.then((response) => {
			response.forEach((pet) => {
				listPets.innerHTML += `
                <tr>
                    <td>${pet.petID}</td>
                    <td>${pet.petname}</td>
                    <td>${pet.petage}</td>
                    <td>${pet.ownername}</td>
                    <td>${pet.species}</td>
                    <td>
                    <p id="edit-btn" onclick="getPetById(${pet.petID})">Get single</p>
                    </td>
                </tr>    
                `;
			});
		});
}

getPets();

// READ: Retrieve a pet by id
async function getPetById(id) {
	await fetch(`${API_BASE}/pet/${id}`)
		.then((response) => response.json())
		.then((response) => console.log(response));
}

// UPDATE: Update a pet by id

// DELETE: Delete a pet by id
