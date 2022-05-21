import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="shrink-0 snap-center w-full h-full flex items-center justify-center">
			<div className="absolute flex items-center justify-center z-loadinSpinner">
				<div className="animate-spin h-40 w-40 border-4 border-blue-700  rounded-full border-t-transparent" />
			</div>
		</div>
	);
};

export default LoadingSpinner;
