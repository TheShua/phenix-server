const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', function (req, res, next) {
	if (!req.query.search || req.query.search === '') return;
	User.find({ name: { $regex: req.query.search, $options: 'i' } })
		.limit(25)
		.then((dbResult) => {
			res.status(200).json(dbResult);
		})
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
