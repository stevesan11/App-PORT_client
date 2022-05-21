module.exports = {
	content: ["./src/**/*.{html,tsx,ts,js}"],
	theme: {
		extend: {
			colors: {
				gray: "#E6DEDD",
				maroon: "#8F1D14",
				black: "#1B120F",
				orange: "#F89D13",
			},
			zIndex: {
				backdrop: "100",
				modal: "200",
				errorBackdrop: "300",
				errorModal: "400",
				loadinSpinner: "500",
			},
		},
	},
	plugins: [],
};
