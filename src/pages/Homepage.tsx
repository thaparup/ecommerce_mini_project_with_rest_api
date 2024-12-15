import { useEffect, useRef, useState } from "react";
import { TypeProductsRespnse } from "../types/typeProductsResponseObject";
import Product from "../components/Product";
import { FaArrowDown } from "react-icons/fa";
import ProductSkeleton from "../components/ProductSkeleton";
import Filters from "./../components/Filters/index";
import { useFilterContext } from "../states/context/FilterContext";

const Homepage = () => {
    const [data, setData] = useState<TypeProductsRespnse | null>(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
    const [loadmoreProducts, setLoadMoreProducts] = useState(false);
    const bottomRef = useRef(null);
    const fetchRef = useRef(false);
    const { selected } = useFilterContext();
    console.log(selected)
    const prevSelectedRef = useRef(selected);
    const counterRef = useRef<number>(0);

    document.body.style.overflowY = 'scroll'

    useEffect(() => {
        if (selected && selected !== prevSelectedRef.current) {
            setData(null);
            counterRef.current = 0;
            fetchRef.current = false;
            setIsLoadingProducts(true);
            prevSelectedRef.current = selected;
        }
        if (fetchRef.current) return;
        fetchRef.current = true;

        if (data === null) {
            setIsLoadingProducts(true);
        }
        const totalSkipped = counterRef.current * 12;
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    `https://dummyjson.com/products?limit=${12}&skip=${totalSkipped}&select=title,price,thumbnail,brand` +
                    selected
                );

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
        }, 500);
    }, [counterRef.current, selected]);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    counterRef.current++;
                    console.log(counterRef.current);
                    fetchRef.current = false;
                    setLoadMoreProducts(true);
                }
            });
        };

        const observe = new IntersectionObserver(observerCallback, {
            root: null, // observing relative to the viewport
            threshold: 1.0,
        });

        if (bottomRef.current) {
            observe.observe(bottomRef.current);
        }
    }, [data]);
    return (
        <div className="my-8 mx-12">
            <h1 className="text-2xl font-medium max-md:text-center">All Products</h1>
            <Filters />

            {isLoadingProducts ? (
                <ProductSkeleton count={12} />
            ) : (
                <div className=" grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-5 max-lg:gap-12 gap-y-12 mt-10 max-md:flex  max-md:flex-col max-md:max-w-[24rem] max-md:mx-auto max-md:gap-12 z-10 ">
                    {data?.products.map(({ id, brand, title, price, thumbnail }) => (
                        <Product
                            brand={brand}
                            title={title}
                            price={price}
                            thumbnail={thumbnail}
                            id={id}
                            key={id}
                        />
                    ))}
                </div>
            )}

            {loadmoreProducts && <ProductSkeleton count={12} />}

            {data === null
                ? null
                : !loadmoreProducts && (
                    <div className="py-9 " ref={bottomRef}>
                        <div className="mt-12 h-[8rem] w-[8rem] relative mx-auto animate-bounce">
                            <div className="h-full w-full grid place-items-center rounded-full before:content-[''] before:absolute before:bg-primaryColor before:h-full before:w-full before:rounded-full before:animate-loadMore before:z-10 before:opacity-30 after:content-[''] after:absolute after:h-full after:w-full after:bg-zinc-200 after:z-20 after:rounded-full ">
                                <FaArrowDown
                                    size={20}
                                    className="z-50 animate-bounce text-primaryColor"
                                />
                            </div>
                        </div>
                    </div>
                )}


        </div>
    );
};

export default Homepage;
