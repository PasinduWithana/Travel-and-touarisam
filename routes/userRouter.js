import express from "express";
import { deleteUser, getUsers, loginUser,registerUser, updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",registerUser)

userRouter.post("/login",loginUser)
userRouter.get("/user",getUsers)
userRouter.put("/user/:email",updateUser)
userRouter.delete("/user/:email",deleteUser)

export default userRouter;