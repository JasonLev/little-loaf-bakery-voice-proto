export const bakeryInfo = {
  name: "Little Loaf Bakery",
  tagline: "Artisanal Handcrafted Sourdough & Sweet Treats",
  location: "West Los Angeles, CA",
  hours: {
    monday_thursday: "5:00pm - 7:00pm",
    friday: "3:00pm - 4:00pm",
    sunday: "4:00pm - 5:00pm",
    special_request: "Available upon special request",
  },
  delivery: "Delivery options can be worked out upon request.",
  contact: {
    email: "hello@littleloafbakeryla.com",
    instagram: "@littleloafbakeryla",
  },
  about: {
    team: "Run by a dedicated husband and wife team: our Chief Dad and Happiness Officer and our Chief Mom and 'Love Love' Officer.",
    philosophy:
      "Everything we bake is made with love in small batches. We are a handcrafted, Kosher kitchen using organic ingredients whenever possible.",
  },
};

export const menuItems = [
  {
    id: "sourdough-classic",
    name: "Classic Sourdough",
    description: "Slow-fermented for 48 hours with our organic starter.",
    price: 15,
    category: "Sourdough Bread",
    image:
      "https://images.unsplash.com/photo-1596575666733-cbcea306ac16?auto=format&fit=crop&q=80&w=600",
    ingredients: ["Organic Bread Flour", "Water", "Sea Salt"],
    inStock: true,
  },
  {
    id: "sourdough-rosemary",
    name: "Rosemary & Garlic Sourdough",
    description: "Fragrant fresh rosemary and roasted garlic cloves.",
    price: 17,
    ingredients: [
      "Organic Bread Flour",
      "Water",
      "Sea Salt",
      "Fresh Rosemary",
      "Roasted Garlic",
    ],
    category: "Sourdough Bread",
    image:
      "https://images.unsplash.com/photo-1596575666733-cbcea306ac16?auto=format&fit=crop&q=80&w=600",
    inStock: true,
  },
  {
    id: "Challah",
    name: "Challah Bread",
    description:
      "Signature Challah bread braided with love. Various toppings available.",
    price: 12, // Changed from '$12.00' to 12
    category: "Bread",
    image:
      "https://images.unsplash.com/photo-1609970957077-6baa39b4a749?auto=format&fit=crop&q=80&w=600",
    ingredients: [
      "Organic Bread Flour",
      "Water",
      "Sea Salt",
      "Fresh Rosemary",
      "Roasted Garlic",
    ],
    inStock: true,
  },
  {
    id: "cookie-choc-chip",
    name: "Sea Salt Chocolate Chip Cookies",
    description: "Soft, chewy, and loaded with premium dark chocolate.",
    ingredients: [
      "Organic Flour",
      "Butter",
      "Brown Sugar",
      "Dark Chocolate",
      "Sea Salt",
    ],
    category: "Cookies and brownies",
    inStock: true,
  },
  {
    id: "brownie-fudge",
    name: "Sourdough Fudge Brownies",
    description:
      "A sourdough-base makes these fudge brownies gut-healthy, so treat yourself without the guilt.",
    price: 8,
    ingredients: ["Cocoa Powder", "Butter", "Sugar", "Eggs", "Vanilla"],
    category: "Cookies and brownies",
    image:
      "https://images.unsplash.com/photo-1593114350460-f1e299ad40c4?auto=format&fit=crop&q=80&w=600",
    inStock: true,
  },
  {
    id: "bread-banana",
    name: "Banana Nut Bliss",
    description: "A favorite! Moist banana bread packed with walnuts.",
    ingredients: ["Bananas", "Walnuts", "Organic Flour", "Sugar", "Cinnamon"],
    category: "Dessert breads",
    inStock: true,
  },
  {
    id: "bread-pumpkin",
    name: "Pumpkin Chip Delight",
    description: "Spiced pumpkin bread with dark chocolate chips.",
    ingredients: [
      "Pumpkin Puree",
      "Chocolate Chips",
      "Spices",
      "Organic Flour",
    ],
    category: "Dessert breads",
    inStock: true,
  },
  {
    id: "granola-honey",
    name: "Honey Nut Granola",
    description: "Crunchy clusters of oats, nuts, and honey.",
    price: 9,
    image:
      "https://images.unsplash.com/photo-1668723968333-28fff638eecd?auto=format&fit=crop&q=80&w=600",
    ingredients: ["Organic Oats", "Honey", "Almonds", "Pecans", "Coconut Oil"],
    category: "Granola",
    inStock: true,
  },
  {
    id: "pie-apple",
    name: "Seasonal Apple Crumble Pie",
    description: "Warm apples with a buttery oat crumble topping.",
    ingredients: ["Apples", "Butter", "Oats", "Cinnamon", "Organic Flour"],
    category: "Seasonal pies",
    inStock: false,
  },
];
