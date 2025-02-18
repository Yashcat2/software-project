// CanvasSidebar/index.tsx
// "use client"; // Ensure it's a client component

import React, { useState } from "react";
import { LayoutGrid, Cpu, FolderPlus, Text, Package, List } from "lucide-react";
import { LibraryItems, LibraryItem, LibraryItemComponent } from "./LibraryItems";
import ComponentCatalog from "./Catalog";
// import { useRouter } from "next/router";


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CanvasSidebar(

  // const router = useRouter();

{
  onAddElement,
  toggleBudgetCalculator,
}: {
  onAddElement: (element: LibraryItem) => void;
  toggleBudgetCalculator: () => void;
}) {
  const [activePanel, setActivePanel] = useState<string | null>("components");
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [sidebarItems, setSidebarItems] = useState<LibraryItem[]>(LibraryItems);

  const togglePanel = (panelName: string) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  const handleComponentSelect = (component: LibraryItem) => {
    // Add the selected component to the sidebar items
    setSidebarItems(prev => [...prev, {
      ...component,
      id: `${component.id}-${Date.now()}` // Ensure unique ID
    }]);
  };

  return (
    <div className="flex h-full">
      {/* Main Sidebar */}
      <div className="flex flex-col space-y-8 text-gray-500 items-center p-4 bg-white border-r">
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Text
                className="text-2xl cursor-pointer hover:text-gray-700"
                onClick={() => togglePanel("text")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Text Tools</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
          <TooltipTrigger>
      <LayoutGrid
        className="text-2xl cursor-pointer hover:text-gray-700"
        onClick={() => togglePanel("grid")}
        />
    </TooltipTrigger>
            <TooltipContent>
              <p>Layout Grid</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Package
                className="text-2xl cursor-pointer hover:text-gray-700"
                onClick={() => togglePanel("components")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Components</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <FolderPlus
                className="text-2xl cursor-pointer hover:text-gray-700"
                onClick={() => setIsCatalogOpen(true)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Components</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Cpu
                className="text-2xl cursor-pointer hover:text-gray-700"
                onClick={() => togglePanel("cpu")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>System Components</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <List
                className="text-2xl cursor-pointer hover:text-gray-700"
                onClick={toggleBudgetCalculator}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Budget Calculator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Sidebar Component Panel */}
      <div >
        {activePanel === "components" && (
          <div className="grid grid-cols-2 gap-4 w-60 p-2 mr-6 ">
            {sidebarItems.map((item) => (
              <LibraryItemComponent
                key={item.id}
                item={item}
                onClick={() => onAddElement(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Component Catalog Modal */}
      <ComponentCatalog
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectComponent={handleComponentSelect}
      />
    </div>
  );
}

export default CanvasSidebar;