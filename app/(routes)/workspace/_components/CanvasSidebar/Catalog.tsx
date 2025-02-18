// CanvasSidebar/Catalog.tsx
import React, { useState } from 'react';
import { X, Search, Package, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ComponentCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectComponent: (component: LibraryItem) => void;
}

const ComponentCatalog: React.FC<ComponentCatalogProps> = ({
  isOpen,
  onClose,
  onSelectComponent,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, Record<string, string>>>({});

  // Categories and components data remain the same as in your original code
  const categories = {
    all: 'All Components',
    passive: 'Passive Components',
    active: 'Active Components',
    protection: 'Protection Devices',
    connectors: 'Connectors'
  };

  const components = {
    passive: [
      {
        id: '1',
        name: 'Resistor',
        svg: '/components/a1.png',
        price: 50.00,
        specs: {
          resistance: ['10Ω', '100Ω', '1kΩ', '10kΩ'],
          power: ['1/4W', '1/2W', '1W'],
          tolerance: ['±1%', '±5%']
          
        },
        description: 'Standard through-hole resistor for general-purpose applications'
      },
      {
        id: '2',
        name: 'Resistor2',
        svg: '/components/a1.png',
        price: 500.00,
        specs: {
          resistance: ['10Ω', '100Ω', '1kΩ', '10kΩ'],
          power: ['1/4W', '1/2W', '1W'],
          tolerance: ['±1%', '±5%']
          
        },
        description: 'Standard through-hole resistor for general-purpose applications'
      },
      // ... other passive components
    ],
    active: [
      // ... active components
    ],
    protection: [
      // ... protection components
    ]
  };

  const handleSpecSelect = (componentId: string, specType: string, value: string) => {
    setSelectedSpecs(prev => ({
      ...prev,
      [componentId]: {
        ...(prev[componentId] || {}),
        [specType]: value
      }
    }));
  };

  const handleAddToSidebar = (component: any) => {
    const specs = selectedSpecs[component.id];
    const updatedPrice = calculatePrice(component, specs);
    
    onSelectComponent({
      ...component,
      selectedSpecs: specs,
      price: updatedPrice,
    });
  };

  const calculatePrice = (component: any, specs: any) => {
    let basePrice = component.price;
    if (specs?.power?.includes('1W')) basePrice *= 1.5;
    if (specs?.tolerance?.includes('±1%')) basePrice *= 1.2;
    return basePrice;
  };

  const filteredComponents = Object.entries(components).flatMap(([category, items]) => {
    if (activeCategory !== 'all' && activeCategory !== category) return [];
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleSpecs = (componentId: string) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [componentId]: !prev[componentId]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              <span>Component Catalog</span>
            </div>
            {/* <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button> */}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 p-4">
          {/* Categories sidebar */}
          <div className="w-48 space-y-2">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeCategory === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search bar */}
            <div className="mb-4 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>

            {/* Components grid */}
            <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-4">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Component header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={component.svg}
                      alt={component.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{component.name}</h3>
                      <p className="text-sm text-gray-600">{component.description}</p>
                      <p className="text-sm font-semibold mt-1">
                        Base Price: LKR {component.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Specifications toggle */}
                  <button
                    onClick={() => toggleSpecs(component.id)}
                    className="w-full mt-2 flex items-center justify-between text-sm text-blue-600 hover:text-blue-700"
                  >
                    {expandedSpecs[component.id] ? (
                      <>
                        <span>Hide specifications</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Show specifications</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Specifications selection */}
                  {expandedSpecs[component.id] && (
                    <div className="mt-2 space-y-2">
                      {Object.entries(component.specs).map(([key, values]) => (
                        <div key={key} className="space-y-1">
                          <label className="text-sm font-medium capitalize">
                            {key}:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {values.map((value) => (
                              <button
                                key={value}
                                onClick={() => handleSpecSelect(component.id, key, value)}
                                className={`px-3 py-1 text-sm rounded-full ${
                                  selectedSpecs[component.id]?.[key] === value
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 hover:bg-blue-50'
                                }`}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {/* Add to Sidebar button */}
                      <button
                        onClick={() => handleAddToSidebar(component)}
                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add to Sidebar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentCatalog;