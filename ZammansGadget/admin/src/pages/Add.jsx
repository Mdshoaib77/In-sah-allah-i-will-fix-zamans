import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  // Variants state and inputs
  const [variants, setVariants] = useState([]);
  const [variantInput, setVariantInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [variantRegularPriceInput, setVariantRegularPriceInput] = useState('');
  const [variantOfferPriceInput, setVariantOfferPriceInput] = useState('');

  // Categories and subcategories
  const categories = [
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

  // Add a variant to variants list
  const addVariant = () => {
    if (!variantInput.trim() || !colorInput.trim() || !variantRegularPriceInput.trim()) {
      toast.error("Please fill variant, color, and regular price");
      return;
    }

    // Split the color input into individual colors (if multiple), keep as strings only
    const colors = colorInput
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    if (colors.length === 0) {
      toast.error("Please enter valid colors");
      return;
    }

    setVariants(prev => [
      ...prev,
      {
        variant: variantInput.trim(),
        colors: colors,  // Array of strings like ["red", "blue"]
        regularPrice: Number(variantRegularPriceInput),
        offerPrice: variantOfferPriceInput ? Number(variantOfferPriceInput) : null,
      }
    ]);

    // Reset input fields
    setVariantInput('');
    setColorInput('');
    setVariantRegularPriceInput('');
    setVariantOfferPriceInput('');
  };

  // Remove a variant by index
  const removeVariant = (index) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  // Category change handler
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(''); // Reset subcategory on category change
  };

  // Submit form handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price || '0'); // Price optional if variants exist
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('soldOut', soldOut);

      // Append variants as JSON string (empty array if no variants)
      formData.append('variants', JSON.stringify(variants));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.message) {
        toast.success(response.data.message);
        // Reset all fields
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setSubCategory('');
        setBestseller(false);
        setSoldOut(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setVariants([]);
        setVariantInput('');
        setColorInput('');
        setVariantRegularPriceInput('');
        setVariantOfferPriceInput('');
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error: Unable to add product");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start w-full gap-3">

      {/* Images */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label key={idx} htmlFor={`image${idx + 1}`} className="cursor-pointer">
              <img
                className="object-cover w-20 h-20 border rounded"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt={`Upload ${idx + 1}`}
              />
              <input
                onChange={(e) => [setImage1, setImage2, setImage3, setImage4][idx](e.target.files[0])}
                type="file"
                id={`image${idx + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category & Subcategory */}
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded"
            value={category}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {category === "Official Phones" && (
          <div>
            <p className="mb-2">Product Sub-Category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              value={subCategory}
              required
            >
              <option value="">Select Sub-Category</option>
              {officialPhoneSubCategories.map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        {/* Base Price */}
        <div>
          <p className="mb-2">Product Price (Main)</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded sm:w-[120px]"
            type="number"
            placeholder="25"
          />
          <small className="text-gray-500">
            * Optional if product has variants
          </small>
        </div>
      </div>

      {/* Variant inputs */}
      <div className="w-full mt-4">
        <p className="mb-2 font-semibold">Add Variant</p>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={variantInput}
            onChange={(e) => setVariantInput(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Variant (e.g., 4/64)"
          />
          <input
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            className="px-3 py-2 border rounded"
            placeholder="Colors (comma separated, e.g., red, blue, green)"
          />
          <input
            value={variantRegularPriceInput}
            onChange={(e) => setVariantRegularPriceInput(e.target.value)}
            className="px-3 py-2 border rounded"
            type="number"
            placeholder="Regular Price"
          />
          <input
            value={variantOfferPriceInput}
            onChange={(e) => setVariantOfferPriceInput(e.target.value)}
            className="px-3 py-2 border rounded"
            type="number"
            placeholder="Offer Price (optional)"
          />
          <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2 text-white bg-black rounded"
          >
            Add Variant
          </button>
        </div>

        {/* Display added variants */}
        <ul className="mt-3">
          {variants.map((v, idx) => (
            <li key={idx} className="flex items-center gap-4 mt-1">
              <span>
                {v.variant} - Colors: {v.colors.join(', ')} - Regular: ৳{v.regularPrice}
                {v.offerPrice !== null && v.offerPrice !== undefined
                  ? ` | Offer: ৳${v.offerPrice}` : null}
              </span>
              <button
                onClick={() => removeVariant(idx)}
                className="text-red-500 hover:underline"
                type="button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bestseller & Sold Out checkboxes */}
      <div className="flex gap-4 mt-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(prev => !prev)}
          />
          Add to Bestseller
        </label>
        <label className="flex items-center gap-2 text-red-500 cursor-pointer">
          <input
            type="checkbox"
            checked={soldOut}
            onChange={() => setSoldOut(prev => !prev)}
          />
          Mark as SOLD OUT
        </label>
      </div>
  <button
  type="submit"
  className="w-32 py-3 mt-4 text-center text-white bg-black rounded whitespace-nowrap">ADD PRODUCT
   </button>
    </form>
  );
};

export default Add;
