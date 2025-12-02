"use client";
import Link from "next/link";
import Image from "next/image";
import MohanBrothersLogo from "../app/images/mohan brothers logo.png";
import GodrejLogo from "../app/images/godrej interio logo.png";
export default function ScrollNavbar() {
  return (
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          <Image src={MohanBrothersLogo}  height={40} alt="Logo" />
          <Image src={GodrejLogo} height={40} alt="Logo" />
        </Link>
        <div className="navbar-links">
          <div className="navbar-dropdown">
            <div className="dropdown">
              <Link href="#" className="navbar-text">Products</Link>
              <div className="dropdown-content">
                <Link href="/almirah">Almirah</Link>
                <Link href="/chairs">Chairs</Link>
                <Link href="/mattress">Mattress</Link>
                <Link href="/dining">Dining</Link>
                <Link href="/table">Table</Link>
                <Link href="/table">Safe</Link>
              </div>
            </div>
          </div>
          <div className="navbar-dropdown">
            <div className="dropdown">
              <Link href="#" className="navbar-text">Discover</Link>
              <div className="dropdown-content">
                <Link href="/Offers">Offers</Link>
                <Link href="/Best-Sellers">Best Sellers</Link>
                <Link href="/New-Arrivals">New-Arrivals</Link>
              </div>
            </div>
          </div>
          <Link href="sign-in" className="navbar-sign-in">Sign In</Link>
          <div>
            <form action="search" method="get">
              <input type="text" name="q" placeholder="Search..." required />
              <button type="submit"></button>
            </form>
          </div>
        </div>
      </nav>
  );
}

