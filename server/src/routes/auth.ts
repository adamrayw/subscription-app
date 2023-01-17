import express from "express";

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, password } = req.body
    res.send('SIGN UP')
})

// multiple route
export default router