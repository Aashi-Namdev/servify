import React from 'react'

function PageHero() {
  return (
    <div className='relative h-[40vh] w-full bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661963478928-2d2d3e9b1e25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" , backgroundPositionY: "100%", backgroundPositionX: "50%" }}>
        <div className='absolute inset-0 bg-gradient-to-b from-black/80 to-black/60'></div>
        <div className='absolute inset-0 flex  items-center justify-center p-4'>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <h1 className='text-4xl md:text-5xl font-semibold text-white text-center'>Our Services</h1>
                <p className='text-gray-300 text-center'>Home / <span className='text-blue-600'>Services</span></p>
            </div>
        </div>
      </div>
    )
  }

export default PageHero