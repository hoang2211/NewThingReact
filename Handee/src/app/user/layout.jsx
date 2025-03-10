import {
  PhotoIcon,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon as UserCircleIconOutline,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import UserLayout from '../(main)/layout'

const navigation = [
  {
    name: 'Account',
    href: '/user/sample-id',
    icon: UserCircleIconOutline,
    current: true,
  },
  //   { name: 'Password', href: '#', icon: KeyIcon, current: false },
  {
    name: 'Order',
    href: '/user/history',
    icon: SquaresPlusIcon,
    current: false,
  },
  //   { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: false },
  //   { name: 'Team', href: '#', icon: UserGroupIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ children }) {
  return (
    <UserLayout>
      <div className="mx-8 my-16 lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current
                    ? 'bg-gray-50 text-cyan-700 hover:bg-white hover:text-cyan-700'
                    : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    item.current
                      ? 'text-cyan-500 group-hover:text-cyan-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 -ml-1 size-6 shrink-0',
                  )}
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          {children}
        </div>
      </div>
    </UserLayout>
  )
}
