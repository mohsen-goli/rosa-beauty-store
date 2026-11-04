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

export const blogPosts: BlogPost[] = [
  {
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
  {
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
  {
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
  {
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
];
