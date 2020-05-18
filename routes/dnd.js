const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseURL = 'http://www.dnd5eapi.co';

router.get('/all', (req, res, next) => {
	axios
		.all([axios.get(`${baseURL}/api/races`), axios.get(`${baseURL}/api/classes`)])
		.then(
			axios.spread((...responses) => {
				const allData = { races: responses[0].data, classes: responses[1].data };
				res.status(200).json(allData);
			})
		)
		.catch((error) => console.log(error));
});

router.get('/races/:id', (req, res, next) => {
	axios
		.get(`${baseURL}/api/races/${req.params.id}`)
		.then((result) => {
			res.status(200).json(result.data);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json(error);
		});
});

router.get('/races', (req, res, next) => {
	axios
		.get(`${baseURL}/api/races`)
		.then((result) => {
			res.status(200).json(result.data);
		})
		.catch((error) => {
			console.log(error.response.data);
			res.status(500).json(error.response.data);
		});
});

router.get('/classes/:id', (req, res, next) => {
	axios
		.get(`${baseURL}/api/classes/${req.params.id}`)
		.then((result) => {
			if (result) res.status(200).json(result.data);
			else res.status(200).json([]);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json(error);
		});
});

router.get('/classes', (req, res, next) => {
	axios
		.get(`${baseURL}/api/classes`)
		.then((result) => {
			if (result) res.status(200).json(result.data);
			else res.status(200).json([]);
		})
		.catch((error) => {
			console.log(error.response.data);
			res.status(500).json(error.response.data);
		});
});

module.exports = router;
