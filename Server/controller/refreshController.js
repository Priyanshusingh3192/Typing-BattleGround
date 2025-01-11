const User = require('../model/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    console.log("i am cookie ",cookies);

    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log(foundUser)
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(foundUser.email)
            console.log(decoded.email)
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
           console.log(28282)
           console.log(decoded.email)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userid":foundUser._id,
                        "email": decoded.email,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({"username":foundUser.username,"userid":foundUser._id,"email":decoded.email,'picture':foundUser.picture, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }