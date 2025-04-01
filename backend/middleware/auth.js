import jwt from 'jsonwebtoken'
//10:05 ao manipular os produtos enviar requisitar ou deletar 
//será passado o token do usuario na rota de autrentificação / userId
//se o usuario não existir não será possivel manipular os produtos
const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Login Não autorizado de novo" })
    }
    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser