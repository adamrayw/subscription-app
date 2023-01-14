import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        "message": "Hello World!"
    })
})

app.listen(8080, () => {
    console.log('Server listening...')
})