import React from "react";

function loading() {
  return (
    <div className="rounded-md">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((obj, idx) => (
        <div
          key={idx}
          className="p-2 bg-secondaryText/20 h-12 grid grid-cols-9 gap-6 mt-8 rounded-md "
        ></div>
      ))}
    </div>
  );
}

export default loading;
