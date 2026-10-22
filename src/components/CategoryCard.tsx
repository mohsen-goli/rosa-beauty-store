import { Link } from "react-router-dom";

function CategoryCard({ slug, name, description, image }) {
  return (
    <Link to={`/category/${slug}`} className="category-card">
      <div className="category-image">
        <img src={image} alt={name} />
      </div>

      <div className="category-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <button>Explore</button>
      </div>
    </Link>
  );
}

export default CategoryCard;
