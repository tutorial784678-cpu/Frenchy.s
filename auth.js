const crypto = require('crypto');

function b64url(buf) {
  return Buffer.from(buf).toString('base64url');
}

function sign(value) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured.');
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(a, b) {
  try {
    const aa = Buffer.from(a);
    const bb = Buffer.from(b);
    return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
  } catch (_) {
    return false;
  }
}

function createSession(username) {
  const payload = b64url(JSON.stringify({
    u: username,
    exp: Date.now() + 8 * 60 * 60 * 1000
  }));
  return payload + '.' + sign(payload);
}

function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    const key = part.slice(0, i).trim();
    if (key === name) return decodeURIComponent(part.slice(i + 1));
  }
  return null;
}

function verifySession(req) {
  const token = getCookie(req, 'fy_admin');
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot < 1) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!safeEqual(signature, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data?.u || !data?.exp || data.exp < Date.now()) return null;
    return data.u;
  } catch (_) {
    return null;
  }
}

function setSessionCookie(req, res, token) {
  const proto = String(req.headers['x-forwarded-proto'] || 'http');
  const secure = proto === 'https';
  const cookie = [
    'fy_admin=' + encodeURIComponent(token),
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=28800',
    secure ? 'Secure' : ''
  ].filter(Boolean).join('; ');
  res.setHeader('Set-Cookie', cookie);
}

module.exports = { createSession, verifySession, setSessionCookie };
