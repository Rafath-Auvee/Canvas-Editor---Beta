"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import images from "../../../data/image";

const ImageEditor = ({ params }) => {
  const canvasRef = useRef(null);
  const imageData = images.find((image) => image.id === parseInt(params.id));

  const [textStyles, setTextStyles] = useState(imageData.textStyles);
  const [fontSize, setFontSize] = useState(32);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageData.url;

    image.onload = () => {
      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Loop through the text styles and draw the preloaded texts on the canvas
      textStyles.forEach((textStyle) => {
        console.log(textStyle.text)
        context.fillStyle = textStyle.backgroundColor;
        context.font = `${fontSize}px ${textStyle.fontFamily}`;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText(textStyle.text, textStyle.left, textStyle.top);
      });
    };
  }, [imageData, textStyles, fontSize]);

  const handleLeftChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTopChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value));
  };

  const incrementLeft = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: updatedTextStyles[index].left + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementLeft = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: updatedTextStyles[index].left - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementTop = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: updatedTextStyles[index].top + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementTop = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      top: updatedTextStyles[index].top - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const incrementFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
  };

  const decrementFontSize = () => {
    setFontSize((prevFontSize) => prevFontSize - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-3xl font-bold leading-5 mb-5">
        Image Editor
      </h1>
      <canvas
        ref={canvasRef}
        className="border border-gray-500"
        width={500} // Set the width of the canvas to match your desired image width
        height={500} // Set the height of the canvas to match your desired image height
      ></canvas>
      <div className="flex justify-center mt-4">
        {textStyles.map((textStyle, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <label htmlFor={`leftInput-${index}`}>Left Position:</label>
            <input
              id={`leftInput-${index}`}
              type="number"
              value={textStyle.left}
              onChange={(e) => handleLeftChange(index, e)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            />
            <div className="flex mt-2">
              <button
                onClick={() => incrementLeft(index)}
                className="bg-gray-200 rounded px-2 py-1 mr-1"
              >
                +
              </button>
              <button
                onClick={() => decrementLeft(index)}
                className="bg-gray-200 rounded px-2 py-1"
              >
                -
              </button>
            </div>

            <label htmlFor={`topInput-${index}`}>Top Position:</label>
            <input
              id={`topInput-${index}`}
              type="number"
              value={textStyle.top}
              onChange={(e) => handleTopChange(index, e)}
              className="border border-gray-300 rounded px-2 py-1 mt-1"
            />
            <div className="flex mt-2">
              <button
                onClick={() => incrementTop(index)}
                className="bg-gray-200 rounded px-2 py-1 mr-1"
              >
                +
              </button>
              <button
                onClick={() => decrementTop(index)}
                className="bg-gray-200 rounded px-2 py-1"
              >
                -
              </button>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center mx-4">
          <label htmlFor="fontSizeInput">Font Size:</label>
          <input
            id="fontSizeInput"
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            className="border border-gray-300 rounded px-2 py-1 mt-1"
          />
          <div className="flex mt-2">
            <button
              onClick={incrementFontSize}
              className="bg-gray-200 rounded px-2 py-1 mr-1"
            >
              +
            </button>
            <button
              onClick={decrementFontSize}
              className="bg-gray-200 rounded px-2 py-1"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <Link href="/image-picker">Go Back</Link>
    </div>
  );
};

export default ImageEditor;

