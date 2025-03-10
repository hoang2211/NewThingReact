import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, TruckIcon } from '@heroicons/react/20/solid'

const orders = [
  {
    number: 'WU88191111',
    status: 'In Transit',
    trackingHref: '#',
    createdDate: 'Jul 6, 2021',
    createdDatetime: '2021-07-06',
    estimatedDelivery: 'July 12, 2021',
    total: '$160.00',
    products: [
      {
        id: 1,
        name: 'Micro Backpack',
        href: '#',
        price: '$70.00',
        imageSrc:
          'https://tailwindui.com/plus-assets/img/ecommerce-images/order-history-page-03-product-01.jpg',
        imageAlt: 'Compact backpack image',
      },
    ],
  },
]

export default function OrderManagementShipper() {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage and track your shipments efficiently.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Orders in transit</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.map((order) => (
                <div
                  key={order.number}
                  className="border border-gray-200 bg-white shadow-sm sm:rounded-lg"
                >
                  <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.number}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Estimated delivery: {order.estimatedDelivery}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {order.status}
                      </span>
                      <a
                        href={order.trackingHref}
                        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <TruckIcon className="mr-1 h-5 w-5" /> Track Order
                      </a>
                    </div>
                  </div>

                  <ul role="list" className="divide-y divide-gray-200">
                    {order.products.map((product) => (
                      <li key={product.id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              alt={product.imageAlt}
                              src={product.imageSrc}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{product.name}</h5>
                              <p className="mt-2 sm:mt-0">{product.price}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
