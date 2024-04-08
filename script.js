let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");


searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value
  if (countryName.length === 0) {
    result.innerHTML = `<h3>The Input Field cannot be empty</h3>`;
    return; 
  }

  let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  fetch(finalUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${countryName} is not a country`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        result.innerHTML = `<h3>No data found for '${countryName}'</h3>`;
        return;
      }

      const countryData = data[0]; // Assuming only one country's data is fetched
      result.innerHTML = `
                <img src="${countryData.flags.svg}" class="flag-img">
                <h2>${countryData.name.common}</h2>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Capital:</h4>
                        <span>${countryData.capital[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Continent:</h4>
                        <span>${countryData.continents[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Population:</h4>
                        <span>${countryData.population}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Currency:</h4>
                        <span>${Object.keys(countryData.currencies)[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Common Languages:</h4>
                        <span>${Object.values(countryData.languages).join(
                          ", "
                        )}</span>
                    </div>
                </div>`;
    })
    .catch((error) => {
      result.innerHTML = `<h3>Error: ${error.message}</h3>`;
    });
});
