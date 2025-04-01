import jwt from 'jsonwebtoken'
//7:15
const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            // pegando os tokens e comparando para a função admin
            return res.json({ seccess: false, message: "admin login Não autorizado" })
        } else {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
                return res.json({ success: false, message: "login de administrador não autorizado" })
            }
            next()
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}
export default adminAuth;