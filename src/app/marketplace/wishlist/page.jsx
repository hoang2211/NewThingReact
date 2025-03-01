'use client'

import { Fragment, useState } from 'react'

const wishlist = [
  {
    id: 1,
    name: "Men's 3D Glasses Artwork Tee",
    href: '#',
    price: '$36.00',
    status: 'In stock',
    imageSrc:
      'https://tailwindui.com/plus-assets/img/ecommerce-images/order-history-page-04-product-01.jpg',
    imageAlt:
      'Black tee with intersecting red, white, and green curved lines on front.',
  },
  // More products...
]

export default function Example() {
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        <section aria-labelledby="recent-heading" className="mt-16">
          <h2 id="recent-heading" className="sr-only">
            Recent orders
          </h2>

          <div className="space-y-20">
            {wishlist.map((order) => (
              <div key={order.number}>
                <h3 className="sr-only">
                  Order placed on{' '}
                  <time dateTime={order.datetime}>{order.date}</time>
                </h3>

                {/* <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                  <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="sm:mt-1">
                        <time dateTime={order.datetime}>{order.date}</time>
                      </dd>
                    </div>
                    <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                      <dt className="font-medium text-gray-900">
                        Order number
                      </dt>
                      <dd className="sm:mt-1">{order.number}</dd>
                    </div>
                    <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                      <dt className="font-medium text-gray-900">
                        Total amount
                      </dt>
                      <dd className="font-medium text-gray-900 sm:mt-1">
                        {order.total}
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={order.invoiceHref}
                    className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-hidden sm:mt-0 sm:w-auto"
                  >
                    View Invoice
                    <span className="sr-only">for order {order.number}</span>
                  </a>
                </div> */}

                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                      >
                        Stock status
                      </th>
                      <th
                        scope="col"
                        className="w-0 py-3 text-right font-normal"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                    {wishlist.map((product) => (
                      <tr key={product.id}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              alt={product.imageAlt}
                              src={product.imageSrc}
                              className="mr-6 size-16 rounded-sm object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="mt-1 sm:hidden">
                                {product.price}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {product.price}
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {product.status}
                        </td>
                        <td className="py-6 text-right font-medium whitespace-nowrap">
                          <button className="mr-4 text-red-600">Remove</button>
                          <button className="text-cyan-600">
                            Add
                            <span className="hidden lg:inline"> to cart</span>
                            <span className="sr-only">, {product.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
