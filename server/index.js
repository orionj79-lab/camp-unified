require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { db, initDB } = require('./db');
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'mindhub-secret-key-2026';

// Middleware
app.use(morgan('dev'));

// STRIPE WEBHOOK (Manejar ANTES del express.json() para conservar el body raw)
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details.email;
    const customerName = session.customer_details.name || 'Alumno Nuevo';

    console.log(`💰 Pago exitoso detectado para: ${email}`);

    try {
      // 1. Verificar si el usuario ya existe
      let user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

      if (!user) {
        // 2. Si no existe, crearlo con password temporal
        const tempPass = 'mindhub2026';
        const result = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)')
                        .run(customerName, email, tempPass, 'student');
        user = { id: result.lastInsertRowid };
        console.log(`👤 Usuario creado automáticamente: ${email}`);
      }

      // 3. Crear inscripción al Diplomado (ID: 1)
      const enrollmentExists = db.prepare('SELECT id FROM enrollments WHERE user_id = ? AND product_id = 1').get(user.id);
      
      if (!enrollmentExists) {
        db.prepare('INSERT INTO enrollments (user_id, product_id, status) VALUES (?, 1, "active")').run(user.id);
        console.log(`🎓 Diplomado activado para: ${email}`);
        
        // Simular envío de Email
        const logMsg = `[${new Date().toISOString()}] EMAIL SENT TO: ${email} | MSG: ¡Binvenido al Diplomado! Tu cuenta ha sido activada.\n`;
        fs.appendFileSync(path.join(__dirname, 'notifications.log'), logMsg);
      } else {
        console.log(`ℹ️ Usuario ${email} ya estaba inscrito.`);
      }

    } catch (err) {
      console.error(`❌ Error al procesar datos de pago: ${err.message}`);
    }
  }

  res.json({ received: true });
});

// 0. Verify Session (Para el frontend post-pago)
app.get('/api/checkout/verify', async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      res.json({ success: true, email: session.customer_details.email });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.json());
app.use(cors());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);

  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

// 2. Content: Get Course (Diplomado)
app.get('/api/content/:productId', (req, res) => {
  const { productId } = req.params;
  const content = db.prepare('SELECT * FROM contents WHERE product_id = ? ORDER BY order_index ASC').all(productId);
  
  const formattedContent = content.map(c => ({
    ...c,
    lessons: JSON.parse(c.lessons)
  }));

  res.json(formattedContent);
});

// 3. User: Get Profile & Enrollments
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(req.user.id);
  const enrollments = db.prepare('SELECT p.* FROM products p JOIN enrollments e ON p.id = e.product_id WHERE e.user_id = ?').all(req.user.id);
  
  res.json({ user, enrollments });
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 MindHub Server running on http://localhost:${PORT}`);
});
