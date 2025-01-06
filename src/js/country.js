const countryName = new URLSearchParams(window.location.search).get('name');
const countryContainer = document.getElementById('country-container');
const cachedCountries = JSON.parse(localStorage.getItem('countries'));

const getCountry = () =>
{
    const country = cachedCountries.find(
        country => country['name']['common'].toLowerCase() ===
            countryName.toLowerCase()
    );

    console.log(country);
    showCountryDetails(country);
};

const getBorderCountries = countryName =>
{

    const country = cachedCountries.find(c => c['name']['common'].toLowerCase() ===
        countryName.toLowerCase()
    );

    const borders = country['borders'];
    if (!borders || borders.length === 0)
    {
        return('N/A');
    }

    const borderNames = borders.map(borderCode =>
    {
        const borderCountry = cachedCountries.find(c => c['cca3'] === borderCode);
        return(borderCountry ? borderCountry['name']['common'] : null);
    }).filter(name => name !== null);

    return(borderNames);
};

const getNativeName = (country) =>
{
    const names = country['name']['nativeName'];
    const nativeName = names ? Object.values(names)[0]?.['official'] ||
        Object.values(names)?.['common'] || 'N/A' : 'N/A';
    return(nativeName);

}

const getCountryCurrencies = (country) =>
{
    if (country['currencies'])
    {
        const currencies = Object.values(country['currencies']);
        const currencyNames = currencies.map(currency => currency['name']).join(', ');
        return(currencyNames || 'N/A');
    }

    return('N/A');
}

const getBorderLinks = borders =>
{
    if (borders === 'N/A' || borders.length === 0)
    {
        return('N/A');
    }

    return(bordersContent = borders.map(border =>
    {
        return(`<a href="./country.html?name=${border}" class="border-link">${border}</a>`);
    }).join(' '));
};

const showCountryDetails = country =>
{
    countryContainer.innerHTML = '';
    const countryInfoContainer = document.createElement('article');
    countryInfoContainer.classList.add('country-info-container');
    
    countryContainer.innerHTML = `<h2 class="visually-hidden">View detailed information about ${country['name']['common']}</h2>`;

    const borders = getBorderCountries(country['name']['common']);
    const bordersContent = getBorderLinks(borders);
    
    const countryContent =
    `
        <div class="country-flag-container">
            <img src="${country['flags']['png']}" alt="${country['name']['common']} flag">
        </div>
        <div class="text-info">
            <div class="country-flex-left">
                <h3>${country['name']['common']}</h3>
                <p><span class="bolder">Native Name: </span>${getNativeName(country)}</p>
                <p><span class="bolder">Population: </span>${country['population'].toLocaleString()}</p>
                <p><span class="bolder">Region: </span>${country['region']}</p>
                <p><span class="bolder">Sub Region: </span>${country['subregion'] || 'N/A'}</p>
                <p><span class="bolder">Capital: </span>${country['capital'] ? country['capital'][0] : 'N/A'}</p>
            </div>
            <div class="country-flex-right">
                <p><span class="bolder">Top Level Domain: </span>${country['tld'][0] || 'N/A'}</p>
                <p><span class="bolder">Currencies: </span>${getCountryCurrencies(country)}</p>
                <p><span class="bolder">Languages: </span>${Object.values(country['languages']).join(', ') || 'N/A'}</p>
            </div>
            <div class="borders">
                <p><span class="bolder">Border Countries: </span></p>
                <div class="borders-container">
                    ${bordersContent}
                </div>
            </div>
        </div>
    `;

    countryInfoContainer.innerHTML = countryContent;
    countryContainer.appendChild(countryInfoContainer)
};


document.addEventListener('DOMContentLoaded', getCountry());