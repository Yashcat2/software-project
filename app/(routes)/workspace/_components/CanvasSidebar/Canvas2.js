"use client";

import { useRef, useState } from "react";
import Modal from "react-modal";

// Ensure accessibility by setting the app element
if (typeof window !== "undefined") {
  Modal.setAppElement(document.getElementById("__next"));
}

const CanvasBoard = () => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImages((prevImages) => [
            ...prevImages,
            { src: img.src, x: 50, y: 50, width: img.width / 2, height: img.height / 2 },
          ]);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleMouseDown = (event, index) => {
    const image = images[index];
    const startX = event.clientX - image.x;
    const startY = event.clientY - image.y;

    setDraggingIndex(index);
    setOffset({ x: startX, y: startY });

    const onMouseMove = (moveEvent) => {
      if (draggingIndex !== null) {
        const newX = moveEvent.clientX - offset.x;
        const newY = moveEvent.clientY - offset.y;
        setImages((prevImages) =>
          prevImages.map((img, i) =>
            i === draggingIndex ? { ...img, x: newX, y: newY } : img
          )
        );
      }
    };

    const onMouseUp = () => {
      setDraggingIndex(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const addImageFromLibrary = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImages((prevImages) => [
        ...prevImages,
        { src, x: 50, y: 50, width: img.width / 2, height: img.height / 2 },
      ]);
    };
    setLibraryOpen(false);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    images.forEach(({ src, x, y, width, height }) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        context.drawImage(img, x, y, width, height);
      };
    });

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-board.png";
    link.click();
  };

  const imageLibrary = [
    "/file.svg",
    "/globe.svg",
    "/next.svg",
    "/vercel.svg",
    "/window.svg",
    "/db.png",
  ];

  return (
    <div>
      <button onClick={() => setLibraryOpen(true)} style={{ marginBottom: "10px" }}>
        Open Image Library
      </button>
      <div
        style={{
          border: "2px dashed #ccc",
          position: "relative",
          width: "800px",
          height: "600px",
          margin: "0 auto",
          background:"#fff"
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ display: "none" }}
        />
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt="dropped"
              style={{
                position: "absolute",
                top: image.y,
                left: image.x,
                width: image.width,
                height: image.height,
                cursor: "move",
              }}
              onMouseDown={(event) => handleMouseDown(event, index)}
            />
          ))}
        </div>
      </div>
      <button onClick={saveCanvas} style={{ marginTop: "10px" }}>
        Save as PNG
      </button>

      {/* Image Library Modal */}
      <Modal
        isOpen={libraryOpen}
        onRequestClose={() => setLibraryOpen(false)}
        contentLabel="Image Library"
        style={{
          content: { width: "400px", margin: "auto" },
        }}
      >
        <h2>Image Library</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {imageLibrary.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`library-img-${index}`}
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              onClick={() => addImageFromLibrary(src)}
            />
          ))}
        </div>
        <button onClick={() => setLibraryOpen(false)} style={{ marginTop: "10px" }}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CanvasBoard;
