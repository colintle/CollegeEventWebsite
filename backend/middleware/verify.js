const jwt = require('jsonwebtoken')

const verify = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if (token)
        {
            decodedData = jwt.verify(token, 'secret');
            req.userID = decodedData?.userID;
        }
        next();
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = verify