import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed bg-opacity-60 inset-0 flex items-center justify-center bg-white">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
