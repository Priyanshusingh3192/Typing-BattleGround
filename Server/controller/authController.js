const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    // console.log("HI ", req.body);
    // console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
    // console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

    const { email, pwd } = req.body;
    user=email;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // console.log(user)
    const foundUser = await User.findOne({ email: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.pwd);
    
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "userid":foundUser._id,
                    "email": foundUser.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30' }
        );
      
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        
        foundUser.refreshToken = refreshToken;
        // console.log(foundUser)
        try {
            const result = await foundUser.save();
            console.log("User saved successfully:", result);
        } catch (error) {
            console.error("Error saving user:", error);
        }

        
        // console.log("njj")
        //console.log(result);

        // Creates Secure Cookie with refresh token

        res.cookie('jwt', refreshToken, { httpOnly: true, 
            // secure: true, 
            // sameSite: 'None',
              maxAge: 24 * 60 * 60 * 1000 });
            
        // Send authorization roles and access token to user
        res.json({ 
            //roles,
            username:foundUser.username,userid:foundUser._id,email:foundUser.email,accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };