"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import images from "../../../data/image";

const ImageEditor = ({ params }) => {
  const canvasRef = useRef(null);
  const imageData = images.find((image) => image.id === parseInt(params.id));

  const [textStyles, setTextStyles] = useState(
    imageData.textStyles.map((textStyle) => ({
      ...textStyle,
      fontSize: parseInt(textStyle.fontSize),
    }))
  );
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageData.url;

    image.onload = () => {
      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Loop through the text styles and draw the overlay markers on the canvas
      textStyles.forEach((textStyle) => {
        context.fillStyle = textStyle.backgroundColor;
        context.fillRect(
          textStyle.left,
          textStyle.top,
          textStyle.width,
          textStyle.height
        );
      });
    };
  }, [imageData, textStyles]);

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

  const handleFontSizeChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: parseInt(e.target.value),
    };
    setTextStyles(updatedTextStyles);
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

  const incrementFontSize = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: updatedTextStyles[index].fontSize + 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const decrementFontSize = (index) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      fontSize: updatedTextStyles[index].fontSize - 1,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleTextClick = (index) => {
    setSelectedTextIndex(index === selectedTextIndex ? null : index);
  };

  // Text Changing Function

  const handleTextChange = (index, e) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      text: e.target.value,
    };
    setTextStyles(updatedTextStyles);
  };

  const handleCanvasClick = (e) => {
    const canvas = document.getElementById("canvas");
    if (!canvas.contains(e.target)) {
      setSelectedTextIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 text-green-500">
      <h1 className="text-center text-3xl font-bold leading-5 mt-5">
        Image Editor
      </h1>
      {/* {selectedTextIndex !== null && (
        <p>Selected Text: {textStyles[selectedTextIndex].text}</p>
      )} */}

      <div id="canvas" className="my-5" onClick={handleCanvasClick}>
        {/* Your canvas content */}
        {selectedTextIndex !== null && (
          <div className="flex justify-center mt-4">
            <div
              key={selectedTextIndex}
              className={`grid gap-4 grid-cols-3 px-5 py-2 bg-blue-400 text-blue-800 rounded border-blue-500 border-2`}
            >
              <div>
                <label htmlFor={`textInput-${selectedTextIndex}`}>Text</label>
                <div className="flex">
                  <input
                    id={`textInput-${selectedTextIndex}`}
                    type="text"
                    value={textStyles[selectedTextIndex].text}
                    onChange={(e) => handleTextChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`leftInput-${selectedTextIndex}`}>
                  Left Position:
                </label>
                <div className="flex">
                  <input
                    id={`leftInput-${selectedTextIndex}`}
                    type="number"
                    value={textStyles[selectedTextIndex].left}
                    onChange={(e) => handleLeftChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={() => incrementLeft(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementLeft(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`topInput-${selectedTextIndex}`}>
                  Top Position:
                </label>
                <div className="flex">
                  <input
                    id={`topInput-${selectedTextIndex}`}
                    type="number"
                    value={textStyles[selectedTextIndex].top}
                    onChange={(e) => handleTopChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={() => incrementTop(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementTop(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`fontSizeInput-${selectedTextIndex}`}>
                  Font Size:
                </label>
                <div className="flex">
                  <input
                    id={`fontSizeInput-${selectedTextIndex}`}
                    type="number"
                    value={textStyles[selectedTextIndex].fontSize}
                    onChange={(e) => handleFontSizeChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={() => incrementFontSize(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementFontSize(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedTextIndex === null && (
          <div className="flex justify-center mt-4">
            <div
              key={selectedTextIndex}
              className={`grid gap-4 grid-cols-3 px-5 py-2 bg-blue-400 text-blue-800 rounded border-blue-500 border-2`}
            >
              <div>
                <label htmlFor={`textInput-${selectedTextIndex}`}>Text</label>
                <div className="flex">
                  <input
                    id={`textInput-${selectedTextIndex}`}
                    type="text"
                    value={""}
                    onChange={(e) => handleTextChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`leftInput-${selectedTextIndex}`}>
                  Left Position:
                </label>
                <div className="flex">
                  <input
                    id={`leftInput-${selectedTextIndex}`}
                    type="number"
                    value={""}
                    onChange={(e) => handleLeftChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={() => incrementLeft(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementLeft(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`topInput-${selectedTextIndex}`}>
                  Top Position:
                </label>
                <div className="flex">
                  <input
                    id={`topInput-${selectedTextIndex}`}
                    type="number"
                    value={""}
                    onChange={(e) => handleTopChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={() => incrementTop(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementTop(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`fontSizeInput-${selectedTextIndex}`}>
                  Font Size:
                </label>
                <div className="flex">
                  <input
                    id={`fontSizeInput-${selectedTextIndex}`}
                    type="number"
                    value={""}
                    onChange={(e) => handleFontSizeChange(selectedTextIndex, e)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black w-32"
                  />
                  <div className="flex mt-2">
                    <button
                      onClick={() => incrementFontSize(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => decrementFontSize(selectedTextIndex)}
                      className="bg-gray-200 rounded px-2 py-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-500"
          width={500} // Set the width of the canvas to match your desired image width
          height={500} // Set the height of the canvas to match your desired image height
        ></canvas>
        {textStyles.map((textStyle, index) => (
          <div
            key={index}
            className={`absolute ${
              selectedTextIndex === index ? "border-blue-500 border-2" : ""
            }`}
            style={{
              left: textStyle.left,
              top: textStyle.top,
              cursor: "pointer",
            }}
            onClick={() => handleTextClick(index)}
          >
            <div
              style={{
                // backgroundColor: textStyle.backgroundColor,
                color: "black",
                fontFamily: textStyle.fontFamily,
                fontSize: `${textStyle.fontSize}px`,
              }}
            >
              {textStyle.text}
            </div>
          </div>
        ))}
      </div>

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
