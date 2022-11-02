import trashCanModel from '../../../model/trashcan.model.js';
import userModel from '../../../model/user.model.js';
import jwt from 'jsonwebtoken';

const getAllUsers = async (req, res) => {
    const getAllUsers = await userModel.find({})
    res.json({ message: "done", getAllUsers })
};


const softDelete = async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findById({ _id: id });


    if (user) {
        const user = await userModel.findByIdAndUpdate({ _id: id },
            { isDeleted: true },
            { new: true });
        const trashUser = await trashCanModel.insertMany(user);
        const deletedUser = await userModel.findByIdAndDelete({ _id: id });
        res.json({ message: "user is deleted", deletedUser })

    } else {
        res.json({ message: "id not found" })
    }

}
const deleteById = async (req, res) => {

    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete({ _id: id })
    if (deleteUser) {

        res.json({ message: "deleted", deleteUser })
    } else {
        res.json({ message: "id not found" })
    }

};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await userModel.findOne({ _id: id })
        res.json({ message: "done", getUser })
    } catch (error) {
        res.json({ message: "id not found", error })

    }
};


const updateUser = async (req, res) => {
    let { userName, phone, age } = req.body;
    const { id } = req.params;

    try {
        const updateUser = await userModel.findByIdAndUpdate({ _id: id },
            { userName, phone, age }, { new: true })
        res.json({ message: "updated", updateUser })

    } catch (error) {
        res.json({ message: "id not found", error })

    }
}

const findUser = async (req, res) => {
    const { userName, email } = req.query;
    const findUser = await userModel.findOne({ $or: [{ userName }, { email }] })
    res.json({ message: "done", findUser })

}

const userAge = async (req, res) => {

    const userAge = await userModel.find({ age: { $gt: 30 } })
    res.json({ message: "found", userAge })

}

const userUnder = async (req, res) => {

    const userUnder = await userModel.find({ age: { $lt: 30 } })
    res.json({ message: "found", userUnder })

}

const lTEqual = async (req, res) => {

    const lTEqual = await userModel.find({ age: { $lte: 30 } })
    res.json({ message: "found", lTEqual })

}

const profile = async (req, res) => {
    console.log(req.id);

    // const { authorization } = req.headers;
    // const decode = jwt.verify(authorization, 'nor');
    // if (decode) {
    const user = await userModel.findById(req.id).select("email userName ");
    if (user) {
        res.json({ message: "done", user })
    } else {
        res.json({ message: "id not found" })
    }
    // } else {
    //     res.json({ message: "expired token" })
    // }

}


export {
    getAllUsers,
    deleteById,
    getUser,
    updateUser,
    findUser,
    userAge,
    userUnder,
    lTEqual,
    softDelete,
    profile
}