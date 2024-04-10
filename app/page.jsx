"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  
  return (
    <div className="w-full  h-screen flex justify-center items-center text-white" style={{
      background: "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)"
    }}>
      <div class="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
        {/* <img  alt="hero" src={Checklist} /> */}
        <Image
      src="/Checklist.png"
      width={500}
      height={500}
      alt="Picture of the author"
      class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center"
    />
        <div class="text-center lg:w-5/12 w-full ">
          <h1 className="my-4 text-5xl font-bold leading-tight max-sm:text-3xl">
            WELCOME TO TASK MANAGEMENT
          </h1>
          <p className="text-2xl mb-8">
          Efficiently organize, track, and prioritize tasks with our intuitive task management platform.
          </p>
          <div className="flex justify-center mx-auto">
            <button
              className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8">
              <Link href="https://github.com/Vaishnavi-Raykar/Project1---Task-Management.git">View Project</Link>
            </button>
           
          </div>
        </div>
      </div>
    </div >
  )
}

export default page
