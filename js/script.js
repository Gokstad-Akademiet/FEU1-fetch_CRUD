const API_BASE = "http://92.220.233.201:3398";

const form = document.querySelector("#pet-form");
const petname = document.querySelector("#petname");
const petage = document.querySelector("#petage");
const ownername = document.querySelector("#ownername");
const species = document.querySelector("#species");

const listPets = document.querySelector("#list-pets");
const singlePet = document.querySelector("#single-pet");
const singlePetEdit = document.querySelector("#single-pet-edit");

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
                <tr>
                    <td>${pet.petID}</td>
                    <td>${pet.petname}</td>
                    <td>${pet.petage}</td>
                    <td>${pet.ownername}</td>
                    <td>${pet.species}</td>
                    <td>
                    <p id="edit-btn" onclick="getPetById(${pet.petID})">Get single</p>
                    <p id="remove-btn" onclick="deletePet(${pet.petID})">Remove</p>
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
		.then((response) => {
			console.log(response);
			singlePet.innerHTML = `
            <h3>Navn: ${response[0].petname}</h3>
            <p>Alder: ${response[0].petage}</p>
            <p>Eier: ${response[0].ownername}</p>
            <p>Type: ${response[0].species}</p>
            <button onclick="editPet(${response[0].petID})">Edit</button>
            `;
		});
}

// UPDATE: Update a pet by id
async function editPet(id) {
	await fetch(`${API_BASE}/pet/${id}`)
		.then((response) => response.json())
		.then((response) => {
			singlePetEdit.innerHTML = `
            <form id="pet-update-form" >
                <label for="petname">Pet Name:</label>
                <input type="text" id="petnameEdit" name="petname" value="${response[0].petname}" required />
                <br />
                <label for="petage">Pet Age:</label>
                <input type="number" id="petageEdit" name="petage" value="${response[0].petage}" required />
                <br />
                <label for="ownername">Owner Name:</label>
                <input type="text" id="ownernameEdit" name="ownername" value="${response[0].ownername}" required />
                <br />
                <label for="species">Species:</label>
                <input type="text" id="speciesEdit" name="species" value="${response[0].species}" required />
                <br />
                <button onclick="updatePet(event,${response[0].petID})">Update</button>
            </form>

            `;
		});
}

async function updatePet(event, id) {
	event.preventDefault();

	const petnameEdit = document.querySelector("#petnameEdit");
	const petageEdit = document.querySelector("#petageEdit");
	const ownernameEdit = document.querySelector("#ownernameEdit");
	const speciesEdit = document.querySelector("#speciesEdit");

	let updatedPet = {
		petname: petnameEdit.value,
		petage: petageEdit.value,
		ownername: ownernameEdit.value,
		species: speciesEdit.value,
	};

	await fetch(`${API_BASE}/update/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedPet),
	});

	// getPets();
	location.reload();
}

// DELETE: Delete a pet by id
async function deletePet(id) {
	await fetch(`${API_BASE}/pet/${id}`, {
		method: "DELETE",
	});

	getPets();
}
