"use client";
import { useState } from "react";
import Link from "next/link";

import images from "../../../data/image";
import TextStyleEditor from "@/components/ImageEditor/TextStyleEditor";
import ImageCanvas from "@/components/ImageEditor/ImageCanvas";

const ImageEditor = ({ params }) => {
  const imageData = images.find((image) => image.id === parseInt(params.id));

  const [textStyles, setTextStyles] = useState(
    imageData.textStyles.map((textStyle) => ({
      ...textStyle,
      fontSize: parseInt(textStyle.fontSize),
    }))
  );
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  const handleTextStyleChange = (index, property, value) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      [property]: value,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTextClick = (index) => {
    setSelectedTextIndex(index === selectedTextIndex ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-green-500">
      <h1 className="text-center text-3xl font-bold leading-5 mb-5">
        Image Editor
      </h1>
      {selectedTextIndex !== null && (
        <p>Selected Text: {textStyles[selectedTextIndex].text}</p>
      )}
      <ImageCanvas
        imageData={imageData}
        textStyles={textStyles}
        selectedTextIndex={selectedTextIndex}
        handleTextClick={handleTextClick}
      />
      {selectedTextIndex !== null && (
        <TextStyleEditor
          textStyle={textStyles[selectedTextIndex]}
          handleTextStyleChange={handleTextStyleChange}
        />
      )}
      <div className="flex mt-4">
        <Link href="/image-editor">
          <p className="bg-gray-200 rounded px-4 py-2 mr-2">Back</p>
        </Link>
        <Link href="/">
          <p className="bg-gray-200 rounded px-4 py-2">Home</p>
        </Link>
      </div>
    </div>
  );
};

export default ImageEditor;
