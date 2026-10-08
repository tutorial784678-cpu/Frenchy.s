const { verifySession } = require('../lib/auth');

const DEFAULT_PRODUCTS = [
  {
    "id": "classic-frenchy-burger",
    "name": "Classic Frenchy Burger",
    "desc": "Flame-grilled beef, melted cheese, crisp lettuce & our secret Frenchy sauce.",
    "price": 5.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "burgers",
    "img": "",
    "sku": "FR-BUR-01",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "double-cheese-smash",
    "name": "Double Cheese Smash",
    "desc": "Two smashed beef patties, double cheddar, pickles & smoky mayo.",
    "price": 7.99,
    "oldPrice": 8.99,
    "discount": 11,
    "category": "burgers",
    "img": "",
    "sku": "FR-BUR-02",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "smokehouse-bacon-burger",
    "name": "Smokehouse Bacon Burger",
    "desc": "Beef patty, crispy bacon, onion rings & a smoky BBQ glaze on a toasted bun.",
    "price": 8.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "burgers",
    "img": "",
    "sku": "FR-BUR-03",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "crispy-chicken-burger",
    "name": "Crispy Chicken Burger",
    "desc": "Golden fried chicken fillet, crunchy slaw & creamy mayo.",
    "price": 6.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "chicken",
    "img": "",
    "sku": "FR-CHK-01",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "nashville-hot-chicken",
    "name": "Nashville Hot Chicken",
    "desc": "Fiery glazed crispy chicken, pickles & cooling ranch.",
    "price": 7.29,
    "oldPrice": 8.29,
    "discount": 12,
    "category": "chicken",
    "img": "",
    "sku": "FR-CHK-02",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "chicken-tenders-5-pc",
    "name": "Chicken Tenders (5 pc)",
    "desc": "Hand-breaded tenders with your choice of dip.",
    "price": 5.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "chicken",
    "img": "",
    "sku": "FR-CHK-03",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "golden-french-fries",
    "name": "Golden French Fries",
    "desc": "Crisp, golden and lightly salted — the classic side.",
    "price": 2.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "fries-sides",
    "img": "",
    "sku": "FR-SID-01",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "loaded-cheese-fries",
    "name": "Loaded Cheese Fries",
    "desc": "Golden fries smothered in cheddar sauce & crispy onions.",
    "price": 3.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "fries-sides",
    "img": "",
    "sku": "FR-SID-02",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "cheesy-nuggets-8-pc",
    "name": "Cheesy Nuggets (8 pc)",
    "desc": "Molten cheese bites with a crunchy golden coating.",
    "price": 4.29,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "fries-sides",
    "img": "",
    "sku": "FR-SID-03",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "grilled-chicken-wrap",
    "name": "Grilled Chicken Wrap",
    "desc": "Grilled chicken, crisp salad & garlic yogurt in a soft tortilla.",
    "price": 6.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "wraps",
    "img": "",
    "sku": "FR-WRP-01",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "crispy-veggie-wrap",
    "name": "Crispy Veggie Wrap",
    "desc": "Crumbed veggie patty, avocado & tangy slaw.",
    "price": 5.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "wraps",
    "img": "",
    "sku": "FR-WRP-02",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "chocolate-shake",
    "name": "Chocolate Shake",
    "desc": "Thick, creamy shake blended with real cocoa.",
    "price": 3.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "drinks",
    "img": "",
    "sku": "FR-DRK-01",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "strawberry-shake",
    "name": "Strawberry Shake",
    "desc": "Classic strawberry shake topped with cream.",
    "price": 3.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "drinks",
    "img": "",
    "sku": "FR-DRK-02",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "sparkling-lemonade",
    "name": "Sparkling Lemonade",
    "desc": "Fresh-squeezed lemonade over crushed ice.",
    "price": 2.29,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "drinks",
    "img": "",
    "sku": "FR-DRK-03",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "iced-cola",
    "name": "Iced Cola",
    "desc": "Ice-cold cola with a guaranteed fizz.",
    "price": 1.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "drinks",
    "img": "",
    "sku": "FR-DRK-04",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "churros-bites",
    "name": "Churros Bites",
    "desc": "Cinnamon-dusted churros with a warm chocolate dip.",
    "price": 3.29,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "desserts",
    "img": "",
    "sku": "FR-DSR-01",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "vanilla-sundae",
    "name": "Vanilla Sundae",
    "desc": "Creamy soft-serve with caramel drizzle & crunchy topping.",
    "price": 2.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "desserts",
    "img": "",
    "sku": "FR-DSR-02",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "junior-cheeseburger-box",
    "name": "Junior Cheeseburger Box",
    "desc": "Mini burger, small fries & juice — made for little foodies.",
    "price": 4.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "kids-meals",
    "img": "",
    "sku": "FR-KID-01",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "tenders-juice-box",
    "name": "Tenders & Juice Box",
    "desc": "Two mini tenders, fries & an apple juice.",
    "price": 5.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "kids-meals",
    "img": "",
    "sku": "FR-KID-02",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "frenchy-zinger-burger",
    "name": "Frenchy Zinger Burger",
    "desc": "Crispy spicy chicken, lettuce, cheese & signature Frenchy sauce on a toasted bun.",
    "price": 6.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "chicken",
    "img": "assets/zinger-burger.png",
    "sku": "FR-CHK-03",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "loaded-frenchy-fries",
    "name": "Loaded Frenchy Fries",
    "desc": "Golden fries loaded with cheese sauce, crispy chicken bits & smoky Frenchy drizzle.",
    "price": 4.99,
    "oldPrice": 5.49,
    "discount": 9,
    "category": "fries-sides",
    "img": "assets/loaded-fries.png",
    "sku": "FR-FRY-05",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "smoky-chicken-wrap",
    "name": "Smoky Chicken Wrap",
    "desc": "Grilled chicken, crunchy slaw, pickles & smoky mayo wrapped fresh to order.",
    "price": 5.99,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "wraps",
    "img": "assets/chicken-stall.png",
    "sku": "FR-WRP-03",
    "available": true,
    "featured": false,
    "visible": true
  },
  {
    "id": "oreo-crunch-shake",
    "name": "Oreo Crunch Shake",
    "desc": "Creamy vanilla shake blended with chocolate cookies and topped with whipped cream.",
    "price": 4.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "drinks",
    "img": "",
    "sku": "FR-DRK-05",
    "available": true,
    "featured": true,
    "visible": true
  },
  {
    "id": "crispy-wings-6-pc",
    "name": "Crispy Wings (6 pc)",
    "desc": "Six crunchy chicken wings tossed in your choice of spicy or smoky glaze.",
    "price": 6.49,
    "oldPrice": 0.0,
    "discount": 0,
    "category": "chicken",
    "img": "",
    "sku": "FR-CHK-04",
    "available": true,
    "featured": false,
    "visible": true
  }
];

