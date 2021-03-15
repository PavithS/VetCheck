//Currently does not fetch the JSON file containing clinic data 

var clinic_data = [];

fetch('https://api.github.com/Pavith/VetCheck/Veterinary_clinic_data.json')
.then(response => response.json())
.then(clinic_data => {
  console.log(clinic_data) // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error))

//Creates list of results to be displayed
function setList(group) {
	clearList();
	for (const clinic of group) {
		const item = document.createElement('li');
		item.classList.add('list-group-item');
		item.onclick = 'console.log(item.textContent)';
		const text = document.createTextNode(clinic.Name + ', ' + clinic.City + ', ' + clinic.State + ', ' + clinic.Zipcode);
		item.appendChild(text);
		list.appendChild(item);
		filtered_clinics.push(clinic)
	}
	if (group.length === 0) {
		noResult();
	}
}

//Clears results displayed to the user
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


//Searches for prefix in clinic data which matches search term
function searchWord(searchWord, place) {
	for (const word of place.Name.toLowerCase().split(' ')) {
		if (word.startsWith(searchWord)) {
			return true;
		}
	}
	for (const word of place.City.toLowerCase().split(' ')) {
		if (word.startsWith(searchWord)) {
			return true;
		}
	}
	for (const word of place.Street.toLowerCase().split(' ')) {
		if (word.startsWith(searchWord)) {
			return true;
		}
	}
	for (const word of place.State.toLowerCase().split(' ')) {
		if (word.startsWith(searchWord)) {
			return true;
		}
	}
	if (place.Zipcode.startsWith(searchWord)) {
		return true;
	}
	return false;
}

const searchInput = document.getElementById('search');
const list = document.getElementById('list');
var filtered_clinics = []; //stores clinics which match the search terms
var data = []; //stores list of clinics which will be used for the search

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

//Clear search input and results
let btnClear = document.getElementById('clear-btn');
 
btnClear.addEventListener('click', () => {
    searchInput.value = '';
    clearList();
});


//Select clinic
$('.list-group-item').click(function(selected) {
  console.log("The selected option is: ", selected)
})

