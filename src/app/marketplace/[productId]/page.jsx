'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
  const { productId } = useParams()
  const [productData, setProductData] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Helper to simplify product structure
  const simplifyProduct = (item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    stockQuantity: item.stockQuantity,
    image: item.imageUrls?.[0] || '/placeholder.jpg',
    images: item.imageUrls?.map((url, index) => ({
      src: url,
      alt: `${item.name} image ${index + 1}`,
    })) || [],
    categoryName: item.categoryName,
    sellerName: item.sellerName,
    rating: item.rating || 4, // fallback for demo
    details: item.details || [], // fallback if undefined
  })

  // Fetch product details and related products
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        console.log('Fetching product details...')
        const response = await fetch(`http://localhost:5223/api/Product/details/${productId}`)
        if (!response.ok) throw new Error('Failed to fetch product data')
        const data = await response.json()
        const simplified = simplifyProduct(data)
        setProductData(simplified)
        console.log('Fetched Product Data:', simplified)
      } catch (err) {
        setError(err.message)
        console.error('Product Fetch Error:', err)
      } finally {
        setLoading(false)
      }
    }

    async function fetchRelatedProducts() {
      try {
        console.log('Fetching related products...')
        const response = await fetch(`http://localhost:5223/api/Product/${productId}/related`)
        if (!response.ok) throw new Error('Failed to fetch related products')
        const data = await response.json()
        const simplified = data.map(simplifyProduct)
        setRelatedProducts(simplified)
        console.log('Fetched Related Products:', simplified)
      } catch (err) {
        setError(err.message)
        console.error('Related Products Fetch Error:', err)
      }
    }

    fetchProductDetails()
    fetchRelatedProducts()
  }, [productId])

  const handleAddToWishlist = async () => {
    try {
      const userId = localStorage.getItem('userID');
      if (!userId) {
        alert('Please login to add items to wishlist');
        return;
      }
  
      const response = await fetch(`http://localhost:5223/api/Wishlist/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userId': userId,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }
  
      const data = await response.json();
      console.log('Added to wishlist:', data);
      alert('Added to wishlist successfully!');
    } catch (err) {
      console.error('Wishlist Error:', err);
      alert('Failed to add to wishlist');
    }
  };
  
  const renderProductInfo = () => {
    if (!productData) return null

    console.log('Rendering Product Info:', productData)

    return (
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {/* Image gallery */}
        <TabGroup className="flex flex-col-reverse">
          <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList className="grid grid-cols-4 gap-6">
              {productData.images?.map((image, index) => (
                <Tab
                  key={index}
                  className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  <span className="sr-only">{image.name}</span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img src={image.src} alt={image.alt} className="size-full object-cover" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent group-data-selected:ring-cyan-500"
                  />
                </Tab>
              ))}
            </TabList>
          </div>

          <TabPanels>
            {productData.images?.map((image, index) => (
              <TabPanel key={index}>
                <img src={image.src} alt={image.alt} className="aspect-square w-full object-cover sm:rounded-lg" />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productData.name}</h1>
          <p className="mt-3 text-3xl tracking-tight text-gray-900">
          {productData.price.toLocaleString()} VND
          </p>

          <div className="mt-3 flex items-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon
                key={i}
                className={classNames(
                  productData.rating > i ? 'text-cyan-500' : 'text-gray-300',
                  'size-5 shrink-0'
                )}
              />
            ))}
          </div>

          <div
            className="mt-6 space-y-6 text-base text-gray-700"
            dangerouslySetInnerHTML={{ __html: productData.description }}
          />

          <div className="mt-10 flex">
            <button className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-cyan-500 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700">
              Add to bag
            </button>
            <button
            onClick={handleAddToWishlist}
             className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <HeartIcon className="size-6" />
              <span className="sr-only">Add to Wishlist</span>
            </button>
          </div>

          {/* Details Section */}
          <section className="mt-12 border-t divide-y divide-gray-200">
            {productData.details?.map((detail, index) => (
              <Disclosure key={index} as="div">
                <DisclosureButton className="flex w-full items-center justify-between py-6 text-left text-sm font-medium text-gray-900 hover:text-cyan-600">
                  {detail.name}
                </DisclosureButton>
                <DisclosurePanel className="pb-6 text-sm text-gray-600">
                  <ul className="list-disc pl-4 space-y-2">
                    {detail.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </section>
        </div>
      </div>
    )
  }

  const renderRelatedProducts = () => (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((item) => (
          <Link key={item.id} href={`/marketplace/${item.id}`}>
            <div className="cursor-pointer border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition hover:ring-2 hover:ring-cyan-500">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.categoryName}</p>
                <p className="mt-1 font-medium text-gray-900">
                {item.price.toLocaleString()} VND
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    
  );
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {renderProductInfo()}
            {renderRelatedProducts()}
          </>
        )}
      </main>
    </div>
  )
}
