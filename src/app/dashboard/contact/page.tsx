"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Save,
  Share2,
  RotateCcw,
  ShoppingCart,
  Grid,
  List,
  User,
  EyeOff,
  Eye,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Cpu,
  HardDrive,
  Fan,
  CircuitBoard,
  MemoryStick,
  Gamepad2,
  Database,
  Disc,
  Power,
  Shirt,
  Monitor,
} from "lucide-react";
import { Checkbox } from "@/src/components/ui/checkbox";
import React from "react";
import Image from "next/image";

const categories = [
  { name: "Base system", icon: <HardDrive className="h-5 w-5" /> },
  { name: "Case", icon: <HardDrive className="h-5 w-5" /> },
  { name: "Processor", icon: <Cpu className="h-5 w-5" /> },
  { name: "CPU Cooler", icon: <Fan className="h-5 w-5" /> },
  { name: "Motherboard", icon: <CircuitBoard className="h-5 w-5" /> },
  { name: "RAM", icon: <MemoryStick className="h-5 w-5" /> },
  { name: "GPU", icon: <Gamepad2 className="h-5 w-5" /> },
  { name: "SSD", icon: <Database className="h-5 w-5" /> },
  { name: "HDD", icon: <Disc className="h-5 w-5" /> },
  { name: "PSU", icon: <Power className="h-5 w-5" /> },
  { name: "Sleeves", icon: <Shirt className="h-5 w-5" /> },
  { name: "OS", icon: <Monitor className="h-5 w-5" /> },
];

const generateProperties = (category: string) => {
  const propertyCount = 5; // Fixed number of properties
  const valueCount = 3; // Fixed number of values per property
  const properties: Record<string, string[]> = {};

  for (let i = 0; i < propertyCount; i++) {
    const propertyName = `${category} Property ${i + 1}`;
    properties[propertyName] = Array.from(
      { length: valueCount },
      (_, j) => `Value ${j + 1}`
    );
  }

  return properties;
};

const generateMockComponents = (
  category: string,
  properties: Record<string, string[]>
) => {
  const fixedPrice = 300; // Fixed price for all components
  const fixedImageSize = { height: 200, width: 200 }; // Fixed image dimensions

  return Array.from({ length: 6 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    name: `${category} ${i + 1}`,
    price: fixedPrice,
    image: `../images/placeholder.svg?height=${fixedImageSize.height}&width=${
      fixedImageSize.width
    }&text=${category}${i + 1}`,
    properties: Object.fromEntries(
      Object.entries(properties).map(([key, values]) => [
        key,
        values[0], // Always select the first value for each property
      ])
    ),
  }));
};

