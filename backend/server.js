const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API to retrieve restaurants and their menus from Firebase',
    },
    servers: [
      {
        url: `${process.env.EXPO_PUBLIC_API_URL}`,
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Retrieving restaurant information
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Restaurants fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       id: "restaurant1"
 *                       name: "Papa's Pizzaria"
 *                       cuisine: "Pizza"
 *                       rating: 2.4
 *       400:
 *         description: No restaurant ID provided
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
app.get('/restaurants', async (req, res) => {
  try {
    const snapshot = await db.collection('restaurants').get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

/**
 * @swagger
 * /restaurant/{id}:
 *   get:
 *     summary: Get a menu by the restaurant's id
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Menu fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menu:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       id: "item1"
 *                       name: "Pepperoni Pizza"
 *                       price: 12.99
 *       400:
 *         description: No restaurant ID provided
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
app.get('/restaurant/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'No restaurant ID provided.' });
  }

  try {
    const restaurantRef = db.collection('restaurants').doc(id);
    const restaurantSnap = await restaurantRef.get();

    if (!restaurantSnap.exists) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    const restaurantData = { id: restaurantSnap.id, ...restaurantSnap.data() };

    const menuSnapshot = await restaurantRef.collection('menu').get();
    const menuItems = menuSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ restaurant: restaurantData, menu: menuItems });
  } catch (error) {
    console.error('Error fetching restaurant or menu:', error);
    res.status(500).json({ error: 'Failed to load restaurant or menu data.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
