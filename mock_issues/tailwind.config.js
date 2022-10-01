/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			sm: "544px",
			md: "768px",
			lg: "1012px",
			xl: "1280px",
		},
		extend: {
			boxShadow: {
				innerblue: "inset 0 0 0 1px #0969da",
			},
		},
	},
	plugins: [],
};
