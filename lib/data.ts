export const IMAGES = {
  hero: [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/polos_mens_cohesive_homepage.jpg?w=1500&dpr=2",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/polos_mens_cohesive_homepage.jpg?w=1500&dpr=2",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/polos_mens_cohesive_homepage.jpg?w=1500&dpr=2",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/polos_mens_cohesive_homepage.jpg?w=1500&dpr=2",
  ],
  trustBar:
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/feedback-images/1500x80_i6ea1cD.jpg?w=1500&dpr=2",
  venomBanner:
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage_banner_-_Venom_copy_2_b6wWk92.jpg?w=1500&dpr=2",
  products: {
    p1: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1790925298_2920056.jpg?w=376&dpr=2",
    p2: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1790938092_1431520.jpg?w=376&dpr=2",
  },
  categories: {
    tshirts:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/tshirt_Sw2l7ZU.jpg?w=376&dpr=2",
    shirts:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/shirts.jpg?w=376&dpr=2",
    polos:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/polos-.jpg?w=376&dpr=2",
    jeans:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Mens-tile-_1.jpg?w=376&dpr=2",
    pants:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Pants_Mens_tile_copy.jpg?w=376&dpr=2",
    joggers:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Joggers_Mens_tile_copy.jpg?w=376&dpr=2",
    sneakers:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/SNEAKERS-_zhCbCVA.jpg?w=376&dpr=2",
    linen:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Mens-tile-copy.jpg?w=376&dpr=2",
    outerwear:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/3tile.jpg?w=376&dpr=2",
  },
  collections: {
    cultClassics:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/cult-classic.jpg?w=376&dpr=2",
    sharpLooks:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/image-6_1.jpg?w=376&dpr=2",
    cultureCode:
      "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/image-6_1.jpg?w=376&dpr=2",
  },
};

export const CATEGORIES = [
  { name: "T-SHIRTS", image: IMAGES.categories.tshirts },
  { name: "SHIRTS", image: IMAGES.categories.shirts },
  { name: "POLOS", image: IMAGES.categories.polos },
  { name: "JEANS", image: IMAGES.categories.jeans },
  { name: "PANTS", image: IMAGES.categories.pants },
  { name: "JOGGERS", image: IMAGES.categories.joggers },
  { name: "SNEAKERS", image: IMAGES.categories.sneakers },
  { name: "LINEN", image: IMAGES.categories.linen },
  { name: "OUTERWEAR", image: IMAGES.categories.outerwear },
];

export const COLLECTIONS = [
  { name: "CULT CLASSICS", image: IMAGES.collections.cultClassics },
  { name: "SHARP LOOKS", image: IMAGES.collections.sharpLooks },
  { name: "CULTURE CODE", image: IMAGES.collections.cultureCode },
];

export const ACCESSORIES = [
  { name: "BAGS & FANNY PACK", image: IMAGES.categories.tshirts },
  { name: "SOCKS", image: IMAGES.categories.shirts },
  { name: "CAPS", image: IMAGES.categories.polos },
  { name: "PERFUMES", image: IMAGES.categories.linen },
  { name: "COLLECTIBLES", image: IMAGES.categories.outerwear },
  { name: "UMBRELLAS", image: IMAGES.collections.cultClassics },
];

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  tags?: string[];
  image: string;
};

