//5:21
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Isso carrega automaticamente as variáveis do .env
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; // Importa a função corretamente
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Configuração do app
const app = express();
const port = process.env.PORT || 4000;

// Conectar ao MongoDB
connectDB();

// Conectar ao Cloudinary (agora chamando a função corretamente)
connectCloudinary(); // Chama a função após a importação

// Middlewares
app.use(express.json());
app.use(cors());

// Endpoints da API
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
//10:04
app.use('/api/cart', cartRouter)
//10:49
app.use('/api/order', orderRouter)

//em '/ ele está pegando a raiz dos ervidor '
app.get('/', (req, res) => {
    res.send("API Working");
});

// Iniciar o servidor
//5:21
app.listen(port, () => console.log('Server started on PORT : ' + port));