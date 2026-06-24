const jwt = require('jsonwebtoken');

exports.checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: 'Token is required',
            });
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'Abcde@12345'
        );

        const userData = await user.findOne({ where: { id: decoded.id } });
        if (!userData || userData.version !== decoded.version) {
            return res.status(401).json({
                message: 'Invalid or expired token',
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token',
        });
    }
};