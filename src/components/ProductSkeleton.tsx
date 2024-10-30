

const ProductSkeleton = ({ count = 1 }) => (
    <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-5 max-lg:gap-12 gap-y-12 mt-4 max-md:flex  max-md:flex-col max-md:max-w-[24rem] max-md:mx-auto max-md:gap-12 ">
        {Array.from({ length: count }, (_, index) => (
            <div key={index} className="cardBoxShadow ">
                <div className="w-full h-[250px] max-xl:h-[270px] max-lg:h-[270px]  rounded-md skeleton"></div>
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

