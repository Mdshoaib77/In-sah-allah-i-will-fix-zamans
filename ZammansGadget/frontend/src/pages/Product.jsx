// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';  // Your cart & products context
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');

//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(''); // store color as string now

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   // Debug: check colors format in console
//   useEffect(() => {
//     if (selectedVariant) {
//       console.log("Selected variant colors:", selectedVariant.colors);
//     }
//   }, [selectedVariant]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: "top-right",
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: "top-right",
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored",
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className='opacity-0'></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${image === imgUrl ? 'border-orange-500' : 'border-transparent'} flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor(''); // reset color on variant change
//                     }}
//                     className={`px-4 py-2 rounded border ${selectedVariant?.variant === item.variant ? 'bg-orange-600 text-white' : 'bg-white text-black'}`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="mt-4">
//               <label className="font-medium">Color:</label>
//               <div className="flex gap-3 mt-2">
//                 {/* Loop through the colors array of the selected variant (strings) */}
//                 {selectedVariant.colors.map((colorName, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedColor(colorName)}  // set string directly
//                     className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
//                       selectedColor === colorName ? 'border-black' : 'border-gray-300'
//                     }`}
//                     style={{ backgroundColor: colorName.startsWith('#') ? colorName : colorName }}
//                     title={colorName}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}{selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">{currency}{selectedVariant.offerPrice}</span>
//                 </>
//               ) : (
//                 <span>{currency}{selectedVariant.regularPrice}</span>
//               )
//             ) : (
//               <span>{currency}{productData.price}</span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className='opacity-0'></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${image === imgUrl ? 'border-orange-500' : 'border-transparent'} flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all
//                       ${selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'}`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color */}
//           {hasVariants && selectedVariant && (
//             <div className="mt-4">
//               <label className="font-medium">Color:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {selectedVariant.colors.map((colorName, i) => (
//                   <div key={i} className="relative group">
//                     <button
//                       onClick={() => setSelectedColor(colorName)}
//                       className={`w-10 h-10 rounded-md border shadow-sm transition-all
//                         ${selectedColor === colorName ? 'border-black ring-2 ring-black scale-105' : 'border-gray-300'}
//                       `}
//                       style={{ backgroundColor: colorName }}
//                       title={colorName}
//                     >
//                       {selectedColor === colorName && (
//                         <svg
//                           className="absolute top-[2px] right-[2px] w-4 h-4 text-white drop-shadow"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 
//                             1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                     <div className="absolute bottom-[-28px] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-150 bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
//                       {colorName}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Price */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}{selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">{currency}{selectedVariant.offerPrice}</span>
//                 </>
//               ) : (
//                 <span>{currency}{selectedVariant.regularPrice}</span>
//               )
//             ) : (
//               <span>{currency}{productData.price}</span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor(''); // reset color on variant change
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="mt-4">
//               <label className="font-medium">Color:</label>
//               <div className="relative flex flex-wrap gap-3 mt-2">
//                 {selectedVariant.colors.map((colorName, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedColor(colorName)}
//                     className={`w-10 h-10 rounded-md border transition-all duration-200 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_8px_2px_rgba(249,115,22,0.7)]'
//                           : 'border-white hover:shadow-[0_0_6px_2px_rgba(249,115,22,0.5)]'
//                       }
//                     `}
//                     style={{ backgroundColor: colorName }}
//                     title={colorName}
//                     aria-label={colorName}
//                   >
//                     {selectedColor === colorName && (
//                       <svg
//                         className="absolute top-[2px] right-[2px] w-4 h-4 text-orange-600 drop-shadow"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 
//                           1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="mt-4">
//               <label className="font-medium">Color:</label>
//               <div className="relative flex flex-wrap gap-3 mt-2">
//                 {selectedVariant.colors.map((colorName, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedColor(colorName)}
//                     className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
//                           : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
//                       }
//                     `}
//                     style={{ backgroundColor: colorName }}
//                     title={colorName}
//                     aria-label={colorName}
//                     type="button"
//                   >
//                     {selectedColor === colorName && (
//                       <svg
//                         className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 
//                           1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="mt-4">
//               <label className="font-medium">Color:</label>
//               <div className="relative flex flex-wrap items-center gap-3 mt-2">
//                 {selectedVariant.colors.map((colorName, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedColor(colorName)}
//                     className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
//                           : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
//                       }
//                     `}
//                     style={{ backgroundColor: colorName }}
//                     title={colorName} // tooltip on desktop hover
//                     aria-label={colorName}
//                     type="button"
//                   >
//                     {selectedColor === colorName && (
//                       <svg
//                         className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 
//                           1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 ))}

