const express = require('express');
const router = express.Router();


// tests if posts route works, access is public
router.get('/test', (req, res) => res.json({ msg: 'Posts  Works' }));

module.exports = router;
