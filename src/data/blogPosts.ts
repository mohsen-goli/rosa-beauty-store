export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  sections: BlogSection[];
  relatedCategory: string;
  relatedLabel: string;
};

type LocalizedPost = {
  en: BlogPost;
  fa: BlogPost;
  ar: BlogPost;
};

const posts: LocalizedPost[] = [
  {
    en: {
      slug: "skincare-routine-guide",
      title: "How to Build a Simple Skincare Routine",
      category: "SKINCARE",
      excerpt:
        "A practical beginner-friendly guide to building a skincare routine with a few essential steps.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/skincare-routine.jpg",
      readTime: "6 min read",
      relatedCategory: "skincare",
      relatedLabel: "Explore Skincare",
      sections: [
        {
          heading: "Start with the essentials",
          paragraphs: [
            "A skincare routine does not need to include a large collection of products. Starting with a few basic steps can make your routine easier to follow and understand.",
            "The most useful starting point is to focus on cleansing, moisturizing, and sun protection during the day.",
          ],
          bullets: [
            "Cleanser: helps remove dirt, oil, and daily buildup.",
            "Moisturizer: helps keep the skin comfortable and hydrated.",
            "Sunscreen: helps protect exposed skin from UV radiation.",
          ],
        },
        {
          heading: "Build a morning routine",
          paragraphs: [
            "A simple morning routine can prepare your skin for the day without taking too much time.",
          ],
          bullets: [
            "Gently cleanse your face, or rinse with water if that works better for your skin.",
            "Apply a moisturizer suitable for your skin.",
            "Finish with broad-spectrum sunscreen of SPF 30 or higher.",
          ],
        },
        {
          heading: "Keep your evening routine simple",
          paragraphs: [
            "In the evening, focus on removing sunscreen, makeup, and the buildup from the day. Follow with a moisturizer that feels comfortable on your skin.",
            "You do not need to introduce several active ingredients at once. If you want to try a new product, introduce it gradually.",
          ],
        },
        {
          heading: "Give your routine time",
          paragraphs: [
            "Consistency is more useful than frequently changing products. Pay attention to how your skin feels and adjust your routine when needed.",
            "If a product causes persistent irritation, stop using it. For ongoing skin concerns, consult a qualified dermatologist.",
          ],
          note: "Every skin type is different. This guide is for general skincare education and is not a substitute for professional medical advice.",
        },
      ],
    },
    fa: {
      slug: "skincare-routine-guide",
      title: "چطور یک روتین ساده مراقبت از پوست بسازیم؟",
      category: "مراقبت از پوست",
      excerpt:
        "راهنمایی کاربردی برای شروع یک روتین پوستی ساده با چند مرحله ضروری.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/skincare-routine.jpg",
      readTime: "۶ دقیقه مطالعه",
      relatedCategory: "skincare",
      relatedLabel: "مشاهده محصولات مراقبت پوست",
      sections: [
        {
          heading: "با محصولات ضروری شروع کنید",
          paragraphs: [
            "برای داشتن یک روتین پوستی مناسب، لازم نیست تعداد زیادی محصول داشته باشید. شروع با چند مرحله ساده باعث می‌شود مراقبت از پوست راحت‌تر و قابل‌پیگیری‌تر باشد.",
            "بهترین نقطه شروع معمولاً پاک‌سازی، مرطوب‌کردن پوست و محافظت در برابر نور خورشید در طول روز است.",
          ],
          bullets: [
            "پاک‌کننده: به حذف آلودگی، چربی و باقی‌مانده مواد از سطح پوست کمک می‌کند.",
            "مرطوب‌کننده: به حفظ رطوبت و احساس راحتی پوست کمک می‌کند.",
            "ضدآفتاب: از پوست در معرض نور در برابر پرتوهای فرابنفش محافظت می‌کند.",
          ],
        },
        {
          heading: "روتین صبحگاهی بسازید",
          paragraphs: [
            "یک روتین ساده صبحگاهی می‌تواند بدون صرف زمان زیاد، پوست را برای شروع روز آماده کند.",
          ],
          bullets: [
            "صورت را به‌آرامی با شوینده مناسب بشویید یا در صورت سازگاری پوست، از آب استفاده کنید.",
            "مرطوب‌کننده متناسب با نوع پوست خود بزنید.",
            "در پایان از ضدآفتاب طیف گسترده با SPF 30 یا بالاتر استفاده کنید.",
          ],
        },
        {
          heading: "روتین شب را ساده نگه دارید",
          paragraphs: [
            "شب‌ها روی پاک‌کردن ضدآفتاب، آرایش و آلودگی‌های روز تمرکز کنید. سپس از مرطوب‌کننده‌ای استفاده کنید که روی پوستتان احساس خوبی ایجاد می‌کند.",
            "نیازی نیست چند ماده فعال را هم‌زمان وارد روتین کنید. اگر محصول جدیدی می‌خواهید امتحان کنید، آن را به‌تدریج اضافه کنید.",
          ],
        },
        {
          heading: "به روتین خود زمان بدهید",
          paragraphs: [
            "ثبات در مراقبت از پوست معمولاً مفیدتر از تعویض مداوم محصولات است. به واکنش پوستتان توجه کنید و در صورت نیاز روتین را تغییر دهید.",
            "اگر محصولی باعث تحریک مداوم پوست شد، مصرف آن را متوقف کنید. برای مشکلات پوستی ادامه‌دار با متخصص پوست مشورت کنید.",
          ],
          note: "پوست هر فرد ویژگی‌های متفاوتی دارد. این مطلب صرفاً آموزشی است و جایگزین توصیه پزشکی تخصصی نیست.",
        },
      ],
    },
    ar: {
      slug: "skincare-routine-guide",
      title: "كيف تبنين روتيناً بسيطاً للعناية بالبشرة؟",
      category: "العناية بالبشرة",
      excerpt:
        "دليل عملي للمبتدئين لبناء روتين للعناية بالبشرة باستخدام خطوات أساسية قليلة.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/skincare-routine.jpg",
      readTime: "٦ دقائق للقراءة",
      relatedCategory: "skincare",
      relatedLabel: "اكتشفي منتجات العناية بالبشرة",
      sections: [
        {
          heading: "ابدئي بالأساسيات",
          paragraphs: [
            "لا يحتاج روتين العناية بالبشرة إلى مجموعة كبيرة من المنتجات. البدء ببضع خطوات أساسية يجعل الروتين أسهل وأكثر وضوحاً.",
            "من الأفضل التركيز على التنظيف والترطيب والحماية من أشعة الشمس خلال النهار.",
          ],
          bullets: [
            "الغسول: يساعد على إزالة الأوساخ والزيوت والشوائب اليومية.",
            "المرطب: يساعد في الحفاظ على راحة البشرة ورطوبتها.",
            "واقي الشمس: يساعد على حماية البشرة المعرضة للأشعة فوق البنفسجية.",
          ],
        },
        {
          heading: "أنشئي روتيناً صباحياً",
          paragraphs: [
            "يمكن لروتين صباحي بسيط أن يهيئ بشرتك لليوم دون استهلاك الكثير من الوقت.",
          ],
          bullets: [
            "نظفي وجهك بلطف أو اغسليه بالماء إذا كان ذلك مناسباً لبشرتك.",
            "ضعي مرطباً مناسباً لنوع بشرتك.",
            "أنهي الروتين بواقي شمس واسع الطيف بمعامل حماية SPF 30 أو أعلى.",
          ],
        },
        {
          heading: "حافظي على بساطة روتين المساء",
          paragraphs: [
            "ركزي في المساء على إزالة واقي الشمس والمكياج وآثار اليوم، ثم استخدمي مرطباً تشعرين معه بالراحة.",
            "ليس من الضروري إدخال عدة مكونات فعالة في الوقت نفسه. إذا أردت تجربة منتج جديد، فأضيفيه تدريجياً.",
          ],
        },
        {
          heading: "امنحي روتينك الوقت",
          paragraphs: [
            "الاستمرار على روتين مناسب أفضل من تغيير المنتجات باستمرار. راقبي استجابة بشرتك وعدلي الروتين عند الحاجة.",
            "إذا تسبب منتج في تهيج مستمر، فتوقفي عن استخدامه واستشيري طبيب جلدية عند استمرار المشكلة.",
          ],
          note: "تختلف احتياجات كل بشرة. هذا الدليل للتثقيف العام ولا يغني عن استشارة الطبيب المختص.",
        },
      ],
    },
  },
  {
    en: {
      slug: "understanding-serums",
      title: "Understanding Face Serums: A Beginner's Guide",
      category: "SKINCARE",
      excerpt:
        "Learn what face serums are, how they fit into a routine, and what to consider before choosing one.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/serums-guide.jpg",
      readTime: "7 min read",
      relatedCategory: "skincare",
      relatedLabel: "Explore Skincare",
      sections: [
        {
          heading: "What is a face serum?",
          paragraphs: [
            "A face serum is a skincare product designed with a particular formulation and purpose. Serums can contain ingredients such as hyaluronic acid, niacinamide, vitamin C, or other skincare ingredients.",
            "The right choice depends on your skin, your preferences, and the rest of your routine. A more expensive or complicated serum is not automatically a better choice.",
          ],
        },
        {
          heading: "Know the ingredients",
          paragraphs: [
            "Different ingredients are used for different skincare goals. Learning a little about the label can help you make a more informed choice.",
          ],
          bullets: [
            "Hyaluronic acid: commonly used in hydrating formulations.",
            "Niacinamide: used in products formulated for skin tone and barrier care.",
            "Vitamin C: an antioxidant ingredient used in many daytime skincare products.",
            "Salicylic acid: an exfoliating ingredient often found in products for blemish-prone skin.",
          ],
        },
        {
          heading: "How to introduce a serum",
          paragraphs: [
            "Start by reading the product instructions and checking whether the formula is suitable for your skin and existing routine.",
            "Introduce one new product at a time. This makes it easier to notice how your skin responds.",
          ],
          bullets: [
            "Apply the product as directed on its label.",
            "Avoid combining several strong active ingredients without understanding their compatibility.",
            "Use sunscreen during the day when appropriate, especially when your routine includes exfoliating ingredients.",
          ],
        },
        {
          heading: "Choose simplicity over trends",
          paragraphs: [
            "A serum should solve a specific need in your routine rather than simply follow a trend. If your current routine is working comfortably, there may be no need to add another product.",
            "For persistent irritation, acne, or other skin concerns, seek advice from a qualified dermatologist.",
          ],
          note: "Ingredient information is general education. Always follow the product label and consider a patch test before regular use.",
        },
      ],
    },
    fa: {
      slug: "understanding-serums",
      title: "سرم‌های صورت را بهتر بشناسیم؛ راهنمای مبتدی‌ها",
      category: "مراقبت از پوست",
      excerpt:
        "سرم صورت چیست، چه جایگاهی در روتین دارد و هنگام انتخاب آن باید به چه نکاتی توجه کنیم؟",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/serums-guide.jpg",
      readTime: "۷ دقیقه مطالعه",
      relatedCategory: "skincare",
      relatedLabel: "مشاهده محصولات مراقبت پوست",
      sections: [
        {
          heading: "سرم صورت چیست؟",
          paragraphs: [
            "سرم صورت محصولی مراقبتی با فرمولاسیون و کاربرد مشخص است. در ترکیبات سرم‌ها ممکن است موادی مانند هیالورونیک اسید، نیاسینامید، ویتامین C و ترکیبات دیگر وجود داشته باشد.",
            "انتخاب مناسب به نوع پوست، ترجیحات شخصی و سایر محصولات روتین شما بستگی دارد. گران‌تر یا پیچیده‌تر بودن یک سرم لزوماً به معنای بهتر بودن آن نیست.",
          ],
        },
        {
          heading: "با ترکیبات آشنا شوید",
          paragraphs: [
            "ترکیبات مختلف برای اهداف متفاوتی در محصولات مراقبت از پوست استفاده می‌شوند. خواندن برچسب محصول به انتخاب آگاهانه‌تر کمک می‌کند.",
          ],
          bullets: [
            "هیالورونیک اسید: معمولاً در فرمول‌های آبرسان استفاده می‌شود.",
            "نیاسینامید: در محصولاتی با هدف مراقبت از ظاهر پوست و سد دفاعی آن به کار می‌رود.",
            "ویتامین C: یک آنتی‌اکسیدان رایج در بسیاری از محصولات مراقبت روزانه است.",
            "سالیسیلیک اسید: ترکیبی لایه‌بردار که در برخی محصولات مخصوص پوست مستعد جوش وجود دارد.",
          ],
        },
        {
          heading: "چطور سرم را وارد روتین کنیم؟",
          paragraphs: [
            "ابتدا دستور مصرف محصول را بخوانید و بررسی کنید که فرمول آن با نوع پوست و روتین فعلی شما سازگار باشد.",
            "هر بار فقط یک محصول جدید را اضافه کنید تا بتوانید واکنش پوستتان را بهتر بررسی کنید.",
          ],
          bullets: [
            "محصول را مطابق دستور درج‌شده روی بسته‌بندی استفاده کنید.",
            "بدون آگاهی از سازگاری ترکیبات، چند ماده فعال قوی را با هم ترکیب نکنید.",
            "در طول روز، به‌ویژه هنگام استفاده از ترکیبات لایه‌بردار، به محافظت در برابر آفتاب توجه کنید.",
          ],
        },
        {
          heading: "سادگی را به‌جای دنبال‌کردن ترندها انتخاب کنید",
          paragraphs: [
            "سرم باید به یک نیاز مشخص در روتین شما پاسخ دهد، نه اینکه صرفاً به‌خاطر محبوبیتش انتخاب شود. اگر روتین فعلی‌تان مناسب است، شاید نیازی به افزودن محصول دیگری نباشد.",
            "برای تحریک مداوم، آکنه یا مشکلات پوستی ادامه‌دار از متخصص پوست راهنمایی بگیرید.",
          ],
          note: "اطلاعات ترکیبات جنبه آموزشی دارد. دستور محصول را رعایت کنید و پیش از مصرف منظم، تست حساسیت موضعی را در نظر بگیرید.",
        },
      ],
    },
    ar: {
      slug: "understanding-serums",
      title: "دليل المبتدئات لفهم سيروم الوجه",
      category: "العناية بالبشرة",
      excerpt:
        "تعرفي على سيروم الوجه ومكانه في روتين العناية وما يجب مراعاته عند اختياره.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/serums-guide.jpg",
      readTime: "٧ دقائق للقراءة",
      relatedCategory: "skincare",
      relatedLabel: "اكتشفي منتجات العناية بالبشرة",
      sections: [
        {
          heading: "ما هو سيروم الوجه؟",
          paragraphs: [
            "سيروم الوجه منتج للعناية بالبشرة بتركيبة وهدف محددين. قد يحتوي على مكونات مثل حمض الهيالورونيك والنياسيناميد وفيتامين C وغيرها.",
            "يعتمد الاختيار المناسب على نوع بشرتك وتفضيلاتك وبقية روتينك. السعر الأعلى أو التركيبة الأكثر تعقيداً لا يعنيان بالضرورة أن المنتج أفضل.",
          ],
        },
        {
          heading: "تعرفي على المكونات",
          paragraphs: [
            "تُستخدم مكونات مختلفة لأهداف متنوعة في العناية بالبشرة. قراءة ملصق المنتج تساعدك على اتخاذ قرار أكثر وعياً.",
          ],
          bullets: [
            "حمض الهيالورونيك: يُستخدم غالباً في التركيبات المرطبة.",
            "النياسيناميد: يوجد في منتجات تهتم بمظهر البشرة وحاجزها الطبيعي.",
            "فيتامين C: مكون مضاد للأكسدة في كثير من منتجات العناية النهارية.",
            "حمض الساليسيليك: مكون مقشر يوجد في بعض المنتجات المخصصة للبشرة المعرضة للحبوب.",
          ],
        },
        {
          heading: "كيف تضيفين السيروم إلى روتينك؟",
          paragraphs: [
            "ابدئي بقراءة تعليمات المنتج والتأكد من ملاءمة تركيبته لبشرتك وروتينك الحالي.",
            "أضيفي منتجاً جديداً واحداً في كل مرة حتى تتمكني من ملاحظة استجابة بشرتك.",
          ],
          bullets: [
            "استخدمي المنتج وفقاً للتعليمات الموجودة على العبوة.",
            "تجنبي الجمع بين عدة مكونات فعالة قوية دون معرفة مدى توافقها.",
            "اهتمي بواقي الشمس خلال النهار، خاصة عند استخدام مكونات مقشرة.",
          ],
        },
        {
          heading: "اختاري البساطة بدلاً من追潮趋势",
          paragraphs: [
            "ينبغي أن يلبي السيروم حاجة محددة في روتينك، لا أن يكون مجرد اتباع لصيحة منتشرة. إذا كان روتينك الحالي مناسباً، فقد لا تحتاجين إلى إضافة منتج آخر.",
            "استشيري طبيب جلدية عند استمرار التهيج أو حب الشباب أو أي مشكلة جلدية.",
          ],
          note: "هذه المعلومات للتثقيف العام. اتبعي تعليمات المنتج وفكري في اختبار الحساسية الموضعي قبل الاستخدام المنتظم.",
        },
      ],
    },
  },
  {
    en: {
      slug: "everyday-makeup-guide",
      title: "A Simple Guide to Everyday Makeup",
      category: "MAKEUP",
      excerpt:
        "Create a comfortable everyday makeup look with a few versatile products and simple techniques.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/makeup-guide.jpg",
      readTime: "5 min read",
      relatedCategory: "makeup",
      relatedLabel: "Explore Makeup",
      sections: [
        {
          heading: "Begin with a comfortable base",
          paragraphs: [
            "Everyday makeup can be as simple or as detailed as you like. The goal is to choose products that feel comfortable and suit the look you want.",
            "Start with clean, moisturized skin. If you wear makeup during the day, remember to include sunscreen in your morning routine.",
          ],
        },
        {
          heading: "Choose a few versatile products",
          paragraphs: [
            "You do not need a full makeup collection to create a polished everyday look. A few products that work well together can be enough.",
          ],
          bullets: [
            "A base product that matches your preferred coverage.",
            "Concealer for areas where you want extra coverage.",
            "Blush for a touch of color.",
            "Mascara or brow products if they are part of your preferred look.",
            "A lipstick or lip balm in a shade you enjoy.",
          ],
        },
        {
          heading: "Apply in light layers",
          paragraphs: [
            "Applying small amounts of product gradually can make it easier to control the finish. Blend each layer before adding more.",
            "Natural light can help you check how your makeup looks in everyday conditions.",
          ],
        },
        {
          heading: "Make your routine your own",
          paragraphs: [
            "Makeup is personal. You can adapt colors, textures, and coverage to your style, occasion, and comfort.",
            "Keep brushes and reusable tools clean, check product expiry information, and avoid sharing eye or lip products.",
          ],
          note: "Always follow product instructions and discontinue use if a cosmetic product causes irritation.",
        },
      ],
    },
    fa: {
      slug: "everyday-makeup-guide",
      title: "راهنمای ساده آرایش روزانه",
      category: "آرایش",
      excerpt:
        "با چند محصول کاربردی و تکنیک ساده، یک آرایش روزانه راحت و زیبا داشته باشید.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/makeup-guide.jpg",
      readTime: "۵ دقیقه مطالعه",
      relatedCategory: "makeup",
      relatedLabel: "مشاهده محصولات آرایشی",
      sections: [
        {
          heading: "با یک زیرسازی راحت شروع کنید",
          paragraphs: [
            "آرایش روزانه می‌تواند ساده یا مفصل باشد. هدف این است که محصولاتی انتخاب کنید که روی پوست احساس راحتی داشته باشند و با ظاهر دلخواهتان هماهنگ باشند.",
            "کار را با پوست تمیز و مرطوب شروع کنید. اگر در طول روز آرایش می‌کنید، ضدآفتاب را در روتین صبحگاهی فراموش نکنید.",
          ],
        },
        {
          heading: "چند محصول کاربردی انتخاب کنید",
          paragraphs: [
            "برای داشتن یک آرایش روزانه مرتب، به مجموعه بزرگی از لوازم آرایش نیاز ندارید. چند محصول هماهنگ می‌توانند کافی باشند.",
          ],
          bullets: [
            "یک محصول زیرساز با میزان پوشانندگی دلخواه.",
            "کانسیلر برای قسمت‌هایی که به پوشش بیشتری نیاز دارند.",
            "رژگونه برای افزودن کمی رنگ به چهره.",
            "ریمل یا محصولات ابرو، در صورت تمایل.",
            "رژ لب یا بالم لب با رنگ مورد علاقه شما.",
          ],
        },
        {
          heading: "محصولات را لایه‌لایه و سبک استفاده کنید",
          paragraphs: [
            "استفاده تدریجی از مقدار کم محصول، کنترل نتیجه نهایی را آسان‌تر می‌کند. پیش از افزودن لایه بعدی، لایه قبلی را به‌خوبی پخش کنید.",
            "نور طبیعی به شما کمک می‌کند ظاهر آرایش را در شرایط معمول روز بررسی کنید.",
          ],
        },
        {
          heading: "روتین خودتان را بسازید",
          paragraphs: [
            "آرایش سلیقه‌ای است. رنگ‌ها، بافت‌ها و میزان پوشانندگی را با سبک، موقعیت و راحتی خود هماهنگ کنید.",
            "براش‌ها و ابزارهای قابل استفاده مجدد را تمیز نگه دارید، تاریخ مصرف محصولات را بررسی کنید و لوازم آرایش چشم و لب را با دیگران به اشتراک نگذارید.",
          ],
          note: "همیشه دستور مصرف محصول را رعایت کنید و در صورت ایجاد تحریک پوستی، مصرف آن را متوقف کنید.",
        },
      ],
    },
    ar: {
      slug: "everyday-makeup-guide",
      title: "دليل بسيط للمكياج اليومي",
      category: "المكياج",
      excerpt:
        "احصلي على إطلالة يومية مريحة باستخدام بعض المنتجات المتعددة الاستخدامات وتقنيات بسيطة.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/makeup-guide.jpg",
      readTime: "٥ دقائق للقراءة",
      relatedCategory: "makeup",
      relatedLabel: "اكتشفي منتجات المكياج",
      sections: [
        {
          heading: "ابدئي بقاعدة مريحة",
          paragraphs: [
            "يمكن أن يكون المكياج اليومي بسيطاً أو مفصلاً كما تحبين. اختاري منتجات مريحة وتناسب الإطلالة التي ترغبين بها.",
            "ابدئي ببشرة نظيفة ومرطبة، ولا تنسي واقي الشمس ضمن روتين الصباح.",
          ],
        },
        {
          heading: "اختاري بعض المنتجات متعددة الاستخدام",
          paragraphs: [
            "لا تحتاجين إلى مجموعة مكياج كبيرة للحصول على إطلالة يومية مرتبة. قد تكفي بضعة منتجات متناسقة.",
          ],
          bullets: [
            "منتج أساس بدرجة التغطية التي تفضلينها.",
            "كونسيلر للمناطق التي تحتاج إلى تغطية إضافية.",
            "أحمر خدود لإضافة لمسة من اللون.",
            "ماسكارا أو منتجات للحواجب إذا كانت تناسب إطلالتك.",
            "أحمر شفاه أو مرطب شفاه بلون تحبينه.",
          ],
        },
        {
          heading: "ضعي المنتجات بطبقات خفيفة",
          paragraphs: [
            "يساعد وضع كميات صغيرة تدريجياً على التحكم في النتيجة. امزجي كل طبقة قبل إضافة المزيد.",
            "يمكن للضوء الطبيعي أن يساعدك على تقييم مظهر المكياج في ظروف الحياة اليومية.",
          ],
        },
        {
          heading: "اجعلي روتينك يعبر عنك",
          paragraphs: [
            "المكياج أمر شخصي. اختاري الألوان والقوام ودرجة التغطية وفقاً لأسلوبك والمناسبة وراحتك.",
            "حافظي على نظافة الفرش والأدوات القابلة لإعادة الاستخدام، وتحققي من تاريخ صلاحية المنتجات وتجنبي مشاركة منتجات العين والشفاه.",
          ],
          note: "اتبعي تعليمات المنتج وتوقفي عن استخدامه إذا تسبب في تهيج البشرة.",
        },
      ],
    },
  },
  {
    en: {
      slug: "body-care-guide",
      title: "Everyday Body Care: Simple Habits That Matter",
      category: "BODY CARE",
      excerpt:
        "Discover a simple body care routine focused on cleansing, moisturizing, and everyday comfort.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/body-care.jpg",
      readTime: "5 min read",
      relatedCategory: "body-care",
      relatedLabel: "Explore Body Care",
      sections: [
        {
          heading: "Body care starts with gentle cleansing",
          paragraphs: [
            "A comfortable body care routine begins with products that suit your skin and your daily habits.",
            "Choose a cleanser that leaves your skin feeling comfortable. Very hot water and overly frequent harsh cleansing may leave some skin feeling dry.",
          ],
        },
        {
          heading: "Make moisturizing a habit",
          paragraphs: [
            "Moisturizers help support the skin's moisture barrier. Many people find it convenient to apply body lotion after bathing, while the skin is still slightly damp.",
            "Choose a texture that feels comfortable enough for you to use consistently.",
          ],
        },
        {
          heading: "Do not overlook sun protection",
          paragraphs: [
            "Areas of skin exposed to daylight can benefit from sun protection. Choose a broad-spectrum sunscreen and follow the instructions on its label.",
            "Reapply as directed, especially after swimming, sweating, or towel drying.",
          ],
        },
        {
          heading: "Keep your routine realistic",
          paragraphs: [
            "You can build a useful routine with just a few products. Add exfoliating or fragranced products only if they suit your preferences and your skin tolerates them.",
            "If you experience persistent dryness, itching, or irritation, consider speaking with a qualified healthcare professional.",
          ],
          note: "Body care needs vary from person to person. Introduce new products carefully and follow their usage instructions.",
        },
      ],
    },
    fa: {
      slug: "body-care-guide",
      title: "مراقبت روزانه از بدن؛ عادت‌های ساده و مؤثر",
      category: "مراقبت بدن",
      excerpt:
        "با یک روتین ساده شامل پاک‌سازی، مرطوب‌کردن و توجه به راحتی پوست از بدن خود مراقبت کنید.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/body-care.jpg",
      readTime: "۵ دقیقه مطالعه",
      relatedCategory: "body-care",
      relatedLabel: "مشاهده محصولات مراقبت بدن",
      sections: [
        {
          heading: "مراقبت از بدن با پاک‌سازی ملایم شروع می‌شود",
          paragraphs: [
            "یک روتین راحت مراقبت از بدن با محصولاتی شروع می‌شود که با پوست و عادت‌های روزانه شما سازگار باشند.",
            "شوینده‌ای انتخاب کنید که پس از استفاده، پوستتان احساس راحتی داشته باشد. آب بسیار داغ و شست‌وشوی خشن و بیش از حد ممکن است باعث خشکی بعضی پوست‌ها شود.",
          ],
        },
        {
          heading: "مرطوب‌کردن را به یک عادت تبدیل کنید",
          paragraphs: [
            "مرطوب‌کننده‌ها به حفظ سد رطوبتی پوست کمک می‌کنند. بسیاری از افراد ترجیح می‌دهند پس از حمام، زمانی که پوست هنوز کمی نم‌دار است، لوسیون بدن بزنند.",
            "بافتی را انتخاب کنید که استفاده مداوم از آن برایتان راحت باشد.",
          ],
        },
        {
          heading: "محافظت در برابر آفتاب را فراموش نکنید",
          paragraphs: [
            "قسمت‌هایی از پوست که در معرض نور روز قرار می‌گیرند، به محافظت در برابر آفتاب نیاز دارند. ضدآفتاب طیف گسترده انتخاب کنید و دستور مصرف آن را رعایت کنید.",
            "به‌خصوص پس از شنا، تعریق یا خشک‌کردن پوست با حوله، طبق دستور محصول ضدآفتاب را تمدید کنید.",
          ],
        },
        {
          heading: "روتین واقع‌بینانه‌ای داشته باشید",
          paragraphs: [
            "با چند محصول ساده هم می‌توانید روتین مفیدی بسازید. محصولات لایه‌بردار یا عطری را فقط زمانی اضافه کنید که با ترجیحات شما سازگار باشند و پوستتان آن‌ها را تحمل کند.",
            "اگر خشکی، خارش یا تحریک پوست ادامه‌دار بود، با متخصص سلامت مشورت کنید.",
          ],
          note: "نیازهای مراقبت از بدن در افراد متفاوت است. محصولات جدید را با احتیاط وارد روتین کنید و دستور مصرفشان را رعایت کنید.",
        },
      ],
    },
    ar: {
      slug: "body-care-guide",
      title: "العناية اليومية بالجسم: عادات بسيطة ومهمة",
      category: "العناية بالجسم",
      excerpt:
        "اكتشفي روتيناً بسيطاً للعناية بالجسم يركز على التنظيف والترطيب والراحة اليومية.",
      image:
        "https://mieavgdspafblkzilcww.supabase.co/storage/v1/object/public/products/blog/body-care.jpg",
      readTime: "٥ دقائق للقراءة",
      relatedCategory: "body-care",
      relatedLabel: "اكتشفي منتجات العناية بالجسم",
      sections: [
        {
          heading: "تبدأ العناية بالجسم بالتنظيف اللطيف",
          paragraphs: [
            "يبدأ روتين العناية المريح بمنتجات تناسب بشرتك وعاداتك اليومية.",
            "اختاري غسولاً يمنح بشرتك شعوراً بالراحة. قد يسبب الماء شديد السخونة والتنظيف القاسي والمتكرر جفاف بعض أنواع البشرة.",
          ],
        },
        {
          heading: "اجعلي الترطيب عادة يومية",
          paragraphs: [
            "تساعد المرطبات في دعم حاجز الرطوبة الطبيعي للبشرة. يفضل كثيرون وضع لوشن الجسم بعد الاستحمام عندما تكون البشرة رطبة قليلاً.",
            "اختاري قواماً مريحاً يشجعك على استخدام المنتج بانتظام.",
          ],
        },
        {
          heading: "لا تهملي الحماية من الشمس",
          paragraphs: [
            "تستفيد المناطق المعرضة لضوء النهار من الحماية من الشمس. اختاري واقي شمس واسع الطيف واتبعي تعليمات العبوة.",
            "أعيدي وضعه حسب التعليمات، خاصة بعد السباحة أو التعرق أو التجفيف بالمنشفة.",
          ],
        },
        {
          heading: "حافظي على روتين واقعي",
          paragraphs: [
            "يمكنك بناء روتين مفيد باستخدام بضعة منتجات فقط. أضيفي المنتجات المقشرة أو المعطرة إذا كانت تناسب تفضيلاتك وكانت بشرتك تتحملها.",
            "إذا استمر الجفاف أو الحكة أو التهيج، فكري في استشارة مختص صحي.",
          ],
          note: "تختلف احتياجات العناية بالجسم من شخص لآخر. أدخلي المنتجات الجديدة بحذر واتبعي تعليمات استخدامها.",
        },
      ],
    },
  },
];

export function getBlogPosts(language: string): BlogPost[] {
  const locale = language.startsWith("fa")
    ? "fa"
    : language.startsWith("ar")
      ? "ar"
      : "en";

  return posts.map((post) => post[locale]);
}

export function getBlogPost(
  slug: string,
  language: string,
): BlogPost | undefined {
  return getBlogPosts(language).find((post) => post.slug === slug);
}

export const blogPosts = getBlogPosts("en");
