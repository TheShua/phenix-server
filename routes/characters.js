const express = require('express');
const router = express.Router();
const Character = require('../models/Character');
const axios = require('axios');
const baseURL = 'http://www.dnd5eapi.co';

router.post('/', (req, res, next) => {
	Character.create(req.body)
		.then((dbResult) => {
			res.status(201).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.get('/:id/all', (req, res, next) => {
	Character.find({ user_id: req.params.id })
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.get('/:id/:full', async (req, res, next) => {
	try {
		let result = await Character.findById(req.params.id).populate('user_id');
		let race = await axios.get(`${baseURL}/api/races/${result.sheet.race}`);
		let classes = [];
		for (let classe of result.sheet.classe) {
			let classeData = await axios.get(`${baseURL}/api/classes/${classe.name}`);
			classeData = JSON.parse(JSON.stringify(classeData.data));
			classes.push({ classe: classeData, level: classe.level });
		}
		classes = JSON.parse(JSON.stringify(classes));
		race = JSON.parse(JSON.stringify(race.data));
		result = JSON.parse(JSON.stringify(result));
		result.sheet.race = race;
		result.sheet.classe = classes;
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
