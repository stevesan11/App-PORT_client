import React from "react";

const LoadingScreen = () => {
	return (
		<div className="sabsolute top-0 left-0">
			<div className="w-screen h-screen flex items-center justify-center z-loadinSpinner">
				<div className="animate-spin h-40 w-40 border-4 border-blue-700  rounded-full border-t-transparent" />
			</div>
		</div>
	);
};

export default LoadingScreen;
