import { Router } from "express";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { authenticateToken, authenticateRefreshToken } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get('/test', authenticateToken, (req, res) => {
    return res.json({ test: true});
})

router.post('/auth', (req, res) => {
    const {userName, password} = req.body;
    const refreshToken = jwt.sign({userName, password}, process.env.JWT_REFRESH_SECRET, {expiresIn: '1800s'})
    const token = jwt.sign({refreshToken}, process.env.JWT_SECRET, {expiresIn: '20s'});
    return res.json({token, refreshToken})
})
router.post('/refresh', authenticateRefreshToken, (req, res) => {
    const {refreshToken} = req.body;
    
    const token = jwt.sign({refreshToken}, process.env.JWT_SECRET, {expiresIn: '20s'});
    return res.json({token})
})

export default router