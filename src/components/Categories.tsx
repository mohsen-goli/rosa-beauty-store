import { motion, type Variants } from "framer-motion";
import CategoryCard from "./CategoryCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
function Categories() {
  const categories = [
    {
      id: 1,
      slug: "skincare",
      name: "Skincare",
      description: "Serums, creams and daily essentials",
      image: "/Images/categories/Skincare.jpg",
    },
    {
      id: 2,
      slug: "makeup",
      name: "Makeup",
      description: "Lipsticks, foundations and more",
      image: "/Images/categories/makeup.jpg",
    },
    {
      id: 3,
      slug: "body-care",
      name: "Body Care",
      description: "Everyday care for your skin",
      image: "/Images/categories/Body-Care.jpg",
    },
  ];

  return (
    <section className="categories">
      <div className="section-heading">
        <p>SHOP BY CATEGORY</p>
        <h2>Find what you need</h2>
      </div>

      <motion.div
        className="category-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <CategoryCard {...category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Categories;
