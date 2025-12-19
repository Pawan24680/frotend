const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error('\nERROR: MONGO_URL is not set.\nPlease create a .env file in the project root with a line like:\n\n  MONGO_URL=mongodb://localhost:27017/car-rental\n\nor use a MongoDB Atlas connection string.\n');
    process.exit(1);
}

async function connectDB() {
    try {
        // Mongoose v7 removed `useUnifiedTopology` and `useNewUrlParser` options.
        // Passing them causes an error. Connect using the connection string only.
        await mongoose.connect(mongoUrl);
        console.log('Mongo DB Connection Successful');
    } catch (error) {
        console.error('Mongo DB Connection Error:', error && error.message ? error.message : error);
        process.exit(1);
    }
}

connectDB();

module.exports = mongoose;