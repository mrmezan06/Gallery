const asyncHandler = require('express-async-handler');
const Category = require('../../models/categoryModel');

const deleteByAdminCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).exec();
  if (!category) {
    return res.status(400).json({ message: 'Category does not exist' });
  }
  await Category.findByIdAndDelete(id).exec();
  return res.status(200).json({ message: 'Category deleted successfully' });
});

module.exports = deleteByAdminCategory;
