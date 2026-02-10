/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Safe-Flex Scoring Colors
                safe: '#10B981', // Emerald 500
                warning: '#F59E0B', // Amber 500
                danger: '#EF4444', // Red 500
                brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9', // Sky 500
                    900: '#0c4a6e',
                }
            }
        },
    },
    plugins: [],
}
