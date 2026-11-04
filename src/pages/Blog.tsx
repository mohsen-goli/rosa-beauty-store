import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getBlogPosts } from "../data/blogPosts";
import "./Blog.css";

function Blog() {
  const { t, i18n } = useTranslation();
  const blogPosts = getBlogPosts(i18n.language);

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <span className="blog-hero__eyebrow">{t("blogPage.eyebrow")}</span>

          <h1>{t("blogPage.title")}</h1>

          <p>{t("blogPage.description")}</p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-section-heading">
            <div>
              <span className="blog-section-heading__eyebrow">
                {t("blogPage.sectionEyebrow")}
              </span>

              <h2>{t("blogPage.latestArticles")}</h2>
            </div>

            <span className="blog-section-heading__count">
              {t("blogPage.articleCount", {
                count: blogPosts.length,
              })}
            </span>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-card__image-link"
                  aria-label={`${t("blogPage.readArticle")}: ${post.title}`}
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
                    {t("blogPage.readArticle")}
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="blog-bottom-cta">
            <span>{t("blogPage.ctaEyebrow")}</span>

            <h2>{t("blogPage.ctaTitle")}</h2>

            <Link to="/shop" className="blog-bottom-cta__button">
              {t("blogPage.exploreShop")}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
