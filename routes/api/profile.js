const express = require('express');
const router = express.Router();


// tests if profile route works, access is public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

module.exports = router;
