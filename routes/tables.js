const express = require('express');
const router = express.Router();
const axios = require('axios');
const Table = require('../models/Table');

router.post('/', (req, res, next) => {
	Table.create(req.body)
		.then((dbResult) => {
			res.status(201).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.get('/:id/all', (req, res, next) => {
	let promises = [];
	if (req.query.populated) {
		promises = [
			Table.find({ dm_id: req.params.id }).populate('dm_id player_id'),
			Table.find({ player_id: req.params.id }).populate('dm_id player_id'),
		];
	} else {
		promises = [Table.find({ dm_id: req.params.id }), Table.find({ player_id: req.params.id })];
	}
	Promise.all(promises)
		.then(([dm, user]) => {
			res.status(200).json({ dm: dm, player: user });
		})
		.catch((dbError) => {
			res.status(500).json(dbError);
		});
});

router.get('/:id', (req, res, next) => {
	Table.findById(req.params.id)
		.populate('dm_id player_id')
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => {
			res.status(500).json(dbError);
		});
});

router.patch('/:table/:player', (req, res, next) => {
	Table.findByIdAndUpdate(req.params.table, { $push: { player_id: req.params.player } }, { new: true })
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
