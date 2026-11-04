import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import NotFound from "./NotFound";
import "./BlogDetail.css";

function BlogDetail() {
  const { slug } = useParams();

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="blog-detail">
      <div className="container">
        <Link to="/blog" className="blog-detail__back">
          <ArrowLeft size={18} />
          Back to Journal
        </Link>

        <header className="blog-detail__header">
          <span className="blog-detail__category">{post.category}</span>

          <h1 className="blog-detail__title">{post.title}</h1>

          <p className="blog-detail__excerpt">{post.excerpt}</p>

          <div className="blog-detail__meta">
            <span>
              <Clock size={16} />
              {post.readTime}
            </span>

            <span>
              <BookOpen size={16} />
              ROSA Journal
            </span>
          </div>
        </header>

        <div className="blog-detail__hero">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="blog-detail__layout">
          <div className="blog-detail__content">
            {post.sections.map((section, index) => (
              <section
                className="blog-detail__section"
                key={`${post.slug}-${index}`}
              >
                <h2>{section.heading}</h2>

                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}

                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <div className="blog-detail__note">{section.note}</div>
                )}
              </section>
            ))}

            <div className="blog-detail__cta">
              <p>Ready to explore your beauty essentials?</p>

              <Link
                to={`/category/${post.relatedCategory}`}
                className="blog-detail__button"
              >
                {post.relatedLabel}
              </Link>
            </div>
          </div>

          <aside className="blog-detail__sidebar">
            <div className="blog-detail__sidebar-card">
              <span>THE ROSA JOURNAL</span>
              <h3>Beauty begins with understanding your needs.</h3>
              <p>
                Explore simple guides and discover products that fit your
                personal routine.
              </p>

              <Link to="/shop">Explore All Products</Link>
            </div>
          </aside>
        </div>

        <div className="blog-detail__footer">
          <Link to="/blog">
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogDetail;
