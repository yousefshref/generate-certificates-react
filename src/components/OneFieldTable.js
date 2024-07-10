import React from "react";

const OneFieldsTable = ({
  marginTop,
  topArabic,
  topEnglish,
  bottom,
  boldBottom,
  noBorderBottom,
  noBorderR,
  noBorderB,
  noBorderL,
  noBorderT,

  state,
  setState,
}) => {
  return (
    <div
      style={{
        fontWeight: "400",
      }}
      className={`w-full ${marginTop ? marginTop : "mt-[1.5vw]"} flex ${
        noBorderBottom ? "border-0" : "border-r border-black border-opacity-70"
      } ${noBorderB ? "border-b-0" : ""} ${noBorderL ? "border-l-0" : ""}
      ${noBorderT ? "border-t-0" : ""}
      ${noBorderR ? "border-r-0" : ""} 
      border border-black border-opacity-70 flex-col mx-auto text-[1.6vw] justify-between`}
    >
      <div
        className={`flex justify-between px-1 bg-[#e6e7e8] ${
          noBorderBottom
            ? `${
                noBorderR ? "border-none" : "border-r"
              } border-black border-opacity-70`
            : "border-0"
        }`}
      >
        <div className="flex w-full justify-center flex-col text-center">
          <p>{topArabic}</p>
          <p className="text-[1.3vw]">{topEnglish}</p>
        </div>
      </div>
      <div className="flex justify-between bg-white">
        <div className="flex w-full justify-center py-0.5 flex-col text-center">
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            placeholder="Enter here..."
          />
        </div>
      </div>
    </div>
  );
};

export default OneFieldsTable;
