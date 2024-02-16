import React from 'react'
import { Link } from "react-router-dom"
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

const ProductCard = ({ id, images, name, brand, price, compare_price }) => {
    return (
        <Link to={`/shop/${id}`}>
            <div key={id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
                    <img
                        src={images}
                        alt=""
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="text-center">
                    <p className='text-sm font-semibold'>{name}</p>
                    <p className="font-semibold text-base">${price}</p>
                    {compare_price === price ? (
                        <></>
                    ) : (
                        <p className="text-xs line-through text-gray-500">${compare_price}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}


export default ProductCard