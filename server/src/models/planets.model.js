//buil-ins import
const fs = require('fs');
const path = require('path');

//third-part import
const {parse} = require('csv-parse');
const planets = require('./planets.mongo');

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
        .on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                savePlanet(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        });
    });
}

async function getAllPlanets() {
    return await planets.find({});
}

async function savePlanet(planet) {
    try {
    await planets.updateOne({
        keplerName: planet.kepler_name,
    }, {
        keplerName: planet.kepler_name,
    }, {
        upsert: true,
    });
    } catch(err) {
    console.error(`Could not save planet ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}

// Results can be compared to the website below for possible habitable planets:
// https://phl.upr.edu/projects/habitable-exoplanets-catalog