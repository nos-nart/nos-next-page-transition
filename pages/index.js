import Link from 'next/link';
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
      staggerChildren: 0.1,
    }
  }
}

export default function Home(props) {
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <div className="bg-gray-100">
        <div className='container m-auto'>
          <div className="flex items-center justify-center h-screen">
            <div className='mr-12'>
              <h1 className="text-2xl text-green-500">Select a smartphone</h1>
            </div>
            <motion.div
              variants={stagger}
              className='grid grid-cols-2 gap-12'
            >
              {props.products.map(product => (
                <Link
                  key={product.id}
                  href='/products/[id]'
                  as={`/products/${product.id}`}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className='col-span-1 cursor-pointer shadow bg-white p-6 rounded-lg'
                  >
                    <p className='my-3 text-center'>Smartphone</p>
                    <motion.img
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      key={product.image}
                      src={product.image}
                      width={250}
                    />
                    <div className='flex justify-between items-center mt-4'>
                      <h4>{product.name}</h4>
                      <span className="text-gray-400 text-sm">{product.price}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

Home.getInitialProps = async function() {
  const res = await fetch(
    "http://my-json-server.typicode.com/nos-nart/demo/products"
  );
  const data = await res.json();
  return {
    products: data
  };
};
