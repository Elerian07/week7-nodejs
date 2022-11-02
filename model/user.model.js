import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    phone: Number,
    isDeleted: {
        type: Boolean,
        default: false
    }
})



const userModel = mongoose.model('user', userSchema);
export default userModel;