const constants = require('../constants');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado', status: 500  });
    }
    
    jwt.verify(token, constants.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ mensaje: 'token no es válido', status: 500 });
        }
        if(Date.now() > user.exp){
            return res.status(401).json({ mensaje: 'token expired', status: 500 })
        }
        req.user = user;
        next();
    });
};


module.exports = { authenticateJWT };
