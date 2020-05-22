const express = require('express');
const router = express.Router();
const PartySession = require('../models/PartySession');
const PrivateMessage = require('../models/PrivateMessage');
const Table = require('../models/Table');
const upload = require('../config/cloudinary');

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

router.get('/:id/last', (req, res, next) => {
	PartySession.findOne({ table_id: req.params.id })
		.sort({ date_end: 1 })
		.then((dbResult) => {
			if (!dbResult.date_start) {
				res.status(200).json(dbResult);
			} else {
				res.status(200).json(null);
			}
		})
		.catch((dbError) => {
			res.status(200).json(null);
		});
});

router.get('/:id', (req, res, next) => {
	PartySession.findById(req.params.id)
		.then((dbResult) => res.status(200).json(dbResult))
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

router.patch('/:id/edit', upload.none(), (req, res, next) => {
	if (req.body._id) delete req.body._id;
	PartySession.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((dbResult) => {
			console.log(dbResult);
			res.status(200).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.patch('/:id', upload.none(), (req, res, next) => {
	if (req.body._id) delete req.body._id;
	PrivateMessage.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((dbResult) => {
			console.log(dbResult);
			res.status(200).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.get('/:id/next', async (req, res, next) => {
	try {
		const playerTables = await Table.find({ player_id: req.params.id }).populate('player_id dm_id');
		let listTablesId = [];
		playerTables.forEach((table) => {
			listTablesId.push(table._id);
		});
		const sessions = await PartySession.find({ table_id: { $in: listTablesId } }).populate('table_id');
		const nextSessions = sessions.filter((s) => {
			if (s.suggestions.length) {
				return true;
			}
			if (s.date_start && new Date(s.date_start) < new Date()) {
				return false;
			} else {
				return true;
			}
		});
		let listSessionsId = [];
		nextSessions.forEach((session) => {
			listSessionsId.push(session._id);
		});
		console.log(nextSessions);
		const messages = await PrivateMessage.find({ sessionCheck: { $in: listSessionsId }, type: 'planner' });
		res.status(200).json({ next: nextSessions, messages: messages });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
