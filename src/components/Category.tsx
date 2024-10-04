import React from 'react'
import { Link } from 'react-router-dom'

interface CategoryProps {
    imageUrl: string | undefined,
    categoryName: string,
    categoryUrl: string

}
const Category: React.FC<CategoryProps> = ({ imageUrl, categoryName, categoryUrl }: CategoryProps) => {
    return (
        <Link to={categoryUrl}>

            <div className='cursor-pointer'  >
                <img src={imageUrl} alt="" className='bg-zinc-200 w-full h-[300px] object-scale-down rounded-md' />
                <h3 className="text-xl font-medium pt-3">{categoryName}</h3>

            </div>
        </Link>
    )
}

export default Category