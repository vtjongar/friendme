const express = require('express');
const router = express.Router();

// tests if users route works, access is public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;
