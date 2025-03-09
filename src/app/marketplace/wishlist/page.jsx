'use client'

import { useEffect, useState } from 'react'

export default function Wishlist({ userId, wishlist: initialWishlist }) {
  const [wishlist, setWishlist] = useState(initialWishlist || [])
  const [loading, setLoading] = useState(userId ? true : false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return // Skip API call if no userId

    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/Wishlist/${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist')
        }
        const data = await response.json()
        setWishlist(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [userId])

  if (loading) {
    return <p className="text-center text-gray-500">Loading wishlist...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download invoices.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-gray-500">Your wishlist is empty.</p>
            <a
              href="/marketplace"
              className="mt-4 inline-block rounded-md bg-cyan-600 px-6 py-2 text-white hover:bg-cyan-700"
            >
              Go to Marketplace
            </a>
          </div>
        ) : (
          <section aria-labelledby="wishlist-heading" className="mt-16">
            <h2 id="wishlist-heading" className="sr-only">Wishlist</h2>
            <div className="space-y-6">
              <table className="w-full text-gray-500">
                <thead className="text-left text-sm text-gray-500 sm:table-header-group">
                  <tr>
                    <th className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">Product</th>
                    <th className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">Price</th>
                    <th className="hidden py-3 pr-8 font-normal sm:table-cell">Stock status</th>
                    <th className="w-0 py-3 text-right font-normal"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm">
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
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="mt-1 sm:hidden">{product.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{product.status}</td>
                      <td className="py-6 text-right font-medium whitespace-nowrap">
                        <button className="mr-4 text-red-600">Remove</button>
                        <button className="text-cyan-600">
                          Add<span className="hidden lg:inline"> to cart</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
    
  )
}
