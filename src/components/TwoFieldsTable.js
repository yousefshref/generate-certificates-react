import React from "react";

const TwoFieldsTable = ({
  topRightArbic,
  topRightEnglish,

  topLeftArbic,
  topLeftEnglish,

  bottomLeft,
  bottomRight,

  marginTop,
  noBorderB,

  topLeft,
  setTopLeft,
  topRight,
  setTopRight,
}) => {
  return (
    <div
      style={{
        fontWeight: "400",
      }}
      className={`w-[87%] ${marginTop ? marginTop : "mt-[1.5vw]"} flex ${
        noBorderB ? "border-b-0" : ""
      } border border-black border-opacity-70 flex-col mx-auto text-[1.6vw] justify-between`}
    >
      <div className="flex justify-between bg-[#e6e7e8]">
        <div
          className={`${
            noBorderB ? "border-b-0" : ""
          } flex border-r border-black border-opacity-70 w-full flex-col justify-center text-center`}
        >
          <p>{topLeftArbic}</p>
          <p className="text-[1.3vw]">{topLeftEnglish}</p>
        </div>
        <div className={`flex w-full justify-center flex-col text-center`}>
          <p>{topRightArbic}</p>
          <p className="text-[1.3vw]">{topRightEnglish}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div
          className={`${
            noBorderB ? "border-b-0" : ""
          } flex border-r border-black border-opacity-70 w-full justify-center py-0.5 flex-col text-center`}
        >
          {/* <p className="text-[1.3vw]">{bottomLeft}</p> */}
          <input
            type="text"
            placeholder="Write here..."
            value={topLeft}
            onChange={(e) => setTopLeft(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-center py-0.5 flex-col text-center">
          {/* <p className="text-[1.3vw] text-center flex flex-col justify-center">
            {bottomRight}
          </p> */}
          <input
            type="text"
            placeholder="Write here..."
            value={topRight}
            onChange={(e) => setTopLeft(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TwoFieldsTable;
