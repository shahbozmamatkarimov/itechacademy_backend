import { JWT } from '../utils/jwt.js';
import User from '../models/user.model.js';

export default async function authMiddleware(req, res, next) {
    let token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({
            error: 'Token not found '
        });
    }
    try {
        const { id } = JWT.VERIFY(token); // Assuming VERIFY returns an object with an 'id' property
        console.log(id);
        const user = await User.findByPk(id);
        if (user) {
            req.user = { ...req.user, id }; // Set the user's role in req.user
            next();
        } else {
            return res.status(401).json({
                error: 'Invalid token'
            });
        }
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }
}