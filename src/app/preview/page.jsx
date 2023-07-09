"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Draggable from "react-draggable";
import dynamic from "next/dynamic";

const localStorage = typeof window !== "undefined" ? window.localStorage : null;

const PreviewCard = () => {
  const imageData = JSON.parse(localStorage.getItem("previewData"));

  if (!imageData) {
    return <div>Loading</div>;
  }

  const [showModal, setShowModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleSaveClick = () => {
    let previewData = null; // Declare the previewData variable outside the conditional statements

    if (imageData.imageType === "single image") {
      previewData = {
        imageType: imageData.imageType,
        text: textStyles[0].text,
        left: textStyles[0].left,
        top: textStyles[0].top,
        color: textStyles[0].color,
        fontSize: textStyles[0].fontSize,
        backgroundColor: textStyles[0].backgroundColor,
        padding: textStyles[0].padding,
      };
    } else if (imageData.imageType === "multiple image") {
      previewData = {
        imageType: imageData.imageType,
        images: imageData.images.map((image) => ({
          id: image.id,
          url: image.url,
          textStyles: image.textStyles.map((textStyle) => ({
            id: textStyle.id,
            text: textStyle.text,
            left: textStyle.left,
            top: textStyle.top,
            color: textStyle.color,
            fontSize: textStyle.fontSize,
            backgroundColor: textStyle.backgroundColor,
            padding: textStyle.padding,
          })),
        })),
      };
    }

    localStorage.setItem("previewData", JSON.stringify(previewData));
    // Save the preview data in localStorage

    // Navigate to the "/preview" page
    window.location.href = "/preview";
  };

  const canvasRef = useRef(null);

  const multipleImageFontSizes =
    imageData.imageType === "multiple image"
      ? imageData.images.map((image) =>
          image.textStyles.map((textStyle) => textStyle.fontSize)
        )
      : [];

  // Add a conditional check for imageData before accessing its properties
  const [textStyles, setTextStyles] = useState(
    imageData?.textStyles?.map((textStyle) => ({
      ...textStyle,
      fontSize: parseInt(textStyle.fontSize),
    })) || []
  );
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [editingTextIndex, setEditingTextIndex] = useState(null);

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

  const handleTextDragStop = (index, data) => {
    const updatedTextStyles = [...textStyles];
    updatedTextStyles[index] = {
      ...updatedTextStyles[index],
      left: data.x,
      top: data.y,
    };
    setTextStyles(updatedTextStyles);
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
            <div className="flex flex-col text-center mx-3">
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
