import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import icon from "../../images/image_FILL0_wght400_GRAD0_opsz48.svg?url";

interface Props<T> {
	inputId: string;
	styleType?: string;
	onInput: (id: keyof T, value: File, isValid: boolean) => void;
	initialImg?: string;
	initialValid?: boolean;
}
const ImageUpload = <T,>(props: Props<T>) => {
	const [file, setFile] = useState<File>();
	const [prevUrl, setPrevUrl] = useState<string | ArrayBuffer>();
	const [isValid, setIsValid] = useState<boolean>(false);
	const imageRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (props.initialImg) {
			setPrevUrl(`${process.env.BACKEND_URL}/${props.initialImg}`);
		}
		if (props.initialValid) {
			setIsValid(props.initialValid);
		}
	}, [props.initialImg, props.initialValid]);

	useEffect(() => {
		if (!file) return;
		props.onInput(props.inputId as keyof T, file, isValid);
	}, [file]);

	const uploadedImageHandler: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		if (event.target.files && event.target.files?.length === 1) {
			const img: File = event.target.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.result) {
					setPrevUrl(reader.result);
				}
			};
			reader.readAsDataURL(img);
			setFile(img);
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};

	const pickHandler = () => {
		imageRef.current?.click();
	};

	return (
		<div className="flex flex-col items-center gap-5 mb-5">
			<div className="w-1/3 relative">
				<div className="block pt-[100%]" />
				<img
					src={prevUrl ? prevUrl : icon}
					alt="Preview"
					className={
						props.styleType === "signUp"
							? "w-full h-full absolute top-0 object-cover rounded-full bg-gray"
							: "w-full h-full absolute top-0 object-contain bg-white"
					}
				/>
			</div>
			<input
				className="hidden"
				type="file"
				name="image"
				accept="image/*"
				ref={imageRef}
				onChange={uploadedImageHandler}
			/>
			<Button type="button" btnStyle="upload_btn" onClick={pickHandler}>
				Upload
			</Button>
			{!isValid && <p className="text-maroon">Please provide an image</p>}
		</div>
	);
};

export default ImageUpload;
