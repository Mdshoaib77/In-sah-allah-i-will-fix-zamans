import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className='my-10'>
            <motion.div
                className='py-8 text-3xl text-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className="w-3/4 m-auto text-sm italic font-bold leading-relaxed tracking-wider text-gray-700 sm:text-base md:text-lg">
                    Discover the latest and coolest phone to elevate your mobile experience.
                </p>
            </motion.div>

            <motion.div
                className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
            >
                {
                    bestSeller.map((item) => (
                        <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </motion.div>
        </div>
    )
}

export default BestSeller;