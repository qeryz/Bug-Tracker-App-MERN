import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];  
        const isCustomAuth = token.length < 500; // If token length < 500, its ours. If > 500, its google's auth token

        let decodedData;

        if (token && isCustomAuth) { // If we are working with our token, do the following:
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }
        else {  // Else, if working with google's auth token, do the following:
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    }
    catch (error) {
        console.log(error);
    }
};

export default auth;