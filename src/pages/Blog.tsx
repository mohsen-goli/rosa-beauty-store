import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import "./Blog.css";

function Blog() {
  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <span className="blog-hero__eyebrow">THE ROSA JOURNAL</span>
          <h1>Beauty, Made Simple.</h1>
          <p>
            Discover practical beauty tips, skincare knowledge, and everyday
            inspiration to help you build a routine that feels right for you.
          </p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-section-heading">
            <div>
              <span className="blog-section-heading__eyebrow">
                READ & DISCOVER
              </span>
              <h2>Latest Articles</h2>
            </div>
            <span className="blog-section-heading__count">
              {blogPosts.length} ARTICLES
            </span>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-card__image-link"
                  aria-label={`Read ${post.title}`}
                >
                  <img
                    className="blog-card__image"
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                </Link>

                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{post.category}</span>
                    <span className="blog-card__read-time">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="blog-card__title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="blog-card__excerpt">{post.excerpt}</p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="blog-card__read-more"
                  >
                    Read Article
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="blog-bottom-cta">
            <span>YOUR BEAUTY JOURNEY STARTS HERE</span>
            <h2>Find the essentials that fit your routine.</h2>
            <Link to="/shop" className="blog-bottom-cta__button">
              Explore the Shop
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
