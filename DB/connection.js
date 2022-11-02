import mongoose from 'mongoose';

const connection = async () => {
    return await mongoose.connect("mongodb://localhost:27017/assignment7")
        .then(() => {
            console.log("database connected");
        }).catch(() => {
            console.log("database connection error");
        })
}

export default connection;