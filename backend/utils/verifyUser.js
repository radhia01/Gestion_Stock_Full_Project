const jwt = require('jsonwebtoken');

// Middleware pour vérifier l'utilisateur via un token JWT
const verifyUser = async (req, res, next) => {
  
  const token = req.cookies.accessToken; // Utilise req.cookies pour accéder au cookie
    console.log(token)
  // Vérifie si le token est présent
  if (!token) {
    return res.status(401).json({ code: "unauthorized" });
  }

  // Vérifie et décode le token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Assure-toi que la clé secrète est correctement nommée
    if (err) {
      return res.status(401).json({ code: "unauthorized" });
    }
    // Ajoute les informations décodées du token à l'objet request
    req.user = decoded;
    // Passe au prochain middleware ou route
    next();
  });
};

module.exports = verifyUser;
