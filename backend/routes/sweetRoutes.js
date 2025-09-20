import express from "express";
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", adminMiddleware, addSweet);
router.get("/", getSweets);
router.get("/search", searchSweets);
router.put("/:id", adminMiddleware, updateSweet);
router.delete("/:id", adminMiddleware, deleteSweet);

router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", adminMiddleware, restockSweet);

export default router;
