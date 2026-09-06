import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/restaurants - Fetch all restaurants with menu
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;

    const restaurants = await prisma.restaurant.findMany({
      include: {
        menuItems: true
      }
    });

    // Format output
    const formatted = restaurants.map((r) => {
      let parsedCuisine = [];
      try {
        parsedCuisine = typeof r.cuisine === 'string' ? JSON.parse(r.cuisine) : (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]);
      } catch (e) {
        parsedCuisine = [r.cuisine || 'Multi-Cuisine'];
      }
      
      // Group menu by category
      const categoriesMap = {};
      (r.menuItems || []).forEach((item) => {
        const cat = item.categoryName || 'Main Menu';
        if (!categoriesMap[cat]) {
          categoriesMap[cat] = [];
        }
        categoriesMap[cat].push(item);
      });

      const formattedMenu = Object.keys(categoriesMap).map((catName) => ({
        categoryName: catName,
        items: categoriesMap[catName]
      }));

      return {
        ...r,
        cuisine: parsedCuisine,
        menu: formattedMenu
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/restaurants/:id - Fetch single restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.params.id },
      include: { menuItems: true }
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const categoriesMap = {};
    restaurant.menuItems.forEach((item) => {
      const cat = item.categoryName || 'Main Menu';
      if (!categoriesMap[cat]) {
        categoriesMap[cat] = [];
      }
      categoriesMap[cat].push(item);
    });

    const formattedMenu = Object.keys(categoriesMap).map((catName) => ({
      categoryName: catName,
      items: categoriesMap[catName]
    }));

    let parsedCuisine = [];
    try {
      parsedCuisine = typeof restaurant.cuisine === 'string' ? JSON.parse(restaurant.cuisine) : (Array.isArray(restaurant.cuisine) ? restaurant.cuisine : [restaurant.cuisine]);
    } catch (e) {
      parsedCuisine = [restaurant.cuisine || 'Multi-Cuisine'];
    }

    res.json({
      ...restaurant,
      cuisine: parsedCuisine,
      menu: formattedMenu
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/restaurants/:id/menu - Add menu item (Admin only)
router.post('/:id/menu', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, description, price, image, isVeg, isBestseller, categoryName } = req.body;

    const newItem = await prisma.menuItem.create({
      data: {
        restaurantId: req.params.id,
        name,
        description: description || '',
        price: Number(price),
        image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        isVeg: Boolean(isVeg),
        isBestseller: Boolean(isBestseller),
        categoryName: categoryName || 'Main Menu'
      }
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/menu-items/:id - Remove menu item (Admin only)
router.delete('/menu-items/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.menuItem.delete({ where: { id: req.params.id } });
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
