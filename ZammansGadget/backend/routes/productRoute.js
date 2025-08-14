// import express from 'express'
// import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js'
// import upload from '../middleware/multer.js';
// import adminAuth from '../middleware/adminAuth.js';

// const productRouter = express.Router();

// productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
// productRouter.post('/remove',adminAuth,removeProduct);
// productRouter.post('/single',singleProduct);
// productRouter.get('/list',listProducts)

// export default productRouter



// import express from 'express';
// import { 
//   listProducts, 
//   addProduct, 
//   removeProduct, 
//   singleProduct,
//   getCategories,
//   getProductsByCategory,
//   getFeaturedProducts
// } from '../controllers/productController.js';
// import upload from '../middleware/multer.js';
// import adminAuth from '../middleware/adminAuth.js';

// const productRouter = express.Router();

// productRouter.post(
//   '/add',
//   adminAuth,
//   upload.fields([
//     { name: 'image1', maxCount: 1 }, 
//     { name: 'image2', maxCount: 1 }, 
//     { name: 'image3', maxCount: 1 }, 
//     { name: 'image4', maxCount: 1 }
//   ]),
//   addProduct
// );

// productRouter.post('/remove', adminAuth, removeProduct);
// productRouter.post('/single', singleProduct);
// productRouter.get('/list', listProducts);

// // New routes for categories and featured products
// productRouter.get('/categories', getCategories);
// productRouter.get('/category-products', getProductsByCategory); // expects ?category=CategoryName
// productRouter.get('/featured', getFeaturedProducts);

// export default productRouter;


// import express from 'express';
// import { 
//   listProducts, 
//   addProduct, 
//   removeProduct, 
//   singleProduct,
//   getCategories,
//   getProductsByCategory,
//   getFeaturedProducts
// } from '../controllers/productController.js';
// import upload from '../middleware/multer.js';
// import adminAuth from '../middleware/adminAuth.js';

// const productRouter = express.Router();

// // Route to add a new product
// productRouter.post(
//   '/add',
//   adminAuth, // Admin authentication middleware
//   upload.fields([
//     { name: 'image1', maxCount: 1 }, // Image 1
//     { name: 'image2', maxCount: 1 }, // Image 2
//     { name: 'image3', maxCount: 1 }, // Image 3
//     { name: 'image4', maxCount: 1 }  // Image 4
//   ]),
//   addProduct // Controller for adding the product
// );

// // Route to remove a product
// productRouter.post('/remove', adminAuth, removeProduct);

// // Route to fetch a single product by its ID
// productRouter.post('/single', singleProduct);

// // Route to list all products
// productRouter.get('/list', listProducts);

// // New route to fetch the fixed product categories
// productRouter.get('/categories', getCategories);

// // Route to get products filtered by category, expects query parameters ?category=<CategoryName>&subCategory=<SubCategoryName>
// productRouter.get('/category-products', getProductsByCategory);

// // Route to get the featured (bestseller) products
// productRouter.get('/featured', getFeaturedProducts);

// export default productRouter;



import express from 'express';
import { 
  listProducts, 
  addProduct, 
  removeProduct, 
  singleProduct,
  getCategories,
  getProductsByCategory,
  getFeaturedProducts
} from '../controllers/productController.js';

import { productUpload } from '../middleware/multer.js'; // ✅ use this
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route to add a new product
productRouter.post(
  '/add',
  adminAuth,
  productUpload, // ✅ simplified, already handles image1, image2, image3, image4
  addProduct
);

// Route to remove a product
productRouter.post('/remove', adminAuth, removeProduct);

// Route to fetch a single product by its ID
productRouter.post('/single', singleProduct);

// Route to list all products
productRouter.get('/list', listProducts);

// Route to fetch fixed product categories
productRouter.get('/categories', getCategories);

// Route to get products by category/subcategory
productRouter.get('/category-products', getProductsByCategory);

// Route to get bestseller/featured products
productRouter.get('/featured', getFeaturedProducts);

export default productRouter;





// import express from 'express';
// import {
//   addProduct,
//   listProducts,
//   removeProduct,
//   singleProduct,
//   getCategories,
//   getProductsByCategory,
//   getFeaturedProducts
// } from '../controllers/productController.js';

// const productRouter = express.Router();

// // Add product (admin only)
// productRouter.post('/add', addProduct);

// // Remove product (admin only)
// productRouter.post('/remove', removeProduct);

// // Get single product details
// productRouter.post('/single', singleProduct);

// // List all products
// productRouter.get('/list', listProducts);

// // Get distinct categories for filters
// productRouter.get('/categories', getCategories);

// // Get products filtered by category
// productRouter.get('/products', getProductsByCategory);

// // Get featured products (bestseller)
// productRouter.get('/featured', getFeaturedProducts);

// export default productRouter;
