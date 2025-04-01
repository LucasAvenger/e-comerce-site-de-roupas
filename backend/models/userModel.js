import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //colocando um email por conta =unique:true
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //dados de compra serão gerados por cada conta por default 
    //depois os dados seão inseridos quando o usuario selecionar os itens
    cartData: { type: Object, default: {} }
}, { minimize: false })


const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel