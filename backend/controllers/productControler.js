import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import productModel from '../models/ProductModel.js';

// Carregar variáveis de ambiente
dotenv.config();

// Configurar o Cloudinary com as credenciais do .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// função para adicionar produto 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Repassando dados do produto
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };
        console.log(productData);

        const products = new productModel(productData);
        await products.save();

        res.json({ success: true, message: 'Produto adicionado' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//função para buscar lista de produtos no frontend
const listProducts = async (req, res) => {
    //6:58
    try {

        const products = await productModel.find({})
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }



}
//função para remover produtos

const removeProduct = async (req, res) => {
    //7:1
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "produto removido" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }


}

//função para informação unica de produto
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const products = await productModel.findById(productId)
        res.json({ success: true, products })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

export { listProducts, addProduct, removeProduct, singleProduct }