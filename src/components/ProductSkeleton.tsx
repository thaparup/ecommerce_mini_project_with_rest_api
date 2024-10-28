

const ProductSkeleton = ({ count = 1 }) => (
    <div className="grid grid-cols-4 gap-8 mt-8">
        {Array.from({ length: count }, (_, index) => (
            <div key={index} className="cardBoxShadow">
                <div className="w-full h-[300px] rounded-md skeleton"></div>
                <div className="flex justify-between pt-3 font-medium text-xl px-4">
                    <h1 className="skeleton h-4 w-[40%] rounded-md"></h1>
                    <h3 className="skeleton h-4 w-[40%] rounded-md"></h3>
                </div>
                <div className="skeleton w-[90%] mx-auto h-4 my-3 rounded-md"></div>
                <div className="skeleton w-[90%] mx-auto h-4 my-5 rounded-md"></div>
            </div>
        ))}
    </div>
);

export default ProductSkeleton;

