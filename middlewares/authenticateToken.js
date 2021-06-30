const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  
  try {
    const token = req.header('Authorization').split(' ')[1];
    console.log('Token', token);
    if(!token) return res.status(400).json({msg: 'Chưa có JWT'});
    jwt.verify(token, process.env.TOKEN_SECRET, (err,user) => {
        if(err) return res.status(400).json({msg: 'Token Sai hoặc hết hạn'});
        req.user = user;
        next();
    });
  } catch(err){
    return res.status(500).json({msg: 'Bị Lỗi JWT'});
  }

}

module.exports = authenticateToken;