import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Grid, Image, Share2, ChevronDown } from "lucide-react";
import { Card } from "./components/ui/Card.tsx";
import { Frame, EditOverlay, NavButton } from "./Frame.jsx";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { mockProductData } from "./mocks/mockProductData.js";

export default function PhotoFrameApp() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  // const [frameColor, setFrameColor] = useState('black');
  const [size, setSize] = useState("4x6");
  const [mat, setMat] = useState(true);
  const [matColor, setMatColor] = useState("white");
  const [matWidth, setMatWidth] = useState(10);
  // const [customText, setCustomText] = useState('');
  const [selectedMatType, setSelectedMatType] = useState("Standard");
  const [material, setMaterial] = useState("White");
  const [isEditing, setIsEditing] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activePanel, setActivePanel] = useState("materials");
  const [frameText, setFrameText] = useState("");
  const [matCaption, setMatCaption] = useState("");
  const [storyPocket, setStoryPocket] = useState("");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [textAlign, setTextAlign] = useState("center");
  const [printPaper, setPrintPaper] = useState("photo");
  const [isMobile, setIsMobile] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [variants, setVariants] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productData, setProductData] = useState(null);
  const [matStyle, setMatStyle] = useState("classic"); // 'classic', 'linen', 'accent'
  const [hasAccentMat, setHasAccentMat] = useState(false);
  const [accentMatColor, setAccentMatColor] = useState("marigold");
  const [rate, setRate] = useState({ rateX: 1, rateY: 1 });

  const Toggle = ({ checked, onChange }) => (
    <button
      className={`w-11 h-6 rounded-full p-1 transition-colors ${
        checked ? "bg-black" : "bg-gray-200"
      }`}
      onClick={() => onChange(!checked)}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  const matStyleOptions = {
    classic: {
      name: "Classic",
      colors: {
        white: { name: "White", hex: "#FFFFFF" },
        ivory: { name: "Ivory", hex: "#FFFFF0" },
        black: { name: "Black", hex: "#000000" },
        gray: { name: "Gray", hex: "#808080" },
        cream: { name: "Cream", hex: "#FDFCD5" },
        beige: { name: "Beige", hex: "#F5F5DC" },
      },
    },
    accent: {
      name: "Accent",
      colors: {
        marigold: { name: "Marigold", hex: "#FFB347" },
        sage: { name: "Sage", hex: "#9DC183" },
        blush: { name: "Blush", hex: "#FFB6C1" },
      },
    },
  };

  const accentMatColors = {
    marigold: { name: "Marigold", hex: "#FFB347" },
    sage: { name: "Sage", hex: "#9DC183" },
    blush: { name: "Blush", hex: "#FFB6C1" },
    // ... 其他强调色
  };

  const getScaleFactor = (size) => {
    // 小尺寸用较大的缩放因子
    if (size === "4x6") {
      return 2.3;
    }
    if (size === "5x7") {
      return 2;
    }

    // 中小尺寸用中大缩放因子
    if (size === "8x10") {
      return 1.5;
    }
    if (size === "11x14") {
      return 1.2;
    }

    if (size === "11x17") {
      return 1;
    }

    // 中等尺寸用中等缩放因子
    if (size === "12x18" || size === "13x19") {
      return 0.9;
    }
    if (size === "16x20") {
      return 0.7;
    }
    // 中大尺寸用中小缩放因子
    if (size === "16x24" || size === "18x24") {
      return 0.7;
    }
    // 大尺寸用较小的缩放因子

    if (size === "20x30" || size === "24x30") {
      return 0.6;
    }

    return 0.55;
  };

  // 检测窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [expandedOptions, setExpandedOptions] = useState({
    brassPlate: false,
    matCaption: false,
    storyPocket: false,
  });

  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const matArea = {
    "4x6": {
      width: 140 * getScaleFactor("4x6"),
      height: 190 * getScaleFactor("4x6"),
    },
    "5x7": {
      width: 165 * getScaleFactor("5x7"),
      height: 216 * getScaleFactor("5x7"),
    },
    "8x10": {
      width: 241 * getScaleFactor("8x10"),
      height: 292 * getScaleFactor("8x10"),
    },
    "11x14": {
      width: 317 * getScaleFactor("11x14"),
      height: 394 * getScaleFactor("11x14"),
    },
    "11x17": {
      width: 317 * getScaleFactor("11x17"),
      height: 470 * getScaleFactor("11x17"),
    },
    "12x18": {
      width: 343 * getScaleFactor("12x18"),
      height: 495 * getScaleFactor("12x18"),
    },
    "13x19": {
      width: 368 * getScaleFactor("13x19"),
      height: 521 * getScaleFactor("13x19"),
    },
    "16x20": {
      width: 444 * getScaleFactor("16x20"),
      height: 546 * getScaleFactor("16x20"),
    },
    "16x24": {
      width: 444 * getScaleFactor("16x24"),
      height: 648 * getScaleFactor("16x24"),
    },
    "18x24": {
      width: 495 * getScaleFactor("18x24"),
      height: 648 * getScaleFactor("18x24"),
    },
    "20x30": {
      width: 546 * getScaleFactor("20x30"),
      height: 800 * getScaleFactor("20x30"),
    },
    "24x30": {
      width: 648 * getScaleFactor("24x30"),
      height: 800 * getScaleFactor("24x30"),
    },
    "24x36": {
      width: 648 * getScaleFactor("24x36"),
      height: 952 * getScaleFactor("24x36"),
    },
  };

  const matPresets = {
    Standard: 14,
    Thin: 6,
    Wide: 19,
    Weighted: 15,
    Custom: matWidth,
    None: 0,
  };

  const matColorOptions = {
    white: { name: "White Mat", hex: "#FFFFFF" },
    ivory: { name: "Ivory Mat", hex: "#FFFFF0" },
    black: { name: "Black Mat", hex: "#000000" },
    gray: { name: "Gray Mat", hex: "#808080" },
    cream: { name: "Cream Mat", hex: "#FDFCD5" },
    beige: { name: "Beige Mat", hex: "#F5F5DC" },
  };

  const fontOptions = [
    { name: "Arial", value: "Arial" },
    { name: "Times New Roman", value: "Times New Roman" },
    { name: "Helvetica", value: "Helvetica" },
    { name: "Georgia", value: "Georgia" },
  ];

  // 动态加载产品数据
  const loadProductData = async () => {
    if (process.env.NODE_ENV === "development") {
      // 在开发环境中使用模拟数据
      setProductData(mockProductData);
      setVariants(mockProductData.variants);
      window.photoFrameProduct = mockProductData;
      return;
    }
    // const productHandle = 'frame-test';
    try {
      const response = await fetch(
        "https://vvi0pe-k0.myshopify.com/products/frame-test.js"
      );
      console.log("Response:", response);

      if (response.ok) {
        const product = await response.json();
        console.log("Loaded Product Data:", product);

        // 设置全局变量，供其他函数使用
        window.photoFrameProduct = product;

        // 更新组件状态
        setProductData(product);
        setVariants(product.variants);
      } else {
        console.error("Failed to load product data.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // 在组件挂载时加载产品数据
  useEffect(() => {
    loadProductData();
  }, []);

  // 获取变体 ID
  const getVariantId = (size, material) => {
    console.log("Looking for variant with:", { size, material });
    console.log("Available variants:", variants);

    if (!variants || !Array.isArray(variants)) {
      console.error("No variants available");
      return null;
    }

    const variant = variants.find((v) => {
      const matchesSize = v.option1?.toLowerCase() === size?.toLowerCase();
      const matchesMaterial =
        v.option2?.toLowerCase() === material?.toLowerCase();
      console.log("Checking variant:", {
        variant: v,
        matchesSize,
        matchesMaterial,
      });
      return matchesSize && matchesMaterial;
    });

    console.log("Found variant:", variant);
    return variant?.id || null;
  };

  // 添加到购物车
  const addToCart = async () => {
    const variantId = getVariantId(size, material);
    console.log("Adding to cart with variant ID:", variantId);

    // 如果没有找到变体 ID，提前返回
    if (!variantId) {
      console.error("No variant found for:", { size, material });
      alert("Selected combination is not available");
      return;
    }

    try {
      const response = await fetch(
        "https://vvi0pe-k0.myshopify.com/cart/add.js",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 添加其他必要的头部信息
          },
          body: JSON.stringify({
            items: [
              {
                id: parseInt(variantId), // 确保 ID 是数字类型
                quantity: 1,
                properties: {
                  _Photo: uploadedPhoto || "",
                  "Mat Type": selectedMatType || "",
                  "Mat Color": matColor || "",
                  "Mat Style": matStyle || "",
                  ...(hasAccentMat && { "Accent Mat Color": accentMatColor }),
                  ...(frameText && { "Brass Plate Text": frameText }),
                  ...(matCaption && { "Mat Caption": matCaption }),
                  "Print Paper": printPaper || "photo",
                },
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        // 获取错误详情
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          `Failed to add to cart: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Success:", data);
      window.location.href = "/cart"; // 成功后跳转到购物车
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add to cart: " + error.message);
    }
  };

  // 添加价格计算函数 (在组件内，其他 useEffect 附近)
  const calculatePrice = () => {
    let basePrice = sizeOptions[size].price;

    const additionalPrice =
      (frameText ? optionsContent.brassPlate.price : 0) +
      (matCaption ? optionsContent.matCaption.price : 0) +
      (storyPocket ? optionsContent.storyPocket.price : 0);

    return basePrice + additionalPrice;
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (!isEditing) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const matDimensions = matArea[size];
    const imageRect = imageRef.current.getBoundingClientRect();

    const maxX = (imageRect.width * scale - matDimensions.width) / 2;
    const maxY = (imageRect.height * scale - matDimensions.height) / 2;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y; // 修改这里，使用 clientY

    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e) => {
    if (!isEditing) return;
    e.preventDefault();
    if (!imageRef.current) return;

    const matDimensions = matArea[size];
    const imageRect = imageRef.current.getBoundingClientRect();

    const minScaleX = matDimensions.width / imageRect.width;
    const minScaleY = matDimensions.height / imageRect.height;
    const minScale = Math.max(minScaleX, minScaleY);

    const delta = e.deltaY * -0.01;
    const newScale = Math.max(minScale, Math.min(minScale * 3, scale + delta));
    setScale(newScale);
  };

  useEffect(() => {
    if (isEditing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isEditing]);

  useEffect(() => {
    if (imageRef.current && containerRef.current && uploadedPhoto) {
      const imageRect = imageRef.current.getBoundingClientRect();
      const matDimensions = matArea[size];

      const minScaleX = matDimensions.width / imageRect.width;
      const minScaleY = matDimensions.height / imageRect.height;
      const newScale = Math.max(minScaleX, minScaleY);

      setScale(newScale);
      setPosition({ x: 0, y: 0 });
    }
  }, [uploadedPhoto, size]);

  useEffect(() => {
    if (isEditing) {
      /** 获取原始图片元素 */
      const originalImage = document.querySelector(".original-img");
      /** 获取编辑图片元素 */
      const overlayImage = document.querySelector(".overlay-img");

      /** 获取原始图片宽高 */
      const { clientWidth: originalWidth, clientHeight: originalHeight } =
        originalImage;

      /** 获取编辑图片宽高 */
      const { clientWidth: overlayWidth, clientHeight: overlayHeight } =
        overlayImage;

      /** 计算原始图片和编辑图片尺寸的比例 */
      const rateX = originalWidth / overlayWidth;
      const rateY = originalHeight / overlayHeight;

      setRate({ rateX, rateY });
    }
  }, [, isEditing]);

  const materialOptions = {
    White: {
      name: "White frame",
      // price: 0,
      image: "/textures/4x6/white_4x6.jpg",
    },
    Black: {
      name: "Black frame",
      // price: 0,
      image: "/textures/11x14Black.jpg",
    },
    Oak: {
      name: "Oak frame",
      // price: 0,
      image: "/textures/11x14Oak.jpg",
    },
    Natural: {
      name: "Natural wood frame",
      // price: 0,
      image: "/textures/11x14Natural.jpg",
    },
    Walnut: {
      name: "Walnut wood frame",
      // price: 0,
      image: "/textures/11x14Walnut.jpg",
    },
  };

  const sizeOptions = {
    "4x6": { name: '4" × 6"', price: 34 },
    "5x7": { name: '5" × 7"', price: 39 },
    "8x10": { name: '8" × 10"', price: 49 },
    "11x14": { name: '11" × 14"', price: 69 },
    "11x17": { name: '11" × 17"', price: 75 },
    "12x18": { name: '12" × 18"', price: 79 },
    "13x19": { name: '13" × 19"', price: 85 },
    "16x20": { name: '16" × 20"', price: 95 },
    "16x24": { name: '16" × 24"', price: 129 },
    "18x24": { name: '18" × 24"', price: 149 },
    "20x30": { name: '20" × 30"', price: 169 },
    "24x30": { name: '24" × 30"', price: 189 },
    "24x36": { name: '24" × 36"', price: 249 },
  };

  const matOptions = {
    Standard: { name: "Standard Mat", price: 0 },
    Thin: { name: "Thin Mat", price: 0 },
    Wide: { name: "Wide Mat", price: 0 },
    None: { name: "No Mat", price: 0 },
  };

  const optionsContent = {
    brassPlate: { name: "Brass plate", price: 15 },
    matCaption: { name: "Mat Caption", price: 15 },
    storyPocket: { name: "Story Pocket", price: 15 },
  };

  const handleMatTypeSelect = (type) => {
    console.info('type',type !== "None")
    setSelectedMatType(type);
    if (type !== "Custom") {
      setMatWidth(matPresets[type]);
    }
    setMat(type !== "None");
  };

  const getPanelContent = () => {
    switch (activePanel) {
      case "materials":
        return {
          title: "Materials",
          type: "list",
          items: Object.entries(materialOptions).map(
            ([id, { name, image }]) => ({
              id,
              name,
              // price,
              image,
            })
          ),
          onSelect: setMaterial,
          selected: material,
        };
      case "sizes":
        return {
          title: "Sizes",
          type: "list",
          items: Object.entries(sizeOptions).map(([id, { name, price }]) => ({
            id,
            name,
            price,
          })),
          onSelect: setSize,
          selected: size,
        };
      case "mat":
        return {
          title: "Mat Options",
          type: "custom",
          content: (
            <div className="space-y-6">
              {/* Print Paper Selection */}
              <div>
                <h3 className="font-medium mb-2">Print paper</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setPrintPaper("photo")}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        printPaper === "photo"
                          ? "border-[#8dc53d] border-4"
                          : "border-gray-300"
                      }`}
                    />
                    <span>Photo paper</span>
                  </button>
                  <button
                    onClick={() => setPrintPaper("specialty")}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        printPaper === "specialty"
                          ? "border-[#8dc53d] border-4"
                          : "border-gray-300"
                      }`}
                    />
                    <span>Specialty paper</span>
                  </button>
                </div>
              </div>

              {/* Mat Type Selection */}
              <div>
                <h3 className="font-medium mb-2">Mat Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "Standard",
                      name: "Standard Mat",
                      image: "/images/standard.svg",
                    },
                    { id: "Thin", name: "Thin Mat", image: "/images/thin.svg" },
                    { id: "Wide", name: "Wide Mat", image: "/images/wide.svg" },
                    {
                      id: "Weighted",
                      name: "Weighted Mat",
                      image: "/images/weighted.svg",
                    },
                    { id: "None", name: "No Mat", image: "/images/noMat.svg" },
                  ].map((matType) => (
                    <Card
                      key={matType.id}
                      className={`p-4 cursor-pointer ${
                        selectedMatType === matType.id
                          ? "border-[#8dc53d] border-2"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleMatTypeSelect(matType.id)}
                    >
                      <div className="">
                        <img
                          src={matType.image}
                          alt={matType.name}
                          className="w-10 h-10"
                        />
                        <h3 className="font-normal text-sm">{matType.name}</h3>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              {selectedMatType !== "None" && (
                <div>
                  <h3 className="font-medium mb-2">Mat Style</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Card
                      className={`p-4 cursor-pointer ${
                        matStyle === "classic"
                          ? "border-[#8dc53d] border-2"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setMatStyle("classic");
                        setHasAccentMat(false);
                      }}
                    >
                      <div className="text-center">
                        <h3 className="font-medium">Classic</h3>
                      </div>
                    </Card>
                    <Card
                      className={`p-4 cursor-pointer relative ${
                        matStyle === "accent"
                          ? "border-[#8dc53d] border-2"
                          : "border-gray-300"
                      }`}
                      onClick={() => {
                        setMatStyle("accent");
                        setHasAccentMat(true);
                      }}
                    >
                      {matStyle === "accent" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMatStyle("classic");
                            setHasAccentMat(false);
                          }}
                          className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <X size={12} />
                        </button>
                      )}
                      <div className="text-center">
                        <h3 className="font-medium">Accent mat</h3>
                        <p className="text-sm text-gray-500">+$15</p>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* Mat Color Selection */}
              {selectedMatType !== "None" && (
                <div>
                  <h3 className="font-medium mb-2">Mat Color</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(matStyleOptions.classic.colors).map(
                      ([color, { name, hex }]) => (
                        <button
                          key={color}
                          onClick={() => setMatColor(color)}
                          className="group relative flex flex-col items-center"
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                              matColor === color
                                ? "border-black"
                                : "border-gray-200 group-hover:border-gray-300"
                            }`}
                            style={{ backgroundColor: hex }}
                          />
                          <span className="mt-1 text-sm text-gray-600">
                            {name.split(" ")[0]}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Accent Color Selection - 只在选择了 accent style 时显示 */}
              {selectedMatType !== "None" && matStyle === "accent" && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Accent Color</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(matStyleOptions.accent.colors).map(
                      ([color, { name, hex }]) => (
                        <button
                          key={color}
                          onClick={() => setAccentMatColor(color)}
                          className="group relative flex flex-col items-center"
                        >
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                              accentMatColor === color
                                ? "border-black"
                                : "border-gray-200 group-hover:border-gray-300"
                            }`}
                            style={{ backgroundColor: hex }}
                          />
                          <span className="mt-1 text-sm text-gray-600">
                            {name}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ),
        };
      case "options":
        return {
          title: "Options",
          type: "custom",
          content: (
            <div className="space-y-2">
              {/* Brass Plate Option */}
              <div className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer bg-white"
                  onClick={() =>
                    setExpandedOptions((prev) => ({
                      ...prev,
                      brassPlate: !prev.brassPlate,
                    }))
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white flex items-center justify-center">
                      {/* <Image className="w-6 h-6 text-gray-400" /> */}
                      <img src="/images/brass.png" alt="brass picture" />
                    </div>
                    <div>
                      <h3 className="font-medium">Brass plate</h3>
                      <p className="text-gray-500">+$15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* 添加删除按钮 - 只在有文本时显示 */}
                    {frameText && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFrameText("");
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X size={16} className="text-gray-400" />
                      </button>
                    )}
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform ${
                        expandedOptions.brassPlate ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedOptions.brassPlate && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Text
                        </label>
                        <input
                          type="text"
                          value={frameText}
                          onChange={(e) => setFrameText(e.target.value)}
                          maxLength={60}
                          placeholder="60 characters,no emoji"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Font Style
                        </label>
                        <select
                          value={selectedFont}
                          onChange={(e) => setSelectedFont(e.target.value)}
                          className="w-full p-2 border rounded"
                        >
                          {fontOptions.map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mat Caption Option */}
              <div className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer bg-white"
                  onClick={() =>
                    setExpandedOptions((prev) => ({
                      ...prev,
                      matCaption: !prev.matCaption,
                    }))
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                      {/* <Image className="w-6 h-6 text-gray-400" /> */}
                      <img src="/images/matCap.jpg" alt="mat caption picture" />
                    </div>
                    <div>
                      <h3 className="font-medium">Mat Caption</h3>
                      <p className="text-gray-500">+$15</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {matCaption && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMatCaption("");
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X size={16} className="text-gray-400" />
                      </button>
                    )}
                    <ChevronDown
                      size={20}
                      className={`transform transition-transform ${
                        expandedOptions.matCaption ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedOptions.matCaption && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Caption
                        </label>
                        <input
                          type="text"
                          value={matCaption}
                          onChange={(e) => setMatCaption(e.target.value)}
                          placeholder="Add your caption"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Font Style
                        </label>
                        <select
                          value={selectedFont}
                          onChange={(e) => setSelectedFont(e.target.value)}
                          className="w-full p-2 border rounded"
                        >
                          {fontOptions.map((font) => (
                            <option key={font.value} value={font.value}>
                              {font.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Text Alignment
                        </label>
                        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                          <button
                            onClick={() => setTextAlign("left")}
                            className={`flex-1 p-2 rounded ${
                              textAlign === "left"
                                ? "bg-white shadow"
                                : "hover:bg-gray-200"
                            }`}
                          >
                            <AlignLeft className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => setTextAlign("center")}
                            className={`flex-1 p-2 rounded ${
                              textAlign === "center"
                                ? "bg-white shadow"
                                : "hover:bg-gray-200"
                            }`}
                          >
                            <AlignCenter className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => setTextAlign("right")}
                            className={`flex-1 p-2 rounded ${
                              textAlign === "right"
                                ? "bg-white shadow"
                                : "hover:bg-gray-200"
                            }`}
                          >
                            <AlignRight className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Story Pocket Option */}
              <div className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer bg-white"
                  onClick={() =>
                    setExpandedOptions((prev) => ({
                      ...prev,
                      storyPocket: !prev.storyPocket,
                    }))
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
                      {/* <Image className="w-6 h-6 text-gray-400" /> */}
                      <img
                        src="/images/storyPocket.jpg"
                        alt="story pocket picture"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Story Pocket</h3>
                      <p className="text-gray-500">+$15</p>
                    </div>
                  </div>
                  <div
                    className={`transform transition-transform ${
                      expandedOptions.storyPocket ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>

                {expandedOptions.storyPocket && (
                  <div className="p-4 border-t bg-gray-50">
                    {/* Story Pocket 的具体内容 */}
                    <label className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <input
                      type="text"
                      value={storyPocket}
                      onChange={(e) => setStoryPocket(e.target.value)}
                      placeholder="600 characters,or leave blank to hand-write the story yourself!"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          ),
        };
      default:
        return {
          title: "Materials",
          type: "list",
          items: [],
          onSelect: () => {},
          selected: null,
        };
    }
  };

  return (
    <div className=" bg-white">
      <div className="flex h-[calc(100vh-80px)]">
        <div className="w-[60%] p-8 flex items-center justify-center bg-gray-100">
          <Frame
            size={size}
            material={material}
            mat={mat}
            matWidth={matWidth}
            matColor={matColor}
            frameText={frameText}
            matCaption={matCaption}
            selectedFont={selectedFont}
            onUpload={handleUpload}
            isEditing={isEditing}
            textAlign={textAlign}
            onEdit={() => setIsEditing(true)}
            onDelete={() => {
              setUploadedPhoto(null);
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            selectedMatType={selectedMatType}
            hasAccentMat={hasAccentMat}
            accentMatColor={accentMatColors[accentMatColor].hex} // 直接传入颜色值
            matStyle={matStyle}
          >
            {uploadedPhoto ? (
              <img
                src={uploadedPhoto}
                alt="Uploaded"
                className="original-img w-full h-full object-cover"
                style={{
                  transform: `scale3d(${scale}, ${scale}, 1) translate3d(${
                    position.x * rate.rateX
                  }px, ${position.y * rate.rateY}px, 0)`,
                }}
              />
            ) : null}
          </Frame>
        </div>

        <div className="w-96 p-6 border-l">
          <div className="flex mb-6 border-b">
            {/* <X className="w-6 h-6 cursor-pointer" /> */}
            <div className="flex flex-end gap-8">
              <NavButton
                name="Materials"
                icon={Image}
                isActive={activePanel === "materials"}
                onClick={() => setActivePanel("materials")}
              />
              <NavButton
                name="Sizes"
                icon={Grid}
                isActive={activePanel === "sizes"}
                onClick={() => setActivePanel("sizes")}
              />
              <NavButton
                name="Mat"
                icon={Grid}
                isActive={activePanel === "mat"}
                onClick={() => setActivePanel("mat")}
              />
              <NavButton
                name="Options"
                icon={Share2}
                isActive={activePanel === "options"}
                onClick={() => setActivePanel("options")}
              />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">
            {getPanelContent().title}
          </h2>
          {getPanelContent().type === "custom" ? (
            getPanelContent().content
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {getPanelContent().items.map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 flex items-center gap-4 cursor-pointer  ${
                    getPanelContent().selected === item.id
                      ? "border-[#8dc53d] border-2"
                      : ""
                  }`}
                  onClick={() => getPanelContent().onSelect(item.id)}
                >
                  <div className="text-left">
                    <h3 className="font-medium">{item.name}</h3>
                    {/* <p className="text-gray-500">${item.price}</p> */}
                  </div>
                </Card>
              ))}
            </div>
          )}
          <button
            onClick={addToCart}
            className="w-full bg-black text-white py-3 px-4 mt-6 rounded hover:bg-gray-800 transition-colors"
          >
            Add to cart—${calculatePrice()}
          </button>
        </div>
      </div>

      <EditOverlay
        isEditing={isEditing}
        uploadedPhoto={uploadedPhoto}
        scale={scale}
        setScale={setScale}
        position={position}
        setPosition={setPosition}
        imageRef={imageRef}
        containerRef={containerRef}
        size={size}
        matArea={matArea}
        isDragging={isDragging}
        handleMouseDown={handleMouseDown}
        setIsEditing={setIsEditing}
        isMobile={isMobile}
      />
    </div>
  );
}
