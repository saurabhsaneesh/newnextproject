// components/ProductCarousel.js

import Link from 'next/link';
import Image from 'next/image';



// Assuming MEDIA_URL is imported or defined globally/via context
// For this example, let's assume it's passed or defined here for completeness
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || 'YOUR_DEFAULT_MEDIA_URL'; 

/**
 * A reusable component for displaying a product carousel.
 * @param {object} props
 * @param {string} props.title - The main heading for the carousel.
 * @param {string} props.linkHref - The URL for the main heading link.
 * @param {Array<object>} props.productsData - The list of products to display.
 * @param {string} props.badgeTag - The product tag to display a specific badge.
 * @param {string} props.badgeText - The text to display in the badge.
 */
const ProductCarousel = ({
  title,
  linkHref,
  productsData,
  badgeTag,
  badgeText,
}) => {
  // Check if data is available
  if (!productsData || productsData.length === 0) {
    return (
      <section className="furn-carousel-wrapper">
        <Link href={linkHref} style={{ textDecoration: 'none' }}>
          <h2 className="main-heading">
            {title}{' '}
            <span style={{ fontSize: '1.2em', marginLeft: '8px' }}>{'〉'}</span>
          </h2>
        </Link>
        <div className="furn-carousel-track">
          <p>No {title.toLowerCase()} at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="furn-carousel-wrapper">
      <Link href={linkHref} style={{ textDecoration: 'none' }}>
        <h2 className="main-heading">
          {title}{' '}
          <span style={{ fontSize: '1.2em', marginLeft: '8px' }}>{'〉'}</span>
        </h2>
      </Link>

      <div className="furn-carousel-track">
        {productsData.map((product) => {
          // --- Image Logic (Replicated) ---
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

                  {/* Dynamic Badge Logic */}
                  {product.tag === badgeTag && badgeText && (
                      <div className="furn-badge">{badgeText}</div>
                  )}

                  {product.discount && (
                    <div className="furn-discount-badge">-{product.discount}</div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  );
};

export default ProductCarousel;