const baseProducts: Product[] = [
  {
    id: "p1",
    title: "Naruto: Akatsuki (Raglan)",
    subtitle: "Mandarin Collar Oversized",
    price: "₹ 1,899",
    originalPrice: "₹ 2,499",
    badge: "TRENDING",
    tags: ["Dragon Ball Z", "Anime", "Graphic Tees"],
    image: IMAGES.products.p1,
  },
  {
    id: "p2",
    title: "Superman: Strength In Blue",
    subtitle: "Mandarin Collar Oversized",
    price: "₹ 1,499",
    originalPrice: "₹ 1,899",
    badge: "BEST SELLER",
    tags: ["DC", "Superman", "Originals"],
    image: IMAGES.products.p2,
  },
  {
    id: "p3",
    title: "Pineapple Stripes 7.0 Oversized T-Shirts",
    subtitle: "Originals Half Sleeve",
    price: "₹ 1,299",
    originalPrice: "₹ 1,599",
    badge: "NEW",
    tags: ["Oversized", "Stripes"],
    image: IMAGES.categories.shirts,
  },
  {
    id: "p4",
    title: "Vintage 1996: Stripes Shirts",
    subtitle: "Hawaiian Half Sleeve Shirts",
    price: "₹ 1,899",
    originalPrice: "₹ 2,299",
    badge: "VERIFIED",
    tags: ["Stripes", "Shirts", "Vintage"],
    image: IMAGES.categories.linen,
  },
  {
    id: "p5",
    title: "Streetwise - Pro Wolf",
    subtitle: "Dual Sided T-Shirts",
    price: "₹ 1,999",
    badge: "TOP RATED",
    tags: ["Oversized", "Streetwear"],
    image: IMAGES.categories.polos,
  },
  {
    id: "p6",
    title: "Spider-Man: Face Off (Raglan)",
    subtitle: "Oversized Fit T-shirts",
    price: "₹ 1,899",
    originalPrice: "₹ 2,299",
    badge: "NEW",
    tags: ["Marvel", "Spider-Man", "Raglan"],
    image: IMAGES.categories.outerwear,
  },
  {
    id: "p7",
    title: "DC: Justice League Playing Cards",
    subtitle: "Accessories",
    price: "₹ 899",
    originalPrice: "₹ 1,199",
    badge: "COLLECTORS EDITION",
    tags: ["DC", "Accessories"],
    image: IMAGES.collections.cultureCode,
  },
  {
    id: "p8",
    title: "Cult Classics: Stripes",
    subtitle: "Oversized Polos",
    price: "₹ 1,599",
    originalPrice: "₹ 1,899",
    badge: "ORGANIC COTTON",
    tags: ["Polo", "Stripes", "Cult Classics"],
    image: IMAGES.categories.tshirts,
  },
  {
    id: "p9",
    title: "Dragon Ball Z: Gohan Oversized T-Shirt",
    subtitle: "100% Cotton Anime Tee",
    price: "₹ 1,299",
    originalPrice: "₹ 1,699",
    badge: "ANIME",
    tags: ["Dragon Ball Z", "Anime"],
    image: IMAGES.categories.joggers,
  },
  {
    id: "p10",
    title: "Spider-Man: Web Slinger Joggers",
    subtitle: "Printed Joggers",
    price: "₹ 2,299",
    originalPrice: "₹ 2,799",
    badge: "MARVEL",
    tags: ["Joggers", "Marvel"],
    image: IMAGES.categories.sneakers,
  },
  {
    id: "p11",
    title: "The Linen Life: Oversized Shirts",
    subtitle: "Half Sleeve Linen Shirts",
    price: "₹ 2,299",
    originalPrice: "₹ 2,799",
    badge: "LINEN",
    tags: ["Shirts", "Linen"],
    image: IMAGES.categories.pants,
  },
  {
    id: "p12",
    title: "Dragon Ball Z: Goku Oversized T-Shirts",
    subtitle: "Superhero T-Shirts",
    price: "₹ 1,399",
    originalPrice: "₹ 1,799",
    badge: "TOP RATED",
    tags: ["Dragon Ball Z", "Anime"],
    image: IMAGES.collections.sharpLooks,
  },
  {
    id: "p13",
    title: "Spider-Man: Web Slinger (Raglan)",
    subtitle: "Printed T-Shirts",
    price: "₹ 1,599",
    originalPrice: "₹ 1,999",
    badge: "NEW",
    tags: ["Marvel", "Spider-Man"],
    image: IMAGES.categories.jeans,
  },
  {
    id: "p14",
    title: "Plaid Story: Checked Shirts",
    subtitle: "Half Sleeve Checked Shirts",
    price: "₹ 1,599",
    originalPrice: "₹ 1,999",
    badge: "CHECKED",
    tags: ["Shirts", "Checks"],
    image: IMAGES.products.p1,
  },
  {
    id: "p15",
    title: "TSS Originals: Trident",
    subtitle: "Dual Sided Print T-Shirts",
    price: "₹ 1,499",
    originalPrice: "₹ 1,899",
    badge: "NEW",
    tags: ["Originals", "Dual Side"],
    image: IMAGES.categories.shirts,
  },
  {
    id: "p16",
    title: "Spider-Man: Venom (Raglan)",
    subtitle: "Printed Oversized T-Shirts",
    price: "₹ 1,599",
    originalPrice: "₹ 1,999",
    badge: "MARVEL",
    tags: ["Marvel", "Venom", "Raglan"],
    image: IMAGES.collections.cultClassics,
  },
];

export const NEW_ARRIVALS: Product[] = baseProducts.slice(0, 4);
export const MAIN_PRODUCTS: Product[] = baseProducts;

// ─── Admin types & mock data ─────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  customer: { name: string; email: string };
  items: { productId: string; title: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
};

