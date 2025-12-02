// app/page.js
import prisma from '@/lib/prisma'
import Link from 'next/link'

// Ensure this is set in your .env file
const MEDIA_URL = process.env.S3_MEDIA_URL || '' 

export const metadata = {
  title: 'Mohan Brothers',
  description: 'Premium Furniture & Home Decor',
}

export default async function Home() {
  // 1. Fetch data using the specific table names found in your Prisma Client
  const bestSellers = await prisma.products_product.findMany({
    where: {
      tag: 'best',            // Matches Django's tag="best"
      stock_status: 'in_stock', // Matches Django's availability check
    },
    take: 10,
    orderBy: { id: 'desc' },
    include: {
      // In introspected databases, the relation usually keeps the table name 
      // unless you renamed it in schema.prisma.
      products_productimage: true, 
      products_category: true,
    },
  })

  return (
    <section className="furn-carousel-wrapper">
      <Link href="/best-sellers" style={{ textDecoration: 'none' }}>
        <h2 className="main-heading">
          Best Sellers{' '}
          <span style={{ fontSize: '1.2em', marginLeft: '8px' }}>{'〉'}</span>
        </h2>
      </Link>

      <div className="furn-carousel-track">
        {bestSellers.length === 0 ? (
          <p>No best sellers at the moment.</p>
        ) : (
          bestSellers.map((product) => {
            // 2. Image Logic: Replicating Django's logic
            // Django's `product.image` usually contains a relative path string (e.g., "products/sofa.jpg")
            // We must manually prepend the S3 MEDIA_URL.
            
            let imagePath = product.image; // Check main image column first

            // Fallback: If main image is empty, check the gallery table
            if (!imagePath && product.products_productimage && product.products_productimage.length > 0) {
                imagePath = product.products_productimage[0].image;
            }

            // Construct final URL
            const finalImageUrl = imagePath 
              ? (imagePath.startsWith('http') ? imagePath : `${MEDIA_URL}${imagePath}`)
              : '/placeholder.jpg'; // Fallback if absolutely no image found

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="furn-carousel-card">
                  <div className="furn-image-frame">
                    <img 
                      src={finalImageUrl} 
                      alt={product.name} 
                      className="furn-card-image" 
                    />
                  </div>

                  <div className="furn-card-details">
                    <h3 className="furn-card-title">{product.name}</h3>
                    
                    {product.subtitle && (
                      <p className="furn-card-subtitle">{product.subtitle}</p>
                    )}

                    <div className="furn-card-title-row">
                      <span className="furn-price">
                        {/* Format price with Indian Rupee symbol */}
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Badge Logic */}
                    {product.tag === 'best' && (
                        <div className="furn-badge">Best Seller</div>
                    )}

                    {product.discount && (
                      <div className="furn-discount-badge">-{product.discount}</div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </section>
  )
}