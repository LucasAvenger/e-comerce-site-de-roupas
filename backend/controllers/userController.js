import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


//rota para login de usuário
//5:51
const loginUser = async (req, res) => {
    //6:16
    try {
        //usuario não foi criado
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Usuario não existe" })

        }
        //comparando senha da tentativa de login com a do servidor
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
            //se as senhas não existitem  a mesagem credenciais inválidas irá aparecer
        }
        else {
            res.json({ success: false, message: 'credenciais inválidas' })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}
//5:51
//rota para registro de usuário
const registerUser = async (req, res) => {
    //5:59
    try {

        const { name, email, password } = req.body;
        //checando se o usuario existe ou não
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "Usuario já existe" })
        }
        //validando formato de email e senha forte
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "por favor insira um email válido" })

        }
        if (password.length < 8) {
            return res.json({ success: false, message: "por favor insira uma senha maior que 8 digitos" })

        }
        //embaralhando senha
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //pegando novo usuario = userModel
        // gerado nome email e password = hashedpassword
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

//rota para login de administrador
const adminLogin = async (req, res) => {
    //7:09
    try {
        const { email, password } = req.body;

        // Verificando se o email e a senha estão corretos
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Gerando o token com o email
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            // Enviando a resposta com o token
            res.json({ success: true, token });
        } else {
            // Resposta caso as credenciais estejam incorretas
            res.json({ success: false, message: "Credenciais de administrador inválidas" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { loginUser, registerUser, adminLogin }