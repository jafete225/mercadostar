"use client"

import Image from "next/image"

const CardModal = () => {

    const cartItems = true


    return(
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">

        {!cartItems ? (
            <div className=""> Cart is Empty</div>
            
        ) : (
            <>
            <h2 className="text-sl">Carrinho de compras</h2>
             {/*LIST*/}
            <div className="flex flex-col gap-8">
                {/*ITEM*/}
            <div className="flex gap-4"> 
            <Image 
            src="/logo.png"
            alt=""
            width={72}
            height={96}
            className="object-cover rounded-md"
            />
            <div className=" flex flex-col justify-between w-full">
                {/* TOP*/}
                <div className="">
                {/* TITTLE*/}
                <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold"> Nome do produto</h3>
                    <div className=" bg-gray-50 rounded-sm">500MZN</div>
                </div>
                {/* DESC*/}
                <div className="p-1 text-sm text-gray-500">
                    Disponivel 
                </div>
                </div>
                {/* BOTTON  */}
                <div className="  flex justify-between text-sm">
                    <span className="text-gray-500">Quant. 2</span>
                    <span className="text-blue-500">Remover</span>
                </div>
            </div>
            
            </div>
                 {/*ITEM*/}
                 <div className="flex gap-4"> 
            <Image 
            src="/logo.png"
            alt=""
            width={72}
            height={96}
            className="object-cover rounded-md"
            />
            <div className=" flex flex-col justify-between w-full">
                {/* TOP*/}
                <div className="">
                {/* TITTLE*/}
                <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold"> Nome do produto</h3>
                    <div className=" bg-gray-50 rounded-sm">500MZN</div>
                </div>
                {/* DESC*/}
                <div className="p-1 text-sm text-gray-500">
                    Disponivel 
                </div>
                </div>
                {/* BOTTON  */}
                <div className="  flex justify-between text-sm">
                    <span className="text-gray-500">Quant. 2</span>
                    <span className="text-blue-500">Remover</span>
                </div>
            </div>
            </div>
            </div>
            {/*BOTTON*/}
            <div className="">
                <div className="flex items-center justify-between gap-8">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold">500MZN</span>
                </div>
                <p className="text-gray-500 text-sm mt-2 mb-4"> 
                    Lorem dsadsadbsadvsa  dahsdghs
                </p>
                <div className="flex justify-between text-sm">
                    <button className="rounded-md py-3 px-4 ring-2 ring-gray-300">Ver carrinho</button>
                    <button className="rounded-md py-3 px-4 bg-black text-white">Checkout</button>
                </div>
            </div>

            </>   )}
        </div>
    )
}

export default CardModal;