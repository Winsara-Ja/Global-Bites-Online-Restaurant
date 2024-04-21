import express from "express";
import { getAllUsers, updateUser, deleteUser, deleteOneUser, updateoneUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.delete('/deleteone/:id', deleteOneUser);
router.put('/updateone/:id', updateoneUser);
export default router;