const TABLE = 'site_store';
const KEY = 'products';

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
  return { url: url.replace(/\/$/, ''), key };
}

async function supa(path, init={}) {
  const { url, key } = supabaseConfig();
  const headers = Object.assign({
    apikey: key,
    Authorization: 'Bearer ' + key,
    'Content-Type': 'application/json'
  }, init.headers || {});
  const r = await fetch(url + '/rest/v1/' + path, Object.assign({} , init, { headers }));
  const text = await r.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (_) { data = text; }
  if (!r.ok) throw new Error((data && (data.message || data.error || data.hint)) || ('Database request failed: ' + r.status));
  return data;
}

async function getProducts() {
  const rows = await supa(`${TABLE}?select=value&key=eq.${encodeURIComponent(KEY)}&limit=1`, { method:'GET' });
  if (Array.isArray(rows) && rows[0] && Array.isArray(rows[0].value)) return rows[0].value;
  await supa(TABLE, {
    method:'POST',
    headers:{'Prefer':'return=minimal'},
    body:JSON.stringify({key:KEY,value:DEFAULT_PRODUCTS,updated_at:new Date().toISOString()})
  });
  return DEFAULT_PRODUCTS;
}

async function saveProducts(products) {
  await supa(`${TABLE}?on_conflict=key`, {
    method:'POST',
    headers:{'Prefer':'resolution=merge-duplicates,return=minimal'},
    body:JSON.stringify({key:KEY,value:products,updated_at:new Date().toISOString()})
  });
  return products;
}

function normalizeProducts(input) {
  if (!Array.isArray(input)) throw new Error('products must be an array.');
  if (input.length > 100) throw new Error('Maximum 100 products allowed.');
  return input.map((p, i) => {
    if (!p || typeof p !== 'object') throw new Error('Invalid product at index ' + i + '.');
    const price = Number(p.price);
    if (!Number.isFinite(price) || price <= 0) throw new Error('Invalid price for product ' + i + '.');
    return Object.assign({}, p, {
      id: String(p.id || 'product-' + i),
      name: String(p.name || 'Product ' + (i + 1)).slice(0, 160),
      desc: String(p.desc || '').slice(0, 1000),
      price: Math.round(price * 100) / 100,
      oldPrice: Math.max(0, Number(p.oldPrice) || 0),
      discount: Math.max(0, Math.min(100, Number(p.discount) || 0)),
      category: String(p.category || 'specials'),
      sku: String(p.sku || ''),
      img: String(p.img || ''),
      available: p.available !== false,
      visible: p.visible !== false,
      featured: p.featured === true
    });
  });
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const products = await getProducts();
      return res.status(200).json({ products, persistent: true });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const user = verifySession(req);
      if (!user) return res.status(401).json({ error:'Admin login required.' });
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const products = normalizeProducts(body.products);
      await saveProducts(products);
      return res.status(200).json({ products, persistent: true, savedBy:user });
    }

    res.setHeader('Allow','GET, PUT, POST');
    return res.status(405).json({ error:'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error.' });
  }
};
