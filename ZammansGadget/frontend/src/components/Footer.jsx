import React from 'react';
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const mapQuery = encodeURIComponent(
    'Shop Number B1 Al-amin Complex 1st floor Nawab Bari Road, Bogura, Puran Bogra, Bangladesh'
  );
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <footer className="mt-12 bg-[#1f2937] text-white print:hidden w-full">
      <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 pt-12 pb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-9 md:gap-10 lg:gap-4"
        >
          {/* SUPPORT */}
          <section className="lg:col-span-3">
            <p className="text-center md:text-left mb-4 md:mb-8 tracking-[0.25rem] text-orange-400 font-semibold text-xl">
              SUPPORT
            </p>
            <div className="flex flex-col items-center gap-5 md:items-start">
              <div className="duration-300 w-[275px] h-[71px] border px-6 py-3 rounded-full border-white hover:border-orange-400 flex items-center gap-4">
                <span className="text-2xl">📞</span>
                <span className="w-[1px] bg-white h-full"></span>
                <div className="flex flex-col w-full">
                  <a
                    className="text-xl tracking-wide hover:text-orange-400"
                    href="tel:01723220078"
                  >
                    01723-220078
                  </a>
                </div>
              </div>

              <a
                href={googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 duration-300 w-[275px] h-[71px] border px-6 py-3 rounded-full border-white hover:border-orange-400 flex items-center gap-4"
              >
                <span className="text-2xl">📍</span>
                <span className="w-[1px] bg-white h-full"></span>
                <div className="flex flex-col justify-between h-full">
                  <p className="text-xs">Store Locator</p>
                  <p className="text-xl tracking-wide">Find Our Stores</p>
                </div>
              </a>

              <div className="flex justify-center gap-2 px-6 md:justify-start">
                <a
                  aria-label="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[36px] h-[36px] rounded-full bg-white text-[#1f2937] flex justify-center items-center text-lg hover:bg-[#3b5998] hover:text-white"
                  href="https://www.facebook.com/zamansgadget"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  aria-label="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[36px] h-[36px] rounded-full bg-white text-[#1f2937] flex justify-center items-center text-lg hover:bg-[#25D366] hover:text-white"
                  href="https://wa.me/8801723220078"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </section>

          {/* ABOUT + POLICY Combined */}
          <section className="w-full lg:col-span-4">
            <div className="flex flex-col items-center text-sm text-gray-300 sm:flex-row sm:justify-between sm:gap-8 sm:items-start">
              {/* ABOUT */}
              <div className="w-full sm:w-1/2">
                <h2 className="mb-5 text-xl font-semibold text-center text-orange-400 sm:text-left">
                  About Us
                </h2>
                {/* <ul className="flex flex-wrap justify-center text-center sm:block gap-x-2 gap-y-1 sm:text-left"> */}
                     <ul className="flex flex-wrap justify-center text-center sm:block gap-x-2 gap-y-1 sm:text-left lg:space-y-3 ">
                  <li>About Us |</li>
                  <li>Blog |</li>
                  <li>Careers |</li>
                  <li>Contact Us |</li>
                  <li>FAQs</li>
                </ul>
              </div>

              {/* POLICY */}
              <div className="w-full mt-8 sm:w-1/2 sm:mt-0">
                <h2 className="mb-5 text-xl font-semibold text-center text-orange-400 sm:text-left">
                  Policy
                </h2>
                {/* <ul className="flex flex-wrap justify-center text-center sm:block gap-x-2 gap-y-1 sm:text-left"> */}
                <ul className="flex flex-wrap justify-center text-center sm:block gap-x-2 gap-y-1 sm:text-left lg:space-y-3 ">

                  <li>Privacy Policy |</li>
                  <li>Warranty Policy |</li>
                  <li>Exchange Policy |</li>
                  <li>Delivery Policy |</li>
                  <li>Refund Policy |</li>
                  <li>Return Policy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* STAY CONNECTED */}
          <section className="lg:col-span-2">
            <h2 className="mb-5 text-xl font-semibold text-center text-orange-400 md:text-left">
              Stay Connected
            </h2>
            <div className="space-y-4 text-sm text-center text-gray-300 md:text-left">
              <p className="font-semibold text-white">Zaman's Gadgets</p>
              <p>
                Shop Number B1 Al-amin Complex 1st floor Nawab Bari Road,
                <br />
                Bogura, Puran Bogra, Bangladesh
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:zammanGadget@gmail.com"
                  className="text-orange-400 hover:underline"
                >
                  zamansGadget@gmail.com
                </a>
              </p>
            </div>
          </section>
        </motion.div>

        {/* BOTTOM COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <hr className="my-10 border-gray-700" />
          <p className="text-xs font-medium text-center text-gray-400">
            &copy; {new Date().getFullYear()} Zammans Gadgets — All Rights Reserved.
          </p>
        </motion.div>
      </section>
    </footer>
  );
};

export default Footer;
