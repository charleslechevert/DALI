import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"


/*REGISTER USER */

export const register = async (req,res) => {

    try {
        const {
            pseudo,
            password
        } = req.body

  
        const user = await User.findOne({pseudo: pseudo})
        if (user) return res.status(400).json({ msg: "User already exists!" });
        
        const salt= await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        

        const newUser = new User({
            pseudo,
            password: passwordHash     
        });
        const savedUser = await newUser.save();
        console.log(savedUser)

        /* Here generate a token */
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {expiresIn : '5s'});
        /*----------------------------------------------*/

        res.status(200).json({ token, savedUser })  

    } catch(err) {
        res.status(500).json({error:err.message});
    }
       
}

export const login = async (req,res) => {
    try {
        const { pseudo, password} = req.body; 
        const user = await User.findOne({pseudo: pseudo})
        if (!user) return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn : '5s'});
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_JWT_SECRET, {expiresIn : '1d'});
         
        user.refreshToken = refreshToken
        const result = await user.save()
        delete user.password;  

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.status(200).json({ token, user });




    } catch(error) {
        res.status(500).json({error: err.message})
    }
}

export const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const pseudo = foundUser.pseudo
            const id = foundUser._id
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '3600s' }
            );
            res.json({ pseudo, accessToken})
        }
    );
}

export const logout = async (req,res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);


}