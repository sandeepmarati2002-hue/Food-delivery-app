export const FOOD_CATEGORIES = [
  { id: 'all', name: ' All', icon: 'Utensils' },
  { id: 'burgers', name: 'Burgers', icon: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { id: 'pizza', name: 'Pizza', icon: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
  { id: 'biryani', name: 'Biryani & Indian', icon: 'Flame', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80' },
  { id: 'sushi', name: 'Sushi & Asian', icon: 'Fish', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80' },
  { id: 'tacos', name: 'Mexican Tacos', icon: 'Beef', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80' },
  { id: 'desserts', name: 'Desserts & Sweets', icon: 'Cake', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80' },
  { id: 'beverages', name: 'Drinks & Shakes', icon: 'Coffee', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80' },
];

export const RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Burger & Co. Craft House',
    slug: 'burger-co',
    category: 'burgers',
    cuisine: ['American', 'Burgers', 'Gourmet Fries'],
    rating: 4.8,
    reviewCount: 1240,
    deliveryTime: '20-30 min',
    distance: '2.4 km',
    deliveryFee: 49,
    minOrder: 199,
    priceRange: '$$',
    isPromoted: true,
    isVegOnly: false,
    bannerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
    address: '42 MG Road, Indiranagar, Bengaluru',
    menu: [
      {
        categoryName: 'Signature Burgers',
        items: [
          {
            id: 'item-101',
            name: 'The Truffle Double Cheeseburger',
            description: 'Double smashed Angus beef patties, aged cheddar, black truffle aioli, caramelized onions on toasted brioche.',
            price: 349,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.9,
            customizations: [
              { name: 'Extra Cheese Slice', price: 40 },
              { name: 'Crispy Bacon Add-on', price: 60 },
              { name: 'Gluten-Free Bun', price: 50 },
            ]
          },
          {
            id: 'item-102',
            name: 'Smokey BBQ Pulled Chicken Burger',
            description: 'Slow-roasted shredded chicken breast tossed in hickory BBQ sauce, slaw, crispy onion rings.',
            price: 299,
            image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80',
            isVeg: false,
            isBestseller: false,
            rating: 4.7,
            customizations: []
          },
          {
            id: 'item-103',
            name: 'Crispy Mushroom & Avocado Smash (Veg)',
            description: 'Portobello mushroom patty, smashed avocado, vegan chipotle mayo, heirloom tomato, romaine lettuce.',
            price: 289,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            customizations: []
          }
        ]
      },
      {
        categoryName: 'Fries & Sides',
        items: [
          {
            id: 'item-104',
            name: 'Parmesan Truffle Fries',
            description: 'Hand-cut russet potatoes tossed in white truffle oil, freshly grated parmesan, and rosemary.',
            price: 189,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: []
          },
          {
            id: 'item-105',
            name: 'Golden Onion Rings with Spicy Dip',
            description: 'Panko-crusted jumbo onion rings served with house special smoky sriracha dip.',
            price: 149,
            image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.6,
            customizations: []
          }
        ]
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Bella Napoli Artisan Pizza',
    slug: 'bella-napoli',
    category: 'pizza',
    cuisine: ['Italian', 'Wood-fired Pizza', 'Pasta'],
    rating: 4.9,
    reviewCount: 2150,
    deliveryTime: '25-35 min',
    distance: '3.1 km',
    deliveryFee: 39,
    minOrder: 249,
    priceRange: '$$$',
    isPromoted: false,
    isVegOnly: false,
    bannerImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80',
    address: '100 Feet Road, Koramangala, Bengaluru',
    menu: [
      {
        categoryName: 'Wood-Fired Pizzas (12")',
        items: [
          {
            id: 'item-201',
            name: 'Classic Margherita DOC',
            description: 'San Marzano tomato sauce, fresh buffalo mozzarella, fresh basil, extra virgin olive oil.',
            price: 429,
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: [
              { name: 'Extra Mozzarella', price: 60 },
              { name: 'Fresh Burrata Center', price: 120 }
            ]
          },
          {
            id: 'item-202',
            name: 'Spicy Pepperoni & Hot Honey',
            description: 'Artisanal pork pepperoni, mozzarella, chili flakes, drizzled with organic hot honey.',
            price: 529,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.95,
            customizations: []
          },
          {
            id: 'item-203',
            name: 'Quattro Formaggi (4 Cheese)',
            description: 'Gorgonzola blue cheese, smoked provolone, mozzarella, and parmesan reggiano.',
            price: 499,
            image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.7,
            customizations: []
          }
        ]
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Royal Nawabi Biryani House',
    slug: 'nawabi-biryani',
    category: 'biryani',
    cuisine: ['Hyderabadi', 'Mughlai', 'Kebabs'],
    rating: 4.7,
    reviewCount: 3890,
    deliveryTime: '30-40 min',
    distance: '1.8 km',
    deliveryFee: 29,
    minOrder: 199,
    priceRange: '$$',
    isPromoted: true,
    isVegOnly: false,
    bannerImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=200&q=80',
    address: '77 Residency Road, Ashok Nagar, Bengaluru',
    menu: [
      {
        categoryName: 'Authentic Dum Biryani',
        items: [
          {
            id: 'item-301',
            name: 'Hyderabadi Chicken Dum Biryani',
            description: 'Long-grain Basmati rice slow cooked with marinated tender chicken pieces, saffron, and aromatic spices. Served with Mirchi ka Salan & Raita.',
            price: 329,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.9,
            customizations: [
              { name: 'Extra Raita', price: 25 },
              { name: 'Add Boiled Egg', price: 20 }
            ]
          },
          {
            id: 'item-302',
            name: 'Paneer Tikka Dum Biryani (Veg)',
            description: 'Char-grilled cottage cheese cubes cooked in rich gravy layered with fragrance Basmati rice.',
            price: 289,
            image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            customizations: []
          }
        ]
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Zen Ramen & Sushi Bar',
    slug: 'zen-ramen',
    category: 'sushi',
    cuisine: ['Japanese', 'Sushi', 'Ramen Noodles'],
    rating: 4.85,
    reviewCount: 940,
    deliveryTime: '35-45 min',
    distance: '4.2 km',
    deliveryFee: 59,
    minOrder: 299,
    priceRange: '$$$',
    isPromoted: false,
    isVegOnly: false,
    bannerImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=200&q=80',
    address: '12 Church Street, Commercial District, Bengaluru',
    menu: [
      {
        categoryName: 'Signature Ramen & Sushi',
        items: [
          {
            id: 'item-401',
            name: 'Tonkotsu Pork Belly Ramen',
            description: 'Rich 18-hour pork bone broth, custom ramen noodles, chashu pork belly, ajitama egg, bamboo shoots.',
            price: 499,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.9,
            customizations: []
          },
          {
            id: 'item-402',
            name: 'Spicy Salmon Crunch Roll (8 pcs)',
            description: 'Fresh Atlantic salmon, cucumber, spicy mayo, topped with tempura flakes and unagi drizzle.',
            price: 449,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
            isVeg: false,
            isBestseller: true,
            rating: 4.8,
            customizations: []
          }
        ]
      }
    ]
  },
  {
    id: 'rest-beverages',
    name: 'The Shake Studio & Craft Beverages',
    slug: 'shake-studio',
    category: 'beverages',
    cuisine: ['Beverages', 'Thickshakes', 'Cold Pressed', 'Smoothies', 'Boba'],
    rating: 4.9,
    reviewCount: 2310,
    deliveryTime: '15-20 min',
    distance: '1.1 km',
    deliveryFee: 29,
    minOrder: 99,
    priceRange: '$$',
    isPromoted: true,
    isVegOnly: true,
    bannerImage: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=80',
    logoImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80',
    address: '100ft Road, Indiranagar, Bengaluru',
    menu: [
      {
        categoryName: 'Gourmet Thickshakes',
        items: [
          {
            id: 'item-bev-1',
            name: 'Belgian Dark Chocolate Thickshake',
            description: 'Ultra-thick shake made with melted Callebaut 70% dark chocolate and creamy gelato, topped with cocoa crisps.',
            price: 219,
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: [
              { name: 'Extra Whipped Cream', price: 30 },
              { name: 'Crushed Brownie Topping', price: 45 }
            ]
          },
          {
            id: 'item-bev-2',
            name: 'Nutella Ferrero Rocher Shake',
            description: 'Rich Nutella blend with crushed Ferrero Rocher pralines, hazelnut butter, and whipped cream.',
            price: 249,
            image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: []
          },
          {
            id: 'item-bev-3',
            name: 'Lotus Biscoff Crunch Shake',
            description: 'Caramelized speculoos biscuit shake layered with crunchy Biscoff spread and vanilla ice cream.',
            price: 229,
            image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            customizations: []
          }
        ]
      },
      {
        categoryName: 'Cold-Pressed Juices',
        items: [
          {
            id: 'item-bev-4',
            name: 'Cold-Pressed Valencia Orange Juice',
            description: '100% raw, unpasteurized, no added sugar or water. Pure citrus energy packed with Vitamin C.',
            price: 159,
            image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            customizations: []
          },
          {
            id: 'item-bev-5',
            name: 'Watermelon Mint Hydrator',
            description: 'Hydrating watermelon cold-pressed with fresh garden mint leaves and a hint of Himalayan pink salt.',
            price: 139,
            image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: false,
            rating: 4.7,
            customizations: []
          }
        ]
      },
      {
        categoryName: 'Smoothies & Boba',
        items: [
          {
            id: 'item-bev-6',
            name: 'Alphonso Mango Cream Smoothie',
            description: 'Thick Ratnagiri Alphonso mango pulp blended with Greek yogurt, chia seeds, and wildflower honey.',
            price: 189,
            image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: []
          },
          {
            id: 'item-bev-7',
            name: 'Brown Sugar Boba Milk Tea',
            description: 'Chewy warm tapioca pearls infused with Okinawa brown sugar syrup, Assam black milk tea, and cream.',
            price: 219,
            image: 'https://images.unsplash.com/photo-1558857563-b37cf5a23f39?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: [
              { name: 'Extra Tapioca Boba', price: 40 }
            ]
          }
        ]
      },
      {
        categoryName: 'Mocktails & Coolers',
        items: [
          {
            id: 'item-bev-8',
            name: 'Classic Virgin Mojito',
            description: 'Muddled fresh mint leaves, zesty lime wedges, simple cane syrup, and effervescent club soda.',
            price: 139,
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.8,
            customizations: []
          },
          {
            id: 'item-bev-9',
            name: 'Iced Caramel Cloud Macchiato',
            description: 'Espresso poured over iced vanilla oat milk, topped with a velvety whipped cloud foam and caramel drizzle.',
            price: 199,
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
            isVeg: true,
            isBestseller: true,
            rating: 4.9,
            customizations: []
          }
        ]
      }
    ]
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-98421',
    createdAt: '2026-09-06T17:10:00.000Z',
    restaurantName: 'Burger & Co. Craft House',
    restaurantAddress: '42 MG Road, Indiranagar',
    items: [
      { name: 'The Truffle Double Cheeseburger', quantity: 2, price: 349 },
      { name: 'Parmesan Truffle Fries', quantity: 1, price: 189 }
    ],
    subtotal: 887,
    deliveryFee: 49,
    taxes: 44,
    total: 980,
    paymentMethod: 'UPI (GPay / PhonePe)',
    deliveryAddress: 'Flat 402, Sunshine Heights, HSR Layout, Bengaluru',
    status: 'Out for Delivery', // Options: 'Placed', 'Preparing', 'Out for Delivery', 'Delivered'
    estimatedDelivery: '18 minutes',
    driver: {
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.9,
      vehicle: 'TVS NTorq - KA 01 EQ 4421'
    }
  }
];
