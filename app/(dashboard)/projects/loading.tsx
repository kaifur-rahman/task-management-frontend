import React from "react";

function Loading() {
  return (
    <div className="flex h-auto flex-row gap-8 p-2 pb-4 flex-wrap w-full items-center mt-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((obj, idx) => (
        <div
          key={idx}
          className=" bg-secondaryText/20 w-[22rem] h-auto min-h-[10rem] rounded-xl"
        ></div>
      ))}
    </div>
  );
}

export default Loading;
