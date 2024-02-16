import React from 'react'
import Layout from '../containers/Layout'

import { useState, useEffect } from "react";
import { connect } from "react-redux"
import {
  get_items,
  get_total,
  get_item_total,
  remove_item,
  update_item,
} from "../redux/actions/cart";
import CartItem from '../components/cards/CartItem';
import { Link } from 'react-router-dom';

import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

const AddCart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-red-700">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}

const Cart = ({
  get_items,
  get_total,
  get_item_total,
  isAuthenticated,
  items,
  amount,
  total_items,
  remove_item,
  update_item,
  loading
}) => {

  const [render, setRender] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    get_items()
    get_total()
    get_item_total()
  }, [render])

  const showItems = () => {

    //Lista final de ITEMS
    let results = []

    //Array de ITEMS a enlistar
    let display = []

    if (items &&
      items !== null &&
      items !== undefined &&
      items.length !== 0) {
      items.map((item, index) => {
        let count = item.count;
        return display.push(
          <div key={index}>
            <CartItem
              item={item}
              count={count}
              update_item={update_item}
              remove_item={remove_item}
              render={render}
              setRender={setRender}
            />
          </div>
        );
      })
    } else if (loading) {
      display.push(
        <div
          role="status"
          className="space-y-8 py-4 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
      display.push(
        <div className='py-8 text-center'>
          <h1 className="w-full border border-transparent py-3 px-4 text-lg font-medium text-slate-700">
            <AddCart />
            Empty cart. <Link to='/shop' className='underline text-yellow-700'>Go to the shop section</Link>
          </h1>
        </div>
      )
    }

    for (let i = 0; i <= display.length; i += 4) {
      results.push(
        <div key={i} className="mx-auto px-3 gap-1 sm:px-8 sm:gap-x-4 xl:gap-x-4">
          {display[i] ? display[i] : <div></div>}
          {display[i + 1] ? display[i + 1] : <div className=''></div>}
          {display[i + 2] ? display[i + 2] : <div className=''></div>}
          {display[i + 3] ? display[i + 3] : <div className=''></div>}
        </div>
      )

    }
    return results

  }

  const checkoutButton = () => {
    if (total_items < 1) {
      return (
        <>
          <Link
            to='/shop'
          >
            <button
              className="w-full bg-yellow-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-yellow-900"
            >
              Go to the shop section
            </button>
          </Link>
        </>
      )
    } else if (!isAuthenticated) {
      return (<>
        <Link
          to='/login'
        >
          <button
            className="w-full bg-yellow-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-yellow-900"
          >
            Sign in
          </button>
        </Link>
      </>)

    } else {
      return (
        <>
          <Link
            to='/checkout'>
            <button
              className="w-full bg-yellow-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-yellow-900"
            >
              Checkout
            </button>
          </Link>
        </>
      )

    }
  }

  const subtotal = (amount.toFixed(2) - amount.toFixed(2) * 0.16)
  const iva = (amount.toFixed(2) * 0.16)

  return (
    <Layout>
      <main className='max-w-7xl mx-auto'>
        <header className='pt-4 px-4'>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">My Cart</h1>
          <p className="mt-1 max-w-2xl text text-gray-500">Go to the <Link to='/shop' className='underline font-bold'>Shop</Link> for add more products</p>
        </header>
        <section className="mt-4 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <article aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {showItems()}
            </ul>
          </article>

          {/* Order summary */}
          <article
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Purchase order
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">{subtotal.toFixed(2)}$</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Estimated shipping cost</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how shipping is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-green-500 font-bold">Free!</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax (16%)</span>
                  <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Learn more about how tax is calculated</span>
                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{iva.toFixed(2)}$</dd>
              </div>
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Orden total</dt>
                <dd className="text-base font-medium text-gray-900">{amount.toFixed(2)}$</dd>
              </div>
            </dl>

            <article className="mt-6">
              {checkoutButton()}
            </article>
          </article>
        </section>
      </main>
    </Layout>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  items: state.Cart.items,
  amount: state.Cart.amount,
  compare_amount: state.Cart.compare_amount,
  total_items: state.Cart.total_items,
  loading: state.Cart.loading
})

export default connect(mapStateToProps, {
  get_items,
  get_total,
  get_item_total,
  remove_item,
  update_item,
})(Cart)