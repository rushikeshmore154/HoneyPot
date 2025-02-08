import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="bg-accent py-20">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:w-1/2 mb-10 md:mb-0"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Streamline Hospital Bed Management
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Efficient queue management for hospitals and patients.
                        Real-time bed availability and seamless coordination.
                    </p>
                    <div className="flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Get Started
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-colors duration-200"
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:w-1/2"
                >
                    <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Hospital Queue Management System"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                    ></img>
                </motion.div>
            </div>
        </section>
    );
}
