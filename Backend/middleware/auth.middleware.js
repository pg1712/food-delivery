import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "not authorized login again",
        });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.UserId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
};
export default auth;
