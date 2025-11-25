const jwt = require('jsonwebtoken');
const axios = require('axios');
const Role = require('../models/Role');

let publicKey = null;


async function loadPublicKey() {
  const { data } = await axios.get(process.env.UMS_PUBLIC_KEY_URL, { responseType: 'text' });
  publicKey = data;
}
loadPublicKey();

async function authenticate(req, res, next) {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing token' });
  const token = h.slice(7);

  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
      issuer: process.env.JWT_ISS,
      audience: process.env.JWT_AUD
    });

    // Look up role in IMS DB
    const roleDoc = await Role.findOne({ userId: decoded.sub });
    const role = roleDoc ? roleDoc.role : 'NORMAL';

    req.user = { id: decoded.sub, role, email: decoded.email };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

module.exports = { authenticate, authorize };



