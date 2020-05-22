const express = require('express');
const router = express.Router();
const PrivateMessage = require('../models/PrivateMessage');
const Table = require('../models/Table');

router.get('/:id', (req, res, next) => {
	let filter = { to: { $elemMatch: { target: req.params.id } } };
	if (req.query.filter && req.query.filter === 'unread') {
		filter = {
			to: {
				$elemMatch: { target: req.params.id, read: false },
			},
		};
	}
	PrivateMessage.find(filter)
		.populate('from_user')
		.sort({ created: -1 })
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

router.post('/:id/table', async (req, res, next) => {
	try {
		if (req.query.type === 'schedule') {
			const table = await Table.findById(req.params.id).populate('player_id');
			let toList = [];
			table.player_id.forEach((player) => {
				toList.push({ target: player._id });
			});
			let data = {
				from_type: 'system',
				to: toList,
				subject: `${table.name} :: New session !`,
				type: 'planner',
				sessionCheck: req.body.session_id,
				message: `Hello !
A new session has been planned for ${table.name}. Are you available one of these date ?`,
			};
			await PrivateMessage.create(data)
				.then((dbResult) => res.status(201).json(dbResult))
				.catch((dbError) => res.status(500).json(dbError));
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		let data = {
			from_type: req.body.from_type,
			from_user: req.body.from_user,
			created: new Date(),
			subject: req.body.subject,
			message: req.body.message,
		};

		let target = JSON.parse(req.body.to);
		let targets = [];
		target.forEach((to) => {
			if (to.scope) {
				to.player_id.forEach((player) => {
					if (!targets.find((x) => x.target === player)) targets.push({ target: player });
				});
				if (!targets.find((x) => x.target === to.dm_id)) targets.push({ target: to.dm_id });
			} else {
				if (!targets.find((x) => x.target === to._id)) targets.push({ target: to._id });
			}
		});
		data.to = targets;

		await PrivateMessage.create(data)
			.then((dbResult) => res.status(201).json(dbResult))
			.catch((dbError) => res.status(500).json(dbError));
	} catch (error) {
		res.status(500).json(error);
	}
});

router.patch('/:id', (req, res, next) => {
	PrivateMessage.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

router.delete('/:id', (req, res, next) => {
	PrivateMessage.findByIdAndDelete(req.params.id)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
