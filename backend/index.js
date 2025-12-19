const express = require('express');
const UserRouter = require('./routers/UserRouter');
const ProductRouter = require('./routers/equipmentRouter');
const cors = require('cors');
const app = express();

const port = 5000;

// middleware
app.use(cors({
    origin: ['http://localhost:3000']
}))


app.use(express.json());
app.use('/user', UserRouter);
app.use('/equipment', ProductRouter);

// endpoint or route
app.get('/', (req, res) => {
    res.send('response from express');
})

app.get('/add', (req, res) => {
    res.send('response from add route');
})

// getbyid
// getall
// delete

app.listen(port, () => {
    console.log('express server started');
});