export default function Component() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const [selectedComponents, setSelectedComponents] = useState<
    Record<string, { name: string; price: number }>
  >({});
  const [isAMD, setIsAMD] = useState(false);
  const [gpuBrand, setGpuBrand] = useState<"Nvidia" | "AMD" | "Intel" | null>(
    null
  );
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [isMobileSelectedOpen, setIsMobileSelectedOpen] = useState(false);
  const [categoryProperties, setCategoryProperties] = useState<
    Record<string, Record<string, string[]>>
  >({});
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<
    "grid3" | "grid2" | "grid1" | "list"
  >("grid3");
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [openFilterProperty, setOpenFilterProperty] = useState<string | null>(
    null
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const newProperties = generateProperties(selectedCategory);
    setCategoryProperties((prev) => ({
      ...prev,
      [selectedCategory]: newProperties,
    }));
    setFilters(
      Object.fromEntries(
        Object.entries(newProperties).map(([key, values]) => [key, values])
      )
    );
    setCompareList([]);
    setIsComparing(false);
  }, [selectedCategory]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const selectComponent = (
    category: string,
    component: { name: string; price: number }
  ) => {
    setSelectedComponents((prev) => ({ ...prev, [category]: component }));
  };

  const deselectComponent = (category: string) => {
    setSelectedComponents((prev) => {
      const newComponents = { ...prev };
      delete newComponents[category];
      return newComponents;
    });
  };

  const totalPrice = Object.values(selectedComponents).reduce(
    (sum, component) => sum + component.price,
    0
  );

  const getCategoryName = (category: string) => {
    if (["Processor", "CPU Cooler", "Motherboard"].includes(category)) {
      return `${category} ${isAMD ? "AMD" : "Intel"}`;
    }
    if (category === "GPU" && gpuBrand) {
      return `${category} ${gpuBrand}`;
    }
    return category;
  };

  const handleSaveBuild = () => {
    toast.success("The current build has been saved to your profile.");
  };

  const handleShareBuild = () => {
    toast.info("Copy the URL to share this build with others");
  };

  const handleStartOver = () => {
    if (
      window.confirm("Are you sure you want to clear all current selections?")
    ) {
      setSelectedComponents({});
      setIsAMD(false);
      setGpuBrand(null);
    }
  };

  const handleAddToCart = () => {
    setCartTotal(totalPrice);
    toast.success("Build added to cart successfully!");
  };

  const toggleMobileCategory = () => {
    setIsMobileCategoryOpen(!isMobileCategoryOpen);
    setIsMobileSelectedOpen(false);
  };

  const toggleMobileSelected = () => {
    setIsMobileSelectedOpen(!isMobileSelectedOpen);
    setIsMobileCategoryOpen(false);
  };

  const handleFilterChange = (property: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value === "all") {
        newFilters[property] = categoryProperties[selectedCategory][property];
      } else if (value === "none") {
        newFilters[property] = [];
      } else {
        if (newFilters[property].includes(value)) {
          newFilters[property] = newFilters[property].filter(
            (v) => v !== value
          );
        } else {
          newFilters[property] = [...newFilters[property], value];
        }
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters(
      Object.fromEntries(
        Object.entries(categoryProperties[selectedCategory]).map(
          ([key, values]) => [key, values]
        )
      )
    );
    setOpenFilterProperty(null);
  };

  const filteredComponents = generateMockComponents(
    selectedCategory,
    categoryProperties[selectedCategory] || {}
  ).filter((component) => {
    return Object.entries(filters).every(([property, values]) => {
      return values.includes(component.properties[property]);
    });
  });

  const handleCompareToggle = (componentId: string) => {
    setCompareList((prev) => {
      if (prev.includes(componentId)) {
        const newList = prev.filter((id) => id !== componentId);
        if (isComparing && newList.length <= 1) {
          setIsComparing(false);
          return [];
        }
        return newList;
      } else {
        return [...prev, componentId];
      }
    });
  };

  const toggleCompare = () => {
    setIsComparing(!isComparing);
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsComparing(false);
  };

  const handleFilterPropertyClick = (property: string) => {
    setOpenFilterProperty((prev) => (prev === property ? null : property));
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "" : "bg-white"
      } text-foreground`}
    >
      <main className="flex flex-col sm:flex-row h-[calc(100vh-4rem)]">
        {/* Desktop/Tablet Left Sidebar */}
        <div
          className={`hidden sm:block border-r border-border relative transition-all duration-300 ${
            isLeftOpen ? "w-64" : "w-20"
          } h-full overflow-hidden`}
        >
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <ul className="space-y-2 p-4">
              {categories.map((category) => (
                <li key={category.name} className="flex items-center">
                  <Button
                    variant={
                      category.name === selectedCategory ? "default" : "ghost"
                    }
                    className={`w-full justify-start ${
                      isLeftOpen ? "" : "p-2"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.icon}
                    {isLeftOpen && (
                      <span className="ml-2">
                        {getCategoryName(category.name)}
                        {category.name === "Base system" && (
                          <span className="ml-2 text-sm">
                            {isAMD ? "AMD" : "Intel"}
                          </span>
                        )}
                      </span>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      isLeftOpen ? "" : "p-2"
                    }`}
                  >
                    <User className="h-5 w-5" />
                    {isLeftOpen && <span className="ml-2">My Account</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Login/out</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Saved builds</DropdownMenuItem>
                  <DropdownMenuItem>Account details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -right-4 z-10 sm:flex hidden"
            onClick={() => setIsLeftOpen(!isLeftOpen)}
          >
            {isLeftOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Top Bar */}
        <div className="sm:hidden sticky top-0 z-10 bg-background border-b border-border">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center p-4"
            onClick={toggleMobileCategory}
          >
            <span>Categories</span>
            {isMobileCategoryOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Category Dropdown */}
        {isMobileCategoryOpen && (
          <div className="sm:hidden absolute top-[56px] left-0 right-0 bg-background z-20 border-b border-border h-[calc(100vh-8rem)] overflow-y-auto">
            <ul className="p-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Button
                    variant={
                      category.name === selectedCategory ? "default" : "ghost"
                    }
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setIsMobileCategoryOpen(false);
                    }}
                  >
                    {category.icon}
                    <span className="ml-2">
                      {getCategoryName(category.name)}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <section
          className={`flex-1 overflow-y-auto scrollbar-hide transition-all duration-300 ${
            isLeftOpen ? "sm:ml-0" : "sm:-ml-1/5"
          }`}
        >
          <div className="sticky top-0 bg-background z-10 p-4 border-b border-border">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold mr-4">
                  {getCategoryName(selectedCategory)}
                </h2>
                {selectedCategory === "Base system" && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Intel</span>
                    <Switch
                      checked={isAMD}
                      onCheckedChange={() => setIsAMD((prev) => !prev)}
                      className={`${isAMD ? "bg-red-500" : "bg-blue-500"}`}
                    />
                    <span className="text-sm">AMD</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setAreFiltersVisible(!areFiltersVisible)}
                >
                  {areFiltersVisible ? (
                    <EyeOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  {areFiltersVisible ? "Hide filters" : "Show filters"}
                </Button>
                {compareList.length >= 2 && (
                  <Button
                    variant="outline"
                    onClick={isComparing ? clearCompare : toggleCompare}
                  >
                    {isComparing ? "Clear compare" : "Compare selected"}
                  </Button>
                )}
                <div className="hidden sm:flex space-x-2">
                  <Button
                    variant={viewMode === "grid3" ? "default" : "outline"}
                    onClick={() => setViewMode("grid3")}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="ml-2">3</span>
                  </Button>
                  <Button
                    variant={viewMode === "grid2" ? "default" : "outline"}
                    onClick={() => setViewMode("grid2")}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="ml-2">2</span>
                  </Button>
                  <Button
                    variant={viewMode === "grid1" ? "default" : "outline"}
                    onClick={() => setViewMode("grid1")}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="ml-2">1</span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            {areFiltersVisible && (
              <div className="flex flex-wrap gap-2 mb-2">
                {Object.entries(categoryProperties[selectedCategory] || {}).map(
                  ([property, values]) => (
                    <Select
                      key={property}
                      value={filters[property]?.join(",")}
                      onValueChange={(value) =>
                        handleFilterChange(property, value)
                      }
                      open={openFilterProperty === property}
                      onOpenChange={() => handleFilterPropertyClick(property)}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={property}>
                          {property}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          <Checkbox
                            checked={
                              filters[property]?.length === values.length
                            }
                          />{" "}
                          All
                        </SelectItem>
                        {values.map((value) => (
                          <SelectItem key={value} value={value}>
                            <Checkbox
                              checked={filters[property]?.includes(value)}
                            />{" "}
                            {value}
                          </SelectItem>
                        ))}
                        <SelectItem value="none">
                          <Checkbox checked={filters[property]?.length === 0} />{" "}
                          None
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )
                )}
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          <div
            className={`p-4 ${
              viewMode === "grid3"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : viewMode === "grid2"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : viewMode === "grid1"
                ? "grid grid-cols-1 gap-4"
                : "space-y-4"
            }`}
          >
            {filteredComponents
              .filter(
                (component) =>
                  !isComparing || compareList.includes(component.id)
              )
              .map((component, index) =>
                viewMode === "list" ? (
                  <div
                    key={index}
                    className="flex items-center border border-border rounded-lg p-4 shadow-md"
                  >
                    <Image
                      src={component.image}
                      alt={component.name}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{component.name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(component.properties).map(
                          ([key, value]) => (
                            <React.Fragment key={key}>
                              <span className="font-medium">{key}:</span>
                              <span>{value}</span>
                            </React.Fragment>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-4">
                      <div className="flex items-center mb-2">
                        <Checkbox
                          checked={compareList.includes(component.id)}
                          onCheckedChange={() =>
                            handleCompareToggle(component.id)
                          }
                          className="mr-2"
                        />
                        <span className="text-sm">Select for compare</span>
                      </div>
                      <span className="text-sm text-muted-foreground mb-2">
                        Add-on price: ${component.price.toFixed(2)}
                      </span>
                      <Button
                        className={`${
                          selectedComponents[selectedCategory]?.name ===
                          component.name
                            ? "bg-gradient-to-r from-[#1B2845] to-[#2B4162]"
                            : "bg-gradient-to-r from-[#2B4162] to-[#385F8F]"
                        } text-white`}
                        onClick={() =>
                          selectedComponents[selectedCategory]?.name ===
                          component.name
                            ? deselectComponent(selectedCategory)
                            : selectComponent(selectedCategory, component)
                        }
                      >
                        {selectedComponents[selectedCategory]?.name ===
                        component.name
                          ? "Deselect"
                          : "Select"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 shadow-md"
                  >
                    <img
                      src={component.image}
                      alt={component.name}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="font-semibold">{component.name}</h3>
                    <ul className="list-disc list-inside text-xs mb-2">
                      {Object.entries(component.properties).map(
                        ([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        )
                      )}
                    </ul>
                    <div className="flex flex-col items-start mt-2">
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center">
                          <Checkbox
                            checked={compareList.includes(component.id)}
                            onCheckedChange={() =>
                              handleCompareToggle(component.id)
                            }
                            className="mr-2"
                          />
                          <span className="text-sm">Select for compare</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Add-on price: ${component.price.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        className={`w-full ${
                          selectedComponents[selectedCategory]?.name ===
                          component.name
                            ? "bg-gradient-to-r from-[#1B2845] to-[#2B4162]"
                            : "bg-gradient-to-r from-[#2B4162] to-[#385F8F]"
                        } text-white`}
                        onClick={() =>
                          selectedComponents[selectedCategory]?.name ===
                          component.name
                            ? deselectComponent(selectedCategory)
                            : selectComponent(selectedCategory, component)
                        }
                      >
                        {selectedComponents[selectedCategory]?.name ===
                        component.name
                          ? "Deselect"
                          : "Select"}
                      </Button>
                    </div>
                  </div>
                )
              )}
          </div>
        </section>

        {/* Desktop/Tablet Right Sidebar */}
        <div className="hidden sm:block border-l border-border  w-64 h-full overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                Selected Components
              </h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className="flex justify-between items-center"
                  >
                    {category.icon}
                    <span className="ml-2 flex-grow text-left">
                      {selectedComponents[category.name]?.name ||
                        "Not selected"}
                    </span>
                    <span>
                      $
                      {selectedComponents[category.name]?.price.toFixed(2) ||
                        "0.00"}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant="outline"
                    onClick={handleSaveBuild}
                    className="flex-1 bg-[#2B4162] text-white"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareBuild}
                    className="flex-1 bg-[#2B4162] text-white"
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
                <Button
                  variant="default"
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="sm:hidden sticky bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="flex justify-between items-center p-4">
            <Button
              variant="ghost"
              className="flex items-center"
              onClick={toggleMobileSelected}
            >
              <span className="mr-2">Total: ${totalPrice.toFixed(2)}</span>
              {isMobileSelectedOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="default"
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>

        {/* Mobile Selected Components Dropdown */}
        {isMobileSelectedOpen && (
          <div className="sm:hidden absolute bottom-[56px] left-0 right-0 bg-background z-20 border-t border-border h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">
                Selected Components
              </h2>
              <ul className="space-y-2 mb-4">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className="flex justify-between items-center"
                  >
                    {category.icon}
                    <span className="ml-2 flex-grow text-left">
                      {selectedComponents[category.name]?.name ||
                        "Not selected"}
                    </span>
                    <span>
                      $
                      {selectedComponents[category.name]?.price.toFixed(2) ||
                        "0.00"}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-2 mb-4">
                <Button
                  variant="outline"
                  onClick={handleSaveBuild}
                  className="flex-1 bg-[#2B4162] text-white"
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShareBuild}
                  className="flex-1 bg-[#2B4162] text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
