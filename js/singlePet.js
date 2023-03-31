const API_BASE = "http://92.220.233.201:3398";

const singlePet = document.querySelector("#single-pet");
const singlePetEdit = document.querySelector("#single-pet-edit");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

// READ: Retrieve a pet by id
async function getPetById() {
	let image = "";
	await fetch(`${API_BASE}/pet/${id}`)
		.then((response) => response.json())
		.then((response) => {
			switch (response[0].species.toLowerCase()) {
				case "katt":
				case "cat":
				case "pus":
					image = "../assets/image/cat.png";
					break;
				case "hund":
				case "dog":
					image = "../assets/image/dog.png";
					break;
				case "ape":
				case "monkey":
					image = "../assets/image/monkey.png";
					break;
				case "fugl":
				case "papegøye":
				case "bird":
					image = "../assets/image/parrot.png";
					break;
				default:
					image = "../assets/image/unknown.png";

					break;
			}
			singlePet.innerHTML = `
            <h3>${response[0].petname}</h3>
            <img src=${image} alt="Bilde av ${response[0].petname}, en ${response[0].species}" width=300 />
            <p>Dette flotte dyret er ${response[0].petname}, ${response[0].petname} er ${response[0].petage} år gammel
            og er en ${response[0].species} med en trofast eier som heter ${response[0].ownername}</p>
            <button onclick="editPet(${response[0].petID})">Edit</button>
            `;
		});
}

getPetById();

// UPDATE: Update a pet by id
async function editPet() {
	await fetch(`${API_BASE}/pet/${id}`)
		.then((response) => response.json())
		.then((response) => {
			singlePetEdit.innerHTML = `
            <div class="modal">
            <h2>Her kan du endre informasjonen</h2>
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
            </div>
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

	removeModal();
	getPetById();
}

function removeModal() {
	document.querySelector(".modal").style.display = "none";
}
