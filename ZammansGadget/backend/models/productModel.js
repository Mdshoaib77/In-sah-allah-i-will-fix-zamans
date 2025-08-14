// import mongoose from 'mongoose'; 

// // Define category options to ensure consistency in category names
// const categoryOptions = [
//   "Official Phones",
//   "Unofficial Phones",
//   "Used Phones",
//   "Adapter & Cables", 
//   "PowerBank",
//   "Airbuds", 
//   "Earphones",
//   "Neckband",
//   "Gaming Accessories",
//   "Speakers",
//   "Cover & Glass", 
//   "Smart Watch"
// ];

// // Define subcategory options for "Official Phones"
// const officialPhoneSubCategories = [
//   "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
// ];

// // Create Schema for Product
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }, 
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { 
//     type: String, 
//     enum: categoryOptions, 
//     required: true 
//   },
//   subCategory: { 
//     type: String, 
//     // Custom validator to ensure that subCategory is only valid if category is "Official Phones"
//     validate: {
//       validator: function(value) {
//         // If category is "Official Phones", subCategory must be in the allowed list
//         if (this.category === "Official Phones") {
//           return officialPhoneSubCategories.includes(value);
//         }
//         // If category is not "Official Phones", subCategory is not required
//         return true;
//       },
//       message: props => `${props.value} is not a valid subCategory for ${this.category}`
//     },
//     required: function() {
//       return this.category === "Official Phones"; // Only required for "Official Phones"
//     },
//     default: null  // Default subCategory to null if not provided
//   },
//   bestseller: { type: Boolean, default: false },
//   soldOut: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },
//   colors: { type: [String], default: [] },
//   image: { type: [String], default: [] },
//   date: { type: Date, default: Date.now }
// });

// // Create Product model
// const productModel = mongoose.model('Product', productSchema);

// export default productModel;

// import mongoose from 'mongoose'; 

// const categoryOptions = [
//   "Official Phones",
//   "Unofficial Phones",
//   "Used Phones",
//   "Adapter & Cables", 
//   "PowerBank",
//   "Airbuds", 
//   "Earphones",
//   "Neckband",
//   "Gaming Accessories",
//   "Speakers",
//   "Cover & Glass", 
//   "Smart Watch"
// ];

// const officialPhoneSubCategories = [
//   "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
// ];

// const variantSchema = new mongoose.Schema({
//   variantName: { type: String, required: true },  // ex: '4/64'
//   color: { type: String, required: true },        // ex: 'Red' or '#ff0000'
//   regularPrice: { type: Number, required: true },
//   offerPrice: { type: Number, default: 0 }        // 0 means no offer price
// }, { _id: false });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }, 
//   description: { type: String, required: true },
//   price: { type: Number, required: true },  // You might consider deprecating this if variants are used exclusively
//   category: { 
//     type: String, 
//     enum: categoryOptions, 
//     required: true 
//   },
//   subCategory: { 
//     type: String, 
//     validate: {
//       validator: function(value) {
//         if (this.category === "Official Phones") {
//           return officialPhoneSubCategories.includes(value);
//         }
//         return true;
//       },
//       message: props => `${props.value} is not a valid subCategory for ${this.category}`
//     },
//     required: function() {
//       return this.category === "Official Phones";
//     },
//     default: null
//   },
//   bestseller: { type: Boolean, default: false },
//   soldOut: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },
//   colors: { type: [String], default: [] },
//   image: { type: [String], default: [] },

//   // New variants array
//   variants: {
//     type: [variantSchema],
//     default: []
//   },

//   date: { type: Date, default: Date.now }
// });

// const productModel = mongoose.model('Product', productSchema);

// export default productModel;


// import mongoose from 'mongoose'; 

// const categoryOptions = [
//   "Official Phones",
//   "Unofficial Phones",
//   "Used Phones",
//   "Adapter & Cables", 
//   "PowerBank",
//   "Airbuds", 
//   "Earphones",
//   "Neckband",
//   "Gaming Accessories",
//   "Speakers",
//   "Cover & Glass", 
//   "Smart Watch"
// ];

// const officialPhoneSubCategories = [
//   "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
// ];

// const variantSchema = new mongoose.Schema({
//   variant: { type: String, required: true },  // changed from variantName to variant
//   color: { type: String, required: true },   // ex: 'Red' or '#ff0000'
//   regularPrice: { type: Number, required: true },
//   offerPrice: { type: Number, default: 0 }   // 0 means no offer price
// }, { _id: false });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }, 
//   description: { type: String, required: true },
//   price: { type: Number, required: true },  // base price (optional if variants used)
//   category: { 
//     type: String, 
//     enum: categoryOptions, 
//     required: true 
//   },
//   subCategory: { 
//     type: String, 
//     validate: {
//       validator: function(value) {
//         if (this.category === "Official Phones") {
//           return officialPhoneSubCategories.includes(value);
//         }
//         return true;
//       },
//       message: props => `${props.value} is not a valid subCategory for ${this.category}`
//     },
//     required: function() {
//       return this.category === "Official Phones";
//     },
//     default: null
//   },
//   bestseller: { type: Boolean, default: false },
//   soldOut: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },    // optional, can remove if unused
//   colors: { type: [String], default: [] },   // optional, if you want global colors
//   image: { type: [String], default: [] },    // array of image URLs/paths

//   variants: {
//     type: [variantSchema],
//     default: []
//   },

//   date: { type: Date, default: Date.now }
// });

// const productModel = mongoose.model('Product', productSchema);

// export default productModel;



// import mongoose from 'mongoose'; 

// const categoryOptions = [
//   "Official Phones",
//   "Unofficial Phones",
//   "Used Phones",
//   "Adapter & Cables", 
//   "PowerBank",
//   "Airbuds", 
//   "Earphones",
//   "Neckband",
//   "Gaming Accessories",
//   "Speakers",
//   "Cover & Glass", 
//   "Smart Watch"
// ];

// const officialPhoneSubCategories = [
//   "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
// ];

// // ✅ Color Schema (with name + hex code)
// const colorSchema = new mongoose.Schema({
//   name: { type: String, required: true },     // e.g., "Lavender"
//   code: { type: String, required: true }      // e.g., "#E6E6FA"
// }, { _id: false });

// // ✅ Variant Schema (with array of colors)
// const variantSchema = new mongoose.Schema({
//   variant: { type: String, required: true },  // e.g., "8/128"
//   colors: { type: [colorSchema], required: true }, // ✅ multiple colors per variant
//   regularPrice: { type: Number, required: true },
//   offerPrice: { type: Number, default: 0 }
// }, { _id: false });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }, 
//   description: { type: String, required: true },
//   price: { type: Number, required: true },  // base price (optional if variants used)
//   category: { 
//     type: String, 
//     enum: categoryOptions, 
//     required: true 
//   },
//   subCategory: { 
//     type: String, 
//     validate: {
//       validator: function(value) {
//         if (this.category === "Official Phones") {
//           return officialPhoneSubCategories.includes(value);
//         }
//         return true;
//       },
//       message: props => `${props.value} is not a valid subCategory for ${this.category}`
//     },
//     required: function() {
//       return this.category === "Official Phones";
//     },
//     default: null
//   },
//   bestseller: { type: Boolean, default: false },
//   soldOut: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },
//   colors: { type: [String], default: [] }, // global (optional), can remove later
//   image: { type: [String], default: [] },

//   variants: {
//     type: [variantSchema],
//     default: []
//   },

//   date: { type: Date, default: Date.now }
// });

// const productModel = mongoose.model('Product', productSchema);

// export default productModel;

// import mongoose from 'mongoose';

// const categoryOptions = [
//   "Official Phones",
//   "Unofficial Phones",
//   "Used Phones",
//   "Adapter & Cables", 
//   "PowerBank",
//   "Airbuds", 
//   "Earphones",
//   "Neckband",
//   "Gaming Accessories",
//   "Speakers",
//   "Cover & Glass", 
//   "Smart Watch"
// ];

// const officialPhoneSubCategories = [
//   "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
// ];

// // ✅ Color Schema (with name + hex code)
// const colorSchema = new mongoose.Schema({
//   name: { type: String, required: true },     // e.g., "Lavender"
//   code: { type: String, required: true }      // e.g., "#E6E6FA"
// }, { _id: false });

// // ✅ Variant Schema (with array of colors)
// const variantSchema = new mongoose.Schema({
//   variant: { type: String, required: true },  // e.g., "8/128"
//   colors: { type: [colorSchema], required: true }, // ✅ multiple colors per variant
//   regularPrice: { type: Number, required: true },
//   offerPrice: { type: Number, default: 0 }
// }, { _id: false });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }, 
//   description: { type: String, required: true },
//   price: { type: Number, required: true },  // base price (optional if variants used)
//   category: { 
//     type: String, 
//     enum: categoryOptions, 
//     required: true 
//   },
//   subCategory: { 
//     type: String, 
//     validate: {
//       validator: function(value) {
//         if (this.category === "Official Phones") {
//           return officialPhoneSubCategories.includes(value);
//         }
//         return true;
//       },
//       message: props => `${props.value} is not a valid subCategory for ${this.category}`
//     },
//     required: function() {
//       return this.category === "Official Phones";
//     },
//     default: null
//   },
//   bestseller: { type: Boolean, default: false },
//   soldOut: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },
//   colors: { type: [String], default: [] }, // global (optional), can remove later
//   image: { type: [String], default: [] },

//   variants: {
//     type: [variantSchema],
//     default: []
//   },

//   date: { type: Date, default: Date.now }
// });

// const productModel = mongoose.model('Product', productSchema);

// export default productModel;


import mongoose from 'mongoose';

const categoryOptions = [
  "Official Phones",
  "Unofficial Phones",
  "Used Phones",
  "Adapter & Cables", 
  "PowerBank",
  "Airbuds", 
  "Earphones",
  "Neckband",
  "Gaming Accessories",
  "Speakers",
  "Cover & Glass", 
  "Smart Watch"
];

const officialPhoneSubCategories = [
  "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
];

// Removed colorSchema completely

// Variant Schema with colors as array of strings (color names)
const variantSchema = new mongoose.Schema({
  variant: { type: String, required: true },  // e.g., "8/128"
  colors: { type: [String], required: true }, // now just array of color names ["red", "yellow"]
  regularPrice: { type: Number, required: true },
  offerPrice: { type: Number, default: 0 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  price: { type: Number, required: true },  // base price (optional if variants used)
  category: { 
    type: String, 
    enum: categoryOptions, 
    required: true 
  },
  subCategory: { 
    type: String, 
    validate: {
      validator: function(value) {
        if (this.category === "Official Phones") {
          return officialPhoneSubCategories.includes(value);
        }
        return true;
      },
      message: props => `${props.value} is not a valid subCategory for ${this.category}`
    },
    required: function() {
      return this.category === "Official Phones";
    },
    default: null
  },
  bestseller: { type: Boolean, default: false },
  soldOut: { type: Boolean, default: false },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] }, // global (optional), can remove later
  image: { type: [String], default: [] },

  variants: {
    type: [variantSchema],
    default: []
  },

  date: { type: Date, default: Date.now }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;



// import mongoose from 'mongoose'; 

// const categoryOptions = [
//   "Official Phones",
//   "Unofficial Phones",
//   "Used Phones",
//   "Adapter & Cables", 
//   "PowerBank",
//   "Airbuds", 
//   "Earphones",
//   "Neckband",
//   "Gaming Accessories",
//   "Speakers",
//   "Cover & Glass", 
//   "Smart Watch"
// ];

// const officialPhoneSubCategories = [
//   "Samsung", "Realme", "Xiaomi", "Vivo", "Oppo", "Infinix", "Tecno", "Huawei"
// ];

// const variantSchema = new mongoose.Schema({
//   variant: { type: String, required: true },
//   color: { type: [String], required: true },   // CHANGED: color is now array of strings
//   regularPrice: { type: Number, required: true },
//   offerPrice: { type: Number, default: 0 }
// }, { _id: false });

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true }, 
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { 
//     type: String, 
//     enum: categoryOptions, 
//     required: true 
//   },
//   subCategory: { 
//     type: String, 
//     validate: {
//       validator: function(value) {
//         if (this.category === "Official Phones") {
//           return officialPhoneSubCategories.includes(value);
//         }
//         return true;
//       },
//       message: props => `${props.value} is not a valid subCategory for ${this.category}`
//     },
//     required: function() {
//       return this.category === "Official Phones";
//     },
//     default: null
//   },
//   bestseller: { type: Boolean, default: false },
//   soldOut: { type: Boolean, default: false },
//   sizes: { type: [String], default: [] },
//   colors: { type: [String], default: [] },
//   image: { type: [String], default: [] },

//   variants: {
//     type: [variantSchema],
//     default: []
//   },

//   date: { type: Date, default: Date.now }
// });

// const productModel = mongoose.model('Product', productSchema);

// export default productModel;