//                 {/* Selected color name button */}
//                 {selectedColor && (
//                   <button
//                     disabled
//                     className="px-3 py-1 ml-2 text-sm font-semibold text-white bg-orange-600 rounded-md cursor-default select-none"
//                   >
//                     {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="flex items-center mt-4">
//               <div>
//                 <label className="font-medium">Color:</label>
//                 <div className="relative flex flex-wrap gap-3 mt-2">
//                   {selectedVariant.colors.map((colorName, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedColor(colorName)}
//                       className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
//                           : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
//                       }
//                     `}
//                       style={{ backgroundColor: colorName }}
//                       title={colorName}
//                       aria-label={colorName}
//                       type="button"
//                     >
//                       {selectedColor === colorName && (
//                         <svg
//                           className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
//                             1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Show selected color name as a button with premium style */}
//               {selectedColor && (
//                 <button
//                   disabled
//                   className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:brightness-110"
//                   style={{ userSelect: 'none' }}
//                   aria-label={`Selected color: ${selectedColor}`}
//                 >
//                   {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="flex items-center mt-4">
//               <div>
//                 <label className="font-medium">Color:</label>
//                 <div className="relative flex flex-wrap gap-3 mt-2">
//                   {selectedVariant.colors.map((colorName, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedColor(colorName)}
//                       className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
//                           : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
//                       }
//                     `}
//                       style={{ backgroundColor: colorName }}
//                       title={colorName}
//                       aria-label={colorName}
//                       type="button"
//                     >
//                       {selectedColor === colorName && (
//                         <svg
//                           className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
//                             1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Show selected color name as a button with teal-cyan gradient style */}
//               {selectedColor && (
//                 <button
//                   disabled
//                   className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:brightness-110"
//                   style={{ userSelect: 'none' }}
//                   aria-label={`Selected color: ${selectedColor}`}
//                 >
//                   {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0 sm:w-full">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Images thumbnails below the main image */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 mt-4 sm:mt-0">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="flex items-center mt-4">
//               <div>
//                 <label className="font-medium">Color:</label>
//                 <div className="relative flex flex-wrap gap-3 mt-2">
//                   {selectedVariant.colors.map((colorName, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedColor(colorName)}
//                       className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
//                           : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
//                       }
//                     `}
//                       style={{ backgroundColor: colorName }}
//                       title={colorName}
//                       aria-label={colorName}
//                       type="button"
//                     >
//                       {selectedColor === colorName && (
//                         <svg
//                           className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
//                             1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Show selected color name */}
//               {selectedColor && (
//                 <button
//                   disabled
//                   className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:brightness-110"
//                   style={{ userSelect: 'none' }}
//                   aria-label={`Selected color: ${selectedColor}`}
//                 >
//                   {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0 sm:w-full">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Images thumbnails below the main image */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full mt-4 sm:mt-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="flex items-center mt-4">
//               <div>
//                 <label className="font-medium">Color:</label>
//                 <div className="relative flex flex-wrap gap-3 mt-2">
//                   {selectedVariant.colors.map((colorName, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedColor(colorName)}
//                       className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
//                       ${
//                         selectedColor === colorName
//                           ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
//                           : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
//                       }
//                     `}
//                       style={{ backgroundColor: colorName }}
//                       title={colorName}
//                       aria-label={colorName}
//                       type="button"
//                     >
//                       {selectedColor === colorName && (
//                         <svg
//                           className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
//                             1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Show selected color name */}
//               {selectedColor && (
//                 <button
//                   disabled
//                   className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:brightness-110"
//                   style={{ userSelect: 'none' }}
//                   aria-label={`Selected color: ${selectedColor}`}
//                 >
//                   {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image?.[0] || '');
      setSelectedVariant(null);
      setSelectedColor('');
    }
  }, [productId, products]);

  const notifyError = (msg) => {
    toast.error(msg, {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  const notifySuccess = (msg) => {
    toast.success(msg, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  const hasVariants = productData?.variants && productData.variants.length > 0;

  const handleAddToCart = () => {
    if (productData.soldOut) {
      notifyError('Sorry, this product is SOLD OUT');
      return;
    }

    if (hasVariants) {
      if (!selectedVariant) {
        notifyError('Select Product Variant');
        return;
      }
      if (!selectedColor) {
        notifyError('Select Product Color');
        return;
      }
    }

    const variantInfo = hasVariants
      ? {
          variant: selectedVariant.variant,
          color: selectedColor,
          price: selectedVariant.offerPrice || selectedVariant.regularPrice,
        }
      : {
          variant: 'default',
          color: '',
          price: productData.price,
        };

    addToCart(productData._id, variantInfo);
    notifySuccess('Added to cart!');
  };

  const handleBuyNow = () => {
    if (productData.soldOut) {
      notifyError('Sorry, this product is SOLD OUT');
      return;
    }

    if (hasVariants) {
      if (!selectedVariant) {
        notifyError('Select Product Variant');
        return;
      }
      if (!selectedColor) {
        notifyError('Select Product Color');
        return;
      }
    }

    const variantInfo = hasVariants
      ? {
          variant: selectedVariant.variant,
          color: selectedColor,
          price: selectedVariant.offerPrice || selectedVariant.regularPrice,
        }
      : {
          variant: 'default',
          color: '',
          price: productData.price,
        };

    addToCart(productData._id, variantInfo);
    navigate('/place-order');
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
      <ToastContainer />

      <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
        {/* Main Image */}
        <div className="relative flex-1 min-w-0 sm:w-full">
          <img
            src={image}
            alt="Main product"
            className="w-full h-auto rounded-md object-contain max-h-[500px]"
          />
          {productData.soldOut && (
            <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
              SOLD OUT
            </div>
          )}
        </div>

        {/* Images thumbnails below the main image */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full mt-4 sm:mt-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {productData.image.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setImage(imgUrl)}
              className={`cursor-pointer rounded-md border ${
                image === imgUrl ? 'border-orange-500' : 'border-transparent'
              } flex-shrink-0 w-20 sm:w-full object-cover`}
              style={{ aspectRatio: '1 / 1' }}
            />
          ))}
        </div>

        {/* Product Info & Variant selectors */}
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-2xl font-semibold">{productData.name}</h1>

          {/* Variant Selection */}
          {hasVariants && (
            <div className="mt-6">
              <label className="font-medium">Variant:</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {productData.variants.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVariant(item);
                      setSelectedColor('');
                    }}
                    className={`px-4 py-2 rounded border transition-all ${
                      selectedVariant?.variant === item.variant
                        ? 'bg-orange-600 text-white'
                        : 'bg-white text-black hover:border-gray-400'
                    }`}
                  >
                    {item.variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {hasVariants && selectedVariant && (
            <div className="flex items-center mt-4">
              <div>
                <label className="font-medium">Color:</label>
                <div className="relative flex flex-wrap gap-3 mt-2">
                  {selectedVariant.colors.map((colorName, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(colorName)}
                      className={`w-10 h-10 rounded-lg border transition-transform transition-shadow duration-300 ease-in-out bg-white cursor-pointer relative
                      ${
                        selectedColor === colorName
                          ? 'border-orange-500 shadow-[0_0_12px_4px_rgba(249,115,22,0.8)] scale-110'
                          : 'border-white shadow-sm hover:shadow-[0_0_8px_3px_rgba(249,115,22,0.5)] hover:scale-105'
                      }
                    `}
                      style={{ backgroundColor: colorName }}
                      title={colorName}
                      aria-label={colorName}
                      type="button"
                    >
                      {selectedColor === colorName && (
                        <svg
                          className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
                            1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show selected color name with the selected color as background */}
              {selectedColor && (
                <button
                  disabled
                  className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl"
                  style={{ backgroundColor: selectedColor }}
                  aria-label={`Selected color: ${selectedColor}`}
                >
                  {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </button>
              )}
            </div>
          )}

          {/* Price Display */}
          <p className="mt-5 text-3xl font-bold">
            {hasVariants && selectedVariant ? (
              selectedVariant.offerPrice ? (
                <>
                  <span className="mr-2 text-gray-400 line-through">
                    {currency}
                    {selectedVariant.regularPrice}
                  </span>
                  <span className="text-red-600">
                    {currency}
                    {selectedVariant.offerPrice}
                  </span>
                </>
              ) : (
                <span>
                  {currency}
                  {selectedVariant.regularPrice}
                </span>
              )
            ) : (
              <span>
                {currency}
                {productData.price}
              </span>
            )}
          </p>

          <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

          <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={productData.soldOut}
              className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <button
              onClick={handleBuyNow}
              disabled={productData.soldOut}
              className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BUY NOW
            </button>
          </div>

          <hr className="w-full mt-10 mb-6 border-gray-300" />
          <div className="max-w-md space-y-1 text-sm text-gray-600">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-[900px] mx-auto">
        <div className="flex border-b border-gray-300">
          <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
        </div>
        <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
          <p>
            An e-commerce website is an online platform that facilitates the buying and selling of
            products or services over the internet. It serves as a virtual marketplace where
            businesses and individuals can showcase their products, interact with customers, and
            conduct transactions without the need for a physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed
            descriptions, images, prices, and any available variations (e.g., variants, colors).
          </p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;



// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="flex items-center mt-4">
//               <div>
//                 <label className="font-medium">Color:</label>
//                 <div className="relative flex flex-wrap gap-3 mt-2">
//                   {selectedVariant.colors.map((colorName, i) => (
//                     <div key={i} className="relative group">
//                       <button
//                         onClick={() => setSelectedColor(colorName)}
//                         className={`w-10 h-10 rounded-md border-2 transition-all duration-300 cursor-pointer
//                         ${selectedColor === colorName
//                           ? 'border-orange-500 ring ring-orange-300 scale-110'
//                           : 'border-gray-300 hover:scale-105 hover:ring hover:ring-orange-200'}
//                         `}
//                         style={{ backgroundColor: colorName }}
//                         title={colorName}
//                         type="button"
//                       >
//                         {selectedColor === colorName && (
//                           <svg
//                             className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
//                               1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         )}
//                       </button>
//                       {/* Tooltip */}
//                       <div className="absolute z-10 hidden px-2 py-1 mt-1 text-sm text-white transition-opacity duration-300 bg-black rounded-md opacity-0 group-hover:opacity-100 group-hover:block top-full whitespace-nowrap">
//                         {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Show selected color name */}
//               {selectedColor && (
//                 <button
//                   disabled
//                   className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:brightness-110"
//                   style={{ userSelect: 'none' }}
//                 >
//                   {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import RelatedProducts from '../components/RelatedProducts';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');

//   useEffect(() => {
//     const found = products.find((item) => item._id === productId);
//     if (found) {
//       setProductData(found);
//       setImage(found.image?.[0] || '');
//       setSelectedVariant(null);
//       setSelectedColor('');
//     }
//   }, [productId, products]);

//   const notifyError = (msg) => {
//     toast.error(msg, {
//       position: 'top-right',
//       autoClose: 2500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const notifySuccess = (msg) => {
//     toast.success(msg, {
//       position: 'top-right',
//       autoClose: 1500,
//       hideProgressBar: false,
//       pauseOnHover: true,
//       draggable: true,
//       theme: 'colored',
//     });
//   };

//   const hasVariants = productData?.variants && productData.variants.length > 0;

//   const handleAddToCart = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     notifySuccess('Added to cart!');
//   };

//   const handleBuyNow = () => {
//     if (productData.soldOut) {
//       notifyError('Sorry, this product is SOLD OUT');
//       return;
//     }

//     if (hasVariants) {
//       if (!selectedVariant) {
//         notifyError('Select Product Variant');
//         return;
//       }
//       if (!selectedColor) {
//         notifyError('Select Product Color');
//         return;
//       }
//     }

//     const variantInfo = hasVariants
//       ? {
//           variant: selectedVariant.variant,
//           color: selectedColor,
//           price: selectedVariant.offerPrice || selectedVariant.regularPrice,
//         }
//       : {
//           variant: 'default',
//           color: '',
//           price: productData.price,
//         };

//     addToCart(productData._id, variantInfo);
//     navigate('/place-order');
//   };

//   if (!productData) return <div className="opacity-0"></div>;

//   return (
//     <div className="pt-10 mt-16 border-t-2 px-4 sm:px-8 md:px-16 max-w-[1200px] mx-auto">
//       <ToastContainer />

//       <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
//         {/* Images thumbnails */}
//         <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//           {productData.image.map((imgUrl, idx) => (
//             <img
//               key={idx}
//               src={imgUrl}
//               alt={`Thumbnail ${idx + 1}`}
//               onClick={() => setImage(imgUrl)}
//               className={`cursor-pointer rounded-md border ${
//                 image === imgUrl ? 'border-orange-500' : 'border-transparent'
//               } flex-shrink-0 w-20 sm:w-full object-cover`}
//               style={{ aspectRatio: '1 / 1' }}
//             />
//           ))}
//         </div>

//         {/* Main Image */}
//         <div className="relative flex-1 min-w-0">
//           <img
//             src={image}
//             alt="Main product"
//             className="w-full h-auto rounded-md object-contain max-h-[500px]"
//           />
//           {productData.soldOut && (
//             <div className="absolute z-30 px-4 py-1 font-semibold text-white bg-red-600 rounded-md shadow-lg pointer-events-none select-none top-4 left-4">
//               SOLD OUT
//             </div>
//           )}
//         </div>

//         {/* Product Info & Variant selectors */}
//         <div className="flex flex-col flex-1 min-w-0">
//           <h1 className="text-2xl font-semibold">{productData.name}</h1>

//           {/* Variant Selection */}
//           {hasVariants && (
//             <div className="mt-6">
//               <label className="font-medium">Variant:</label>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {productData.variants.map((item, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setSelectedVariant(item);
//                       setSelectedColor('');
//                     }}
//                     className={`px-4 py-2 rounded border transition-all ${
//                       selectedVariant?.variant === item.variant
//                         ? 'bg-orange-600 text-white'
//                         : 'bg-white text-black hover:border-gray-400'
//                     }`}
//                   >
//                     {item.variant}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Color Selection */}
//           {hasVariants && selectedVariant && (
//             <div className="flex items-center mt-4">
//               <div>
//                 <label className="font-medium">Color:</label>
//                 <div className="relative flex flex-wrap gap-3 mt-2">
//                   {selectedVariant.colors.map((colorName, i) => (
//                     <div key={i} className="relative group">
//                       <button
//                         onClick={() => setSelectedColor(colorName)}
//                         className={`w-10 h-10 rounded-md border-2 transition-all duration-300 cursor-pointer
//                         ${selectedColor === colorName
//                           ? 'border-orange-500 ring ring-orange-300 scale-110'
//                           : 'border-gray-300 hover:scale-105 hover:ring hover:ring-orange-200'}
//                         `}
//                         style={{ backgroundColor: colorName }}
//                         title={colorName}
//                         type="button"
//                       >
//                         {selectedColor === colorName && (
//                           <svg
//                             className="absolute w-5 h-5 text-orange-600 top-1 right-1 drop-shadow-md"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414
//                               1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         )}
//                       </button>
//                       {/* Tooltip */}
//                       <div className="absolute z-10 hidden px-2 py-1 mt-1 text-sm text-white transition-opacity duration-300 bg-black rounded-md opacity-0 group-hover:opacity-100 group-hover:block top-full whitespace-nowrap">
//                         {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Show selected color name */}
//               {selectedColor && (
//                 <button
//                   disabled
//                   className="px-4 py-1 ml-4 text-sm font-semibold text-white transition shadow-lg cursor-default select-none rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:brightness-110"
//                   style={{ userSelect: 'none' }}
//                 >
//                   {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Price Display */}
//           <p className="mt-5 text-3xl font-bold">
//             {hasVariants && selectedVariant ? (
//               selectedVariant.offerPrice ? (
//                 <>
//                   <span className="mr-2 text-gray-400 line-through">
//                     {currency}
//                     {selectedVariant.regularPrice}
//                   </span>
//                   <span className="text-red-600">
//                     {currency}
//                     {selectedVariant.offerPrice}
//                   </span>
//                 </>
//               ) : (
//                 <span>
//                   {currency}
//                   {selectedVariant.regularPrice}
//                 </span>
//               )
//             ) : (
//               <span>
//                 {currency}
//                 {productData.price}
//               </span>
//             )}
//           </p>

//           <p className="max-w-lg mt-5 text-gray-600">{productData.description}</p>

//           <div className="flex flex-col max-w-xs gap-4 mt-8 sm:flex-row">
//             <button
//               onClick={handleAddToCart}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-black rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 active:bg-gray-700"
//             >
//               ADD TO CART
//             </button>
//             <button
//               onClick={handleBuyNow}
//               disabled={productData.soldOut}
//               className="flex-1 py-3 font-medium text-white transition-colors bg-orange-600 rounded-md hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               BUY NOW
//             </button>
//           </div>

//           <hr className="w-full mt-10 mb-6 border-gray-300" />
//           <div className="max-w-md space-y-1 text-sm text-gray-600">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 max-w-[900px] mx-auto">
//         <div className="flex border-b border-gray-300">
//           <b className="px-5 py-3 text-sm cursor-pointer">Description</b>
//         </div>
//         <div className="p-6 space-y-4 text-sm text-gray-600 border border-t-0 border-gray-300">
//           <p>
//             An e-commerce website is an online platform that facilitates the buying and selling of
//             products or services over the internet. It serves as a virtual marketplace where
//             businesses and individuals can showcase their products, interact with customers, and
//             conduct transactions without the need for a physical presence.
//           </p>
//           <p>
//             E-commerce websites typically display products or services along with detailed
//             descriptions, images, prices, and any available variations (e.g., variants, colors).
//           </p>
//         </div>
//       </div>

//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   );
// };

// export default Product;
