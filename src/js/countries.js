const API_URL = 'https://restcountries.com/v3.1/all';

const countriesContainer = document.getElementById('countries-container');
const searchInput = document.getElementById('search-input');
const regionSelect = document.getElementById('region-select');

let allCountries = [];

const getCountries = async () =>
{
    const cachedCountries = localStorage.getItem('countries');

    if (cachedCountries)
    {
        allCountries = JSON.parse(cachedCountries);
        return(allCountries);
    }

    try
    {
        const request = await fetch(API_URL);

        if (!request.ok)
        {
            return([]);
        }

        const countries = await request.json();
        localStorage.setItem('countries', JSON.stringify(countries));
        allCountries = countries;
        return(countries);
    }
    catch (error)
    {
        return([]);
    }
};

const showCountries = countries =>
{
    countriesContainer.innerHTML = '';

    if (countries.length > 0)
    {
        countries.forEach(country =>
        {
            const card = document.createElement('a');
            card.href = `./country.html?name=${country['name']['common']}`;
            card.setAttribute('aria-label', `Get detailed info about ${country['name']['common']}`);
            card.classList.add('country-card');

            const cardContent = 
            `
                <div class="flag-container">
                    <img src="${country['flags']['png']}" alt="${country['name']['common']} flag">
                </div>
                <div class="country-info">
                    <h3>${country['name']['common']}</h3>
                    <p><span class="bolder">Population: </span>${country['population'].toLocaleString()}</p>
                    <p><span class="bolder">Region: </span>${country['region']}</p>
                    <p><span class="bolder">Capital: </span>${country['capital'] ? country['capital'][0] : 'N/A'}</p>
                </div>
            `

            card.innerHTML = cardContent;
            countriesContainer.appendChild(card);

        });
    }
};

const filterCountries = () =>
{
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value;

    const filteredCountries = allCountries.filter(country =>
    {
        const matchesSearch = country['name']['common'].toLowerCase().startsWith(searchTerm);
        const matchesRegion = selectedRegion === 'All' || country['region'] === selectedRegion;
        return(matchesSearch && matchesRegion);
    });

    showCountries(filteredCountries);
}

document.addEventListener('DOMContentLoaded', async () =>
{
    await getCountries();
    showCountries(allCountries);

    searchInput.addEventListener('input', filterCountries);
    regionSelect.addEventListener('change', filterCountries);
});