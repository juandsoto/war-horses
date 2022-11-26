import { motion, AnimatePresence } from "framer-motion";
import { FADE_VARIANTS } from "utils/motion";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ScreenWrapper = ({ children }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative h-screen w-screen"
        variants={FADE_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenWrapper;
