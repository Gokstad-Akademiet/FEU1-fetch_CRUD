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
			listPets.innerHTML = "";
			response.forEach((pet) => {
				listPets.innerHTML += `
                <div class="card">
					<div id="click-container" onclick="window.location='/pet.html?id=${pet.petID}'">
						<h2>${pet.petname}</h2>
						<p>${pet.petage} år</p>
						<span>Eier: ${pet.ownername}</span>
						<span>${pet.species}</span>
					</div>
					<span id="remove-btn" onclick="deletePet(${pet.petID})">Remove</span>
                </div>    
                `;
			});
		});
}

getPets();

// DELETE: Delete a pet by id
async function deletePet(id) {
	await fetch(`${API_BASE}/pet/${id}`, {
		method: "DELETE",
	});

	getPets();
}
