import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
// import NavIcons from "./NavIcons";

// const NavIcons = dynamic(() => import("./NavIcons"), {ssr: false})

import SearchBar from "./SearchBar";
// import dynamic from "next/dynamic";

const Navbar = () => {
    return (
        <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-30 relative">
            <div className="h-full flex items-center justify-between md:hidden">
                {/* Mobile View */}
                <Link href="/">
                    <div className="text-2xl tracking-wide">STARMARKET</div>
                </Link>
                <Menu />
            </div>

            {/* Large screen layout */}
            <div className="hidden md:flex items-center justify-between gap-8 h-full">
                {/* Left Section */}
                <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.png" alt="STARMARKET logo" width={24} height={24} />
                        <div className="text-2xl tracking-wide">STARMARKET</div>
                    </Link>
                    <div className="hidden xl:flex gap-4">
                    <Link href="/" className="">Homepage</Link>
                    <Link href="/" className="">Shop</Link>
                    <Link href="/" className="">Deals</Link>
                    <Link href="/" className="">About</Link>
                    <Link href="/" className="">Contact</Link>

                    </div>
                
                </div>
                {/* Right Section */}
                <div className="w-2/3 flex xl:w-1/2  items-center justify-between gap-8">
                    {/* Replaced SearchBar with a simple input */}
                  
                    <SearchBar/>
                    {/* <NavIcons /> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
