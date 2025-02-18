// // types/CircuitComponents.ts
// import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
// import { Id } from "@/convex/_generated/dataModel";

// export type ComponentType = "switch" | "resistor" | "capacitor" | "breaker";

// export interface SidebarItem {
//   id: string;
//   type: ComponentType;
//   name: string;
//   svg: string;
// }

// export interface CircuitElement extends ExcalidrawElement {
//   type: "svg";
//   componentType: ComponentType;
//   svg: string;
// }

// export interface CanvasProps {
//   onSaveTrigger: boolean;
//   fileId: Id<"files">;
//   fileData: any;
// }