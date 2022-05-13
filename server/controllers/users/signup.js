const { Users } = require('../../models');
const { createAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
    const accessToken = createAccessToken(req.body.password)
    const [userinfo, created] = await Users.findOrCreate({
        where: {
            email: req.body.email
        },
        default: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            intruduce: ''
        }
    })
    console.log(accessToken)
    if (!created) {
        res.status(403).send('already exist email')
    } else {
        res.status(201).send({message: 'ok'})
    }
}