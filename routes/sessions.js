const express = require('express');
const router = express.Router();
const PartySession = require('../models/PartySession');

router.post('/', (req, res, next) => {
	const data = {
		table_id: req.body.table_id,
		suggestions: JSON.parse(req.body.suggestions),
		name: req.body.name,
		review: '',
	};

	PartySession.create(data)
		.then((dbResult) => {
			res.status(201).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.get('/', (req, res, next) => {
	let filter = {};
	if (req.query.table) {
		filter.table = req.query.table;
	}

	PartySession.find(filter)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
