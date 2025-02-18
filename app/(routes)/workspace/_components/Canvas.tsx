import React, { useRef, useEffect, useState, useCallback } from "react";
import Draggable from "react-draggable";
import { useDrop } from "react-dnd";
import { LibraryItem } from "./CanvasSidebar/ComponentPanel";
import html2canvas from "html2canvas";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface CanvasComponent extends LibraryItem {
  x: number;
  y: number;
  instanceId: string;
}

interface CanvasProps {
  fileId: Id<"files">;
  onDragStart: (e: React.DragEvent<HTMLImageElement>, src: string) => void;
  draggedImage: string | null;
  onDropComplete: () => void;
  onComponentAdd?: (component: any) => void;
  components: CanvasComponent[];
}

const Canvas: React.FC<CanvasProps> = ({
  fileId,
  onDragStart,
  draggedImage,
  onDropComplete,
  onComponentAdd,
  components
}) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    if (!components) return;
    
    const initialPositions: Record<string, { x: number; y: number }> = {};
    components.forEach(comp => {
      if (comp) {
        initialPositions[comp.instanceId] = { x: comp.x, y: comp.y };
      }
    });
    setPositions(initialPositions);
  }, [components]);

  const handleDrop = (item: LibraryItem, dropX: number, dropY: number) => {
    if (onComponentAdd) {
      const newComponent = {
        ...item,
        x: dropX,
        y: dropY,
        instanceId: `${item.id}-${Date.now()}`
      };
      onComponentAdd(newComponent, 'add');
    }
    onDropComplete();
  };

  const handleDragStop = (instanceId: string, data: { x: number; y: number }) => {
    if (!components) return;

    const updatedPositions = {
      ...positions,
      [instanceId]: { x: data.x, y: data.y }
    };
    setPositions(updatedPositions);
    
    const component = components.find(comp => comp.instanceId === instanceId);
    if (component && onComponentAdd) {
      onComponentAdd({ ...component, x: data.x, y: data.y }, 'move');
    }
  };
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "libraryItem",
    drop: (item: LibraryItem, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = offset.x - rect.left;
        const y = offset.y - rect.top;
        handleDrop(item, x, y);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const saveAsPNG = () => {
    if (!canvasRef.current) return;
    html2canvas(canvasRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const printCanvas = () => {
    if (!canvasRef.current) return;
    html2canvas(canvasRef.current).then((canvas) => {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.body.innerHTML = `<img src="${canvas.toDataURL()}" style="width:100%; height:auto;">`;
        newWindow.print();
      }
    });
  };

  return (
    <div className="flex flex-col">
    <div className="w-full ml-[-20px] pr-2">
      <div
        ref={(node) => {
          drop(node);
          canvasRef.current = node;
        }}
        className={`relative bg-[#eff0f1] w-full h-[690px] ${
          isOver ? "border-2 border-blue-500" : ""
        }`}
      >
        {components?.map((item) => (
          <Draggable
            key={item.instanceId}
            defaultPosition={{ x: item.x, y: item.y }}
            position={positions[item.instanceId]}
            onStop={(e, data) => handleDragStop(item.instanceId, data)}
            bounds="parent"
            handle=".drag-handle"
          >
              <div className="absolute cursor-move">
                <div 
                  className="drag-handle w-12 h-12 relative"
                  style={{
                    backgroundImage: `url(${item.svg})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  }}
                />
                
              </div>
            </Draggable>
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={saveAsPNG}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Save as PNG
          </button>
          <button
            onClick={printCanvas}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Print Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
