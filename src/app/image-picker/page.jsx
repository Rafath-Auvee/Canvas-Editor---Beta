// ImagePicker.js
"use client";
import Link from "next/link";
import images from "../../data/image";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ImagePicker = () => {
  const navigate = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center mb-4 text-3xl font-bold leading-5">
        Image Picker
      </h1>
      <ul className="grid gap-6 grid-cols-3">
        {images.map((image) => (
          <li key={image.id}>
            {/* {console.log(image.id)} */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-48 h-48 relative">
                <Image
                  className="object-cover w-full h-full"
                  src={image.url}
                  alt="Image"
                  width={0}
                  height={0}
                />
              </div>
              <p className="text-2xl font-bold leading-2 w-48 text-center">
                {image.id}: {image.name}
              </p>
              <button
                className="text-indigo-500 link no-underline inline-flex items-center mb-2"
                onClick={() => navigate.push(`/image-editor/${image.id}`)}
              >
                Click Here
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagePicker;
