import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getBlogPost } from "../data/blogPosts";
import NotFound from "./NotFound";
import "./BlogDetail.css";

function BlogDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();

  const post = getBlogPost(slug || "", i18n.language);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="blog-detail">
      <div className="container">
        <Link to="/blog" className="blog-detail__back">
          <ArrowLeft size={18} />
          {t("blogPage.backToJournal")}
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
              {t("blogPage.journalName")}
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
              <p>{t("blogPage.articleCta")}</p>

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
              <span>{t("blogPage.eyebrow")}</span>

              <h3>{t("blogPage.sidebarTitle")}</h3>

              <p>{t("blogPage.sidebarDescription")}</p>

              <Link to="/shop">{t("blogPage.exploreAllProducts")}</Link>
            </div>
          </aside>
        </div>

        <div className="blog-detail__footer">
          <Link to="/blog">
            <ArrowLeft size={16} />
            {t("blogPage.backToArticles")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogDetail;
