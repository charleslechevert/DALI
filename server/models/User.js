import mongoose from "mongoose"

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
        }
    },
    {timestamps: true}
)

const User = mongoose.model("User", UserSchema)