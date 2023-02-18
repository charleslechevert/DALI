import express from "express";
import { getDraw } from "../controllers/draws.js"
import { getDraws } from "../controllers/draws.js"
import { insertDraw, insertDraws } from "../controllers/draws.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getDraw)
router.get("/", getDraws)
router.get("/insert", verifyToken, insertDraw)
router.post("/insertMany", verifyToken, insertDraws)

export default router; 