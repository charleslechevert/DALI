import mongoose from "mongoose"

export const GameSchema2 = new mongoose.Schema(
    {
        score: {
            type: Number,
            required:true
        },
        timer: {
            type: Number,
            required:true
        },
        user_id: {
            type:String,
            required:true
        },
        name: {
            type:String,
            required:true
        },
        draw_id: {
            type:String,
            required:true
        }

    },
    {timestamps: true}
)

export const Game = mongoose.model("Game", GameSchema2)

