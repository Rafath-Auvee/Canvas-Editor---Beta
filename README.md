I want to make image editor with nextjs where I pick image from from data array. And in that image there will some text in image canvas preloaded over the image . Text will be position in the image according to value passing from data array. The image will be the background. 


<div className="flex justify-center mt-4">
        {textStyles.map((textStyle, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <label htmlFor={`leftInput-${index}`}>Left Position:</label>
            <input
              id={`leftInput-${index}`}
              type="number"
              value={textStyle.left}
              onChange={(e) => handleLeftChange(index, e)}
              className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black"
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
              className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black"
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
            className="border border-gray-300 rounded px-2 py-1 mt-1 placeholder:text-black"
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

 how can I select this textStyle.text (text) in the canvas? if select with my mouse on specific textStyle.text their input field for font size, Left Position, Top Position will show otherwise wont show the input field.  
