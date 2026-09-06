import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/orders - Create new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, items, subtotal, deliveryFee, taxes, total, deliveryAddress, paymentMethod } = req.body;

    if (!restaurantId || !items || items.length === 0) {
      return res.status(400).json({ error: 'Restaurant ID and items are required' });
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        restaurantId,
        subtotal: Number(subtotal),
        deliveryFee: Number(deliveryFee),
        taxes: Number(taxes),
        total: Number(total),
        deliveryAddress: deliveryAddress || 'HSR Layout, Bengaluru',
        paymentMethod: paymentMethod || 'UPI',
        status: 'Placed',
        orderItems: {
          create: items.map((item) => ({
            menuItemId: item.id || item.menuItemId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        restaurant: true,
        orderItems: {
          include: { menuItem: true }
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders - Get user orders or all orders if admin
router.get('/', authenticateToken, async (req, res) => {
  try {
    const whereCondition = req.user.role === 'ADMIN' ? {} : { userId: req.user.id };

    const orders = await prisma.order.findMany({
      where: whereCondition,
      include: {
        restaurant: true,
        orderItems: {
          include: { menuItem: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
