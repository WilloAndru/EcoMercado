import express from "express"
import multer from 'multer'
import { repeatEmail, loginUser, register, registerGoogle, changePassword, findEmail, getUserDatas, profileDatas, getAllUsers, changeRole, deleteUser, getUsersCount} from "../controllers/userController.js";
import { getAllCategories } from "../controllers/categoryController.js";
import { getAllProducts, getProduct, getProductsById, publishProduct, updateProduct, deleteProduct, getProductsIdNames, getProductsCount, getLatest, getForDay } from "../controllers/productController.js";
import { getSellerByProdctId, createIncome, createSale, getPurchasesProducts, getSalesProducts, getSoldProducts, getAllTransactions, getBestSellers, getProfits } from "../controllers/transactionController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//userController
router.post("/login", loginUser)
router.post("/registerEmail", repeatEmail)
router.post("/register", register)
router.post("/registerGoogle", registerGoogle)
router.patch("/changePassword", changePassword)
router.post("/forgotPassword", findEmail)
router.get("/getUserDatas", getUserDatas)
router.post("/profile", profileDatas)
router.get("/users", getAllUsers)
router.post("/users", changeRole)
router.delete("/users/:email", deleteUser)
router.get("/usersCount", getUsersCount)

//productController
router.get("/categories", getAllCategories)
router.get("/products", getAllProducts)
router.get("/productsIdNames", getProductsIdNames)
router.get("/product/:id", getProduct)
router.post("/shoppingCart", getProductsById)
router.post("/publishProduct", upload.single('image'), publishProduct)
router.patch("/updateProduct/:id", upload.single('image'), updateProduct)
router.delete("/deleteProduct/:id", deleteProduct)
router.get("/productsCount", getProductsCount)
router.get("/latest", getLatest)
router.post("/forDay", getForDay)

//transactionController
router.get("/productSeller/:id", getSellerByProdctId)
router.post("/createIncome", createIncome)
router.post("/createSale", createSale)
router.get("/purchasesProducts", getPurchasesProducts)
router.get("/salesProducts", getSalesProducts)
router.get("/soldProducts", getSoldProducts)
router.get("/transactions", getAllTransactions)
router.get("/bestSellers", getBestSellers)
router.get("/profits", getProfits)

export default router