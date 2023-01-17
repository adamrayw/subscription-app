import express from 'express';
import authRoutes from "./routes/auth"

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        "message": "Hello World!"
    })
})

app.use('/auth', authRoutes)

app.listen(8080, () => {
    console.log('Server listening...')
})