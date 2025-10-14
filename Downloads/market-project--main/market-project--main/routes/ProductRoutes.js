const express = require('express');
const router = express.Router();

// استدعاء الدوال من الكنترولر
const { 
  getProducts, 
  createProduct, 
  getProduct, 
  updateProduct, 
  deleteProduct  
} = require('../controllers/productControl');

const upload=require("../middleware/upload")

// تعريف المسارات (Routes)

// جلب كل المنتجات
router.get('/', getProducts);

// جلب منتج واحد حسب id
router.get('/:id', getProduct);

// إنشاء منتج جديد
router.post('/', upload.array("image",5), createProduct);

// تحديث منتج
router.put('/:id',upload.array("image",5), updateProduct);

// حذف منتج
router.delete('/:id', deleteProduct);

// تصدير الراوتر لاستخدامه في market.js
module.exports = router;
