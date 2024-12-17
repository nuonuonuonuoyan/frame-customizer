import React, { useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";

const SHOP_ASSETS = {
  textures: {
    White: {
      "4x6":
        "https://cdn.shopify.com/s/files/1/0907/5379/4363/files/33ffae0206d3c7cd1aadac09875e5e96_b5f8423a-2e21-4e75-9487-027c7d2ee7e7.jpg?v=1733922420",
    },
    Black: {
      "4x6":
        "https://cdn.shopify.com/s/files/1/0907/5379/4363/files/4fe40f089696834c4906303a743d01c5_81c55cc2-0fe8-4eda-8c64-b9fe4cf84510.jpg?v=1733922429",
    },
    Oak: {
      "4x6":
        "https://cdn.shopify.com/s/files/1/0907/5379/4363/files/4248fdd56e4d06a93d752a2f296504eb_77ffc6be-2522-43b1-8407-458d6caa95fc.jpg?v=1733922444",
    },
    Natural: {
      "4x6":
        "https://cdn.shopify.com/s/files/1/0907/5379/4363/files/4b2025165f3c6f24e18c9f04cb465936_df0d2296-17ef-4fb9-bc68-6c1a64f29340.jpg?v=1733922454",
    },
    Walnut: {
      "4x6":
        "https://cdn.shopify.com/s/files/1/0907/5379/4363/files/989c332f4e2bae8f1bf8e5080cbf7525_8560a7bd-9501-402e-a972-d53ab142405b.jpg?v=1733922169",
    },
  },
};

const getScaleFactor = (size) => {
  if (size === "4x6") return 2.3;
  if (size === "5x7") return 2;
  if (size === "8x10") return 1.5;
  if (size === "11x14") return 1.2;

  if (size === "11x17") return 1;

  if (size === "12x18" || size === "13x19") return 0.9;
  if (size === "16x20") return 0.8;

  if (size === "16x24" || size === "18x24") return 0.7;

  if (size === "20x30" || size === "24x30") return 0.6;

  return 0.55;
};

export const Frame = ({
  size,
  material,
  mat,
  matColor,
  selectedMatType,
  matStyle,
  hasAccentMat,
  accentMatColor,
  matTextures,
  children,
  frameText,
  matCaption,
  selectedFont,
  textAlign,
  onUpload,
  isEditing,
  onEdit,
  onDelete,
}) => {
  const frameSizeStyles = {
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

  const matColorOptions = {
    white: { name: "White Mat", hex: "#FFFFFF" },
    ivory: { name: "Ivory Mat", hex: "#FFFFF0" },
    black: { name: "Black Mat", hex: "#000000" },
    gray: { name: "Gray Mat", hex: "#808080" },
    cream: { name: "Cream Mat", hex: "#FDFCD5" },
    beige: { name: "Beige Mat", hex: "#F5F5DC" },
  };

  const materialStyles = {
    white: {
      backgroundImage: SHOP_ASSETS.textures.White[size]
        ? `url(${SHOP_ASSETS.textures.White[size]})`
        : "none",
      backgroundColor: "#FFFFFF",
      boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
    },
    black: {
      backgroundImage: SHOP_ASSETS.textures.Black[size]
        ? `url(${SHOP_ASSETS.textures.Black[size]})`
        : "none",
      backgroundColor: "#000000",
      boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)",
    },
    oak: {
      backgroundImage: SHOP_ASSETS.textures.Oak[size]
        ? `url(${SHOP_ASSETS.textures.Oak[size]})`
        : "none",
      backgroundColor: "#8B4513",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.15)",
    },
    natural: {
      backgroundImage: SHOP_ASSETS.textures.Natural[size]
        ? `url(${SHOP_ASSETS.textures.Natural[size]})`
        : "none",
      backgroundColor: "#DEB887",
      boxShadow: "inset 0 0 10px rgba(0,0,0,0.15)",
    },
    walnut: {
      backgroundImage: SHOP_ASSETS.textures.Walnut[size]
        ? `url(${SHOP_ASSETS.textures.Walnut[size]})`
        : "none",
      backgroundColor: "#654321",
      boxShadow: "inset 0 0 12px rgba(0,0,0,0.1)",
    },
  };

  // 在 Frame 组件内部，添加新的 matPresets 配置
  const getMatInsets = (type, frameSize) => {
    switch (type) {
      case "Standard":
        switch (frameSize) {
          case "8x10":
            return {
              top: 143.7, // 3.81cm 转换为像素
              right: 143.7,
              bottom: 143.7,
              left: 143.7,
            };
          case "11x14":
            return {
              top: 191.8, // 5.08cm
              right: 143.7, // 3.81cm
              bottom: 191.8,
              left: 143.7,
            };
          case "11x17":
            return {
              top: 132.2, // 3.5cm
              right: 132.2,
              bottom: 132.2,
              left: 132.2,
            };
          // ... 可以继续添加其他尺寸
          default:
            return {
              top: 143.7,
              right: 143.7,
              bottom: 143.7,
              left: 143.7,
            };
        }

      case "Thin":
        return {
          top: 56.6, // 1.5cm
          right: 56.6,
          bottom: 56.6,
          left: 56.6,
        };

      case "Wide":
        switch (frameSize) {
          case "8x10":
            return {
              top: 191.8, // 5.08cm
              right: 191.8,
              bottom: 191.8,
              left: 191.8,
            };
          case "11x14":
          case "11x17":
            return {
              top: 239.8, // 6.35cm
              right: 239.8,
              bottom: 239.8,
              left: 239.8,
            };
          // ... 其他尺寸
          default:
            return {
              top: 239.8,
              right: 239.8,
              bottom: 239.8,
              left: 239.8,
            };
        }

      case "Weighted":
        switch (frameSize) {
          case "8x10":
            return {
              top: 113.3, // 3cm
              right: 113.3,
              bottom: 264.4, // 7cm
              left: 113.3,
            };
          // ... 其他尺寸
          default:
            return {
              top: 113.3,
              right: 113.3,
              bottom: 264.4,
              left: 113.3,
            };
        }

      default:
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        };
    }
  };

  // 修改 getMatStyles 函数，使用百分比而不是固定像素值
  const getMatStyles = (type, style, color) => {
    // 根据 mat 类型获取合适的内边距百分比
    const getTypePadding = (type) => {
      switch (type) {
        case "Standard":
          return {
            top: "15%",
            right: "15%",
            bottom: "15%",
            left: "15%",
          };
        case "Thin":
          return {
            top: "7%",
            right: "7%",
            bottom: "7%",
            left: "7%",
          };
        case "Wide":
          return {
            top: "25%",
            right: "25%",
            bottom: "25%",
            left: "25%",
          };
        case "Weighted":
          return {
            top: "12%",
            right: "12%",
            bottom: "30%",
            left: "12%",
          };
        case "None":
          return {
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          };
        default:
          return {
            top: "15%",
            right: "15%",
            bottom: "15%",
            left: "15%",
          };
      }
    };

    // 获取 padding
    const padding = getTypePadding(type);

    // 处理 padding 字符串
    const paddingValue =
      typeof padding === "object"
        ? `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`
        : padding;

    // Get style specific properties
    const getStyleProperties = (style, color) => {
      // 添加 color 参数
      switch (style) {
        case "classic":
          return {
            backgroundColor: matColorOptions[color].hex, // 使用传入的 color 和 matColorOptions
            boxShadow: `
            inset 0 0 4px rgba(0,0,0,0.1),
            inset 0 0 5px rgba(0,0,0,0.1),
            6px 6px 2px rgba(0,0,0,0.02)
          `,
            // 添加一个非常细微的边框
            border: "1px solid rgba(0,0,0,1)",
          };
        case "accent":
          return {
            backgroundColor: color, // 直接使用传入的 hex 颜色值
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.01)",
          };
        default:
          return {
            backgroundColor: matColorOptions[color].hex,
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
          };
      }
    };

    return {
      position: "absolute",
      inset: 0,
      padding: paddingValue,
      ...getStyleProperties(style, color),
      borderStyle: "solid",
      borderColor: "rgba(0,0,0,0.05)",
    };
  };

  const frameDimensions = frameSizeStyles[size];
  const hasImage = React.isValidElement(children);

  // Upload button component
  const UploadButton = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <label htmlFor="photo-upload" className="cursor-pointer">
        <div className="p-4 bg-black text-white rounded flex items-center gap-2">
          <Upload className="w-4 h-4" />
          {/* {!mat && <span></span>} */}
        </div>
      </label>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        onChange={onUpload}
        className="hidden"
      />
    </div>
  );

  return (
    <div className="relative">
      <div
        style={{
          width: `${frameDimensions.width}px`,
          height: `${frameDimensions.height}px`,
          position: "relative",
        }}
      >
        {/* Frame */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "2px",
            backgroundColor:
              materialStyles[material]?.backgroundColor || "#000",
            backgroundImage: materialStyles[material]?.backgroundImage,
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            boxShadow: materialStyles[material]?.boxShadow,
          }}
        >
          {/* Inner white space */}
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "32px",
              right: "32px",
              bottom: "32px",
              backgroundColor: "white",
            }}
          >
            {/* Content area */}
            <div className="absolute inset-0">
              {mat ? (
                <div
                  className="absolute inset-0"
                  style={{
                    background: "white",
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)", // 为整个 mat 区域添加微弱阴影
                  }}
                >
                  {hasAccentMat ? (
                    // Accent mat structure
                    <div style={{ position: "absolute", inset: 0 }}>
                      {/* 主 mat - 灰色背景 */}
                      <div
                        style={getMatStyles(
                          selectedMatType,
                          matStyle,
                          matColor
                        )}
                      >
                        {/* 照片区域容器 */}
                        <div className="relative w-full h-full">
                          {/* Accent mat - 金色边框层 */}
                          <div
                            className="absolute inset-[2px]" // 这里控制内边距，可以调整
                            style={{
                              border: "2px solid rgba(220, 220, 220)", // 金色边框
                              backgroundColor: accentMatColor,
                              padding: "3px", // accent mat 的宽度
                            }}
                          >
                            {/* 内容区域 */}
                            <div
                              className="w-full h-full overflow-hidden bg-white relative"
                              style={{
                                boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
                              }}
                            >
                              {children || <UploadButton />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular mat structure
                    <div
                      style={getMatStyles(selectedMatType, matStyle, matColor)}
                    >
                      <div
                        className="relative w-full h-full overflow-hidden bg-white"
                        style={{
                          border: "3px solid rgba(0,0,0,0.1)", // 添加细微的边框
                          // padding: '3px',  // 添加内边距来创造 mat 的效果
                          background: `linear-gradient(
            135deg,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.02) 50%,
            rgba(0,0,0,0.05) 100%
          )`,
                        }}
                      >
                        {children || <UploadButton />}
                      </div>
                    </div>
                  )}

                  {/* Controls */}
                  {/* {hasImage && !isEditing && (
                    <div className="absolute bottom-0 right-2 flex gap-2 z-20">
                      <button
                        onClick={onEdit}
                        className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={onDelete}
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )} */}

                  {/* Text Overlays */}
                  {frameText && (
                    <div
                      className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-center"
                      style={{
                        fontFamily: selectedFont,
                        fontSize: "14px",
                        color: "#000",
                      }}
                    >
                      {frameText}
                    </div>
                  )}

                  {matCaption && (
                    <div
                      className="absolute bottom-2 w-full px-4"
                      style={{
                        fontFamily: selectedFont,
                        textAlign: textAlign,
                        color: "#000",
                      }}
                    >
                      <p className="text-xs">{matCaption}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="w-full h-full overflow-hidden relative bg-white"
                  style={{
                    boxShadow: "inset 0 0 8px rgba(0,0,0,0.15)", // 即使没有 mat 也添加一些阴影
                  }}
                >
                  {children || <UploadButton />}

                  {hasImage && !isEditing && (
                    <div className="absolute top-15 right-2 flex gap-2 z-20">
                      <button
                        onClick={onEdit}
                        className="px-3 py-1 rounded bg-gray-600 text-gray-900 hover:bg-gray-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={onDelete}
                        className="px-3 py-1 rounded bg-red-950 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {mat && hasImage && !isEditing && (
          <div className="absolute bottom-[-50px] right-2 flex gap-2 z-20">
            <button
              onClick={onEdit}
              className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const NavButton = ({ name, icon: Icon, isActive, onClick }) => (
  <div
    className={`flex flex-col items-center cursor-pointer ${
      isActive ? "text-black" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    <Icon className="w-6 h-6" />
    <span className="text-sm mt-1">{name}</span>
  </div>
);

export const EditOverlay = ({
  isEditing,
  uploadedPhoto,
  scale,
  setScale,
  position,
  setPosition,
  imageRef,
  containerRef,
  size,
  matArea,
  isDragging,
  setIsEditing,
}) => {
  const dragStart = useRef({ x: 0, y: 0 });
  const dimensions = matArea[size] || { width: 0, height: 0 };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !imageRef.current || !containerRef.current)
      return;
    e.preventDefault();

    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = (e.clientX - containerRect.left - dragStart.current.x) / scale;
    const newY = (e.clientY - containerRect.top - dragStart.current.y) / scale;

    const image = imageRef.current;
    const imageRect = image.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const scaledImageWidth = imageRect.width;
    const scaledImageHeight = imageRect.height;

    const maxX = (scaledImageWidth - containerWidth) / (2 * scale);
    const maxY = (scaledImageHeight - containerHeight) / (2 * scale);

    setPosition({
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    });
  };

  useEffect(() => {
    if (isEditing) {
      const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = "default";
      };

      let rafId;
      const handleMouseMoveRaf = (e) => {
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            handleMouseMove(e);
            rafId = null;
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMoveRaf, {
        passive: false,
      });
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMoveRaf);
        window.removeEventListener("mouseup", handleMouseUp);
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [isEditing, scale]);

  const onMouseDown = (e) => {
    if (!imageRef.current || !containerRef.current) return;
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "grabbing";

    const containerRect = containerRef.current.getBoundingClientRect();
    dragStart.current = {
      x: e.clientX - containerRect.left - position.x * scale,
      y: e.clientY - containerRect.top - position.y * scale,
    };
  };

  if (!isEditing || !uploadedPhoto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsEditing(false)}
            className="text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <div className="text-white">Drag and zoom image to crop</div>
          <div className="w-6"></div>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div
            ref={containerRef}
            className="relative bg-white overflow-hidden mx-auto"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
          >
            <div
              className="w-full h-full"
              onMouseDown={onMouseDown}
              style={{
                cursor: isDragging.current ? "grabbing" : "grab",
                touchAction: "none",
              }}
            >
              <img
                ref={imageRef}
                src={uploadedPhoto}
                alt="Edit"
                className="overlay-img absolute w-full h-full object-cover"
                style={{
                  transform: `scale3d(${scale}, ${scale}, 1) translate3d(${position.x}px, ${position.y}px, 0)`,
                  transition: isDragging.current
                    ? "none"
                    : "scale 0.1s ease-out",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  userSelect: "none",
                  transformOrigin: "center",
                }}
                draggable="false"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setScale(1);
                setPosition({ x: 0, y: 0 });
              }}
              className="px-6 py-2 rounded-full border border-white text-white"
            >
              Cancel
            </button>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 rounded-full bg-white text-black"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
