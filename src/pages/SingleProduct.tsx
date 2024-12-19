import React, { FC, useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCart";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromTheCart } from "../states/store/slices/cartSlice";
import { toast, Toaster } from "sonner";
import { SingleProductType } from "../types/typeSingleProduct";
import { RootState } from "../states/store/store";
import { useIsTokenExpired } from "../hooks/useIsTokenExpired";

interface SingleProductProps { }
const SingleProduct: FC<SingleProductProps> = ({ }) => {
    const { id } = useParams();
    const reviewSectionRef = useRef<HTMLDivElement>(null);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [hasFirstImageLoaded, setHasFirstImageLoaded] = useState(false);
    const [hasArrayOfImageLoaded, setHasArrayOfImageLoaded] = useState(false);
    const isTokenExpired = useIsTokenExpired();
    const navigate = useNavigate();
    const { data } = useFetch<SingleProductType>(
        `https://dummyjson.com/products/${id}`
    );

    const dispatch = useDispatch();
    const handleIncrement = (
        brand: string,
        price: number,
        title: string,
        thumbnail: string,
        id: number
    ) => {
        setNoq((prev) => {
            const updatedNoq = prev + 1;
            dispatch(
                addToCart({
                    brand: brand,
                    price: price,
                    title: title,
                    thumbnail: thumbnail,
                    id: id,
                })
            );
            toast("Added to cart successfully! ");
            return updatedNoq;
        });
    };
    const handleDecrement = (
        brand: string,
        price: number,
        title: string,
        thumbnail: string,
        id: number
    ) => {
        setNoq((prev) => (prev === 0 ? 0 : prev - 1));
        if (noq === 0) {
            return;
        }
        dispatch(
            removeFromTheCart({
                brand: brand,
                price: price,
                title: title,
                thumbnail: thumbnail,
                id: id,
            })
        );
        toast("Removed from the cart successfully! ");
    };

    const cart = useSelector((state: RootState) => state.cart);

    const findQuantity = cart.cart.find((item) => item.id === data?.id);

    const [noq, setNoq] = useState<number>(0);
    useEffect(() => {
        if (findQuantity) {
            setNoq(findQuantity.quantity ?? 0);
        } else {
            setNoq(0);
        }
    }, [findQuantity]);

    const dateAndTimeConverter = (receivedDate: string) => {
        const date = new Date(receivedDate);
        const readableDate = date.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
            timeZone: "UTC",
        });

        return readableDate;
    };
    const handleScroll = () => {
        if (reviewSectionRef.current) {
            reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
            reviewSectionRef.current.focus();
        }
    };

    return (
        <div className="mx-16 max-sm:mx-8">
            <Toaster position="top-right" theme="light" duration={1000} />

            <div className="  bg-white grid grid-cols-12 gap-7 w-full mt-12 rounded-sm p-4 max-lg:flex max-lg:flex-wrap max-md:flex max-md:flex-col max-md:gap-5 max-md:items-center">
                <div className=" col-span-4 ">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            {!hasFirstImageLoaded && (
                                <div className=" w-full h-[300px] rounded-md skeleton absolute"></div>
                            )}

                            <img
                                src={data?.images[`${imageIndex}`]}
                                alt=""
                                className="w-full h-[300px] object-contain bg-zinc-100 rounded-md shadow-md"
                                onLoad={() => setHasFirstImageLoaded(true)}
                            />
                        </div>
                        <div className="flex gap-2 ">
                            {data?.images.map((img, index) => (
                                <button
                                    onClick={() => setImageIndex(index)}
                                    className="relative"
                                    key={index}
                                >
                                    {!hasArrayOfImageLoaded && (
                                        <div className="h-[100px] w-[100px] rounded-md skeleton absolute"></div>
                                    )}
                                    <img
                                        src={img}
                                        className="h-[100px] w-[100px] object-contain border-2 border-cyan-200"
                                        onLoad={() =>
                                            setTimeout(() => setHasArrayOfImageLoaded(true), 1000)
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-2 ">
                    <h1 className="text-2xl font-normal">{data?.title}</h1>
                    <Link
                        to=""
                        className="underline text-blue-400"
                        onClick={() => handleScroll()}
                        type="button"
                    >
                        {data?.rating} ratings
                    </Link>
                    <h1 className="">
                        <span className="text-sm text-gray-500">Brand: </span>{" "}
                        <span className="text-lg font-normal ml-2">{data?.brand}</span>
                    </h1>
                    <h1>
                        {" "}
                        <span className="text-sm text-gray-500"> Category: </span>{" "}
                        <Link
                            to={`/categories/${data?.category}`}
                            className="underline text-blue-400 ml-2"
                        >
                            {data?.category}
                        </Link>
                    </h1>
                    <h3>
                        <span className="text-sm text-gray-500">Stock</span>{" "}
                        <span>{data?.stock}</span>
                    </h3>
                    <h3>
                        <span className="text-sm text-gray-500">Status</span>{" "}
                        <span className="text-green-400 font-medium">
                            {data?.availabilityStatus}
                        </span>
                    </h3>

                    <hr />
                    <h1 className="text-4xl text-primaryColor font-normal py-4">
                        Rs. {(data?.price * 135).toFixed()}
                    </h1>
                    <div className="mt-4 flex items-center">
                        <p className="text-gray-500 mr-2">Quantity:</p>
                        <div className="flex items-center border rounded-md">
                            <button
                                className="px-2 py-1 border-r text-gray-700"
                                onClick={() =>
                                    handleDecrement(
                                        data?.brand,
                                        data?.price,
                                        data?.title,
                                        data?.thumbnail,
                                        data?.id
                                    )
                                }
                            >
                                -
                            </button>
                            <span className="px-4 py-1 text-gray-700">{noq}</span>
                            <button
                                className="px-2 py-1 border-l text-gray-700"
                                onClick={() =>
                                    handleIncrement(
                                        data?.brand,
                                        data?.price,
                                        data?.title,
                                        data?.thumbnail,
                                        data?.id
                                    )
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <button
                            className="bg-primaryColor text-white px-8 py-2 rounded-md font-medium"
                            onClick={() => {
                                isTokenExpired ? navigate("/auth/signin") : navigate("/cart");
                            }}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-3 max-lg:mx-auto">
                    <h1 className="">
                        {" "}
                        <span className="text-sm text-gray-500">
                            {" "}
                            Shippging Information:{" "}
                        </span>{" "}
                        <span className="text-lg font-light">
                            {" "}
                            {data?.shippingInformation}
                        </span>
                    </h1>
                    <h1 className="">
                        {" "}
                        <span className="text-sm text-gray-500"> Return Policy: </span>{" "}
                        <span className="text-lg font-light"> {data?.returnPolicy}</span>
                    </h1>
                    <h1 className="">
                        {" "}
                        <span className="text-sm text-gray-500">
                            {" "}
                            Warranty Information:{" "}
                        </span>{" "}
                        <span className="text-lg font-light">
                            {" "}
                            {data?.warrantyInformation}
                        </span>
                    </h1>

                    <div className="mt-4 ">
                        <img
                            src={data?.meta.qrCode}
                            alt=""
                            className="h-[200px] w-[200px] "
                        />
                        <h4 className="text-sm text-gray-500 ml-4">
                            Scan with your phonne{" "}
                        </h4>
                    </div>
                </div>
            </div>

            {/* .................... Product Detail ................................ */}

            <div className="bg-white mt-6 rounded-sm max-w-[70%] max-md:max-w-[100%] max-sm:max-w-[100%] pb-4">
                <h1 className="text-xl font-medium p-2 bg-zinc-100">
                    Product details of {data?.title}
                </h1>
                <h3 className="text-lg font-normal px-2 pt-2 underline">Desciption</h3>
                <p className="text-sm px-2 font-normal">{data?.description}</p>
                <h3 className="text-lg font-normal px-2 pt-2 underline">Dimension</h3>
                <li className="px-2">
                    {" "}
                    <span className="text-sm text-gray-500 ">Width: </span>
                    {data?.dimensions["width"]}
                </li>
                <li className="px-2">
                    {" "}
                    <span className="text-sm text-gray-500 ">Width: </span>
                    {data?.dimensions["height"]}
                </li>
                <li className="px-2">
                    {" "}
                    <span className="text-sm text-gray-500 ">Width: </span>
                    {data?.dimensions["depth"]}
                </li>
            </div>

            {/* .................... Review Section ................................ */}

            <div className="bg-white mt-6 rounded-sm " ref={reviewSectionRef}>
                <h1 className="text-xl font-medium p-2 bg-zinc-100">
                    Rating details of {data?.title}
                </h1>
                {data?.reviews.map((review) => (
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-sm font-medium">{review.reviewerName}</h2>
                                <div className="flex gap-1">
                                    {Array.from({ length: review.rating }, () => (
                                        <div className="star"> </div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-sm font-ligh">
                                {dateAndTimeConverter(review.date)}
                            </h3>
                        </div>
                        <p className="text-sm italic font-normal">{review.comment}</p>
                        <hr className="pb-2" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleProduct;