export const ORDERS: Order[] = [
  {
    id: "ORD-1001",
    customer: { name: "Rahul Sharma", email: "rahul.sharma@gmail.com" },
    items: [
      { productId: "p1", title: "Naruto: Akatsuki (Raglan)", qty: 1, price: 1899 },
      { productId: "p8", title: "Cult Classics: Stripes", qty: 1, price: 1599 },
    ],
    total: 3498,
    status: "delivered",
    date: "2025-05-28",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1002",
    customer: { name: "Priya Nair", email: "priya.nair@outlook.com" },
    items: [
      { productId: "p6", title: "Spider-Man: Face Off (Raglan)", qty: 2, price: 1899 },
    ],
    total: 3798,
    status: "shipped",
    date: "2025-05-30",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1003",
    customer: { name: "Amit Verma", email: "amit.verma@yahoo.com" },
    items: [
      { productId: "p11", title: "The Linen Life: Oversized Shirts", qty: 1, price: 2299 },
      { productId: "p4", title: "Vintage 1996: Stripes Shirts", qty: 1, price: 1899 },
    ],
    total: 4198,
    status: "processing",
    date: "2025-06-01",
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-1004",
    customer: { name: "Sneha Gupta", email: "sneha.gupta@gmail.com" },
    items: [
      { productId: "p2", title: "Superman: Strength In Blue", qty: 1, price: 1499 },
    ],
    total: 1499,
    status: "pending",
    date: "2025-06-03",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1005",
    customer: { name: "Karan Mehta", email: "karan.mehta@gmail.com" },
    items: [
      { productId: "p10", title: "Spider-Man: Web Slinger Joggers", qty: 1, price: 2299 },
      { productId: "p9", title: "Dragon Ball Z: Gohan Oversized T-Shirt", qty: 1, price: 1299 },
    ],
    total: 3598,
    status: "delivered",
    date: "2025-05-22",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1006",
    customer: { name: "Divya Reddy", email: "divya.reddy@hotmail.com" },
    items: [
      { productId: "p16", title: "Spider-Man: Venom (Raglan)", qty: 1, price: 1599 },
      { productId: "p13", title: "Spider-Man: Web Slinger (Raglan)", qty: 1, price: 1599 },
    ],
    total: 3198,
    status: "cancelled",
    date: "2025-05-18",
    paymentMethod: "COD",
  },
  {
    id: "ORD-1007",
    customer: { name: "Arjun Pillai", email: "arjun.pillai@gmail.com" },
    items: [
      { productId: "p5", title: "Streetwise - Pro Wolf", qty: 1, price: 1999 },
    ],
    total: 1999,
    status: "shipped",
    date: "2025-06-02",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1008",
    customer: { name: "Neha Singh", email: "neha.singh@gmail.com" },
    items: [
      { productId: "p12", title: "Dragon Ball Z: Goku Oversized T-Shirts", qty: 2, price: 1399 },
      { productId: "p7", title: "DC: Justice League Playing Cards", qty: 1, price: 899 },
    ],
    total: 3697,
    status: "delivered",
    date: "2025-05-15",
    paymentMethod: "Debit Card",
  },
  {
    id: "ORD-1009",
    customer: { name: "Vikram Joshi", email: "vikram.joshi@outlook.com" },
    items: [
      { productId: "p14", title: "Plaid Story: Checked Shirts", qty: 1, price: 1599 },
      { productId: "p15", title: "TSS Originals: Trident", qty: 1, price: 1499 },
    ],
    total: 3098,
    status: "processing",
    date: "2025-06-04",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1010",
    customer: { name: "Anjali Desai", email: "anjali.desai@gmail.com" },
    items: [
      { productId: "p3", title: "Pineapple Stripes 7.0 Oversized T-Shirts", qty: 1, price: 1299 },
    ],
    total: 1299,
    status: "pending",
    date: "2025-06-05",
    paymentMethod: "UPI",
  },
  {
    id: "ORD-1011",
    customer: { name: "Rohan Kapoor", email: "rohan.kapoor@gmail.com" },
    items: [
      { productId: "p1", title: "Naruto: Akatsuki (Raglan)", qty: 1, price: 1899 },
      { productId: "p6", title: "Spider-Man: Face Off (Raglan)", qty: 1, price: 1899 },
      { productId: "p9", title: "Dragon Ball Z: Gohan Oversized T-Shirt", qty: 1, price: 1299 },
    ],
    total: 5097,
    status: "delivered",
    date: "2025-05-10",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-1012",
    customer: { name: "Meera Iyer", email: "meera.iyer@yahoo.com" },
    items: [
      { productId: "p11", title: "The Linen Life: Oversized Shirts", qty: 1, price: 2299 },
    ],
    total: 2299,
    status: "shipped",
    date: "2025-06-06",
    paymentMethod: "COD",
  },
];

export const ADMIN_STATS = {
  totalRevenue: 36278,
  totalOrders: 12,
  totalProducts: 16,
  totalCustomers: 12,
  revenueGrowth: 18.4,
  ordersGrowth: 12.5,
};
