const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


let authmiddleware = (req,res,next)=>{
     const token = req.cookies.token; 
     
  if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        req.user = decoded; // add user data to req
        next(); // continue to next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    };
}

module.exports = authmiddleware
