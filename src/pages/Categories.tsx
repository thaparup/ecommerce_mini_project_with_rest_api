import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { TypeCategory } from '../types/typeCategory'
import Category from '../components/Category'
import { CategoryList } from '../constants/categoryList'
import { CgArrowsExchange } from 'react-icons/cg'
import { CiShoppingCart } from 'react-icons/ci'

const Categories = () => {

    // const { data, loading, error } = useFetch<TypeCategory[]>('https://dummyjson.com/products/categories')



    return (
        // <div className='mt-8'>{loading && (<div> Loading... </div>)}
        //     <h1 className='text-2xl font-semibold'>All Categories</h1>
        //     <div className=' mt-8 gap-12 grid grid-cols-4 '>


        //         {data?.map((cat) => {
        //             const matched = CategoryList.find((ele) => ele.slug === cat.slug)

        //             return (
        //                 <Category categoryName={cat.name} imageUrl={matched?.imageUrl} categoryUrl={cat.url} />
        //             )
        //         }


        //         )}



        //     </div>
        // </div>


        <>


            <div className='flex relative w-[300px] h-[300px]  '>

                <div className="absolute right-0 bg-bgColor pl-5 pb-3">
                    <div className="bg-white px-3 py-3 rounded-l-md rounded-b-md">
                        <CiShoppingCart size={24} className=' text-primaryColor self-center ' />
                    </div>
                </div>
                <div className='productCard rounded-md' >
                    <h1>hellal</h1>

                </div>
            </div>
            <br />
            <div className='borderPractice'></div>

        </>
    )
}

export default Categories