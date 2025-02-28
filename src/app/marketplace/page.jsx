'use client'

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals' },
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'sweatshirts', label: 'Sweatshirts' },
      { value: 'pants-shorts', label: 'Pants & Shorts' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
]
const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '/marketplace/tee-sample',
    price: '$256',
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc:
      'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description:
      'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc:
      'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-white">
      <div>
        {/* Mobile menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Links */}
              <TabGroup className="mt-2">
                <div className="border-b border-gray-200">
                  <TabList className="-mb-px flex space-x-8 px-4">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-cyan-600 data-selected:text-cyan-600"
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </TabList>
                </div>
                <TabPanels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <TabPanel
                      key={category.name}
                      className="space-y-10 px-4 pt-10 pb-8"
                    >
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div
                            key={item.name}
                            className="group relative text-sm"
                          >
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                            />
                            <a
                              href={item.href}
                              className="mt-6 block font-medium text-gray-900"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 z-10"
                              />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p
                            id={`${category.id}-${section.id}-heading-mobile`}
                            className="font-medium text-gray-900"
                          >
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a
                                  href={item.href}
                                  className="-m-2 block p-2 text-gray-500"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6">
                <a href="#" className="-m-2 flex items-center p-2">
                  <img
                    alt=""
                    src="https://tailwindui.com/plus-assets/img/flags/flag-canada.svg"
                    className="block h-auto w-5 shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    CAD
                  </span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <header className="relative bg-white">
          <p className="flex h-10 items-center justify-center bg-cyan-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
            Get free delivery on orders over $100
          </p>
        </header>
      </div>

      <div>
        <div className="border-b border-gray-200">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4 py-4">
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-4 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      viewBox="0 0 6 20"
                      aria-hidden="true"
                      className="h-5 w-auto text-gray-300"
                    >
                      <path
                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  New Arrivals
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pt-24 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the latest release of Basic Tees, new and improved
              with four openings!
            </p>
          </div>

          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  aria-hidden="true"
                  className="ml-1 size-5 shrink-0 text-gray-400"
                />
              </button>

              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200">
                  {filters.map((section) => (
                    <div
                      key={section.name}
                      className="py-10 first:pt-0 last:pb-0"
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="space-y-3 pt-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    id={`${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-cyan-600 checked:bg-cyan-600 indeterminate:border-cyan-600 indeterminate:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="aspect-3/4 bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
                    />
                    <div className="flex flex-1 flex-col space-y-2 p-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        <Link href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.description}
                      </p>
                      <div className="flex flex-1 flex-col justify-end">
                        <p className="text-sm text-gray-500 italic">
                          {product.options}
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
