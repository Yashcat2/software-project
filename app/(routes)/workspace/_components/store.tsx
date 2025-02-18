import React from 'react';

function StoreItemList({ items, onAddToCanvas, onClose }: { 
  items: { id: string, name: string, image: string }[],
  onAddToCanvas: (item: any) => void,
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Store Items</h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
              <span>{item.name}</span>
              <button
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => onAddToCanvas(item)}
              >
                Add to Canvas
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StoreItemList;
