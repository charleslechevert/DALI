import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js"


/*REGISTER USER */

export const register = async (req,res) => {
    try {
        const {
            pseudo,
            password
        } = req.body

        const salt= await bcrpy.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            pseudo,
            password     
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)  

    } catch(err) {
        res.status(500).json({error:err.message});
    }
       
}