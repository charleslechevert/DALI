import express from "express"
import { getGamesbyUserId } from "../controllers/games.js"
import { verifyToken } from "../middleware/auth.js"
import { insertGame } from "../controllers/games.js";

const router = express.Router();

/* READ */

router.get("/:id", getGamesbyUserId)
router.post("/insert", insertGame)

export default router; 