/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['[data-color-theme="dark"]'],
	content: ["./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
	presets: [require("./ui.preset.js")],
};
