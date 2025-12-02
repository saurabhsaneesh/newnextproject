
import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image';
const MEDIA_URL = process.env.S3_MEDIA_URL || '' 


export default async function ProductDisplay({producttag, producttitle}) {
  const productCarousel = await prisma.products_product.findMany({
    where: {
      tag: producttag,           
      stock_status: 'in_stock', 
    },
    take: 10,
    orderBy: { id: 'desc' },
    include: {
      products_productimage: true, 
      products_category: true,
    },
  })

  return (
      <section className="furn-carousel-wrapper">
        <div className="furn-carousel-track">
          {productCarousel.length === 0 ? (
            <p>No {productitle} at the moment.</p>
          ) : (
            productCarousel.map((product) => {
              let imagePath = product.image; 
              if (!imagePath && product.products_productimage && product.products_productimage.length > 0) {
                  imagePath = product.products_productimage[0].image;
              }


              const finalImageUrl = imagePath 
                ? (imagePath.startsWith('http') ? imagePath : `${MEDIA_URL}${imagePath}`)
                : '/placeholder.jpg'; 

              return (
                
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="furn-carousel-card">
                    <div className="furn-image-frame">
                      <Image
                          src={finalImageUrl}
                          alt={product.name}
                          className="furn-card-image" 
                          width={500} 
                          height={500}
                          priority={false} 
                          sizes="(max-width: 600px) 100vw, 33vw" 
                      />
                    </div>

                    <div className="furn-card-details">
                      <h3 className="furn-card-title">{product.name}</h3>
                      
                      {product.subtitle && (
                        <p className="furn-card-subtitle">{product.subtitle}</p>
                      )}

                      <div className="furn-card-title-row">
                        <span className="furn-price">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {product.tag === producttag && (
                          <div className="furn-badge">{producttitle}</div>
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


