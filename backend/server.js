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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
