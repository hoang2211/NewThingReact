'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userID')

    if (!userId) {
      setLoading(false)
      setError('User ID not found in localStorage')
      return
    }

    const fetchWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:5223/api/Wishlist/${userId}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch wishlist: ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Wishlist data fetched:', data) // for testing purpose
        setWishlist(data)
      } catch (err) {
        console.error('❌ Error fetching wishlist:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchWishlist()
  }, [])


  if (loading) return <p className="text-center text-gray-500">Loading wishlist...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">My Wishlist</h1>
          <p className="mt-1 text-sm text-gray-500">Check your saved products here.</p>
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
          <section className="mt-16">
          <h2 className="sr-only">Wishlist</h2>
        
          <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100 text-left font-semibold text-gray-600">
                <tr>
                  <th className="py-4 px-6 sm:w-2/5 lg:w-1/3">Product</th>
                  <th className="py-4 px-6 hidden sm:table-cell w-1/5">Price</th>
                  <th className="py-4 px-6 text-right w-1/5">Actions</th>
                </tr>
              </thead>
        
              <tbody className="divide-y divide-gray-100">
                {wishlist.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.imageUrls?.[0]}
                          
                          alt={product.name}
                          className="h-16 w-16 rounded-md object-cover border"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 sm:hidden">
                            {product.price?.toLocaleString()} VND
                          </p>
                        </div>
                      </div>
                    </td>
        
                    <td className="py-4 px-6 hidden sm:table-cell">
                      {product.price?.toLocaleString()} VND
                    </td>
        
                    <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                      <button className="text-red-600 hover:underline hover:text-red-700 transition">
                        Remove
                      </button>
                      <button className="text-cyan-600 hover:underline hover:text-cyan-700 transition">
                        Add to cart
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
