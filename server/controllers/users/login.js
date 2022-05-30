const { User } = require('../../models');
const { createAccessToken, sendAccessToken, isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // cookie가 생성이 안됨!
  
  const userinfo = await User.findOne({
    where : { email : req.body.email }
  })
  console.log(userinfo)
  const password = isAuthorized(userinfo.dataValues.password)
  console.log(password)

  if (req.body.password !== password.password) {
    return res.status(404).send('invalid password')
  } else {
    const accessToken = createAccessToken(userinfo.dataValues.password)
    res.status(201).send(userinfo.dataValues)
  }
};
