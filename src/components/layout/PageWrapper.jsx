/**
 * PageWrapper.jsx — FSAD-PS34
 * Wraps all page content with Framer Motion page transition + consistent padding.
 */

import { motion } from 'framer-motion';
import { pageVariants } from '../../animations/variants';

export default function PageWrapper({ children, className = '' }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-full max-w-screen-2xl mx-auto px-4 py-5 sm:px-6 sm:py-7 ${className}`}
        >
            {children}
        </motion.div>
    );
}
