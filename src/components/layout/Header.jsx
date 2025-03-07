'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { NavLinks } from '@/components/common/NavLinks';

export function Header() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      fetch(`http://localhost:5223/api/User/${userId}`, { // Fixed API URL
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          return response.json();
        })
        .then((data) => {
          if (data && !data.error) {
            setUser(data);
            setIsLoggedIn(true);
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout());
        console.log(token);
        console.log(userId);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <PopoverButton
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600"
                    aria-label="Toggle site navigation"
                  >
                    {open ? (
                      <svg viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M17 14l-5-5-5 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-6 w-6">
                        <path d="M5 6h14M5 18h14M5 12h14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </PopoverButton>
                  <AnimatePresence>
                    {open && (
                      <PopoverPanel className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pt-32 pb-6 shadow-2xl">
                        <div className="space-y-4">
                          <Link href="/#features">Features</Link>
                          <Link href="/#reviews">Reviews</Link>
                          <Link href="/#pricing">Pricing</Link>
                          <Link href="/#faqs">FAQs</Link>
                        </div>
                        <div className="mt-8 flex flex-col gap-4">
                          {isLoggedIn ? (
                            <Button onClick={handleLogout} variant="outline">
                              Log out
                            </Button>
                          ) : (
                            <>
                              <Button href="/login" variant="outline">
                                Log in
                              </Button>
                              <Button href="/register">Sign up</Button>
                            </>
                          )}
                        </div>
                      </PopoverPanel>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <div className="flex items-center gap-6 max-lg:hidden">
              {isLoggedIn ? (
                <>
                  <span>Welcome, {user?.username}</span>
                  <Button onClick={handleLogout} variant="outline">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/login" variant="outline">
                    Log in
                  </Button>
                  <Button href="/register">Sign up</Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
