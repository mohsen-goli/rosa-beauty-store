function Skeleton({ className = "", variant = "box" }) {
  return <div className={`skeleton skeleton-${variant} ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <div className="product-image">
        <Skeleton className="skeleton-image" />
      </div>

      <div className="product-info">
        <Skeleton className="skeleton-title" />
        <Skeleton className="skeleton-text" />
        <Skeleton className="skeleton-price" />
        <Skeleton className="skeleton-button" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 3 }) {
  return (
    <div className="category-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="category-card">
          <Skeleton className="skeleton-category-image" />
          <div className="category-info">
            <Skeleton className="skeleton-title" />
            <Skeleton className="skeleton-text" />
            <Skeleton className="skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
