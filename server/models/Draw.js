import mongoose from "mongoose"

const DrawSchema4 = new mongoose.Schema(
    {
        name: {
            type: String,
            min: 2,
            max:50,
        }
    },
    {timestamps: true}
)

const Draw = mongoose.model("Draw", DrawSchema4)

export default Draw;