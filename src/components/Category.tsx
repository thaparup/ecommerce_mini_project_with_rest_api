import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface CategoryProps {
    imageUrl: string | undefined,
    categoryName: string,
    slug: string

}
const Category: React.FC<CategoryProps> = ({ imageUrl, categoryName, slug }: CategoryProps) => {

    const [hasImageLoaded, setHasImageLoaded] = useState<boolean>(false)

    return (
        <Link to={`/categories/${slug}`}>

            <div className='cursor-pointer relative flex flex-col cardBoxShadow rounded-md'  >

                <div className="relative">
                    {!hasImageLoaded && (
                        <div className="w-full h-[250px] rounded-md skeleton absolute"></div>
                    )}

                    <img
                        src={imageUrl}
                        alt=""
                        className={`w-full h-[250px] max-xl:h-[270px] max-lg:h-[270px]  rounded-md bg-zinc-200 object-contain opacity-0 py-4 max-xl:py-0  ${hasImageLoaded && "opacity-100"
                            }`}
                        onLoad={() => {
                            setTimeout(() => {
                                setHasImageLoaded(true);
                            }, 500);
                        }}
                    />
                </div>
                <h3 className="text-xl font-medium px-4 py-4 text-center">{categoryName}</h3>
            </div>
        </Link>
    )
}

export default Category