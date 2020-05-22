const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');
const User = require('../models/User');
const Table = require('../models/Table');

router.get('/', function (req, res, next) {
	if (!req.query.search || req.query.search === '') return;

	if (req.query.param === 'all') {
		Promise.all([
			User.find({ name: { $regex: req.query.search, $options: 'i' } }),
			Table.find({ name: { $regex: req.query.search, $options: 'i' } }),
		])
			.then(([users, tables]) => {
				res.status(200).json({ users: users, tables: tables });
			})
			.catch((dbError) => {
				res.status(500).json(dbError);
			});
	} else {
		User.find({ name: { $regex: req.query.search, $options: 'i' } })
			.limit(25)
			.then((dbResult) => {
				res.status(200).json(dbResult);
			})
			.catch((dbError) => res.status(500).json(dbError));
	}
});

router.patch('/:id', upload.single('avatar'), (req, res, next) => {
	if (!req.body.password) delete req.body.password;
	if (req.file) req.body.avatar = req.file.secure_url;
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((dbResult) => res.status(200).json(dbResult))
		.catch((dbError) => res.status(500).json(dbError));
});

module.exports = router;
