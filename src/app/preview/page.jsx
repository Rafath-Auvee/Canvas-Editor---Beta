"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import download from "downloadjs";

const PreviewCard = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  const imageData = JSON.parse(storage.getItem("previewData"));
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = async (item) => {
    setIsDownloading(true);
    console.log(`Clicked on ${item}`);
    setIsDownloading(false);
  };



  if (!imageData) {
    return <div>Loading</div>;
  }

  const [textStyles, setTextStyles] = useState(
    imageData?.textStyles?.map((textStyle) => ({
      ...textStyle,
      fontSize: parseInt(textStyle.fontSize),
    })) || []
  );

  const [selectedImage, setSelectedImage] = useState(
    imageData?.images ? imageData.images[0].url : null
  );

  const [selectedImageTextStyles, setSelectedImageTextStyles] = useState(
    imageData?.images ? imageData.images[0].textStyles : []
  );

  const handleImageClick = (url) => {
    setSelectedImage(url);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const selectedImageData = imageData.images.find(
      (image) => image.url === url
    );

    const image = document.createElement("img"); // Create an HTMLImageElement
    image.src = url;

    image.onload = () => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Loop through the text styles of the selected image and draw the overlay markers on the canvas
      selectedImageData.textStyles.forEach((textStyle) => {
        context.fillStyle = textStyle.backgroundColor;
        context.fillRect(
          textStyle.left,
          textStyle.top,
          textStyle.width,
          textStyle.height
        );
      });

      // Update the textStyles state with the initial textStyles of the selected image
      setTextStyles(
        selectedImageData.textStyles.map((textStyle) => ({
          ...textStyle,
          fontSize: parseInt(textStyle.fontSize),
        }))
      );

      // Update the selectedImageTextStyles state with the initial textStyles of the selected image
      setSelectedImageTextStyles(selectedImageData.textStyles);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (imageData.imageType === "multiple image") {
      const selectedImageData = imageData.images.find(
        (image) => image.url === selectedImage
      );

      if (selectedImageData) {
        const image = document.createElement("img"); // Create a new instance of HTMLImageElement
        image.src = selectedImage;

        image.onload = () => {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the image on the canvas
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          // Loop through the text styles of the selected image and draw the overlay markers on the canvas
          selectedImageData.textStyles.forEach((textStyle) => {
            context.fillStyle = textStyle.backgroundColor;
            context.fillRect(
              textStyle.left,
              textStyle.top,
              textStyle.width,
              textStyle.height
            );
          });

          // Update the textStyles state with the initial textStyles of the selected image
          setTextStyles(
            selectedImageData.textStyles.map((textStyle) => ({
              ...textStyle,
              fontSize: parseInt(textStyle.fontSize),
            }))
          );

          // Update the selectedImageTextStyles state with the initial textStyles of the selected image
          setSelectedImageTextStyles(selectedImageData.textStyles);
        };
      }
    } else {
      const image = document.createElement("img"); // Create a new instance of HTMLImageElement
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
    }
  }, [imageData, selectedImage, textStyles]);

  const handleCanvasClick = (e) => {
    const canvas = document.getElementById("canvas");
    if (!canvas.contains(e.target)) {
      setSelectedTextIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#23272A]">
      <h1 className="text-center text-3xl font-bold leading-5 mt-5">Preview</h1>

      <div id="canvas" className="my-5" onClick={handleCanvasClick}>
        {/* Your canvas content */}
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-gray-500"
          width={500}
          height={500}
        ></canvas>
        {textStyles.map((textStyle, index) => (
          <div
            key={index}
            style={{
              color: "black",
              fontFamily: textStyle.fontFamily,
              fontSize: `${textStyle.fontSize}px`,
              position: "relative",
              left: `${textStyle.left}px`,
              top: `${textStyle.top}px`,
            }}
          >
            {textStyle.text}
          </div>
        ))}
      </div>

      {imageData && imageData.imageType === "multiple image" && (
        <div className="flex justify-center ">
          {imageData.images.map((image, index) => (
            <div className="flex flex-col text-center mx-3" key={index}>
              <Image
                width={0}
                height={0}
                key={image.id}
                src={image.url}
                alt={`Image ${image.id}`}
                className={`w-16 h-16 mx-1 cursor-pointer ${
                  selectedImage === image.url ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleImageClick(image.url)}
              />
              <p>Page {index + 1}</p>
            </div>
          ))}
        </div>
      )}

      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-lg shadow-sm px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            id="dropdown-button"
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            Download
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3.586L4.707 8.879a1 1 0 0 0 0 1.414l5.293 5.293a1 1 0 0 0 1.414-1.414L7.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            <div className="py-1" role="none">
              <button
                className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                role="menuitem"
                onClick={() => handleItemClick("Download as JPEG")}
              >
                Download as JPEG
              </button>
              <button
                className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                role="menuitem"
                onClick={() => handleItemClick("Download as PNG")}
              >
                Download as PNG
              </button>
              <button
                className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                role="menuitem"
                onClick={() => handleItemClick("Download as PDF")}
              >
                Download as PDF
              </button>
              <button
                className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                role="menuitem"
                onClick={() => handleItemClick("Download as GIF")}
              >
                Download as GIF
              </button>
              <button
                className="text-sm text-gray-700 block px-4 py-2 w-full text-left"
                role="menuitem"
                onClick={() => handleItemClick("Download as Video")}
              >
                Download as Video
              </button>
            </div>
          </div>
        )}
      </div>

      {isDownloading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-4">
            <p className="text-lg font-semibold">Downloading...</p>
            <div className="mt-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex mt-4 align-center justify-center">
        <Link href="/image-picker">
          <p className="bg-gray-200 rounded px-4 py-2 mr-2">Back</p>
        </Link>
        <Link href="/">
          <p className="bg-gray-200 rounded px-4 py-2">Home</p>
        </Link>
      </div>
    </div>
  );
};

export default PreviewCard;
