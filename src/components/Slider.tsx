"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    tittle: "Coleções de liquidação de verão",
    description: "Promoção! Até 50% de desconto!!",
    img: "/fotoverao2.png",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    tittle: "Coleções de liquidação de inverno",
    description: "Promoção! Até 50% de desconto!!",
    img: "/fotoinverno.png",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    tittle: "Coleções de liquidação de primavera",
    description: "Promoção! Até 50% de desconto!!",
    img: "/fotoprimavera.png",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(()=> {
    const interval = setInterval(()=>{
        setCurrent(prev=>(prev ===  slides.length-1 ? 0 : prev + 1) )
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Lógica para alternar slides automaticamente
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden ">
      <div
        className="w-max h-full flex transition-all ease-in-out  duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-screen h-full flex flex-col gap-16 xl:flex-row ${slide.bg} `}
          >
            {/* TEXT CONTAINER */}
            <div className="xl:w-1/2  xl:h-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-4xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-semibold">
                {slide.tittle}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black text-white py-3 px-4 ">
                  COMPRE AGORA
                </button>
              </Link>
            </div>

            {/* IMAGE CONTAINER */}
            <div className="xl:w-1/2  relative h-full ">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 botton-8 flex gap-4">
      {slides.map((slide, index) => (
  <div
   
    className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
      current === index ? "scale-150" : ""
    }`}
    key={slide.id}
    onClick={() => setCurrent(index)}
  >
    {current === index && (
        <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
    )}
    
  </div>
))}
</div>
    </div>
  );
};

export default Slider;
