import userModel from "../models/userModel.js"

// Função para adicionar ao carrinho
//10:00
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        //dados do usuario = userId
        const userData = await userModel.findById(userId);
        //dados so carrinho repassando dados so usuario + dasdos do carrinho
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            //dados do carrinho menor ou igual a 1 
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                //o valor será 1
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        //pegar dados do carrinho e inserir no cartDatado suario que estiver logado userId
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Adicionado ao carrinho" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Função para atualizar o carrinho
//10:00
const updateCart = async (req, res) => {
    //10:16
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        //repassando na requisição id do usuario e dados do carrinho
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        //pegar dados do carrinho e inserir no cartData do uario que estiver logado userId
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Carrinho atualizado" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Função para obter o carrinho do usuário
//10:00
const getUserCart = async (req, res) => {
    //10:18
    try {
        const { userId } = req.body;
        //userData está pegando o ID userId
        const userData = await userModel.findById(userId);
        //cartData está repassando os dados do carrinho
        let cartData = await userData.cartData;

        // Aqui, alteramos 'response.json' para 'res.json' para corrigir o erro
        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart };
