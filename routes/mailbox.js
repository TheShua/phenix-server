const express = require('express');
const router = express.Router();
const PrivateMessage = require('../models/PrivateMessage');

router.get('/:id', (req, res, next) => {
	let filter = { to: req.params.id };
	if (req.query.filter && req.query.filter === 'unread') {
		filter.read = false;
	}
	PrivateMessage.find(filter)
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
