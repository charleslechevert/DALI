import mongoose from "mongoose"
import { GameSchema2 } from "./Game.js";



const UserSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            require: true,
            min: 2,
            max:50,
            unique:true,
            required:true
        },
        password: {
            type:String,
            required: true, 
            min: 5
        },
        games: [GameSchema2],
        

        refreshToken: String
    },
    {timestamps: true}
)

const User = mongoose.model("User", UserSchema)

export default User;