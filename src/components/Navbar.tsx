import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <header>
      <nav className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <button className="p-2">Menu</button>
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Image
              src="/logo.svg"
              alt="Côte Royale Paris"
              width={180}
              height={30}
              className="m:w-44 w-32"
            />
          </div>
          <div className="icons flex">Icons</div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
