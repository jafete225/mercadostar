"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="">
            <Image 
                src="/menu.png" 
                alt="Menu icon"
                width={28}
                height={28}
                className="cursor-pointer" 
                onClick={() => setOpen((prev) => !prev)} 
            />
            {open && (
                <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8">
                    <Link href="/" className="block p-4 hover:bg-gray-700">Homepage</Link>
                    <Link href="/" className="block p-4 hover:bg-gray-700">Shop</Link>
                    <Link href="/" className="block p-4 hover:bg-gray-700">Deals</Link>
                    <Link href="/" className="block p-4 hover:bg-gray-700">About</Link>
                    <Link href="/" className="block p-4 hover:bg-gray-700">Contact</Link>
                    <Link href="/" className="block p-4 hover:bg-gray-700">Logout</Link>
                    <Link href="/" className="block p-4 hover:bg-gray-700">Cart(1)</Link>
                </div>
            )}
        </div>
    );
}

export default Menu;
