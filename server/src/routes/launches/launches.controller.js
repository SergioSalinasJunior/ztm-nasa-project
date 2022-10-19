const {
    getAllLaunches,
    addNewLaunch,
} = require('../../models/launches.model');

function httpGetAllLaunches(_req, res) {
    return res.status(200).json(getAllLaunches);
}

function httpAddNewLaunch(req,res) {
    const launch = req.body;

    //validates if all needed inputs are not null/false
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch,destination) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    //if (launch.launchDate.toString() === 'Invalid Date') { ==another method
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
};