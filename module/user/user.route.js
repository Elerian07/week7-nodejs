import { Router } from 'express';
import { getAllUsers, deleteById, getUser, updateUser, findUser, userAge, userUnder, lTEqual, softDelete, profile } from './controller/user.controller.js';
import auth from '../../middleware/auth.js';
const router = Router();

router.get("/users", getAllUsers)

router.delete("/delete/:id", deleteById)

router.get("/getById/:id", getUser)

router.post("/update/:id", updateUser)

router.get("/findUser", findUser)

router.get("/older", userAge)

router.get("/younger", userUnder)

router.get("/lTEqual", lTEqual)

router.post("/softDelete/:id", softDelete)

router.get("/profile", auth(), profile)
export default router;