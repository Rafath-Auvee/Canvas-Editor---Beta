import { useEffect, useRef } from "react";

const ImageCanvas = ({
  imageData,
  textStyles,
  selectedTextIndex,
  handleTextClick,
}) => {
  const canvasRef = useRef(null);

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

  return (
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
  );
};

export default ImageCanvas;
