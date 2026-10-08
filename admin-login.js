const { createSession, setSessionCookie } = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const username = String(body.username || '').trim();
    const password = String(body.password || '');
    const expectedUser = process.env.ADMIN_USER || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'frenchy123';

    if (username !== expectedUser || password !== expectedPass) {
      return res.status(401).json({ error: 'Wrong username or password.' });
    }

    setSessionCookie(req, res, createSession(username));
    return res.status(200).json({ ok: true, user: username });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Login failed.' });
  }
};
