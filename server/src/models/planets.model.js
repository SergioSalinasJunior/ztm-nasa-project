//buil-ins import
const fs = require('fs');
const path = require('path');

//third-part import
const {parse} = require('csv-parse');

//array to hold the values read from the kepler_data
const habitablePlanets = [];

/*
    This function filters planets that are possible habitable planets based earth attributes found on the article:
    found at https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
    -Stellar insolation ['koi_insol']
    -Planetary raius ['koi_prad']
*/
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

/*
    PROMISES SYNTAX OVERVIEW
    const promise = new Promise((resolve, reject) => {
        resolve(42);
    });
    promise.then((result) =>{

    });
    const result = await promise;
    console.log(result);
*/

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler-data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    });
}


module.exports = {
    loadPlanetsData,
    planets: habitablePlanets,
}

// Results can be compared to the website below for possible habitable planets:
// https://phl.upr.edu/projects/habitable-exoplanets-catalog