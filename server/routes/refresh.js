import express from "express";
import { handleRefreshToken } from "../controllers/auth.js"

const router = express.Router();

router.get('/',handleRefreshToken)

export default router; 