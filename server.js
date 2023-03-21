const dotenv = require('dotenv');

const env = dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');


mongoose.connect(process.env.DATABASE_LOCAL, { // return a promise
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false
}).then(() => {
    console.log("DB Connection successful!");
}).catch(err => console.log(err));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});