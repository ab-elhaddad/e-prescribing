import React from "react";

const CircleItem = () => {
  return (
    <div className="hidden md:block overflow-hidden absolute -bottom-10 left-0">
      <div
        style={{
          width: "90vw",
          aspectRatio: "1/1",
          marginTop: "100vh",
          marginLeft: "-35vw",
          zIndex: -99,
        }}
        className="bg-sky-600 rounded-full"
      ></div>
    </div>
  );
};

export default CircleItem;
