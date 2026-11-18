import { FormEvent, useEffect, useState } from "react";
import { Star, Send, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import "./CustomerReviews.css";

type Review = { id: string; display_name: string | null; review: string; rating: number; created_at: string };

const copy = {
  en: { eyebrow: "A LITTLE LOVE FROM OUR COMMUNITY", title: "Your Voice Matters", subtitle: "Have you shopped with ROSA? Share your experience and help our community choose with confidence.", formTitle: "Share your experience", name: "Name (optional)", namePlaceholder: "How should we display your name?", email: "Email address", emailPlaceholder: "you@example.com", rating: "Your rating", review: "Your review", reviewPlaceholder: "Tell us what you loved or what we could do better...", submit: "Submit review", sending: "Sending...", privacy: "Your email is private and will never appear on the website.", success: "Thank you! Your review has been sent for approval.", error: "We couldn't submit your review. Please try again.", recent: "Words from our customers", empty: "Be the first to share your experience.", anonymous: "ROSA customer" },
  fa: { eyebrow: "صدای جامعه رزا", title: "نظر شما برای ما ارزشمند است", subtitle: "تجربه‌تان از ROSA را با ما به اشتراک بگذارید و به دیگران برای انتخاب بهتر کمک کنید.", formTitle: "تجربه‌تان را بنویسید", name: "نام نمایشی (اختیاری)", namePlaceholder: "نامی که نمایش داده شود", email: "آدرس ایمیل", emailPlaceholder: "you@example.com", rating: "امتیاز شما", review: "نظر شما", reviewPlaceholder: "از تجربه‌تان بگویید؛ چه چیزی را دوست داشتید؟", submit: "ارسال نظر", sending: "در حال ارسال...", privacy: "ایمیل شما محرمانه است و در سایت نمایش داده نمی‌شود.", success: "ممنون از شما! نظرتان برای بررسی ارسال شد.", error: "ارسال نظر انجام نشد. لطفاً دوباره تلاش کنید.", recent: "تجربه مشتریان رزا", empty: "اولین نفری باشید که تجربه‌اش را به اشتراک می‌گذارد.", anonymous: "مشتری رزا" },
  ar: { eyebrow: "آراء مجتمعنا", title: "رأيك يهمنا", subtitle: "شاركونا تجربتكم مع ROSA وساعدوا مجتمعنا على الاختيار بثقة.", formTitle: "شارك تجربتك", name: "الاسم (اختياري)", namePlaceholder: "كيف نعرض اسمك؟", email: "البريد الإلكتروني", emailPlaceholder: "you@example.com", rating: "تقييمك", review: "رأيك", reviewPlaceholder: "أخبرنا عن تجربتك...", submit: "إرسال التقييم", sending: "جارٍ الإرسال...", privacy: "بريدك الإلكتروني خاص ولن يظهر على الموقع.", success: "شكراً لك! تم إرسال رأيك للمراجعة.", error: "تعذر إرسال رأيك. حاول مرة أخرى.", recent: "آراء عملائنا", empty: "كن أول من يشارك تجربته.", anonymous: "عميل ROSA" }
};

export default function CustomerReviews() {
  const { i18n } = useTranslation();
  const language = (i18n.language || "en").split("-")[0] as keyof typeof copy;
  const t = copy[language] || copy.en;
  const isRTL = language === "fa" || language === "ar";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    let active = true;
    supabase.rpc("get_published_reviews").then(({ data, error }) => {
      if (active && !error && data) setReviews(data as Review[]);
    });
    return () => { active = false; };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSending(true);
    const { error } = await supabase.rpc("submit_review", {
      p_display_name: name.trim() || null,
      p_email: email.trim(),
      p_rating: rating,
      p_review: review.trim()
    });
    setSending(false);
    if (error) {
      setMessage({ type: "error", text: t.error });
      return;
    }
    setName(""); setEmail(""); setReview(""); setRating(5);
    setMessage({ type: "success", text: t.success });
  }

  return (
    <section className="rosa-reviews" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container rosa-reviews__container">
        <div className="rosa-reviews__intro">
          <span className="rosa-reviews__eyebrow">{t.eyebrow}</span>
          <h2>{t.title}</h2><p>{t.subtitle}</p>
        </div>
        <div className="rosa-reviews__layout">
          <form className="rosa-reviews__form" onSubmit={handleSubmit}>
            <h3>{t.formTitle}</h3>
            <label><span>{t.name}</span><input value={name} onChange={e => setName(e.target.value)} maxLength={80} placeholder={t.namePlaceholder} /></label>
            <label><span>{t.email}</span><input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder={t.emailPlaceholder} autoComplete="email" /></label>
            <fieldset className="rosa-reviews__rating"><legend>{t.rating}</legend><div className="rosa-reviews__stars" role="radiogroup" aria-label={t.rating}>
              {[1,2,3,4,5].map(value => <button key={value} type="button" role="radio" aria-checked={rating === value} aria-label={String(value)} onClick={() => setRating(value)} className={value <= rating ? "is-active" : ""}><Star size={25} fill={value <= rating ? "currentColor" : "none"} /></button>)}
            </div></fieldset>
            <label><span>{t.review}</span><textarea required minLength={10} maxLength={1200} rows={5} value={review} onChange={e => setReview(e.target.value)} placeholder={t.reviewPlaceholder} /></label>
            <p className="rosa-reviews__privacy">{t.privacy}</p>
            {message && <p className={`rosa-reviews__message is-${message.type}`} role="status">{message.text}</p>}
            <button className="rosa-reviews__submit" type="submit" disabled={sending}><span>{sending ? t.sending : t.submit}</span><Send size={16} /></button>
          </form>
          <div className="rosa-reviews__published">
            <div className="rosa-reviews__published-heading"><MessageCircle size={20} /><h3>{t.recent}</h3></div>
            {reviews.length === 0 ? <p className="rosa-reviews__empty">{t.empty}</p> : <div className="rosa-reviews__list">
              {reviews.map(item => <article className="rosa-review-card" key={item.id}>
                <div className="rosa-review-card__top"><strong>{item.display_name || t.anonymous}</strong><span className="rosa-review-card__stars" aria-label={`${item.rating} / 5`}>{Array.from({length:item.rating}).map((_,i)=><Star key={i} size={13} fill="currentColor" />)}</span></div>
                <p>{item.review}</p><time dateTime={item.created_at}>{new Intl.DateTimeFormat(language, {dateStyle:"medium"}).format(new Date(item.created_at))}</time>
              </article>)}
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
