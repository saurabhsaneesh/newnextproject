
import Image from 'next/image';
import HeroImage from "./images/hero image.jpg";
import ProductDisplay from '../components/productdisplay';
const MEDIA_URL = process.env.S3_MEDIA_URL || '' 

export const metadata = {
  title: 'Mohan Brothers',
  description: 'Premium Furniture & Home Decor',
}

export default async function Home() {
  return (
    <div>
      <Image className='hero-image'
          src={HeroImage}
          alt="hero image"
      />
      <div className='hero'>
        "Discover"
      </div>
      <h1> Our Best Sellers</h1>
      <ProductDisplay producttag="best" producttitle="best seller"/>
      <h1> Our New Arrivals</h1>
      <ProductDisplay producttag="new" producttitle="new arrival"/>
    </div>

  )
}