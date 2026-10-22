import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import "./Blog.css";

function Blog() {
  const posts = [
    {
      id: 1,
      title: "5 Skincare Tips for Glowing Skin",
      excerpt: "Discover simple daily habits that can transform your skin...",
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
      date: "May 15, 2026",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Serums",
      excerpt: "Learn which serum is right for your skin type and concerns...",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      date: "May 10, 2026",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Makeup Trends for Summer 2026",
      excerpt:
        "From dewy skin to bold lips, here are the looks you need to try...",
      image:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
      date: "May 5, 2026",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "How to Build a Minimalist Routine",
      excerpt:
        "Less is more. Discover how fewer products can do more for your skin...",
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      date: "April 28, 2026",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="blog-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className="blog-header">
          <p className="blog-header__subtitle">THE ROSA JOURNAL</p>
          <h1 className="blog-header__title">Beauty Tips & Insights</h1>
          <p className="blog-header__description">
            Expert advice, skincare routines, and the latest beauty trends — all
            in one place.
          </p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-card__content">
                <div className="blog-card__meta">
                  <span>
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span>
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <button className="blog-card__link">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
