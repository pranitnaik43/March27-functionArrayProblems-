var req = new XMLHttpRequest();
var countriesURL = "https://restcountries.eu/rest/v2/all";
req.open('GET',countriesURL , true);
req.send();
countries = [];
req.onload = function() {
    var countries = JSON.parse(this.response);
    countries.forEach((element,index) => {
        try{
            // console.log(element);
            var name = element.name;
            var [lat, lon] = element.latlng;

            if(lat===0 || lon==0 || lat===undefined || lon===undefined) 
                throw new Error("Coordinates not found for "+name)
            else{
                countries.push(element);
                // console.log(element); 
            }
        }
        catch(e){
            console.log("Error: ",e.message);
        }
    });
    console.log("Countries from Asia");
    AsianCountries(countries);
    console.log("Countries with population less than 2 lacs");
    PopLT2Lacs(countries);
    console.log("Country Name, capital and flag");
    printDetails(countries);
    console.log("Countries total population");
    totalPopulation(countries);
    console.log("Countries which use US Dollars");
    dollarCountries(countries);
}
// Get all the countries from Asia continent /region using Filter function
function AsianCountries(countries) {
    countries.filter(country => country.region==="Asia")
        .forEach((country, index) => console.log(index, country.name));
}
// Get all the countries with a population of less than 2 lacs using Filter function
function PopLT2Lacs(countries) {
    countries.filter(country => country.population<200000)
        .forEach((country, index) => console.log(index, country.name, country.population));
}
// Print the following details name, capital, flag using forEach function
function printDetails(countries) {
    countries.forEach((country, index) => console.log(index, country.name, country.capital, country.flag));
}
// Print the total population of countries using reduce function 
function add(total, num) {
    return total + num;
}
function totalPopulation(countries) {
    var totalPoplation = countries.map(country => {return country.population }).reduce(add);
    console.log(totalPoplation);
}

// Print the country which use US Dollars as currency.
function dollarCountries(countries) {
    countries.filter((country) => {
        var dollar = false;
        country.currencies.forEach((i) => 
        dollar |= (i.name === "United States dollar"))
        return dollar;
    }).forEach((country, index) => console.log(index, country.name));
}

