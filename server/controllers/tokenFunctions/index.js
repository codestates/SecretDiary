require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  
  generateAccessToken: (data) => {
    // 엑세스 토큰 생성
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "30s" });
  },
  generateRefreshToken: (data) => {
    // 리프레시 토큰 생성
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "1h" });
  },
  // refresh token 쿠기에 담기
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    // 액세슨 토큰 응답객체에 실어서 보내기
    res.json({ data: { accessToken }, message: "ok" });
  },
  // refresh token으로 요청이 왔을 때, access token, userInfo 다시 보내기
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, userInfo: data }, message: "ok" });
  },
  // headers.authorization 있는지 확인하고, 있다면 token을 해독한 결과를 리턴한다.
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(" ")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // return null if invalid token
      return null;
    }
  },
  // 유효한 refresh token인지 해독한다.
  checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};
