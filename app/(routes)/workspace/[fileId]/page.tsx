"use client";
import React, { useCallback, useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import BudgetCalculator from "../_components/BudgetCalculator";
import { useConvex } from "convex/react";
import CanvasSidebar from "../_components/CanvasSidebar";
import Canvas from "../_components/Canvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LibraryItem } from "../_components/CanvasSidebar/ComponentPanel";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Undo2, Redo2 } from 'lucide-react';
import { FadingDots } from "react-cssfx-loading";

// Extend LibraryItem interface with canvas-specific properties
// Update CanvasComponent to accept more complex types like specs
// Assuming LibraryItem already has an index signature like this:
// interface LibraryItem {
//   [key: string]: string | number;
// }

interface CanvasComponent extends LibraryItem {
  x: number;
  y: number;
  instanceId: string;
  specs?: { 
    power: string[];
    resistance: string[];
    tolerance: string[];
  }; // Optional specs property
  // Allowing string or number for any other properties
  [key: string]: string | number | { power: string[]; resistance: string[]; tolerance: string[] } | undefined;
}


interface HistoryAction {
  type: 'add' | 'remove' | 'move' | 'quantity';
  components: CanvasComponent[];
  componentId?: string;
  previousState?: CanvasComponent[];
}

const Workspace: React.FC<{ params: { fileId: string } }> = ({ params }) => {
  const convex = useConvex();
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(true);

  const toggleBudgetCalculator = useCallback(() => {
    setShowBudgetCalculator(prev => !prev);
  }, []);

  const [history, setHistory] = useState<HistoryAction[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const loadState = async () => {
      try {
        setLoading(true);
        const state = await convex.query(api.files.getFileById, {
          fileId: params.fileId as Id<"files">
        });
        
        if (state?.canvasComponents && state.canvasComponents.length > 0) {
          // Transform the data to ensure it matches CanvasComponent interface
          const validComponents = state.canvasComponents.map(comp => ({
            ...comp, // Spread all properties to maintain index signature compatibility
            x: typeof comp.x === 'number' ? comp.x : 0,
            y: typeof comp.y === 'number' ? comp.y : 0,
            instanceId: comp.instanceId || `${comp.id}-${Date.now()}`
          }));
          
          setComponents(validComponents);
          setHistory([{ type: 'add', components: validComponents }]);
          setCurrentStep(0);
        }
      } catch (error) {
        console.error("Error loading state:", error);
        toast.error("Failed to load workspace");
      } finally {
        setLoading(false);
      }
    };
    if (params.fileId) {
      loadState();
    }
  }, [convex, params.fileId]);

  const addToHistory = useCallback((newComponents: CanvasComponent[], actionType: HistoryAction['type'], componentId?: string) => {
    const previousState = components;
    setHistory(prev => [...prev.slice(0, currentStep + 1), {
      type: actionType,
      components: newComponents,
      componentId,
      previousState
    }]);
    setCurrentStep(prev => prev + 1);
    setComponents(newComponents);
  }, [currentStep, components]);

  const handleComponentAdd = useCallback((component: LibraryItem) => {
    const canvasComponent: CanvasComponent = {
      ...component,
      x: Math.random() * 500 + 50,
      y: Math.random() * 300 + 50,
      instanceId: `${component.id}-${Date.now()}-${Math.random()}`,
      specs: component.specs // Assuming specs is optional in LibraryItem
    };

    setComponents(prev => {
      const existingIndex = prev.findIndex(comp => comp.instanceId === canvasComponent.instanceId);
      const newComponents = existingIndex !== -1
        ? prev.map((comp, index) => index === existingIndex ? canvasComponent : comp)
        : [...prev, canvasComponent];
      
      addToHistory(newComponents, 'add', canvasComponent.instanceId);
      return newComponents;
    });
  }, [addToHistory]);

  const handleRemoveItem = useCallback((id: string) => {
    setComponents(prev => {
      const newComponents = prev.filter(comp => comp.id !== id);
      addToHistory(newComponents, 'remove', id);
      return newComponents;
    });
  }, [addToHistory]);

  const handleUndo = useCallback(() => {
    if (currentStep > 0) {
      const previousAction = history[currentStep - 1];
      setCurrentStep(prev => prev - 1);
      setComponents(previousAction.components);
    }
  }, [currentStep, history]);

  const handleRedo = useCallback(() => {
    if (currentStep < history.length - 1) {
      const nextAction = history[currentStep + 1];
      setCurrentStep(prev => prev + 1);
      setComponents(nextAction.components);
    }
  }, [currentStep, history]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const budget = {
        total: components.reduce((sum, item) => Number(sum) + Number(item.price), 0),
        items: Array.from(
          components.reduce((map, item) => {
            const existing = map.get(item.id);
            if (existing) {
              existing.quantity += 1;
            } else {
              map.set(item.id, {
                id: item.id,
                name: item.name,
                quantity: 1,
                price: item.price
              });
            }
            return map;
          }, new Map())
        ).map(([_, item]) => item)
      };

      await convex.mutation(api.files.saveCanvasState, {
        fileId: params.fileId as Id<"files">,
        components,
        budget
      });

      toast.success("Workspace saved successfully");
    } catch (error) {
      console.error("Error saving workspace:", error);
      toast.error("Failed to save workspace");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><FadingDots width="50px" height="50px" duration="0.3s"/></div>;
  }

  return (
    <div>
      <WorkspaceHeader 
        onSave={handleSave} 
        fileName={params.fileId} 
        saving={saving}
      />
      <div className="flex justify-start gap-2 m-2 ml-4">
        <button
          onClick={handleUndo}
          disabled={currentStep <= 0}
          className={`p-2 rounded ${currentStep <= 0 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          <Undo2 size={20} />
        </button>
        <button
          onClick={handleRedo}
          disabled={currentStep >= history.length - 1}
          className={`p-2 rounded ${currentStep >= history.length - 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          <Redo2 size={20} />
        </button>
      </div>
      
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-[1fr_16fr] gap-0">
          <CanvasSidebar 
            onAddElement={handleComponentAdd}
            toggleBudgetCalculator={toggleBudgetCalculator} 
          />
          <Canvas
            fileId={params.fileId as Id<"files">}
            components={components}
            onComponentAdd={handleComponentAdd}
            onDragStart={(e, src) => setDraggedImage(src)}
            draggedImage={draggedImage}
            onDropComplete={() => setDraggedImage(null)}
          />
          <div
            className={`border-l-2 transition-transform duration-300 ${
              showBudgetCalculator ? "translate-x-0" : "translate-x-full"
            } fixed right-0 top-0 h-full w-60 bg-white shadow-lg z-50`}
          >
            <BudgetCalculator
              items={components}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClose={toggleBudgetCalculator}
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default Workspace;
