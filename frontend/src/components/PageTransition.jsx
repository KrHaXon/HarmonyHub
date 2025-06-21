import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const transitionVariants = {
  initial: { 
    opacity: 0, 
    x: -20,
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0
  },
  animate: { 
    opacity: 1, 
    x: 0,
    position: 'relative',
    width: '100%'
  },
  exit: { 
    opacity: 0, 
    x: 20,
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0
  },
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldAnimate(!prefersReducedMotion);
  }, []);

  if (!shouldAnimate) {
    return children;
  }

  return (
    <div className="page-transition-wrapper">
      <motion.div
        key={location.pathname}
        className="page-transition"
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          type: 'tween', 
          duration: 0.3, 
          ease: 'easeInOut',
          when: "beforeChildren"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition; 