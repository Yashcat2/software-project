import React from "react";
import { LibraryItems } from "./LibraryItems";
import LibraryImages from "./LibraryImages";

export interface LibraryItem {
  [x: string]: number;
  id: string;
  name: string;
  svg: string; // Path or SVG string for the image/icon
}

function ComponentPanel() {
  return (
    <div className="Pictures p-4 bg-gray-100 w-64 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Components</h2>
      <div className="grid grid-cols-2 gap-4"> {/* Grid layout with 2 columns */}
        {LibraryItems.map((pic) => (
          <div
            key={pic.id} // Unique key for each item
            className="flex flex-col items-center"
          >
            {/* Render LibraryImages */}
            <LibraryImages svg={pic.svg} id={pic.id} name={pic.name} />
            {/* Render the name below the image */}
            <p className="text-sm text-center mt-2">{pic.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentPanel;
