import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      {/* Title */}
      <motion.div 
        className="py-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }} // ✅ Always animate, no waiting for scroll
        transition={{ duration: 1 }}
      >
        <Title text1={'LATEST'} text2={'ARRIVAL'} />
      </motion.div>

      {/* Swiper Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // ✅ Always show Swiper immediately
        transition={{ duration: 1.5 }}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          slidesPerGroup={2}
          loop={true}
          autoplay={{
            delay: 3000, // ✅ 3 seconds
            disableOnInteraction: false, // ✅ Keep going after user scrolls
          }}
          navigation={{
            enabled: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              navigation: false,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              navigation: false,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 2,
              navigation: true,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 2,
              navigation: true,
            },
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 2,
              navigation: true,
            },
          }}
        >
          {latestProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-auto mb-6">
                <ProductItem 
                  id={item._id} 
                  image={item.image} 
                  name={item.name} 
                  price={item.price} 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default LatestCollection;

