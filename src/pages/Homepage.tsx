import { createContext, useEffect, useRef, useState } from "react";
import { TypeProductsRespnse } from "../types/typeProductsResponseObject";
import Product from "../components/Product";
import { FaArrowDown, FaChevronDown } from "react-icons/fa";
import ProductSkeleton from "../components/ProductSkeleton";
import PriceRange from "../components/Filters/PriceRange";
import FilterByTitle from "../components/Filters/FilterByTitle";
import Filters from './../components/Filters/index'
import FilterPriceTitle from "../components/Filters/FilterPriceTitle";
import { useFilterContext } from "../context/FilterContext";

const Homepage = () => {
    const [data, setData] = useState<TypeProductsRespnse | null>(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
    const [loadmoreProducts, setLoadMoreProducts] = useState(false);
    const bottomRef = useRef(null);
    const fetchRef = useRef(false);
    const [skipCounter, setSkipCounter] = useState<number>(0);
    const { selected } = useFilterContext()
    const selectedRef = useRef(false)



    useEffect(() => {
        if (selected) {
            console.log('selected is not empty anymore')
            setData(null)
            setSkipCounter(0)
            console.log(fetchRef.current)
            fetchRef.current = false
        }
        if (fetchRef.current) return;
        fetchRef.current = true;

        if (data === null) {
            setIsLoadingProducts(true);
        }

        const totalSkipped = skipCounter * 12;

        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `https://dummyjson.com/products?limit=${12}&skip=${totalSkipped}&select=title,price,thumbnail,brand` + selected
                );
                console.log(
                    `https://dummyjson.com/products?limit=${12}&skip=${totalSkipped}&select=title,price,thumbnail,brand` + selected

                )
                const data: TypeProductsRespnse = await res.json();
                setData((prev) => {
                    if (prev == undefined) {
                        return data;
                    } else {
                        return {
                            products: [...prev.products, ...data.products],
                            limit: 12,
                            skip: totalSkipped,
                            total: 194,
                        };
                    }
                });
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoadingProducts(false);
                setLoadMoreProducts(false);
            }
        };
        setTimeout(() => {
            fetchProducts();
        }, 1000);
    }, [skipCounter, selected]);


    const [totalWidth, setTotalWidth] = useState(window.innerWidth);



    useEffect(() => {

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setSkipCounter((prev) => prev + 1);
                    fetchRef.current = false;
                    setLoadMoreProducts(true);
                }
            });
        };

        const observe = new IntersectionObserver(observerCallback, {
            root: null, // observing relative to the viewport
            threshold: 1.0, // Fire only when 100% of the element is visible
        });

        if (bottomRef.current) {
            observe.observe(bottomRef.current);
        }
    }, [data]);

    const [toggle, setToggle] = useState(false);

    const handleMouseDown = () => {
        setToggle(prev => !prev)
    };

    console.log(data)
    return (
        <div className="my-8 mx-12">
            <h1 className="text-2xl font-medium max-md:text-center">All Products</h1>
            <Filters />
            {/* 
            <button id="myBtn " className="mt-8 border-2 border-black px-8 py-2 rounded-md " onMouseDown={handleMouseDown}> click</button>



            <div className="parent" id="parent">
                parent
            </div>
            <div className="child" id="child">Child</div>
            <button id="myButton">Click me</button>
            <div id="myDiv" className="bg-red-200 p-9">
                <span id="mySpan">Click inside me</span>
            </div> */}







            {isLoadingProducts ? (

                <ProductSkeleton count={12} />
            ) : (

                <div className=" grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-5 max-lg:gap-12 gap-y-12 mt-10 max-md:flex  max-md:flex-col max-md:max-w-[24rem] max-md:mx-auto max-md:gap-12 z-10 ">
                    {data?.products.map(({ brand, title, price, thumbnail }) => (
                        <Product
                            brand={brand}
                            title={title}
                            price={price}
                            thumbnail={thumbnail}
                        />
                    ))}
                </div>
            )}
            {/* 


            {loadmoreProducts && <ProductSkeleton count={12} />}


            {data === null
                ? null
                : !loadmoreProducts && (
                    <div className="py-3 " ref={bottomRef}>
                        <div className="mt-12 h-[5.2rem] w-[5.2rem] relative mx-auto animate-bounce">
                            <div className="h-full w-full grid place-items-center rounded-full before:content-[''] before:absolute before:bg-primaryColor before:h-full before:w-full before:rounded-full before:animate-loadMore before:z-10 before:opacity-30 after:content-[''] after:absolute after:h-full after:w-full after:bg-zinc-200 after:z-20 after:rounded-full ">
                                <FaArrowDown
                                    size={20}
                                    className="z-50 animate-bounce text-primaryColor"
                                />
                            </div>
                        </div>
                    </div>
                )} */}
        </div >
    );
};

export default Homepage;
