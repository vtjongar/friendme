const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// tests if users route works, access is public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// registers the user, access is public 
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'That email is already taken.'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // rating
          d: 'mm' // default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar, // with es6 you could just put avatar once here and take out semi-colon 
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});


router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // finds user by email
  User.findOne({email: email}).then(user => { // with es6 you could just put email once here and take out semi-colon 

    // check if user exists 
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // check if password is correct 
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: 'Success' });
      } else {
        return res.status(400).json({ password: 'Wrong password' });
      }
    });
  });
});


module.exports = router;
