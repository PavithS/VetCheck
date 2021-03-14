//Currently does not fetch the JSON file containing clinic data

fetch('./Veterinary_clinic_data.json')
.then(response => response.json())
.then(clinic_data => {
  console.log(clinic_data) // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error))

function setList(group) {
	clearList();
	for (const clinic of group) {
		const item = document.createElement('li');
		item.classList.add('list-group-item');
		const text = document.createTextNode(clinic.Name + ', ' + clinic.City + ', ' + clinic.State + ', ' + clinic.Zipcode);
		item.appendChild(text);
		list.appendChild(item);
		filtered_clinics.push(clinic)
	}
	if (group.length === 0) {
		noResult();
	}
}

function clearList() {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
	filtered_clinics = [];
}

function noResult() {
	const item = document.createElement('li');
	item.classList.add('list-group-item');
	const text = document.createTextNode('No results found');
	item.appendChild(text);
	list.appendChild(item);
}

function searchWord(word, place) {
	if (place.Name.toLowerCase().includes(word)) {
		return true;
	} else if (place.City.toLowerCase().includes(word)) {
		return true;
	} else if (place.Street.toLowerCase().includes(word)) {
		return true;
	} else if (place.State.toLowerCase().includes(word)) {
		return true;
	} else if (place.Zipcode.toLowerCase().startsWith(word)) {
		return true;
	} else {
		return false;
	}
}

function searchRelevance(value, searchTerm) {
	if (value === searchTerm) {
		return 2;
	} else if (value.startsWith(searchTerm)) {
		return 1;
	} else {
		return 0;
	}
}

const searchInput = document.getElementById('search');
const list = document.getElementById('list');
var filtered_clinics = [];
var data = [];

searchInput.addEventListener('input', (event) => {
	if (event.data === null) {
		filtered_clinics = [];
	}
	let searchValue = event.target.value;
	if (filtered_clinics.length === 0) {
			data = clinic_data;
		} else {
			data = filtered_clinics;
			filtered_clinics = [];
		}
	if (searchValue && searchValue.trim().length > 0) {
		searchValue = searchValue.trim().toLowerCase().split(' ');
		setList(data.filter(clinic => {
			for (const word of searchValue) {
				if (searchWord(word, clinic) === false) {
					return false;
				}
			}
			return true;
		}));
	} else {
		clearList();
	}
});
