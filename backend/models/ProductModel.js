import mongoose from "mongoose";  // Corrigido para importar 'model'
//5:39
//criando estrutura de produto podem ser adicionados mais campos
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
});

// Verifica se o modelo já foi definido em mongoose.models, caso contrário, cria o modelo
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
