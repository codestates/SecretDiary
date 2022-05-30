const { use } = require('chai');
const { User } = require('../../models');
const { createAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const accessToken = createAccessToken(req.body.password)
  const [userinfo, created] = await User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      email: req.body.email,
      name: req.body.name,
      password: accessToken,
      nickname: req.body.nickname,
     
      
    }
  })
  console.log(accessToken)
  if (!created) {
    res.status(403).send('already exist email')
  } else {
    res.status(201).send({message: 'ok'})
  }
}