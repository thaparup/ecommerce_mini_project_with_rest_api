import React from 'react';

interface ProductProps {
    title: string;
    colors: string[];
    imageUrls: string[];
    brand: string;
    isOutOfStock: boolean;
}

const ProductCard: React.FC<ProductProps> = ({
    title,
    colors,
    imageUrls,
    brand,
    isOutOfStock,
}) => {
    return (
        <div className="p-4 max-w-md mx-auto bg-white border rounded-lg shadow-md">
            {/* Product Image */}
            <div className="relative">
                <img src={imageUrls[0]} alt={title} className="w-full h-48 object-cover rounded-md" />
                {isOutOfStock && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded-tr-md rounded-bl-md">
                        Out of stock
                    </div>
                )}
            </div>

            {/* Product Title */}
            <h1 className="mt-4 text-lg font-semibold">{title}</h1>

            {/* Ratings */}
            <p className="text-sm text-gray-500 mt-1">No Ratings</p>

            {/* Brand */}
            <p className="text-sm text-gray-500 mt-1">
                Brand: <span className="text-blue-500">{brand}</span>
            </p>

            {/* Colors */}
            <div className="mt-3 flex space-x-2">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`w-6 h-6 rounded-full`}
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
            </div>

            <div className="mt-4 flex items-center">
                <p className="text-gray-500 mr-2">Quantity:</p>
                <div className="flex items-center border rounded-md">
                    <button className="px-2 py-1 border-r text-gray-700" disabled>
                        -
                    </button>
                    <span className="px-4 py-1 text-gray-700">0</span>
                    <button className="px-2 py-1 border-l text-gray-700" disabled>
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
