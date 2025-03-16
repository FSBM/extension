import { motion } from "framer-motion";

const LoaderPillars = () => {
  return (
    <div className="grid place-content-center bg-transparent h-[30px] mt-1">
      <BarLoader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-[3px]"
    >
      <motion.div variants={variants} className="h-4 w-1 bg-black" />
      <motion.div variants={variants} className="h-4 w-1 bg-black" />
      <motion.div variants={variants} className="h-4 w-1 bg-black" />
      <motion.div variants={variants} className="h-4 w-1 bg-black" />
      <motion.div variants={variants} className="h-4 w-1 bg-black" />
    </motion.div>
  );
};

export default LoaderPillars;