import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    },
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    }
  }
}

const Product = props => (
  <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <div className='w-screen h-screen'>
      <div className='grid grid-cols-2 h-full'>
        <div className='col-span-1 grid place-items-center'>
          <motion.img
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            key={props.product.image}
            src={props.product.image}
            width={350}
          />
        </div>
        <div className='col-span-1 bg-gray-50'>
          <motion.div variants={stagger} className='flex flex-col justify-center h-full max-w-sm m-auto'>
            <Link href='/'>
              <motion.div
                className='text-gray-600 mb-16 cursor-pointer'
                variants={fadeInUp}>
                <a>Back to products</a>
              </motion.div>
            </Link>
            <motion.div variants={fadeInUp}>
              <span className='category'>Smartphone</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-green-500 my-4">{props.product.name}</motion.h1>
            <motion.p variants={fadeInUp} class="text-gray-600 text-sm">{props.product.details}</motion.p>
            <motion.div variants={fadeInUp} className='flex items-center my-2'>
              <span className="text-xs rounded bg-gray-200 hover:shadow-lg p-1 mr-2">#5G</span>
              <span className="text-xs rounded bg-gray-200 hover:shadow-lg p-1">#Quick charge</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='flex justify-between my-3'>
              <div className='grid grid-cols-3 items-center'>
                <button className='focus:outline-none w-8 h-8 flex items-center justify-center rounded-full border border-solid'>-</button>
                <div className='text-center'>1</div>
                <button className='focus:outline-none w-8 h-8 flex items-center justify-center rounded-full border border-solid'>+</button>
              </div>
              <span className='font-bold text-lg'>{props.product.price}</span>
            </motion.div>
            <motion.div variants={fadeInUp}  className='btn-row'>
              <button className='focus:outline bg-green-500 px-3 py-1 rounded text-white'> Add to cart</button>
              <button className='ml-4'> Subscribe</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(
    `http://my-json-server.typicode.com/nos-nart/demo/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;