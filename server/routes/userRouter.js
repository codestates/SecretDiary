const router  = require('express').Router();
const { users } = require('../controllers');

router
    .route('/user')
    .get(user.get)
    .get