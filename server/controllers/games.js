import { Game } from "../models/Game.js"
import  User  from  "../models/User.js"

export const getGamesbyUserId = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user.games)

    } catch(err) {
        res.status(404).json({message: err.message })
    }
}

export const insertGame = async (req,res) => {
    try {
        const {
            user_id,
            draw_id,
            score,
            timer,
            name
        } = req.body

        User.findById(user_id, function(err, user){

            var gameModel = new Game();
            gameModel.user_id = user_id;
            gameModel.draw_id = draw_id;
            gameModel.score = score;
            gameModel.timer = timer;
            gameModel.name = name;
            user.games.push(gameModel);
            user.save();
            res.status(200).json(user)
            
         });

    } catch(err) {
        res.status(404).json({message: err.message })
        console.log(err)
    }
}


