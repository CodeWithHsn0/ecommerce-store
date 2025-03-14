"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag } from "lucide-react"

export function GlobalLoading() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only show loading on very first visit to the site (not on navigation)
    const hasVisited = sessionStorage.getItem("hasVisitedShopHub")

    if (!hasVisited) {
      setIsLoading(true)

      // Set timeout to hide loading after 3 seconds
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem("hasVisitedShopHub", "true")
      }, 4000) // Show for 3 seconds

      return () => clearTimeout(timer)
    } else {
      // For all subsequent navigation, don't show loading at all
      setIsLoading(false)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Modern background with subtle pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)",
                backgroundSize: "100px 100px",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-primary/20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
          </div>

          {/* Main content - No border box */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Logo with orbit animation */}
            <div className="relative flex items-center justify-center mb-8">
              {/* Orbiting elements */}
              <motion.div
                className="absolute w-32 h-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/60 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <motion.div
                className="absolute w-40 h-40"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/40 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Center logo with pulse */}
              <motion.div
                className="relative z-10 bg-gradient-to-br from-primary/20 to-primary/10 p-5 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(147, 51, 234, 0.2)",
                    "0 0 0 15px rgba(147, 51, 234, 0)",
                    "0 0 0 0 rgba(147, 51, 234, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <ShoppingBag className="w-12 h-12 text-primary" />
              </motion.div>
            </div>

            {/* Modern typography */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
                ShopHub
              </h1>
              <p className="text-white/60 text-sm">Your premium shopping destination</p>
            </motion.div>

            {/* Modern loading bar */}
            <motion.div
              className="h-1 w-64 sm:w-80 bg-white/10 rounded-full overflow-hidden mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/80 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Floating icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: Math.random() * 100 - 50 + "%",
                    y: "110%",
                    opacity: 0.3 + Math.random() * 0.4,
                    scale: 0.5 + Math.random() * 0.5,
                  }}
                  animate={{ y: "-10%" }}
                  transition={{
                    duration: 10 + Math.random() * 20,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                    ease: "linear",
                  }}
                >
                  {i % 5 === 0 && <ShoppingBag className="w-6 h-6 text-primary/30" />}
                  {i % 5 === 1 && (
                    <svg
                      className="w-6 h-6 text-primary/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.12 6.71L15.53 11.3L15.53 11.3C15.38 11.45 15.19 11.55 15 11.55C14.81 11.55 14.62 11.45 14.47 11.3L12.7 9.53L8.11 14.12L8.11 14.12C7.96 14.27 7.77 14.37 7.58 14.37C7.39 14.37 7.2 14.27 7.05 14.12L2.46 9.53C2.32 9.38 2.25 9.19 2.25 9C2.25 8.81 2.32 8.62 2.46 8.47L2.46 8.47C2.76 8.17 3.24 8.17 3.54 8.47L7.58 12.51L12.17 7.92L12.17 7.92C12.32 7.77 12.51 7.67 12.7 7.67C12.89 7.67 13.08 7.77 13.23 7.92L15 9.69L19.04 5.65C19.34 5.35 19.82 5.35 20.12 5.65C20.42 5.95 20.42 6.4 20.12 6.71Z"
                        fill="currentColor"
                      />
                      <path
                        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {i % 5 === 2 && (
                    <svg
                      className="w-6 h-6 text-primary/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 4L10 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="5 5"
                      />
                    </svg>
                  )}
                  {i % 5 === 3 && (
                    <svg
                      className="w-6 h-6 text-primary/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8.5H14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 16.5H8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 16.5H14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 12.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H14.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 3.5V8.5L22 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 8.5L18 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {i % 5 === 4 && (
                    <svg
                      className="w-6 h-6 text-primary/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.4707 10.74L12.0007 14.26L15.5307 10.74"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

