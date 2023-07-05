const TextStyleEditor = ({ textStyle, handleTextStyleChange }) => {
    const handleChange = (property, e) => {
      handleTextStyleChange(textStyle.index, { [property]: e.target.value });
    };
  
    const handleIncrement = (property) => {
      handleTextStyleChange(textStyle.index, { [property]: textStyle[property] + 1 });
    };
  
    const handleDecrement = (property) => {
      handleTextStyleChange(textStyle.index, { [property]: textStyle[property] - 1 });
    };
  
    return (
      <div className="flex justify-center my-4">
        <div className="flex flex-row items-center mx-4 gap-10 px-5 py-2 bg-blue-400 text-blue-800 rounded border-blue-500 border-2">
          <div className="flex items-center mb-2">
            <p className="mr-5 font-bold">Vertical</p>
            <input
              id={`leftInput-${textStyle.index}`}
              type="number"
              value={textStyle.left}
              onChange={(e) => handleChange("left", e)}
              className="border border-gray-300 rounded px-1 py-1 mr-1 text-black w-16"
              placeholder="Left"
            />
            <button onClick={() => handleIncrement("left")} className="bg-gray-200 rounded px-2 py-1 mr-1">
              +
            </button>
            <button onClick={() => handleDecrement("left")} className="bg-gray-200 rounded px-2 py-1">
              -
            </button>
          </div>
  
          <div className="flex items-center mb-2">
            <p className="mr-5 font-bold">Horizontal</p>
            <input
              id={`topInput-${textStyle.index}`}
              type="number"
              value={textStyle.top}
              onChange={(e) => handleChange("top", e)}
              className="border border-gray-300 rounded px-1 py-1 mr-1 text-black w-16"
              placeholder="Top"
            />
            <button onClick={() => handleIncrement("top")} className="bg-gray-200 rounded px-2 py-1 mr-1">
              +
            </button>
            <button onClick={() => handleDecrement("top")} className="bg-gray-200 rounded px-2 py-1">
              -
            </button>
          </div>
  
          <div className="flex items-center mb-2">
            <p className="mr-5 font-bold">Font Size</p>
            <input
              id={`fontSizeInput-${textStyle.index}`}
              type="number"
              value={textStyle.fontSize}
              onChange={(e) => handleChange("fontSize", e)}
              className="border border-gray-300 rounded px-1 py-1 mr-1 text-black w-16"
              placeholder="Font Size"
            />
            <button onClick={() => handleIncrement("fontSize")} className="bg-gray-200 rounded px-2 py-1 mr-1">
              +
            </button>
            <button onClick={() => handleDecrement("fontSize")} className="bg-gray-200 rounded px-2 py-1">
              -
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TextStyleEditor;
  