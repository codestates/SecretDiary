require('dotenv').config()
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  createAccessToken: (data) => {
    return sign({password: data}, process.env.ACCESS_SECRET)
  },
  sendAccessToken: (res, accessToken, userinfo) => {
    res.cookie('jwt', accessToken, 
    { 
      maxAge: 10000, 
      secure: true
    }
    );
    res.cookie('email', userinfo.email, {
      maxAge: 10000,
      secure: true
    })
    res.json({ message: 'ok', data: 
      {
        id: userinfo.id,
        email: userinfo.email,
        name: userinfo.name,
        password: accessToken,
     
      } 
    })
  },
  isAuthorized: (req) => {
    return verify(req, process.env.ACCESS_SECRET)
  }
}