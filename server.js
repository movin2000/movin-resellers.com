// server.js
// Minimal Express API for MovinResellers prototype
// Run: npm init -y
// npm i express cors body-parser jsonwebtoken bcryptjs

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'movin-secret-key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'supersecret'; // change in prod

app.use(cors());
app.use(bodyParser.json());

// --- In-memory seed data (mirror of your frontend mockup) ---
let products = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', price: 740000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06a244?w=800&q=80', rating: 4.7, isNew: true, stockStatus: 'inStock', description: 'Experience unparalleled audio quality with active noise cancellation and a comfortable, ergonomic design.' },
  { id: 2, name: 'Vintage Leather Backpack', price: 295000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1550009159-d8e7c1f8c1f0?w=800&q=80', rating: 4.5, isNew: false, stockStatus: 'lowStock', description: 'A stylish, durable leather backpack perfect for daily commute or weekend travel.' },
  { id: 3, name: 'Smart Home Hub 3.0', price: 1100000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1594411130386-be67b5e40632?w=800&q=80', rating: 4.9, isNew: true, stockStatus: 'inStock', description: 'The central brain for your smart home devices, offering seamless integration and voice control.' },
  { id: 4, name: 'Minimalist Wooden Desk Lamp', price: 170000, category: 'Home Goods', image: 'https://images.unsplash.com/photo-1543884802-1bc8187803a6?w=800&q=80', rating: 4.2, isNew: false, stockStatus: 'inStock', description: 'A sleek, modern desk lamp with an adjustable wooden arm and soft LED lighting.' },
  { id: 5, name: 'Cotton Crew Neck T-Shirt', price: 92000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1521572175240-5e60802c347b?w=800&q=80', rating: 5.0, isNew: true, stockStatus: 'inStock', description: 'A classic, comfortable cotton tee in a variety of colors.' },
  { id: 6, name: 'Classic Analog Watch', price: 445000, category: 'Fashion', image: 'https://images.unsplash.com/photo-1533139502638-269665979dcd?w=800&q=80', rating: 4.6, isNew: false, stockStatus: 'lowStock', description: 'Timeless design with a stainless steel case and genuine leather strap.' },
  { id: 7, name: 'Ergonomic Office Chair', price: 1650000, category: 'Home Goods', image: 'https://images.unsplash.com/photo-1567538096236-fd6d8d742667?w=800&q=80', rating: 4.8, isNew: false, stockStatus: 'inStock', description: 'Fully adjustable chair providing superior lumbar support for long hours.' },
  { id: 8, name: 'High-Speed USB-C Drive', price: 135000, category: 'Electronics', image: 'https://images.unsplash.com/photo-1621091218151-248792078652?w=800&q=80', rating: 4.0, isNew: true, stockStatus: 'soldOut', description: 'Compact and fast storage solution with USB-C connectivity.' }
];

let users = [
  { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'Customer', memberSince: 'Jan 15, 2023' },
  { id: 2, name: 'Admin User', email: 'admin@movin.com', role: 'Admin', memberSince: 'Mar 1, 2024' },
  { id: 3, name: 'Alex Turyahabwe', email: 'alex@movin.com', role: 'Collaborator', memberSince: 'Apr 5, 2024' }
];

let orders = [
  { id: 'ORD-54321', date: 'Oct 1, 2024', total: 795000, status: 'Delivered', items: [ { productId:1, qty:1 } ] },
  { id: 'ORD-98765', date: 'Sep 20, 2024', total: 327000, status: 'Shipped', items: [ { productId:2, qty:1 } ] }
];

// --- Helper ---
const nextId = (arr) => arr.reduce((m,x)=>Math.max(m, x.id || 0), 0) + 1;

// --- Public API (storefront) ---
// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === Number(req.params.id));
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// GET users (admins or limited info)
app.get('/api/users', (req, res) => {
  // In real app, restrict fields. Here we return all for admin convenience.
  res.json(users);
});

// GET orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// --- Admin endpoints (require JWT) ---
function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin: update product
app.put('/api/admin/products/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const update = req.body;
  products[idx] = { ...products[idx], ...update, id };
  res.json(products[idx]);
});

// Admin: create product
app.post('/api/admin/products', authMiddleware, (req, res) => {
  const newProduct = { ...req.body, id: nextId(products) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Admin: delete product
app.delete('/api/admin/products/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = products.splice(idx,1)[0];
  res.json({ success:true, removed });
});

// Admin: get stats (simple)
app.get('/api/admin/metrics', authMiddleware, (req,res) => {
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const revenue = orders.reduce((s,o)=>s+(o.total||0),0);
  res.json({ totalProducts, totalUsers, totalOrders, revenue });
});

// Admin login (returns JWT)
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Missing password' });

  // Simple check (replace with real auth)
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ role: 'admin', user: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// serve static (optional) - if you want to serve admin/index from same server
app.use('/', express.static('public')); // optional: put index.html/admin.html in ./public

app.listen(PORT, () => {
  console.log(`MovinResellers API listening on http://localhost:${PORT}`);
});
