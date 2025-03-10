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
import { HeartIcon as HeartIconOutLine } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {toast} from 'react-hot-toast'

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
    Quantity: item.stockQuantity,
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

  const [wishlistMessage, setWishlistMessage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  //  
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem('accessToken');
  //     if (!token) return;
  //     console.log("me",token);
  
  //     try {
  //       const response = await fetch('http://localhost:5223/api/User/me', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });
  
  //       const data = await response.json();
  //       console.log('User data:', data);
  //     } catch (err) {
  //       console.error('Error fetching user data:', err);
  //     }
  //   };
  
  //   fetchUserData();
  // }, []);
  

const handleAddToWishlist = async () => {
  try {
    const userId = localStorage.getItem('userID');
    if (!userId) {
      toast.info('Please log in to add items to wishlist.');
      return;
    }

    const response = await fetch(`http://localhost:5223/api/Wishlist/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const text = await response.text();

    if (response.status === 500) {
      // Product already in wishlist
      setIsInWishlist(true);
      toast.error('Item is already in your wishlist');
      return;
    }

    if (!response.ok) {
      setIsInWishlist(false);
      toast.error('Failed to add to wishlist');
      console.error('Wishlist Error:', text);
      return;
    }

    // Success
    setIsInWishlist(true);
    toast.success('Added to wishlist successfully');

  } catch (err) {
    console.error('Wishlist Error:', err);
    setIsInWishlist(false);
    toast.error('An unexpected error occurred');
  }
};

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userID');
      if (!userId) {
        toast.error('Please login to add items to cart');
        return;
      }
      const response = await fetch(`http://localhost:5223/api/Orders/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity,userId }),
      });
      if (!response.ok) {
        toast.error('Failed to add to cart');
      }
      const data = await response.json();
      console.log('Added to cart:', data);
      toast.success('Added to cart successfully!');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };


  const [quantity, setQuantity] = useState(1);
  

  const renderProductInfo = () => {
    if (!productData) return null

    console.log('Rendering Product Info:', productData)

    return (
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {/* === Image Gallery === */}
        <TabGroup className="flex flex-col-reverse">
          {/* Thumbnails */}
          <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList className="grid grid-cols-4 gap-6">
              {productData.images?.map((image, index) => (
                <Tab
                  key={index}
                  className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 hover:bg-gray-50"
                >
                  <span className="sr-only">{image.name || `Image ${index + 1}`}</span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <img src={image.src} alt={image.alt || `Image ${index + 1}`} className="size-full object-cover" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent group-data-selected:ring-cyan-500"
                  />
                </Tab>
              ))}
            </TabList>
          </div>
  
          {/* Full Image Panel */}
          <TabPanels>
            {productData.images?.map((image, index) => (
              <TabPanel key={index}>
                <img src={image.src} alt={image.alt || `Main Image`} className="aspect-square w-full object-cover sm:rounded-lg" />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
  
        {/* === Product Info Section === */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{productData.name}</h1>
          <p className="mt-3 text-3xl tracking-tight text-gray-900">
            {productData.price.toLocaleString()} VND
          </p>
  
          {/* Rating */}
          <div className="mt-3 flex items-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon
                key={i}
                className={`${productData.rating > i ? 'text-cyan-500' : 'text-gray-300'} size-5`}
                aria-hidden="true"
              />
            ))}
          </div>
  
          {/* Description */}
          <div
            className="mt-6 space-y-6 text-base text-gray-700"
            dangerouslySetInnerHTML={{ __html: productData.description }}
          />
  
          {/* Quantity Selector */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="text-sm text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min={1}
                max={productData.Quantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(productData.Quantity, parseInt(e.target.value) || 1)))}
                className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-sm text-gray-500">
                (In stock: {productData.Quantity})
              </span>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="mt-10 flex">
            <button
              onClick={handleAddToCart}
              className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-cyan-500 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="ml-4 flex items-center justify-center rounded-md px-3 py-3 hover:bg-gray-100"
            >
              {isInWishlist ? (
                <HeartIconSolid className="size-6 text-red-500" />
              ) : (
                <HeartIconOutLine className="size-6 text-gray-400 hover:text-gray-500" />
              )}
              <span className="sr-only">Add to Wishlist</span>
            </button>
          </div>
          {wishlistMessage && (
            <p className="ml-4 mt-2 text-sm text-gray-600">{wishlistMessage}</p>
          )}
  
          {/* Details Section */}
          {productData.details?.length > 0 && (
            <section className="mt-12 border-t divide-y divide-gray-200">
              {productData.details.map((detail, index) => (
                <Disclosure key={index} as="div">
                  <DisclosureButton className="flex w-full items-center justify-between py-6 text-left text-sm font-medium text-gray-900 hover:text-cyan-600">
                    {detail.name}
                  </DisclosureButton>
                  <DisclosurePanel className="pb-6 text-sm text-gray-600">
                    <ul className="list-disc pl-4 space-y-2">
                      {detail.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </section>
          )}
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
