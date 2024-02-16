import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'
import { prices } from '../../helpers/fixedPrices'

const MobileFilters = ({ categories, onChange, sortBy, order }) => {
    return (
        <>
            <Disclosure as="div" className="border-b border-gray-200 p-4">
                {({ open }) => (
                    <>
                        <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className=" px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Categories</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel>
                            <ul className="text-sm font-medium text-gray-900 pl-2 pt-2">
                                {
                                    categories &&
                                    categories !== null &&
                                    categories !== undefined &&
                                    categories.map(category => {
                                        if (category.sub_categories.length === 0) {
                                            return (
                                                <div key={category.id} className=' flex items-center h-5 my-2'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={category.id}
                                                        name='category_id'
                                                        type='radio'
                                                        className='focus:ring-blue-500 h-3 w-3 text-blue-600 border-gray-300 rounded-full'
                                                    />
                                                    <label className="ml-2 min-w-0 flex-1 text-gray-700">
                                                        {category.name}
                                                    </label>
                                                </div>
                                            )
                                        } else {
                                            let result = []
                                            result.push(
                                                <div key={category.id} className='flex items-center h-5 my-2'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={category.id}
                                                        name='category_id'
                                                        type='radio'
                                                        className='focus:ring-blue-500 h-3 w-3 text-blue-500 border-gray-300 rounded-full'
                                                    />
                                                    <label className="ml-2 min-w-0 flex-1 text-gray-700">
                                                        {category.name}
                                                    </label>
                                                </div>
                                            )

                                            category.sub_categories.map(sub_category => {
                                                result.push(
                                                    <div key={sub_category.id} className='flex items-center h-5 ml-4 my-2'>

                                                        <input
                                                            onChange={e => onChange(e)}
                                                            value={sub_category.id}
                                                            name='category_id'
                                                            type='radio'
                                                            className='focus:ring-blue-500 h-3 w-3 text-blue-600 border-gray-300 rounded-full'
                                                        />
                                                        <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                            {sub_category.name}
                                                        </label>
                                                    </div>
                                                )
                                            })

                                            return result
                                        }
                                    })
                                }
                            </ul>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <Disclosure as="div" className="border-b border-gray-200 p-4">
                {({ open }) => (
                    <>

                        <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Price range</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel >
                        <ul className="text-sm font-medium text-gray-700 pl-2 pt-2">
                                {
                                    prices && prices.map((price, index) => {
                                        if (price.id === 0) {
                                            return (
                                                <li key={index} className='flex items-center h-5 my-3'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={price.name}
                                                        name='price_range'
                                                        type='radio'
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                        defaultChecked
                                                    />
                                                    <label className='ml-3 min-w-0 flex-1 font-medium'>{price.name}</label>
                                                </li>
                                            )
                                        } else {
                                            return (
                                                <li key={index} className='flex items-center h-5 my-3'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={price.name}
                                                        name='price_range'
                                                        type='radio'
                                                        className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full'
                                                    />
                                                    <label className='ml-3 min-w-0 flex-1 font-medium'>{price.name}</label>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <Disclosure as="div" className="border-b border-gray-200 p-4">
                {({ open }) => (
                    <>
                        <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Order by</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-4">
                            <div>
                                <div className='form-group '>
                                    <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 text-gray-500'
                                    >See for</label>
                                    <select
                                        className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                        id='sortBy'
                                        name='sortBy'
                                        onChange={e => onChange(e)}
                                        value={sortBy}
                                    >
                                        <option value='date_created'>Date create</option>
                                        <option value='price'>Price</option>
                                        <option value='sold'>Most sold</option>
                                        <option value='title'>Name</option>

                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='order' className='mr-3 min-w-0 flex-1 text-gray-500'
                                    >Order</label>
                                    <select
                                        className='my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                        id='order'
                                        name='order'
                                        onChange={e => onChange(e)}
                                        value={order}
                                    >
                                        <option value='asc'>A - Z</option>
                                        <option value='desc'>Z - A</option>
                                    </select>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <button
                type="submit"
                className="block text-center text-sm bg-yellow-700 border border-transparent rounded-md py-2 px-8 mt-4 mx-auto font-medium hover:cursor-pointer text-white hover:bg-yellow-900"
            >
                Apply filters
            </button>
        </>
    )
}

export default MobileFilters