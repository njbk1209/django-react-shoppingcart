import Layout from '../containers/Layout'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

//categories and products imports
import { connect } from 'react-redux'
import { get_products, get_filtered_products } from '../redux/actions/products'
import { get_categories } from '../redux/actions/categories'
import MobileFilters from '../components/shop/MobileFilters'
import WebFilters from '../components/shop/WebFilters'
import ErrorComponent from '../components/shop/ErrorComponent'
import ProductCard from '../components/cards/ProductCard'

const Shop = ({
    categories,
    get_products,
    products,
    get_filtered_products,
    filtered_products,
    get_categories,
    error,
    loading
}) => {

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filtered, setFiltered] = useState(false)

    useEffect(() => {
        get_categories()
        get_products()
        window.scrollTo(0, 0)
    }, [])

    const [formData, setFormData] = useState({
        category_id: '0',
        price_range: 'Any',
        sortBy: 'created',
        order: 'desc'
    })

    const {
        category_id,
        price_range,
        sortBy,
        order
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        setFiltered(true)
        get_filtered_products(category_id, price_range, sortBy, order);
        window.scrollTo(0, 0)
    }

    const showProducts = () => {
        //Lista final de productos
        let results = []

        //Array de productos a enlistar
        let display = []

        if (
            products &&
            products !== null &&
            products !== undefined &&
            products.length !== 0 && !filtered
        ) {
            products.map((product, index) => {

                return display.push(
                    <div key={product.id}>
                        <ProductCard id={product.id}
                            images={`http://127.0.0.1:8000${product.images[0].image}`}
                            name={product.name}
                            price={product.price}
                            compare_price={product.compare_price}
                        />
                    </div>
                );
            });
        } else if (
            filtered && filtered_products &&
            filtered_products !== null &&
            filtered_products !== undefined &&
            filtered_products.length !== 0
        ) {
            filtered_products.map((product, index) => {
                display.push(
                    <div key={index}>
                        <ProductCard id={product.id}
                            images={`http://127.0.0.1:8000${product.images[0].image}`}
                            name={product.name}
                            price={product.price}
                            compare_price={product.compare_price}
                        />
                    </div>
                );
            });
        } else if (loading) {
            display.push(
                <p>Loading...</p>
            )
        } else if (error) {
            display.push(
                <ErrorComponent />
            )
        }

        for (let i = 0; i <= display.length; i += 4) {

            results.push(
                <div key={i} className="mx-auto grid grid-cols-2 px-3 gap-1 sm:px-8 sm:gap-x-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:gap-x-4">
                    {display[i] ? display[i] : <div></div>}
                    {display[i + 1] ? display[i + 1] : <div className=''></div>}
                    {display[i + 2] ? display[i + 2] : <div className=''></div>}
                    {display[i + 3] ? display[i + 3] : <div className=''></div>}
                </div>
            )

        }
        return results
    }

    return (
        <Layout>
            <div className='lg:px-4'>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 flex items-center justify-between">
                                    <button
                                        type="button"
                                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* MOBILE FILTERS */}
                                <form onSubmit={e => onSubmit(e)} className="mt-4 border-t border-gray-200">

                                    <MobileFilters
                                        categories={categories}
                                        onChange={onChange}
                                        sortBy={sortBy}
                                        order={order}
                                    />

                                </form>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <section className='max-w-7xl mx-auto'>
                    <article className="relative z-10 p-4 flex items-end justify-between border-b border-gray-200">
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Shop</h1>

                        <div className="flex items-center">
                            <button
                                type="button"
                                className=" sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>
                            </button>
                        </div>
                    </article>

                    <article aria-labelledby="products-heading" className="pt-4 px-4 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                            {/* WEBS FILTERS  */}
                            <form onSubmit={e => onSubmit(e)} className="hidden lg:block">
                                <h2 className='text-xl font-bold text-gray-900 border-b border-gray-200 pb-2'>Filters</h2>

                                <WebFilters
                                    categories={categories}
                                    onChange={onChange}
                                    sortBy={sortBy}
                                    order={order}
                                />
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                {showProducts()}
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    categories: state.Categories.categories,
    products: state.Products.products,
    filtered_products: state.Products.filtered_products,
    error: state.Products.error,
    loading: state.Products.loading
})

export default connect(mapStateToProps, {
    get_categories,
    get_products,
    get_filtered_products,
})(Shop)