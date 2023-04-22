const api = {
	key: '424d29c7bbd481436bdf9bd19775cc50',
	url: 'https://api.openweathermap.org/data/2.5/weather',
};
const city = document.getElementById('city');
const date = document.getElementById('date');
const weatherImg = document.getElementById('weather-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

let search = async (query) => {
	try {
		const response = await fetch(
			`${api.url}?q=${query}&appid=${api.key}&lang=en`
		);
		const data = await response.json();
		city.textContent = `${data.name},${data.sys.country}`;
		date.textContent = new Date().toLocaleDateString();
		temp.textContent = `${toCelsius(data.main.temp)}`;
		weather.textContent = data.weather[0].description;		
		range.textContent = `${toCelsius(data.main.temp_min)} - ${toCelsius(
			data.main.temp_max
		)}`;
		const icono = data.weather[0].icon;
			weatherImg.setAttribute(
			'src',
			`https://openweathermap.org/img/wn/${icono}.png`
		);
	} catch (error) {
		swal('Alert', 'You have to enter a valid City...!', 'error').then((value) =>
			document.querySelector('#searchBox').focus()
		);
		return false;
	}
};

let toCelsius = (kelvin) => {
	return Math.round(kelvin - 273.15) + '°C';
};

let onSubmit = (event) => {
	event.preventDefault();
	search(searchBox.value);
};

const searchForm = document.getElementById('searchMain');
const searchBox = document.getElementById('searchBox');
searchForm.addEventListener('submit', onSubmit, true);
