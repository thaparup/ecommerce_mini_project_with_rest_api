import React, { useCallback, useEffect, useRef, useState } from "react";
import { TypeProductsRespnseObject } from "../types/typeProductsResponseObject";
import { typeProduct } from "../types/typeProduct";
import useFetch from "../hooks/useFetch";
import Product from "../components/Product";
import { FaArrowDown } from "react-icons/fa";

const Homepage = () => {
    const [skip, setSkip] = useState<number>(0);
    const href = useRef(null);
    const [products, setProducts] = useState<typeProduct[] | null>(null);
    const [scroll, setScroll] = useState<number>();
    const bottomRef = useRef(null);
    console.log('skip', skip)





    useEffect(() => {


        const fetchProducts = async () => {

            const response = await fetch(
                `https://dummyjson.com/products?limit=12&skip=${skip}&select=price,title,thumbnail,brand`

            )
                .then((res) => res.json())
                .then((data) => {
                    setProducts((prevArray) => {
                        if (!products) {
                            return data.products
                        }
                        else {
                            return prevArray ? [...prevArray, ...data.products] : null
                        }
                    })
                })

                .catch((err) => console.log(err))


        }
        fetchProducts()
    }, [skip])
    console.log(products)

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                console.log('entry', entry)
                if (entry.isIntersecting) {

                    setSkip(skip + 12)
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
    }, [products]);

    console.log(products)
    return (
        <div className="my-8 ">
            <h1 className="text-2xl font-medium">All Products</h1>

            <div>Loading.... </div> : (
            <div id="myDiv" className=' grid grid-cols-4 gap-x-8 gap-y-12 mt-8'>
                {products?.map(({ brand, title, price, thumbnail }) => (
                    <Product brand={brand} title={title} price={price} thumbnail={thumbnail} />
                ))}
            </div>


            <div className='mt-8 h-[3.2rem] w-[3.2rem] relative mx-auto' ref={bottomRef}>
                <div className="h-[3.2rem] w-[3.2rem] grid place-items-center rounded-full before:content-[''] before:absolute before:bg-primaryColor before:h-full before:w-full before:rounded-full before:animate-loadMore before:z-10 before:opacity-30 after:content-[''] after:absolute after:h-full after:w-full after:bg-zinc-200 after:z-20 after:rounded-full ">
                    <FaArrowDown size={14} className='z-50 animate-bounce text-primaryColor' />
                </div>
            </div>


        </div>
    );
};

export default Homepage;
