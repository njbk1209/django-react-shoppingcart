import { useEffect, useState, Fragment } from "react";
import Layout from '../containers/Layout'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from '@headlessui/react'
import {
    get_product,
} from "../redux/actions/products";
import {
    get_items,
    add_item,
    get_total,
    get_item_total
} from "../redux/actions/cart";
import { StarIcon } from '@heroicons/react/solid'
import { Disclosure, Tab } from '@headlessui/react'
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import Error404 from "../pages/Error404";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductDetail = ({
    get_product,
    product,
    loading,
    error,
    get_items,
    add_item,
    get_total,
    get_item_total,
    isAuthenticated,
}) => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [myLoading, setMyLoading] = useState(false);

    const navigate = useNavigate();

    const params = useParams()
    const productId = params.productId

    const addToCart = async () => {
        if (product && product !== null && product !== undefined && product.quantity > 0) {
            setMyLoading(true);
            await Promise.all([
                add_item(product),
                get_items(),
                get_total(),
                get_item_total(),
            ]);
            setMyLoading(false);
            navigate('/cart');
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        get_product(productId)
    }, [productId])

    const addButton = () => {
        if (!isAuthenticated) {
            return (
                <Link
                    to='/login'
                >
                    <button
                        className="max-w-xs flex-1 flex items-center justify-center font-medium sm:w-full px-4 py-2 rounded border-transparent shadow-sm text-base font-medium text-white bg-yellow-700 hover:bg-yellow-900"
                    >
                        Sign in to buy
                    </button>
                </Link>
            )
        } else if (product &&
            product !== null &&
            product !== undefined &&
            product.quantity > 0 && isAuthenticated) {
            return (
                <button
                    onClick={addToCart}
                    className="max-w-xs flex-1 flex items-center justify-center font-medium sm:w-full px-4 py-2 rounded border-transparent shadow-sm text-base font-medium text-white bg-yellow-700 hover:bg-yellow-900"
                >
                    {myLoading ? 'Loading...' : 'Add to cart'}
                </button>
            )
        } else {
            return (
                <span className='text-red-600 py-3 font-bold text-xl'> 
                    Out of stock
                </span>
            )
        }
    }

    return (
        <Layout>
            {loading && <main className="w-full mx-auto px-4 sm:px-12 lg:max-w-screen-2xl">Loading...</main>}
            {error && <Error404 />}
            {(!error && !loading) &&

                <main className="bg-white mx-auto px-4 sm:px-8 max-w-screen-2xl">
                    <Breadcrumbs />
                    <section className="md:grid md:grid-cols-2 lg:items-start">
                        {/* Image gallery*/}
                        <Tab.Group as="article" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="lg:w-11/12 max-w-2xl mt-4 lg:ml-8 block lg:max-w-none">
                                <Tab.List className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                                    {product && product.images.map((image) => (
                                        <Tab
                                            key={image.id}
                                            className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-yellow-900 cursor-pointer hover:bg-yellow-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                        >
                                            {({ selected }) =>

                                            (
                                                <>
                                                    <span className="absolute inset-0 rounded-md overflow-hidden">
                                                        <img src={`http://127.0.0.1:8000${image.image}`} alt="" className="w-10/11 mx-auto h-full object-center object-cover" />
                                                    </span>
                                                    <span
                                                        className={classNames(
                                                            selected ? 'ring-yellow-700' : 'ring-transparent',
                                                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>
                            <Tab.Panels>
                                {product && product.images.map((image) => (
                                    <Tab.Panel key={image.id}>
                                        <img
                                            src={`http://127.0.0.1:8000${image.image}`}
                                            alt={image.alt}
                                            className="w-8/12 m-auto sm:rounded-lg"
                                        />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                        <article className="sm:px-0 ">
                            <span className="px-1 mb-1 rounded-sm bg-yellow-700 text-lg text-white font-medium">{product && product.brand}</span>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product && product.name}</h1>
                            {/*Product rating*/}
                            <div className="mt-3">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <StarIcon
                                                key={index}
                                                className={classNames(
                                                    'text-yellow-400 h-6 w-6 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="inline-block text-2xl font-medium text-gray-900">${product && product.price}</p>
                            <p className="text-sm line-through text-rose-700">${product && product.compare_price}</p>
                           
                            <p className="mt-1 text-sm text-gray-700 ">
                                {product && product.description}
                            </p>
                          
                            <p className="mt-2 text-sm text-gray-900"><span className="text-gray-900 font-medium">Model:</span> {product && product.model}</p>
                        
                            <div className="mt-2">
                                <p>
                                    {
                                        product &&
                                            product !== null &&
                                            product !== undefined &&
                                            product.quantity > 0 ? (
                                            <span className='text-green-600 font-bold text-lg'>
                                                In stock!
                                            </span>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </p>
                                <div className="mt-2 flex sm:flex-col-1">
                                    {addButton()}
                                </div>
                            </div>
                            <div aria-labelledby="details-heading" className="mt-6 border border-yellow-700 rounded-md">
                                <h2 id="details-heading" className="sr-only">
                                    Features
                                </h2>
                                {/* Features */}
                                <>
                                    <Disclosure as="div">
                                        {({ open }) => (
                                            <>
                                                <h3>
                                                    <Disclosure.Button className="group relative w-full py-4 px-4 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(open ? 'text-gray-500' : 'text-gray-900', 'text-lg font-medium')}
                                                        >
                                                            Features
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusSmIcon
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Disclosure.Panel as="div" className="p-6 px-12 pt-0 prose prose-sm ">
                                                        <ul role="list" className="list-disc">
                                                            {product && product.characteristics && Object.entries(product.characteristics).map(([key, value]) => (
                                                                <li key={key} className="pb-2">
                                                                    <span className="font-medium">{value.name}: </span>
                                                                    {value.value}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <Link to="#" className="text-blue-600 underline pt-4" style={{ marginLeft: '-20px' }}>More information? Press here</Link>
                                                    </Disclosure.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Disclosure>
                                </>
                            </div>
                        </article>
                    </section>
                </main>
            }
        </Layout >
    )
}

const mapStateToProps = state => ({
    product: state.Products.product,
    loading: state.Products.loading,
    error: state.Products.error,
    isAuthenticated: state.Auth.isAuthenticated,
})

export default connect(mapStateToProps, {
    get_product,
    get_items,
    add_item,
    get_total,
    get_item_total,
})(ProductDetail)