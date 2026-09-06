import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with 120+ menu items...');

  // Clean existing tables
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.user.deleteMany({});

  // ── Users ──────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: {
      email: 'sandeep@example.com',
      password: hashedPassword,
      name: 'Sandeep Sharma',
      role: 'CUSTOMER',
      address: 'Flat 402, Sunshine Heights, HSR Layout, Bengaluru'
    }
  });

  await prisma.user.create({
    data: {
      email: 'admin@craveexpress.com',
      password: hashedPassword,
      name: 'Restaurant Manager',
      role: 'ADMIN',
      address: 'MG Road, Indiranagar, Bengaluru'
    }
  });

  console.log('✅ Users created');

  // ── Restaurant 1: Burger & Co. (20 items) ─────────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Burger & Co. Craft House',
      slug: 'burger-co',
      category: 'burgers',
      cuisine: JSON.stringify(['American', 'Burgers', 'Gourmet Fries']),
      rating: 4.8,
      reviewCount: 1240,
      deliveryTime: '20-30 min',
      distance: '2.4 km',
      deliveryFee: 49,
      minOrder: 199,
      isPromoted: true,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
      address: '42 MG Road, Indiranagar, Bengaluru',
      menuItems: {
        create: [
          { name: 'The Truffle Double Cheeseburger', description: 'Double smashed Angus beef patties, aged cheddar, black truffle aioli, caramelized onions on toasted brioche.', price: 349, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Signature Burgers' },
          { name: 'Smokey BBQ Pulled Chicken Burger', description: 'Slow-roasted shredded chicken, hickory BBQ sauce, slaw, crispy onion rings on a toasted sesame bun.', price: 299, image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Signature Burgers' },
          { name: 'Crispy Mushroom & Avocado Smash', description: 'Portobello mushroom patty, smashed avocado, vegan chipotle mayo, heirloom tomato, romaine lettuce.', price: 289, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Signature Burgers' },
          { name: 'Classic Beef Smash Burger', description: 'Single smashed patty, American cheese, pickles, mustard, diced onions on a potato bun.', price: 229, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.6, categoryName: 'Signature Burgers' },
          { name: 'Spicy Jalapeño Popper Burger', description: 'Beef patty, cream cheese jalapeños, pepper jack, ghost pepper sauce, brioche bun.', price: 319, image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Signature Burgers' },
          { name: 'Crispy Fried Chicken Burger', description: 'Southern fried chicken breast, pickled cucumber, slaw, garlic butter mayo on a brioche bun.', price: 279, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Signature Burgers' },
          { name: 'The Veggie Supreme Burger', description: 'Black bean & quinoa patty, roasted capsicum, guacamole, lettuce, tomato on a whole wheat bun.', price: 259, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Signature Burgers' },
          { name: 'Parmesan Truffle Fries', description: 'Hand-cut russet potatoes tossed in white truffle oil, freshly grated parmesan, and rosemary.', price: 189, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Fries & Sides' },
          { name: 'Loaded Cheese Fries', description: 'Crispy fries smothered in cheddar cheese sauce, jalapeños, crispy bacon bits, sour cream.', price: 219, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Fries & Sides' },
          { name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries seasoned with smoked paprika, served with sriracha mayo dip.', price: 169, image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Fries & Sides' },
          { name: 'Onion Rings (8 pcs)', description: 'Beer-battered jumbo onion rings, served with chipotle ranch dipping sauce.', price: 149, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Fries & Sides' },
          { name: 'Chicken Wings (6 pcs)', description: 'Crispy fried wings tossed in your choice of buffalo, BBQ, or honey garlic sauce.', price: 299, image: 'https://images.unsplash.com/photo-1567620005220-a0e4dfe66b77?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Starters' },
          { name: 'Mozzarella Sticks (6 pcs)', description: 'Golden fried mozzarella sticks with a crispy breadcrumb coating, served with marinara sauce.', price: 229, image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Starters' },
          { name: 'Craft Chocolate Shake', description: 'Thick Belgian dark chocolate milkshake blended with premium vanilla ice cream, topped with whipped cream.', price: 199, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Shakes & Drinks' },
          { name: 'Classic Vanilla Bean Shake', description: 'Real vanilla bean milkshake made with house-churned ice cream and whole milk.', price: 179, image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Shakes & Drinks' },
          { name: 'Strawberry Oreo Shake', description: 'Fresh strawberry shake blended with crushed Oreo cookies and whipped cream.', price: 199, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Shakes & Drinks' },
          { name: 'Craft Root Beer Float', description: 'Premium craft root beer poured over a scoop of vanilla ice cream.', price: 149, image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Shakes & Drinks' },
          { name: 'Double Trouble Combo', description: 'Two classic smash burgers, a large fries, and two sodas. Value combo for two people.', price: 599, image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Value Combos' },
          { name: 'Solo Meal Deal', description: 'Any signature burger + regular fries + fountain drink. Best value for a solo diner.', price: 399, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.6, categoryName: 'Value Combos' },
          { name: 'Brownie Sundae', description: 'Warm fudge brownie topped with two scoops of vanilla ice cream, chocolate sauce, and walnuts.', price: 169, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Desserts' },
        ]
      }
    }
  });

  // ── Restaurant 2: Bella Napoli Pizza (18 items) ────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Bella Napoli Artisan Pizza',
      slug: 'bella-napoli',
      category: 'pizza',
      cuisine: JSON.stringify(['Italian', 'Wood-fired Pizza', 'Pasta']),
      rating: 4.9,
      reviewCount: 2150,
      deliveryTime: '25-35 min',
      distance: '3.1 km',
      deliveryFee: 39,
      minOrder: 249,
      isPromoted: false,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80',
      address: '100 Feet Road, Koramangala, Bengaluru',
      menuItems: {
        create: [
          { name: 'Classic Margherita DOC', description: 'San Marzano tomato sauce, fresh buffalo mozzarella, fresh basil, extra virgin olive oil. Simple perfection.', price: 429, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'Spicy Pepperoni & Hot Honey', description: 'Artisanal pork pepperoni, mozzarella, chili flakes, drizzled with organic hot honey post-bake.', price: 529, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.95, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'Quattro Formaggi', description: 'Four-cheese blend: gorgonzola, mozzarella, fontina, and aged parmesan on white béchamel base.', price: 559, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'Truffle & Arugula Pizza', description: 'White truffle base, mozzarella, prosciutto, fresh arugula, shaved parmesan, drizzled with truffle oil.', price: 649, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.85, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'Roasted Veggie & Pesto', description: 'Basil pesto base, zucchini, bell peppers, cherry tomatoes, red onion, feta cheese, sunflower seeds.', price: 469, image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'BBQ Chicken & Caramelized Onion', description: 'BBQ base, pulled tandoori chicken, caramelized onions, mozzarella, coriander.', price: 519, image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf36?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'Diavola (Devil\'s Pizza)', description: 'Spicy tomato sauce, nduja sausage, calabrese salami, mozzarella, fresh chili.', price: 549, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.75, categoryName: 'Wood-Fired Pizzas (12")' },
          { name: 'Spaghetti Carbonara', description: 'Al dente spaghetti, pancetta, egg yolk cream sauce, pecorino romano, freshly cracked black pepper.', price: 449, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Pasta' },
          { name: 'Penne Arrabbiata', description: 'Penne pasta in fiery San Marzano tomato sauce with garlic, fresh chili, and basil. Vegan-friendly.', price: 359, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Pasta' },
          { name: 'Tagliatelle Bolognese', description: 'Slow-cooked beef and pork ragù, egg tagliatelle, topped with grated parmigiano reggiano.', price: 499, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.8, categoryName: 'Pasta' },
          { name: 'Creamy Mushroom Fettuccine', description: 'Fettuccine in a rich porcini and cremini mushroom cream sauce, white wine, thyme, parmesan.', price: 419, image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Pasta' },
          { name: 'Bruschetta al Pomodoro', description: 'Toasted sourdough topped with marinated cherry tomatoes, fresh basil, garlic, EVOO.', price: 229, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Antipasti' },
          { name: 'Burrata Caprese', description: 'Fresh burrata, heirloom tomatoes, basil pesto, aged balsamic reduction, sea salt.', price: 349, image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.85, categoryName: 'Antipasti' },
          { name: 'Arancini (4 pcs)', description: 'Crispy Sicilian rice balls stuffed with mozzarella and peas, served with marinara.', price: 269, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Antipasti' },
          { name: 'Tiramisu', description: 'Classic Italian tiramisù with layers of espresso-soaked ladyfingers, mascarpone, and cocoa.', price: 249, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.95, categoryName: 'Dolci' },
          { name: 'Panna Cotta', description: 'Silky vanilla panna cotta served with a seasonal berry coulis and mint.', price: 199, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Dolci' },
          { name: 'San Pellegrino Sparkling Water (750ml)', description: 'Premium Italian sparkling mineral water.', price: 119, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Beverages' },
          { name: 'Fresh Lemonade', description: 'Freshly squeezed lemonade with mint, a hint of honey, and sparkling water. Refreshing and light.', price: 149, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Beverages' },
        ]
      }
    }
  });

  // ── Restaurant 3: Biryani By Kilo (18 items) ──────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Biryani By Kilo',
      slug: 'biryani-by-kilo',
      category: 'biryani',
      cuisine: JSON.stringify(['North Indian', 'Biryani', 'Mughlai']),
      rating: 4.7,
      reviewCount: 3820,
      deliveryTime: '35-50 min',
      distance: '1.8 km',
      deliveryFee: 29,
      minOrder: 299,
      isPromoted: true,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=200&q=80',
      address: 'Residency Road, Richmond Town, Bengaluru',
      menuItems: {
        create: [
          { name: 'Hyderabadi Dum Chicken Biryani (1kg)', description: 'Slow-cooked on dum in a sealed handi. Marinated chicken, aged basmati, saffron, fried onions, mint. Serves 2.', price: 599, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Biryanis' },
          { name: 'Mutton Dum Biryani (1kg)', description: 'Tender slow-braised mutton pieces layered with long-grain saffron rice, cooked in a sealed copper pot.', price: 799, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Biryanis' },
          { name: 'Vegetable Dum Biryani (1kg)', description: 'Fresh seasonal vegetables, paneer, saffron rice, cooked on dum with aromatic whole spices.', price: 449, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Biryanis' },
          { name: 'Prawn Biryani (1kg)', description: 'Jumbo prawns marinated in coastal spices, layered with aged basmati rice, cooked on dum with coconut cream.', price: 749, image: 'https://images.unsplash.com/photo-1630851840628-5b8f18a27e36?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.75, categoryName: 'Biryanis' },
          { name: 'Hyderabadi Chicken Biryani (500g)', description: 'Half portion of our signature chicken dum biryani. Perfect for 1 person.', price: 329, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Biryanis' },
          { name: 'Egg Biryani (500g)', description: 'Boiled eggs cooked in spiced masala, layered with fluffy saffron basmati rice.', price: 279, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.5, categoryName: 'Biryanis' },
          { name: 'Paneer Tikka Masala', description: 'Grilled paneer cubes in a rich, smoky tomato and cream gravy. Best paired with naan or rice.', price: 329, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Gravies & Curries' },
          { name: 'Butter Chicken (Murgh Makhani)', description: 'Tender chicken pieces in a velvety, mildly spiced tomato and butter gravy with cream.', price: 349, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Gravies & Curries' },
          { name: 'Dal Makhani', description: 'Black lentils and kidney beans slow-cooked overnight with butter and cream. Served with butter naan.', price: 249, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Gravies & Curries' },
          { name: 'Rogan Josh (Mutton)', description: 'Kashmiri-style mutton curry with dried chili, fennel, and whole spices.', price: 399, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.8, categoryName: 'Gravies & Curries' },
          { name: 'Butter Naan (2 pcs)', description: 'Freshly baked leavened bread in a tandoor, brushed with generous amount of real butter.', price: 79, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Breads' },
          { name: 'Garlic Naan (2 pcs)', description: 'Tandoor-baked naan topped with minced garlic, butter, and fresh coriander.', price: 99, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Breads' },
          { name: 'Tandoori Chicken (4 pcs)', description: 'Whole chicken marinated in yogurt, kashmiri chili, and spice blend, cooked to perfection in a clay tandoor.', price: 499, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Tandoor Specials' },
          { name: 'Seekh Kebab (4 pcs)', description: 'Minced lamb mixed with herbs and spices, skewered and grilled in a tandoor. Served with mint chutney.', price: 349, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Tandoor Specials' },
          { name: 'Raita (Bowl)', description: 'Chilled yogurt with grated cucumber, cumin, and coriander. A perfect accompaniment for biryani.', price: 79, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Accompaniments' },
          { name: 'Shorba (Mughlai Broth)', description: 'Thin aromatic lamb broth with saffron, whole spices, and fried onions. A royal starter.', price: 129, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.6, categoryName: 'Soups & Starters' },
          { name: 'Gulab Jamun (4 pcs)', description: 'Soft milk-solid dumplings soaked in rose-cardamom sugar syrup, served warm.', price: 99, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Desserts' },
          { name: 'Phirni', description: 'Traditional Mughlai rice pudding with saffron, cardamom, pistachios, and rose water. Served chilled.', price: 119, image: 'https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Desserts' },
        ]
      }
    }
  });

  // ── Restaurant 4: Dragon Wok (16 items) ───────────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Dragon Wok Asian Kitchen',
      slug: 'dragon-wok',
      category: 'chinese',
      cuisine: JSON.stringify(['Chinese', 'Thai', 'Pan-Asian']),
      rating: 4.5,
      reviewCount: 980,
      deliveryTime: '30-40 min',
      distance: '4.2 km',
      deliveryFee: 59,
      minOrder: 299,
      isPromoted: false,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=200&q=80',
      address: 'UB City Mall, Vittal Mallya Road, Bengaluru',
      menuItems: {
        create: [
          { name: 'Kung Pao Chicken', description: 'Wok-tossed diced chicken with dried red chilies, peanuts, Sichuan peppercorns, in a savory-spicy sauce.', price: 349, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.7, categoryName: 'Wok Specials' },
          { name: 'Vegetable Hakka Noodles', description: 'Tossed wok-style egg noodles with julienned vegetables, soy, and sesame in high-flame heat.', price: 249, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Noodles & Rice' },
          { name: 'Chicken Fried Rice', description: 'Wok-tossed jasmine rice with chicken, egg, spring onion, soy, and sesame oil.', price: 279, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.7, categoryName: 'Noodles & Rice' },
          { name: 'Mapo Tofu', description: 'Silken tofu in a spicy, numbing Sichuan sauce with fermented black beans and ground pork.', price: 299, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.6, categoryName: 'Wok Specials' },
          { name: 'Dim Sum Platter (8 pcs)', description: 'Assorted steamed dim sum: har gow, siu mai, vegetable crystal, and mushroom dumplings.', price: 349, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Dim Sum' },
          { name: 'Steamed Vegetable Dumplings (6 pcs)', description: 'Translucent rice-flour wrappers filled with water chestnut, bamboo shoots, and shiitake mushrooms.', price: 249, image: 'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Dim Sum' },
          { name: 'Crispy Spring Rolls (4 pcs)', description: 'Golden crispy rolls stuffed with glass noodles, shredded cabbage, carrots, served with sweet chili sauce.', price: 199, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Starters' },
          { name: 'Chilli Chicken (Dry)', description: 'Indo-Chinese classic: crispy fried chicken tossed with capsicum, onion, soy, vinegar, and green chili.', price: 329, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Indo-Chinese' },
          { name: 'Chilli Paneer (Dry)', description: 'Crispy fried paneer cubes tossed in Indo-Chinese style with peppers, soy, and green onions.', price: 299, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Indo-Chinese' },
          { name: 'Manchow Soup', description: 'Spicy Chinese soup with shredded vegetables, bamboo shoots, and crispy fried noodles on top.', price: 179, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Soups' },
          { name: 'Hot & Sour Soup', description: 'Classic hot and sour broth with mushrooms, bamboo shoots, tofu, egg drop, and vinegar.', price: 179, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.6, categoryName: 'Soups' },
          { name: 'Pad Thai Noodles', description: 'Stir-fried rice noodles with shrimp, egg, bean sprouts, and peanuts in tamarind-based sauce.', price: 349, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Thai Specialties' },
          { name: 'Green Thai Curry with Rice', description: 'Aromatic green curry paste with coconut milk, kaffir lime, galangal, Thai basil, and vegetables.', price: 329, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Thai Specialties' },
          { name: 'Chicken Satay (5 skewers)', description: 'Marinated chicken skewers grilled on charcoal, served with peanut sauce and cucumber relish.', price: 299, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Thai Specialties' },
          { name: 'Mango Sticky Rice', description: 'Warm glutinous rice cooked in coconut cream, served with fresh ripe mango slices.', price: 199, image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Desserts' },
          { name: 'Matcha Ice Cream (2 scoops)', description: 'Premium Japanese-style matcha green tea ice cream with a subtly bitter, earthy flavour.', price: 169, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Desserts' },
        ]
      }
    }
  });

  // ── Restaurant 5: The Spice Route (South Indian, 16 items) ────────────────
  await prisma.restaurant.create({
    data: {
      name: 'The Spice Route',
      slug: 'spice-route',
      category: 'south-indian',
      cuisine: JSON.stringify(['South Indian', 'Andhra', 'Kerala']),
      rating: 4.6,
      reviewCount: 2100,
      deliveryTime: '20-35 min',
      distance: '1.2 km',
      deliveryFee: 19,
      minOrder: 149,
      isPromoted: false,
      isVegOnly: true,
      bannerImage: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=200&q=80',
      address: 'Jayanagar 4th Block, Bengaluru',
      menuItems: {
        create: [
          { name: 'Ghee Masala Dosa', description: 'Large crispy rice and lentil crepe spread with red chutney, filled with spiced potato masala, served with sambar and three chutneys.', price: 149, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Dosas' },
          { name: 'Onion Rava Dosa', description: 'Thin, crispy semolina dosa with caramelized onions, cumin, and green chilies. Lacy and crunchy.', price: 129, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Dosas' },
          { name: 'Mysore Masala Dosa', description: 'Crispy dosa with a spicy red chutney spread, potato masala filling. A Bengaluru classic.', price: 139, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Dosas' },
          { name: 'Paper Masala Dosa', description: 'Extra-thin and crispy paper dosa with potato masala and a side of sambar and coconut chutney.', price: 159, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Dosas' },
          { name: 'Idli Sambar (3 pcs)', description: 'Three soft, fluffy steamed rice cakes served with piping hot lentil sambar and coconut chutney.', price: 89, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Tiffin' },
          { name: 'Vada Sambar (2 pcs)', description: 'Crispy medu vadas (savory lentil donuts) served with sambar and three chutneys.', price: 99, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Tiffin' },
          { name: 'Pongal', description: 'Comfort food: creamy rice and lentil porridge tempered with ghee, black pepper, cumin, and cashews.', price: 99, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Tiffin' },
          { name: 'Appam with Coconut Milk', description: 'Lacy Kerala-style rice hoppers served with sweetened coconut milk and a hint of cardamom.', price: 129, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Kerala Specials' },
          { name: 'Kerala Prawn Curry', description: 'Coastal-style prawn curry with coconut milk, raw mango, and Kudampuli (Gamboge), served with appam.', price: 349, image: 'https://images.unsplash.com/photo-1630851840628-5b8f18a27e36?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.85, categoryName: 'Kerala Specials' },
          { name: 'Chettinad Chicken Curry', description: 'Fiery, aromatic chicken curry from Tamil Nadu\'s Chettinad region, made with freshly ground spices and kalpasi.', price: 329, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.8, categoryName: 'Andhra & Chettinad' },
          { name: 'Andhra Gongura Mutton', description: 'Tender mutton pieces cooked in tangy sorrel (gongura) leaves with Andhra-style spices.', price: 389, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Andhra & Chettinad' },
          { name: 'Tomato Rice', description: 'Steamed basmati tossed with a tangy, spicy tomato masala, tempered with mustard and curry leaves.', price: 119, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Rice Varieties' },
          { name: 'Tamarind Rice (Puliyogare)', description: 'Karnataka-style tangy tamarind rice with peanuts, sesame, and a special spice blend. Festive & traditional.', price: 119, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Rice Varieties' },
          { name: 'Filter Coffee (Decoction)', description: 'Authentic South Indian filter coffee — strong decoction mixed with frothy hot milk. Served in a traditional davara.', price: 59, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Beverages' },
          { name: 'Payasam (Kheer)', description: 'South Indian vermicelli kheer cooked in full-cream milk with cardamom, cashews, and raisins.', price: 89, image: 'https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Desserts' },
          { name: 'Mysore Pak', description: 'The legendary Karnataka sweet: dense gram flour fudge made with generous amounts of ghee and sugar.', price: 79, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Desserts' },
        ]
      }
    }
  });

  // ── Restaurant 6: Sushi Sora (15 items) ───────────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Sushi Sora',
      slug: 'sushi-sora',
      category: 'sushi',
      cuisine: JSON.stringify(['Japanese', 'Sushi', 'Ramen']),
      rating: 4.8,
      reviewCount: 760,
      deliveryTime: '35-45 min',
      distance: '5.6 km',
      deliveryFee: 79,
      minOrder: 499,
      isPromoted: false,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=200&q=80',
      address: 'Lavelle Road, Central Bengaluru',
      menuItems: {
        create: [
          { name: 'Salmon Nigiri (2 pcs)', description: 'Premium Norwegian salmon over hand-pressed sushi rice seasoned with red wine vinegar.', price: 299, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Nigiri' },
          { name: 'Tuna Nigiri (2 pcs)', description: 'Fresh bluefin tuna belly (toro) over vinegared sushi rice with a touch of wasabi.', price: 349, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.85, categoryName: 'Nigiri' },
          { name: 'Ebi (Prawn) Nigiri (2 pcs)', description: 'Butterfly-cut boiled prawn over sushi rice with Japanese mayo.', price: 279, image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Nigiri' },
          { name: 'Dragon Roll (8 pcs)', description: 'Prawn tempura inside, topped with avocado slices, tobiko, and unagi sauce. Our signature roll.', price: 649, image: 'https://images.unsplash.com/photo-1617196034737-9e3a35f4b34c?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Signature Rolls' },
          { name: 'Spicy Tuna Roll (8 pcs)', description: 'Chopped tuna with sriracha and sesame oil, wrapped in nori with cucumber and sushi rice.', price: 549, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.8, categoryName: 'Signature Rolls' },
          { name: 'Avocado & Cucumber Roll (8 pcs)', description: 'Classic vegetarian maki with creamy avocado, fresh cucumber, and sesame seeds.', price: 349, image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Maki Rolls' },
          { name: 'Rainbow Roll (8 pcs)', description: 'California roll topped with alternating slices of salmon, tuna, yellowtail, and avocado.', price: 699, image: 'https://images.unsplash.com/photo-1617196034737-9e3a35f4b34c?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Signature Rolls' },
          { name: 'Tonkotsu Ramen', description: 'Rich creamy pork bone broth, chashu pork belly, soft-boiled marinated egg, bamboo shoots, nori.', price: 499, image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Ramen' },
          { name: 'Shoyu Chicken Ramen', description: 'Clear soy-based broth with chicken chashu, menma, narutomaki, spring onions.', price: 449, image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Ramen' },
          { name: 'Vegetable Miso Ramen', description: 'Umami-rich miso broth with tofu, corn, enoki mushrooms, bamboo shoots, and soft-boiled egg.', price: 399, image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Ramen' },
          { name: 'Edamame', description: 'Steamed Japanese soybeans lightly salted with sea salt. Simple, healthy, and delicious.', price: 149, image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Starters' },
          { name: 'Gyoza (6 pcs)', description: 'Pan-fried Japanese pork and cabbage dumplings, crispy on the bottom, served with ponzu dipping sauce.', price: 299, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Starters' },
          { name: 'Miso Soup', description: 'Traditional Japanese dashi-based miso broth with silken tofu, wakame seaweed, and spring onion.', price: 119, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Soups' },
          { name: 'Matcha Latte', description: 'Ceremonial grade Japanese matcha whisked with warm oat milk. Earthy, smooth, and calming.', price: 199, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Beverages' },
          { name: 'Mochi Ice Cream (3 pcs)', description: 'Soft glutinous rice cakes stuffed with ice cream in three flavours: matcha, mango, and strawberry.', price: 249, image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.85, categoryName: 'Desserts' },
        ]
      }
    }
  });

  // ── Restaurant 7: The Chai Collective (12 items) ──────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'The Chai Collective',
      slug: 'chai-collective',
      category: 'cafe',
      cuisine: JSON.stringify(['Café', 'Snacks', 'Sandwiches', 'Chai']),
      rating: 4.4,
      reviewCount: 1540,
      deliveryTime: '15-25 min',
      distance: '0.8 km',
      deliveryFee: 0,
      minOrder: 99,
      isPromoted: true,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=200&q=80',
      address: 'Church Street, Central Bengaluru',
      menuItems: {
        create: [
          { name: 'Classic Masala Chai', description: 'Aromatic Indian milk tea brewed with ginger, cardamom, cinnamon, and cloves. Comforting and bold.', price: 59, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Chai & Coffee' },
          { name: 'Cold Brew Coffee', description: 'Slow-steeped 18-hour cold brew concentrate topped with oat milk and a touch of vanilla syrup.', price: 179, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Chai & Coffee' },
          { name: 'Bombay Cutting Chai (2 cups)', description: 'Strong, sweet Bombay-style half-cups of tea in the authentic street style.', price: 49, image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Chai & Coffee' },
          { name: 'Suleimani Chai', description: 'Kerala-style black tea with lemon juice and a pinch of spice. Light and refreshing.', price: 69, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Chai & Coffee' },
          { name: 'Vegan Soy Latte', description: 'Double espresso with frothy soy milk. Smooth, creamy, and completely plant-based.', price: 189, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Chai & Coffee' },
          { name: 'Vada Pav', description: 'Mumbai\'s iconic street snack: spiced potato fritter in a soft dinner roll with dry garlic chutney and green chili.', price: 49, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Snacks & Bites' },
          { name: 'Samosa (2 pcs)', description: 'Crispy pastry triangles filled with spiced potato and peas, served with mint and tamarind chutneys.', price: 59, image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Snacks & Bites' },
          { name: 'Pav Bhaji', description: 'Spiced mashed vegetable curry served with buttered, toasted pav buns and a squeeze of lemon.', price: 149, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Snacks & Bites' },
          { name: 'Grilled Cheese & Tomato Sandwich', description: 'Sourdough bread with melted cheddar, heirloom tomatoes, and basil pesto, pressed till golden.', price: 149, image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Sandwiches' },
          { name: 'Chicken Club Sandwich', description: 'Triple-decker with grilled chicken, crispy bacon, avocado, lettuce, tomato, and garlic mayo.', price: 229, image: 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Sandwiches' },
          { name: 'Banana Walnut Muffin', description: 'Freshly baked moist banana muffin with walnuts and a crumble topping. Perfect with chai.', price: 89, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.5, categoryName: 'Bakery' },
          { name: 'Chocolate Hazelnut Croissant', description: 'Flaky, buttery croissant filled with dark chocolate and hazelnut spread, baked fresh every morning.', price: 119, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Bakery' },
        ]
      }
    }
  });

  // ── Restaurant 8: Meghana Foods (10 items) ────────────────────────────────
  await prisma.restaurant.create({
    data: {
      name: 'Meghana Foods',
      slug: 'meghana-foods',
      category: 'biryani',
      cuisine: JSON.stringify(['Andhra', 'Biryani', 'Seafood']),
      rating: 4.7,
      reviewCount: 5200,
      deliveryTime: '30-45 min',
      distance: '2.0 km',
      deliveryFee: 29,
      minOrder: 249,
      isPromoted: false,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=200&q=80',
      address: 'Residency Road, Bengaluru',
      menuItems: {
        create: [
          { name: 'Meghana Chicken Biryani (Half)', description: 'The legendary Koramangala-style chicken biryani cooked in a rich spiced gravy. Serves 1.', price: 299, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Biryani' },
          { name: 'Meghana Chicken Biryani (Full)', description: 'Full portion of the iconic Meghana chicken biryani. Serves 2.', price: 549, image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Biryani' },
          { name: 'Mutton Biryani (Full)', description: 'Bone-in tender mutton pieces slow-cooked with saffron basmati and Andhra spices. Serves 2.', price: 699, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.85, categoryName: 'Biryani' },
          { name: 'Fish Biryani (Half)', description: 'King fish marinated in coastal spices and cooked with basmati rice. Aromatic and flavorful.', price: 369, image: 'https://images.unsplash.com/photo-1630851840628-5b8f18a27e36?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Biryani' },
          { name: 'Chicken Curry', description: 'Andhra-style spicy chicken curry with a rich, tangy tomato gravy and freshly ground masalas.', price: 249, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Curries' },
          { name: 'Mutton Keema Curry', description: 'Spiced minced mutton cooked with tomatoes, onions, and whole spices. Great with roti.', price: 299, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.6, categoryName: 'Curries' },
          { name: 'Egg Curry', description: 'Boiled eggs simmered in a spicy Andhra-style onion-tomato gravy. Simple yet satisfying.', price: 179, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.5, categoryName: 'Curries' },
          { name: 'Prawn Curry', description: 'Fresh prawns cooked in a spicy, tangy Andhra-style curry with coastal spices and tomatoes.', price: 349, image: 'https://images.unsplash.com/photo-1630851840628-5b8f18a27e36?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Curries' },
          { name: 'Chapati (2 pcs)', description: 'Soft whole wheat flatbread. Perfect accompaniment for any curry.', price: 39, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.4, categoryName: 'Breads' },
          { name: 'Hyderabadi Khubani ka Meetha', description: 'Traditional Hyderabadi apricot dessert simmered in sugar syrup, served with whipped cream.', price: 99, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Desserts' },
        ]
      }
    }
  });

  // ── Restaurant 9: The Shake Studio & Craft Beverages (16 items) ─────────────
  await prisma.restaurant.create({
    data: {
      name: 'The Shake Studio & Craft Beverages',
      slug: 'shake-studio',
      category: 'beverages',
      cuisine: JSON.stringify(['Beverages', 'Thickshakes', 'Cold Pressed', 'Smoothies', 'Boba']),
      rating: 4.9,
      reviewCount: 2310,
      deliveryTime: '15-20 min',
      distance: '1.1 km',
      deliveryFee: 29,
      minOrder: 99,
      isPromoted: true,
      isVegOnly: true,
      bannerImage: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80',
      address: '100ft Road, Indiranagar, Bengaluru',
      menuItems: {
        create: [
          { name: 'Belgian Dark Chocolate Thickshake', description: 'Ultra-thick shake made with melted Callebaut 70% dark chocolate and creamy gelato, topped with cocoa crisps.', price: 219, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Gourmet Thickshakes' },
          { name: 'Nutella Ferrero Rocher Shake', description: 'Rich Nutella blend with crushed Ferrero Rocher pralines, hazelnut butter, and whipped cream.', price: 249, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Gourmet Thickshakes' },
          { name: 'Lotus Biscoff Crunch Shake', description: 'Caramelized speculoos biscuit shake layered with crunchy Biscoff spread and vanilla ice cream.', price: 229, image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Gourmet Thickshakes' },
          { name: 'Strawberry Shortcake Shake', description: 'Handcrafted with fresh Mahabaleshwar strawberries, pound cake crumble, and sweet cream.', price: 209, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Gourmet Thickshakes' },
          { name: 'Cold-Pressed Valencia Orange Juice', description: '100% raw, unpasteurized, no added sugar or water. Pure citrus energy packed with Vitamin C.', price: 159, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Cold-Pressed Juices' },
          { name: 'Watermelon Mint Hydrator', description: 'Hydrating watermelon cold-pressed with fresh garden mint leaves and a hint of Himalayan pink salt.', price: 139, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Cold-Pressed Juices' },
          { name: 'Green Detox Elixir', description: 'Spinach, green apple, cucumber, celery, and ginger cold-pressed for maximum cleanse and alkalinity.', price: 169, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Cold-Pressed Juices' },
          { name: 'Pomegranate Ruby Glow', description: 'Antioxidant-dense cold pressed ruby pomegranate juice. Vibrant, slightly tart, and 100% pure.', price: 179, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Cold-Pressed Juices' },
          { name: 'Alphonso Mango Cream Smoothie', description: 'Thick Ratnagiri Alphonso mango pulp blended with Greek yogurt, chia seeds, and wildflower honey.', price: 189, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Smoothies & Boba' },
          { name: 'Mixed Wild Berry Smoothie', description: 'Blueberries, raspberries, and blackberries whipped with probiotic curd and toasted almond flakes.', price: 199, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Smoothies & Boba' },
          { name: 'Brown Sugar Boba Milk Tea', description: 'Chewy warm tapioca pearls infused with Okinawa brown sugar syrup, Assam black milk tea, and cream.', price: 219, image: 'https://images.unsplash.com/photo-1558857563-b37cf5a23f39?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Smoothies & Boba' },
          { name: 'Taro Coconut Bubble Tea', description: 'Purple taro root blended with coconut milk, accompanied by golden crystal boba pearls.', price: 219, image: 'https://images.unsplash.com/photo-1558857563-b37cf5a23f39?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Smoothies & Boba' },
          { name: 'Classic Virgin Mojito', description: 'Muddled fresh mint leaves, zesty lime wedges, simple cane syrup, and effervescent club soda.', price: 139, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Mocktails & Coolers' },
          { name: 'Electric Blue Curacao Cooler', description: 'Vibrant citrus blue curacao cordial shaken with lemonade, crushed ice, and fresh mint sprigs.', price: 149, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Mocktails & Coolers' },
          { name: 'Peach Passion Iced Tea', description: 'Freshly brewed Darjeeling black tea infused with sweet white peach puree and passion fruit syrup.', price: 149, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.7, categoryName: 'Specialty Iced Brews' },
          { name: 'Iced Caramel Cloud Macchiato', description: 'Espresso poured over iced vanilla oat milk, topped with a velvety whipped cloud foam and caramel drizzle.', price: 199, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Specialty Iced Brews' },
        ]
      }
    }
  });

  // ── Restaurant 10: La Taqueria Mexicana (Tacos & Mexican, 14 items) ────────
  await prisma.restaurant.create({
    data: {
      name: 'La Taqueria Mexicana',
      slug: 'la-taqueria',
      category: 'tacos',
      cuisine: JSON.stringify(['Mexican', 'Tacos', 'Burritos', 'Quesadillas']),
      rating: 4.8,
      reviewCount: 1890,
      deliveryTime: '20-30 min',
      distance: '1.8 km',
      deliveryFee: 39,
      minOrder: 149,
      isPromoted: true,
      isVegOnly: false,
      bannerImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=200&q=80',
      address: '12th Main, HAL 2nd Stage, Indiranagar, Bengaluru',
      menuItems: {
        create: [
          { name: 'Smoky Chipotle Chicken Tacos (3 pcs)', description: 'Grilled adobo-marinated chicken, pico de gallo, shredded cabbage, avocado crema on soft warm corn tortillas.', price: 289, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Street Tacos' },
          { name: 'Crispy Baja Fish Tacos (3 pcs)', description: 'Beer-battered fresh fish fillets, crunchy jalapeño slaw, smoky chipotle drizzle, lime wedges on flour tortillas.', price: 329, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Street Tacos' },
          { name: 'Braised Carnitas Tacos (3 pcs)', description: 'Slow-cooked citrus pulled pork, pickled red onions, fresh cilantro, salsa verde on fresh masa tortillas.', price: 319, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: false, rating: 4.7, categoryName: 'Street Tacos' },
          { name: 'Charred Paneer & Corn Tacos (3 pcs)', description: 'Spiced grilled paneer cubes, roasted sweet corn, guacamole, cotija cheese, salsa roja.', price: 259, image: 'https://images.unsplash.com/photo-1584536286788-78ae83c4c50d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Street Tacos' },
          { name: 'Epic Mission Burrito', description: 'Large flour tortilla stuffed with Mexican rice, black beans, Monterey Jack, fajita peppers, salsa, and choice of protein.', price: 349, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.9, categoryName: 'Burritos & Bowls' },
          { name: 'Fiesta Burrito Bowl', description: 'Cilantro-lime brown rice, pinto beans, grilled corn salsa, guacamole, romaine lettuce, and sour cream.', price: 299, image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Burritos & Bowls' },
          { name: 'Three-Cheese Quesadilla', description: 'Toasted flour tortilla oozing with cheddar, Monterey Jack, and mozzarella, served with salsa and sour cream.', price: 239, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Quesadillas' },
          { name: 'Spicy Chicken Quesadilla', description: 'Grilled chicken, roasted bell peppers, caramelized onions, melted cheese blend with creamy chipotle dip.', price: 279, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80', isVeg: false, isBestseller: true, rating: 4.8, categoryName: 'Quesadillas' },
          { name: 'Loaded Supreme Nachos', description: 'Warm tortilla chips smothered with warm queso, black beans, jalapeños, guacamole, sour cream, and salsa fresca.', price: 269, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Sides & Starters' },
          { name: 'Fresh Guacamole & Chips', description: 'Hand-mashed Hass avocados with lime, cilantro, jalapeños, and sea salt, served with crispy corn tortilla chips.', price: 219, image: 'https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Sides & Starters' },
          { name: 'Mexican Street Corn (Elote)', description: 'Grilled sweet corn on the cob slathered in garlic mayo, cotija cheese, chili powder, and cilantro.', price: 149, image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.6, categoryName: 'Sides & Starters' },
          { name: 'Cinnamon Sugar Churros (4 pcs)', description: 'Golden fried Mexican pastry tossed in cinnamon sugar, served with warm dulce de leche and chocolate dip.', price: 179, image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Desserts' },
          { name: 'Horchata Fresca', description: 'Traditional sweet Mexican rice and almond milk beverage infused with Mexican cinnamon and vanilla.', price: 139, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Beverages' },
          { name: 'Hibiscus Agua de Jamaica', description: 'Tart and refreshing iced hibiscus flower tea sweetened with agave nectar and lime juice.', price: 129, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Beverages' },
        ]
      }
    }
  });

  // ── Restaurant 11: Sweet Sensations Patisserie & Waffles (14 items) ───────
  await prisma.restaurant.create({
    data: {
      name: 'Sweet Sensations Patisserie & Waffles',
      slug: 'sweet-sensations',
      category: 'desserts',
      cuisine: JSON.stringify(['Desserts', 'Waffles', 'Bakery', 'Ice Cream', 'Pastries']),
      rating: 4.9,
      reviewCount: 3120,
      deliveryTime: '15-25 min',
      distance: '1.5 km',
      deliveryFee: 29,
      minOrder: 99,
      isPromoted: true,
      isVegOnly: true,
      bannerImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
      logoImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80',
      address: 'Lavelle Road, Central Bengaluru',
      menuItems: {
        create: [
          { name: 'Nutella Belgian Waffle', description: 'Freshly baked golden waffle smothered in warm Nutella, toasted almond slivers, and a scoop of vanilla ice cream.', price: 219, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Belgian Waffles' },
          { name: 'Triple Chocolate Overload Waffle', description: 'Dark, milk, and white chocolate ganache drizzled over a crisp cocoa waffle with choco chips.', price: 239, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Belgian Waffles' },
          { name: 'Fresh Berry Maple Waffle', description: 'Light Belgian waffle topped with fresh blueberries, strawberries, powdered sugar, and genuine Quebec maple syrup.', price: 249, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Belgian Waffles' },
          { name: 'Warm Molten Lava Cake', description: 'Decadent chocolate sponge with an oozing liquid dark chocolate center, served warm with vanilla bean gelato.', price: 189, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Cakes & Pastries' },
          { name: 'New York Baked Cheesecake Slice', description: 'Velvety cream cheese filling on a buttery graham cracker crust, topped with strawberry coulis.', price: 229, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Cakes & Pastries' },
          { name: 'Classic Italian Tiramisu Cup', description: 'Espresso-soaked savoiardi ladyfingers layered with airy mascarpone cream and dusted with Valrhona cocoa.', price: 199, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.9, categoryName: 'Cakes & Pastries' },
          { name: 'Red Velvet Cream Cheese Pastry', description: 'Crimson buttermilk sponge layered with fluffy cream cheese frosting and white chocolate pearls.', price: 179, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Cakes & Pastries' },
          { name: 'Parisian Macarons Box (6 pcs)', description: 'Delicate French almond meringue cookies in pistachio, raspberry, salted caramel, and vanilla.', price: 299, image: 'https://images.unsplash.com/photo-1569864321349-f9c34f9a3f2b?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Artisan Cookies' },
          { name: 'Gooey Chocochip Cookie (Large)', description: 'Warm giant cookie loaded with semi-sweet chocolate chunks and a soft gooey center.', price: 99, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Artisan Cookies' },
          { name: 'Alfonso Mango Sundae', description: 'Fresh mango chunks, mango ice cream, whipped cream, and mango reduction drizzle.', price: 189, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.8, categoryName: 'Sundaes & Scoops' },
          { name: 'Brownie Fudge Sundae', description: 'Chunky walnut brownie with Belgian chocolate ice cream, warm fudge, and toasted pecans.', price: 199, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Sundaes & Scoops' },
          { name: 'Pistachio Gelato Tub (300ml)', description: 'Authentic Sicilian slow-churned pistachio gelato. Rich, nutty, and velvety.', price: 259, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.8, categoryName: 'Sundaes & Scoops' },
          { name: 'Salted Caramel Hot Chocolate', description: 'Thick European drinking chocolate infused with sea salt caramel and topped with mini marshmallows.', price: 169, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: true, rating: 4.9, categoryName: 'Beverages' },
          { name: 'Iced Strawberry Latte', description: 'Fresh strawberry puree layered with whole milk and topped with iced cold brew espresso.', price: 179, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', isVeg: true, isBestseller: false, rating: 4.7, categoryName: 'Beverages' },
        ]
      }
    }
  });

  const totalItems = 20 + 18 + 18 + 16 + 16 + 15 + 12 + 10 + 16 + 14 + 14;
  console.log(`✅ Created 11 restaurants with ${totalItems} menu items total`);
  console.log('🎉 Seeding finished successfully!');
  console.log('\n📋 Test Credentials:');
  console.log('  Customer → sandeep@example.com / 123456');
  console.log('  Admin    → admin@craveexpress.com / 123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
