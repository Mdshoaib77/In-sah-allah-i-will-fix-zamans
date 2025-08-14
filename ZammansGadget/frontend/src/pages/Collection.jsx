// // import React, { useContext, useEffect, useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { ShopContext } from '../context/ShopContext';
// // import ProductItem from '../components/ProductItem';

// // const Collection = () => {
// //   const { products, search, showSearch } = useContext(ShopContext);
// //   const [filterProducts, setFilterProducts] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
// //   const [activeCategory, setActiveCategory] = useState(null);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [activeSubCategory, setActiveSubCategory] = useState(null);
// //   const [sortType, setSortType] = useState('relevant');

// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await fetch('http://localhost:4000/api/product/categories');
// //         const data = await res.json();
// //         if (data.success) {
// //           setAllCategories(data.categories);
// //         }
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   useEffect(() => {
// //     const params = new URLSearchParams(location.search);
// //     const categoryFromUrl = params.get('category');

// //     if (categoryFromUrl) {
// //       setActiveCategory(categoryFromUrl);
// //       if (categoryFromUrl === "Official Phones") {
// //         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
// //       } else {
// //         setSubCategories([]);
// //       }
// //     } else {
// //       setActiveCategory(null);
// //       setActiveSubCategory(null);
// //     }
// //   }, [location.search]);

// //   useEffect(() => {
// //     let filtered = products;

// //     if (showSearch && search) {
// //       filtered = filtered.filter(p =>
// //         p.name.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     if (activeCategory) {
// //       filtered = filtered.filter(p => p.category === activeCategory);
// //     }

// //     if (activeSubCategory && activeCategory === "Official Phones") {
// //       filtered = filtered.filter(p => p.subCategory === activeSubCategory);
// //     }

// //     setFilterProducts(filtered);
// //   }, [products, activeCategory, activeSubCategory, search, showSearch]);

// //   useEffect(() => {
// //     let sortedProducts = [...filterProducts];
// //     switch (sortType) {
// //       case 'low-high':
// //         sortedProducts.sort((a, b) => a.price - b.price);
// //         break;
// //       case 'high-low':
// //         sortedProducts.sort((a, b) => b.price - a.price);
// //         break;
// //       default:
// //         break;
// //     }
// //     setFilterProducts(sortedProducts);
// //   }, [sortType]);

// //   return (
// //     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
// //       {/* Category Selection */}
// //       <div className="flex flex-wrap justify-center gap-3 py-1 mb-6 sm:justify-start">
// //         {activeCategory === "Official Phones" ? (
// //           subCategories.map((sub, idx) => (
// //             <button
// //               key={idx}
// //               onClick={() => setActiveSubCategory(sub)}
// //               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap 
// //                 ${activeSubCategory === sub
// //                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
// //                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
// //             >
// //               {sub}
// //             </button>
// //           ))
// //         ) : (
// //           allCategories.map((cat, i) => (
// //             <button
// //               key={i}
// //               onClick={() => {
// //                 setActiveCategory(cat);
// //                 setActiveSubCategory(null);
// //                 navigate(`/collection?category=${encodeURIComponent(cat)}`);
// //               }}
// //               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap 
// //                 ${activeCategory === cat
// //                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
// //                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
// //             >
// //               {cat}
// //             </button>
// //           ))
// //         )}
// //       </div>

// //       {/* Display Products */}
// //       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
// //         {filterProducts.length > 0 ? (
// //           filterProducts.map((item) => (
// //             <ProductItem
// //               key={item._id}
// //               name={item.name}
// //               id={item._id}
// //               price={item.price}
// //               image={item.image}
// //             />
// //           ))
// //         ) : (
// //           !activeCategory ? (
// //             products.map((item) => (
// //               <ProductItem
// //                 key={item._id}
// //                 name={item.name}
// //                 id={item._id}
// //                 price={item.price}
// //                 image={item.image}
// //               />
// //             ))
// //           ) : (
// //             <p className="text-center text-gray-500 col-span-full">
// //               No products found.
// //             </p>
// //           )
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Collection;

// // import React, { useContext, useEffect, useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { ShopContext } from '../context/ShopContext';
// // import ProductItem from '../components/ProductItem';

// // const Collection = () => {
// //   const { products, search, showSearch } = useContext(ShopContext);
// //   const [filterProducts, setFilterProducts] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
// //   const [activeCategory, setActiveCategory] = useState(null);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [activeSubCategory, setActiveSubCategory] = useState(null);
// //   const [sortType, setSortType] = useState('relevant');

// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // Fetch categories on mount
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await fetch('http://localhost:4000/api/product/categories');
// //         const data = await res.json();
// //         if (data.success) {
// //           setAllCategories(data.categories);
// //         }
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Handle URL query param changes for category and subcategory
// //   useEffect(() => {
// //     const params = new URLSearchParams(location.search);
// //     const categoryFromUrl = params.get('category');

// //     if (categoryFromUrl) {
// //       setActiveCategory(categoryFromUrl);
// //       if (categoryFromUrl === "Official Phones") {
// //         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
// //       } else {
// //         setSubCategories([]);
// //         setActiveSubCategory(null);
// //       }
// //     } else {
// //       setActiveCategory(null);
// //       setActiveSubCategory(null);
// //     }
// //   }, [location.search]);

// //   // Filter products by search, category, subcategory
// //   useEffect(() => {
// //     let filtered = products;

// //     if (showSearch && search) {
// //       filtered = filtered.filter(p =>
// //         p.name.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     if (activeCategory) {
// //       filtered = filtered.filter(p => p.category === activeCategory);
// //     }

// //     if (activeSubCategory && activeCategory === "Official Phones") {
// //       filtered = filtered.filter(p => p.subCategory === activeSubCategory);
// //     }

// //     setFilterProducts(filtered);
// //   }, [products, activeCategory, activeSubCategory, search, showSearch]);

// //   // Sort filtered products if needed
// //   useEffect(() => {
// //     let sortedProducts = [...filterProducts];
// //     switch (sortType) {
// //       case 'low-high':
// //         sortedProducts.sort((a, b) => a.price - b.price);
// //         break;
// //       case 'high-low':
// //         sortedProducts.sort((a, b) => b.price - a.price);
// //         break;
// //       default:
// //         break;
// //     }
// //     setFilterProducts(sortedProducts);
// //   }, [sortType]);

// //   return (
// //     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
// //       {/* Category Selection Buttons */}
// //       <div className="flex flex-wrap justify-center gap-3 py-1 mb-6 sm:justify-start">
// //         {activeCategory === "Official Phones" ? (
// //           subCategories.map((sub, idx) => (
// //             <button
// //               key={idx}
// //               onClick={() => setActiveSubCategory(sub)}
// //               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
// //                 ${activeSubCategory === sub
// //                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
// //                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
// //             >
// //               {sub}
// //             </button>
// //           ))
// //         ) : (
// //           allCategories.map((cat, i) => (
// //             <button
// //               key={i}
// //               onClick={() => {
// //                 setActiveCategory(cat);
// //                 setActiveSubCategory(null);
// //                 navigate(`/collection?category=${encodeURIComponent(cat)}`);
// //               }}
// //               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
// //                 ${activeCategory === cat
// //                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
// //                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
// //             >
// //               {cat}
// //             </button>
// //           ))
// //         )}
// //       </div>

// //       {/* Products Grid */}
// //       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
// //         {filterProducts.length > 0 ? (
// //           filterProducts.map(item => (
// //             <ProductItem
// //               key={item._id}
// //               name={item.name}
// //               id={item._id}
// //               price={item.price}
// //               image={item.image}
// //             />
// //           ))
// //         ) : !activeCategory ? (
// //           products.map(item => (
// //             <ProductItem
// //               key={item._id}
// //               name={item.name}
// //               id={item._id}
// //               price={item.price}
// //               image={item.image}
// //             />
// //           ))
// //         ) : (
// //           <p className="text-center text-gray-500 col-span-full">No products found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Collection;


// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products, search } = useContext(ShopContext);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [activeSubCategory, setActiveSubCategory] = useState(null);
//   const [sortType, setSortType] = useState('relevant');

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('http://localhost:4000/api/product/categories');
//         const data = await res.json();
//         if (data.success) {
//           setAllCategories(data.categories);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle URL query param changes for category and subcategory
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryFromUrl = params.get('category');

//     if (categoryFromUrl) {
//       setActiveCategory(categoryFromUrl);
//       if (categoryFromUrl === "Official Phones") {
//         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
//       } else {
//         setSubCategories([]);
//         setActiveSubCategory(null);
//       }
//     } else {
//       setActiveCategory(null);
//       setActiveSubCategory(null);
//     }
//   }, [location.search]);

//   // Filter products by search, category, subcategory
//   useEffect(() => {
//     let filtered = products;

//     if (search && search.trim() !== '') {
//       filtered = filtered.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (activeCategory) {
//       filtered = filtered.filter(p => p.category === activeCategory);
//     }

//     if (activeSubCategory && activeCategory === "Official Phones") {
//       filtered = filtered.filter(p => p.subCategory === activeSubCategory);
//     }

//     setFilterProducts(filtered);
//   }, [products, activeCategory, activeSubCategory, search]);

//   // Sort filtered products if needed
//   useEffect(() => {
//     let sortedProducts = [...filterProducts];
//     switch (sortType) {
//       case 'low-high':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case 'high-low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }
//     setFilterProducts(sortedProducts);
//   }, [sortType]);

//   return (
//     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
//       {/* Category Selection Buttons */}
//       <div className="flex flex-wrap justify-center gap-3 py-1 mb-6 sm:justify-start">
//         {activeCategory === "Official Phones" ? (
//           subCategories.map((sub, idx) => (
//             <button
//               key={idx}
//               onClick={() => setActiveSubCategory(sub)}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeSubCategory === sub
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {sub}
//             </button>
//           ))
//         ) : (
//           allCategories.map((cat, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setActiveSubCategory(null);
//                 navigate(`/collection?category=${encodeURIComponent(cat)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeCategory === cat
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {cat}
//             </button>
//           ))
//         )}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
//         {filterProducts.length > 0 ? (
//           filterProducts.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : !activeCategory ? (
//           products.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;


// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products, search } = useContext(ShopContext);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [activeSubCategory, setActiveSubCategory] = useState(null);
//   const [sortType, setSortType] = useState('relevant');

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('http://localhost:4000/api/product/categories');
//         const data = await res.json();
//         if (data.success) {
//           setAllCategories(data.categories);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle URL query param changes for category and subcategory
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryFromUrl = params.get('category');
//     const subCategoryFromUrl = params.get('subCategory');

//     if (categoryFromUrl) {
//       setActiveCategory(categoryFromUrl);
//       if (categoryFromUrl === "Official Phones") {
//         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
//         setActiveSubCategory(subCategoryFromUrl || null);
//       } else {
//         setSubCategories([]);
//         setActiveSubCategory(null);
//       }
//     } else {
//       setActiveCategory(null);
//       setActiveSubCategory(null);
//       setSubCategories([]);
//     }
//   }, [location.search]);

//   // Filter products by search, category, subcategory
//   useEffect(() => {
//     let filtered = products;

//     if (search && search.trim() !== '') {
//       filtered = filtered.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (activeCategory) {
//       filtered = filtered.filter(p => p.category === activeCategory);
//     }

//     if (activeSubCategory && activeCategory === "Official Phones") {
//       filtered = filtered.filter(p => p.subCategory === activeSubCategory);
//     }

//     setFilterProducts(filtered);
//   }, [products, activeCategory, activeSubCategory, search]);

//   // Reset sort type on filters change
//   useEffect(() => {
//     setSortType('relevant');
//   }, [activeCategory, activeSubCategory, search]);

//   // Sort filtered products if needed
//   useEffect(() => {
//     let sortedProducts = [...filterProducts];
//     switch (sortType) {
//       case 'low-high':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case 'high-low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }
//     setFilterProducts(sortedProducts);
//   }, [sortType]);

//   return (
//     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
//       {/* Category Selection Buttons */}
//       <div className="flex flex-wrap justify-center gap-3 py-1 mb-6 sm:justify-start">
//         {activeCategory === "Official Phones" ? (
//           subCategories.map((sub, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setActiveSubCategory(sub);
//                 navigate(`/collection?category=${encodeURIComponent(activeCategory)}&subCategory=${encodeURIComponent(sub)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeSubCategory === sub
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {sub}
//             </button>
//           ))
//         ) : (
//           allCategories.map((cat, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setActiveSubCategory(null);
//                 navigate(`/collection?category=${encodeURIComponent(cat)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeCategory === cat
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {cat}
//             </button>
//           ))
//         )}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
//         {filterProducts.length > 0 ? (
//           filterProducts.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : !activeCategory ? (
//           products.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;


// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products, search } = useContext(ShopContext);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [activeSubCategory, setActiveSubCategory] = useState(null);
//   const [sortType, setSortType] = useState('relevant');

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('http://localhost:4000/api/product/categories');
//         const data = await res.json();
//         if (data.success) {
//           setAllCategories(data.categories);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle URL query param changes for category and subcategory
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryFromUrl = params.get('category');
//     const subCategoryFromUrl = params.get('subCategory');

//     if (categoryFromUrl) {
//       setActiveCategory(categoryFromUrl);
//       if (categoryFromUrl === "Official Phones") {
//         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
//         setActiveSubCategory(subCategoryFromUrl || null);
//       } else {
//         setSubCategories([]);
//         setActiveSubCategory(null);
//       }
//     } else {
//       setActiveCategory(null);
//       setActiveSubCategory(null);
//       setSubCategories([]);
//     }
//   }, [location.search]);

//   // Filter products by search, category, subcategory
//   useEffect(() => {
//     let filtered = products;

//     if (search && search.trim() !== '') {
//       filtered = filtered.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (activeCategory) {
//       filtered = filtered.filter(p => p.category === activeCategory);
//     }

//     if (activeSubCategory && activeCategory === "Official Phones") {
//       filtered = filtered.filter(p => p.subCategory === activeSubCategory);
//     }

//     setFilterProducts(filtered);
//   }, [products, activeCategory, activeSubCategory, search]);

//   // Reset sort type on filters change
//   useEffect(() => {
//     setSortType('relevant');
//   }, [activeCategory, activeSubCategory, search]);

//   // Sort filtered products if needed
//   useEffect(() => {
//     let sortedProducts = [...filterProducts];
//     switch (sortType) {
//       case 'low-high':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case 'high-low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }
//     setFilterProducts(sortedProducts);
//   }, [sortType]);

//   return (
//     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
//       {/* Category Selection Buttons */}
//       <div className="flex flex-wrap justify-center gap-3 py-1 mb-6 sm:justify-start">
//         {activeCategory === "Official Phones" ? (
//           subCategories.map((sub, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setActiveSubCategory(sub);
//                 navigate(`/collection?category=${encodeURIComponent(activeCategory)}&subCategory=${encodeURIComponent(sub)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeSubCategory === sub
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {sub}
//             </button>
//           ))
//         ) : (
//           allCategories.map((cat, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setActiveSubCategory(null);
//                 navigate(`/collection?category=${encodeURIComponent(cat)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeCategory === cat
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {cat}
//             </button>
//           ))
//         )}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
//         {filterProducts.length > 0 ? (
//           filterProducts.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (search.trim() !== '' || activeCategory !== null) ? (
//           <p className="text-center text-gray-500 col-span-full">No products found.</p>
//         ) : (
//           products.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;


// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products, search } = useContext(ShopContext);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [activeSubCategory, setActiveSubCategory] = useState(null);
//   const [sortType, setSortType] = useState('relevant');

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('http://localhost:4000/api/product/categories');
//         const data = await res.json();
//         if (data.success) {
//           setAllCategories(data.categories);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle URL query param changes for category and subcategory
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryFromUrl = params.get('category');
//     const subCategoryFromUrl = params.get('subCategory');

//     if (categoryFromUrl) {
//       setActiveCategory(categoryFromUrl);
//       if (categoryFromUrl === "Official Phones") {
//         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
//         setActiveSubCategory(subCategoryFromUrl || null);
//       } else {
//         setSubCategories([]);
//         setActiveSubCategory(null);
//       }
//     } else {
//       setActiveCategory(null);
//       setActiveSubCategory(null);
//       setSubCategories([]);
//     }
//   }, [location.search]);

//   // Filter products by search OR by category/subcategory
//   useEffect(() => {
//     let filtered = products;

//     if (search && search.trim() !== '') {
//       // **If search exists, ignore category filters**
//       filtered = products.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     } else {
//       // If no search, apply category and subcategory filters
//       if (activeCategory) {
//         filtered = filtered.filter(p => p.category === activeCategory);
//       }
//       if (activeSubCategory && activeCategory === "Official Phones") {
//         filtered = filtered.filter(p => p.subCategory === activeSubCategory);
//       }
//     }

//     setFilterProducts(filtered);
//   }, [products, activeCategory, activeSubCategory, search]);

//   // Reset sort type on filters change
//   useEffect(() => {
//     setSortType('relevant');
//   }, [activeCategory, activeSubCategory, search]);

//   // Sort filtered products if needed
//   useEffect(() => {
//     let sortedProducts = [...filterProducts];
//     switch (sortType) {
//       case 'low-high':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case 'high-low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }
//     setFilterProducts(sortedProducts);
//   }, [sortType]);

//   return (
//     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
//       {/* Category Selection Buttons */}
//       <div className="flex flex-wrap justify-center gap-3 py-1 mb-6 sm:justify-start">
//         {activeCategory === "Official Phones" ? (
//           subCategories.map((sub, idx) => (
//             <button
//               key={idx}
//               onClick={() => {
//                 setActiveSubCategory(sub);
//                 navigate(`/collection?category=${encodeURIComponent(activeCategory)}&subCategory=${encodeURIComponent(sub)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeSubCategory === sub
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {sub}
//             </button>
//           ))
//         ) : (
//           allCategories.map((cat, i) => (
//             <button
//               key={i}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setActiveSubCategory(null);
//                 navigate(`/collection?category=${encodeURIComponent(cat)}`);
//               }}
//               className={`px-4 py-2 rounded-md border font-medium whitespace-nowrap
//                 ${activeCategory === cat
//                   ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
//             >
//               {cat}
//             </button>
//           ))
//         )}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
//         {filterProducts.length > 0 ? (
//           filterProducts.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : !activeCategory && (!search || search.trim() === '') ? (
//           products.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;

// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {
//   const { products, search } = useContext(ShopContext);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [subCategories, setSubCategories] = useState([]);
//   const [activeSubCategory, setActiveSubCategory] = useState(null);
//   const [sortType, setSortType] = useState('relevant');

//   const location = useLocation();
//   const navigate = useNavigate();

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('http://localhost:4000/api/product/categories');
//         const data = await res.json();
//         if (data.success) {
//           setAllCategories(data.categories);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle category from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const categoryFromUrl = params.get('category');
//     const subCategoryFromUrl = params.get('subCategory');

//     if (categoryFromUrl) {
//       setActiveCategory(categoryFromUrl);
//       if (categoryFromUrl === "Official Phones") {
//         setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
//         setActiveSubCategory(subCategoryFromUrl || null);
//       } else {
//         setSubCategories([]);
//         setActiveSubCategory(null);
//       }
//     } else {
//       setActiveCategory(null);
//       setActiveSubCategory(null);
//       setSubCategories([]);
//     }
//   }, [location.search]);

//   // Filter products
//   useEffect(() => {
//     let filtered = products;

//     if (search && search.trim() !== '') {
//       filtered = products.filter(p =>
//         p.name.toLowerCase().includes(search.toLowerCase())
//       );
//     } else {
//       if (activeCategory) {
//         filtered = filtered.filter(p => p.category === activeCategory);
//       }
//       if (activeSubCategory && activeCategory === "Official Phones") {
//         filtered = filtered.filter(p => p.subCategory === activeSubCategory);
//       }
//     }

//     setFilterProducts(filtered);
//   }, [products, activeCategory, activeSubCategory, search]);

//   // Reset sort type
//   useEffect(() => {
//     setSortType('relevant');
//   }, [activeCategory, activeSubCategory, search]);

//   // Sort products
//   useEffect(() => {
//     let sortedProducts = [...filterProducts];
//     switch (sortType) {
//       case 'low-high':
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case 'high-low':
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       default:
//         break;
//     }
//     setFilterProducts(sortedProducts);
//   }, [sortType]);

//   return (
//     <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto">
//       {/* Gorgeous Styled Category/Subcategory Buttons */}
//       <div className="mb-8">
//         <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
//           {(activeCategory === "Official Phones" ? subCategories : allCategories).map((cat, idx) => {
//             const isActive = activeCategory === "Official Phones"
//               ? activeSubCategory === cat
//               : activeCategory === cat;
//             const query = activeCategory === "Official Phones"
//               ? `/collection?category=${encodeURIComponent(activeCategory)}&subCategory=${encodeURIComponent(cat)}`
//               : `/collection?category=${encodeURIComponent(cat)}`;

//             return (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   if (activeCategory === "Official Phones") {
//                     setActiveSubCategory(cat);
//                   } else {
//                     setActiveCategory(cat);
//                     setActiveSubCategory(null);
//                   }
//                   navigate(query);
//                 }}
//                 className={`px-5 py-2 rounded-full transition-all duration-300 font-semibold text-sm shadow-sm border
//                   ${isActive
//                     ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg'
//                     : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-400'}`}
//               >
//                 {cat}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
//         {filterProducts.length > 0 ? (
//           filterProducts.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : !activeCategory && (!search || search.trim() === '') ? (
//           products.map(item => (
//             <ProductItem
//               key={item._id}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [sortType, setSortType] = useState('relevant');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/product/categories');
        const data = await res.json();
        if (data.success) {
          setAllCategories(data.categories);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    const subCategoryFromUrl = params.get('subCategory');

    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      if (categoryFromUrl === "Official Phones") {
        setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
        setActiveSubCategory(subCategoryFromUrl || null);
      } else {
        setSubCategories([]);
        setActiveSubCategory(null);
      }
    } else {
      setActiveCategory(null);
      setActiveSubCategory(null);
      setSubCategories([]);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = products;

    if (search && search.trim() !== '') {
      filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      if (activeCategory) {
        filtered = filtered.filter(p => p.category === activeCategory);
      }
      if (activeSubCategory && activeCategory === "Official Phones") {
        filtered = filtered.filter(p => p.subCategory === activeSubCategory);
      }
    }

    setFilterProducts(filtered);
  }, [products, activeCategory, activeSubCategory, search]);

  useEffect(() => {
    setSortType('relevant');
  }, [activeCategory, activeSubCategory, search]);

  useEffect(() => {
    let sortedProducts = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilterProducts(sortedProducts);
  }, [sortType]);

  return (
    <div className="px-4 pt-10 mt-14 sm:px-6 lg:px-8 max-w-[1300px] mx-auto w-full">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-4 sm:justify-start">
        {allCategories.map((cat, idx) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => {
                if (cat === "Official Phones") {
                  setSubCategories(["Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"]);
                } else {
                  setSubCategories([]);
                }
                setActiveCategory(cat);
                setActiveSubCategory(null);
                navigate(`/collection?category=${encodeURIComponent(cat)}`);
              }}
              className={`px-5 py-2 rounded-full transition-all duration-300 font-semibold text-sm shadow-sm border
                ${isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600 hover:border-indigo-400'}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Subcategories */}
      {activeCategory === "Official Phones" && (
        <div className="flex flex-wrap justify-center gap-3 mb-8 sm:justify-start">
          {subCategories.map((sub, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveSubCategory(sub);
                navigate(`/collection?category=Official Phones&subCategory=${encodeURIComponent(sub)}`);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border
                ${activeSubCategory === sub
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {filterProducts.length > 0 ? (
          filterProducts.map(item => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))
        ) : !activeCategory && (!search || search.trim() === '') ? (
          products.map(item => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
