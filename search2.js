const clinic_data = [
	{"Name":"Weare Animal Hospital, Inc. Exotic and Bird Clinic of New Hampshire","Street":"91 North Stark Highway","City":"Weare","State":"NH","Zipcode":"3281"},
	{"Name":"Patton Chapel Animal Clinic","Street":"1234 test","City":"Hoover","State":"AL","Zipcode":"12345"},
	{"Name":"Arlington Pet Hospital","Street":"1234 test","City":"Arlington","State":"TN","Zipcode":"12345"},
	{"Name":"Not Clinic","Street":"1234 test","City":"Evanston","State":"IL","Zipcode":"12345"},
	{"Name":"Randolph Animal Hospital","Street":"1435 Zoo Parkway","City":"Asheboro","State":"NC","Zipcode":"27205"},
	{"Name":"Willowrun Veterinary Hospital","Street":"1417 South Brightleaf Blvd.","City":"Smithfield","State":"NC","Zipcode":"27577"},
	{"Name":"Park Vet Hospital","Street":"735 W NC Hwy 54","City":"Durham","State":"NC","Zipcode":"27713"},
	{"Name":"Albemarle Animal Clinic","Street":"1639 NC 24-27 West Bypass","City":"Albemarle","State":"NC","Zipcode":"28001"},
	{"Name":"Cabarrus Animal Hospital, Pa","Street":"3030 S. Cannon Blvd","City":"Kannapolis","State":"NC","Zipcode":"28083"},
	{"Name":"West Stanly Animal Clinic","Street":"237 Town Centre Drive","City":"Locust","State":"NC","Zipcode":"28097"},
	{"Name":"Vetcor Jackson Veterinary Practice, P.A.","Street":"1925 A1A South","City":"St Augustine","State":"FL","Zipcode":"32080"}
];


function searchRelevance(value, searchTerm) {
	if (value === searchTerm) {
		return 2;
	} else if (value.startsWith(searchTerm)) {
		return 1;
	} else {
		return 0;
	}
}

function setList(group) {
	clearList();
	for (const clinic of group) {
		const item = document.createElement('li');
		item.classList.add('list-group-item');
		const text = document.createTextNode(clinic.Name);
		item.appendChild(text);
		list.appendChild(item);

	}
	if (group.length === 0) {
		noResult();
	}
}

function clearList() {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}

function noResult() {
	const item = document.createElement('li');
	item.classList.add('list-group-item');
	const text = document.createTextNode('No results found');
	item.appendChild(text);
	list.appendChild(item);
}

const searchInput = document.getElementById('search');
const list = document.getElementById('list');

searchInput.addEventListener('input', (event) => {
	console.log('input event')
	let searchValue = event.target.value;
	if (searchValue && searchValue.trim().length > 0) {
		searchValue = searchValue.trim().toLowerCase();
		setList(clinic_data.filter(clinic => {
			if (clinic.Name.toLowerCase().includes(searchValue)) {
				return true;
			} else if (clinic.City.toLowerCase().includes(searchValue)) {
				return true;
			}
		}).sort((clinic1, clinic2) => {
			return searchRelevance(clinic1.Name, searchValue) + searchRelevance(clinic1.City, searchValue)- searchRelevance(clinic2.Name, searchValue) - searchRelevance(clinic2.City, searchValue);
		}));
	} else {
		clearList();
	}
});
