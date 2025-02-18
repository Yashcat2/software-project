// CanvasSidebar/LibraryItems.tsx
// "useclient"
import React from "react";
import { useDrag } from "react-dnd";

export interface LibraryItem {
  id: string;
  name: string;
  svg: string;
  price: number;
}

export const LibraryItems: LibraryItem[] = [
  {
    id: "1",
    name: "Resistor",
    svg: "/components/a1.png",
    price: 50.00
  },
  {
    id: "2",
    name: "Capacitor",
    svg: "/components/a2.png",
    price: 75.00
  },
  {
    id: "3",
    name: "Switch",
    svg: "/components/a3.png",
    price: 120.00
  },
  {
    id: "4",
    name: "Breaker",
    svg: "/components/a1.png",
    price: 200.00
  }
  ,
  {
    id: "5",
    name: "Breaker-2",
    svg: "/components/a1.png",
    price: 200.00
  },
  {
    id: "6",
    name: "Switch-2",
    svg: "/components/a3.png",
    price: 120.00
  },
  {
    id: "7",
    name: "Breaker-2",
    svg: "/components/a1.png",
    price: 200.00
  }
  
];


export const LibraryItemComponent: React.FC<{
  item: LibraryItem;
  onClick?: (item: LibraryItem) => void;
}> = ({ item, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "libraryItem",
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-pointer p-3  border rounded bg-white shadow text-center ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onClick?.(item)}
    >
      <img 
        src={item.svg} 
        alt={item.name} 
        className="w-12 h-12 mx-auto" 
      />
      <p className="text-sm mt-2">{item.name}</p>
      <p className="text-xs text-gray-600">LKR {item.price}</p>
    </div>
  );
};