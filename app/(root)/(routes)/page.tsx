"use client"

import { Button } from '@/components/ui/button'
import { useStoreModal } from '@/hooks/use-store-modal'
import Link from 'next/link'
import React, { useEffect } from 'react'

const SetUpPage = () => {

  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if(!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-900'>
      <div className='bg-slate-800 h-80 w-80 rounded-md shadow-black shadow-xl'>
        
      </div>
    </div>
  );
}

export default SetUpPage