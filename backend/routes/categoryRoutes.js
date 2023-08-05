const express = require('express');
const createCategory = require('../controllers/category/createController');
const deleteCategory = require('../controllers/category/deleteController');

const checkAuth = require('../middleware/checkAuthMiddleware');
const role = require('../middleware/roleMiddleware');
const deleteByAdminCategory = require('../controllers/category/deleteByAdminController');
const {
  getAllCategory,
  getAllCategoryByItsUser,
} = require('../controllers/category/getAllCategory');

const router = express.Router();

router.post('/create', checkAuth, createCategory);
router.delete('/delete/:id', checkAuth, deleteCategory);
router.delete(
  '/deleteByAdmin/:id',
  checkAuth,
  role.checkRole(role.ROLES.Admin),
  deleteByAdminCategory
);
router.get('/all', getAllCategory);
router.get('/user-all', checkAuth, getAllCategoryByItsUser);

module.exports = router;
