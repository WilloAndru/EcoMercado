import express from "express"
import { 
    repeatEmail, loginUser, createPassword, 
    changePassword, findEmail, getUserDatas,
    profileDatas, getAllUsers, changeRole, 
    deleteUser
} from "../controllers/userController.js";

import { getAllCategories, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

//userController
router.post("/login", loginUser)
router.post("/registerEmail", repeatEmail)
router.post("/registerPassword", createPassword)
router.patch("/changePassword", changePassword)
router.post("/forgotPassword", findEmail)
router.get("/:email", getUserDatas)
router.post("/profile", profileDatas)
router.get("/admin/users", getAllUsers)
router.post("/admin/users", changeRole)
router.delete("/admin/users/:email", deleteUser)

//productController
router.get("/", getAllCategories, getAllProducts)

export default router