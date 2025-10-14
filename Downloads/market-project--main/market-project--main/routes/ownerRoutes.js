const express = require('express');
const router = express.Router();
const protect = require('../middleware/verifyToken');

const {
  createOwner,
  login,
  infOwner,
  updateInfoOwner,
  updatePassword,
  deleteOwner,
} = require("../controllers/ownerControll");

// إنشاء حساب جديد (بدون توكن)
router.post('/register', createOwner);

// تسجيل الدخول (بدون توكن)
router.post('/login', login);

// جلب معلومات المالك الحالي (بالتوكن)
router.get('/infOwner/:id', protect, infOwner);

// تحديث معلومات المالك
router.put('/updateOwner', protect, updateInfoOwner);

// تحديث كلمة المرور
router.put('/updatePassword', protect, updatePassword);

// حذف الحساب
router.delete('/deleteOwner', protect, deleteOwner);

module.exports = router;
