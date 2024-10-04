import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { TypeCategory } from '../types/typeCategory'
import Category from '../components/Category'
import { CategoryList } from '../constants/categoryList'
import { CgArrowsExchange } from 'react-icons/cg'

const Categories = () => {

    const { data, loading, error } = useFetch<TypeCategory[]>('https://dummyjson.com/products/categories')


    console.log(data)
    return (
        <div className='mt-8'>{loading && (<div> Loading... </div>)}
            <h1 className='text-2xl font-semibold'>All Categories</h1>
            <div className=' mt-8 gap-12 grid grid-cols-4 '>


                {data?.map((cat) => {
                    const matched = CategoryList.find((ele) => ele.slug === cat.slug)

                    return (
                        <Category categoryName={cat.name} imageUrl={matched?.imageUrl} categoryUrl={cat.url} />
                    )
                }


                )}



            </div>
        </div>
    )
}

export default Categories