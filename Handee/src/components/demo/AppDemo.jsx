'use client'

import { useId, useRef, useState } from 'react'
import clsx from 'clsx'
import { motion, useInView, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { AppScreen } from '@/components/demo/AppScreen'
import home_sample from '@/images/sample/home_sample.png'

export function AppDemo() {
  return (
    <AppScreen>
      <AppScreen.Body>
        <div className="p-4">
          <Image src={home_sample} alt="sample home product" />
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}
