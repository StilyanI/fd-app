const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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
