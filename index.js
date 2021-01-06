import express from 'express';
const app = express();
const port = process.env.port || 3000;

//Import routes
import supply from './routes/supply.js'

//Use routes
app.use('/supplyinfo', supply);

app.get('/', (req,res) => {
    res.send('Testing');
})

app.listen(port, () => {
    console.log('server is running correctly');
})
