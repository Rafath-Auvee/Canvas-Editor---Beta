const TextStyleEditor = ({ textStyle, handleTextStyleChange }) => {
  const handleChange = (property, e) => {
    handleTextStyleChange(textStyle.index, property, e.target.value);
  };

  const handleIncrement = (property) => {
    handleTextStyleChange(textStyle.index, property, textStyle[property] + 1);
  };

  const handleDecrement = (property) => {
    handleTextStyleChange(textStyle.index, property, textStyle[property] - 1);
  };

  return (
    <div className="flex justify-center mt-4">
      <div
        className={`flex flex-col items-center mx-4 border-blue-500 border-2`}
      >
        <label htmlFor={`leftInput-${textStyle.index}`}>Left Position:</label>
        <input
          id={`leftInput-${textStyle.index}`}
          type="number"
          value={textStyle.left}
          onChange={(e) => handleChange("left", e)}
          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black"
        />
        <div className="flex mt-2">
          <button
            onClick={() => handleIncrement("left")}
            className="bg-gray-200 rounded px-2 py-1 mr-1"
          >
            +
          </button>
          <button
            onClick={() => handleDecrement("left")}
            className="bg-gray-200 rounded px-2 py-1"
          >
            -
          </button>
        </div>

        <label htmlFor={`topInput-${textStyle.index}`}>Top Position:</label>
        <input
          id={`topInput-${textStyle.index}`}
          type="number"
          value={textStyle.top}
          onChange={(e) => handleChange("top", e)}
          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black"
        />
        <div className="flex mt-2">
          <button
            onClick={() => handleIncrement("top")}
            className="bg-gray-200 rounded px-2 py-1 mr-1"
          >
            +
          </button>
          <button
            onClick={() => handleDecrement("top")}
            className="bg-gray-200 rounded px-2 py-1"
          >
            -
          </button>
        </div>

        <label htmlFor={`fontSizeInput-${textStyle.index}`}>Font Size:</label>
        <input
          id={`fontSizeInput-${textStyle.index}`}
          type="number"
          value={textStyle.fontSize}
          onChange={(e) => handleChange("fontSize", e)}
          className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black"
        />
        <div className="flex mt-2">
          <button
            onClick={() => handleIncrement("fontSize")}
            className="bg-gray-200 rounded px-2 py-1 mr-1"
          >
            +
          </button>
          <button
            onClick={() => handleDecrement("fontSize")}
            className="bg-gray-200 rounded px-2 py-1"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextStyleEditor;
