const { default: mongoose } = require("mongoose");
const addToCartModel = require("../Models/addToCart.model");
const Product = require("../Models/products.model");
const User = require("../Models/user.model");
const { getIo } = require("../socket");

const addNewCart = async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  const userId = req.userInfo.id;
  const io = getIo();
  try {
    const isUserExist = await User.findById(userId);

    if (!isUserExist) {
      return res.status(404).send({ message: "User is not valid!" });
    }
    const isProductExist = await Product.findById(productId);
    if (!isProductExist || isProductExist.stock <= 0 || !isProductExist.stock) {
      return res.status(404).send({ message: "Product is not available" });
    }
    const isProductAdded = await addToCartModel.findOne({
      $and: [{ userId }, { productId }],
    });
    if (isProductAdded) {
      isProductAdded.quantity += 1;
      await isProductAdded.save();
      return res.status(200).send({ message: "Product is added" });
    }

    const newCart = new addToCartModel({
      userId,
      productId,
      quantity,
      size,
      color,
    });
    await newCart.save();
    const totalCart = await addToCartModel.find({ userId });
    io.emit("carts", totalCart.length);
    return res.status(200).send({ newCart });
  } catch (error) {
    return res.status(500).send({ message: "somthing broke!" });
  }
};

const getUserCarts = async (req, res) => {
  const userId = req.userInfo.id;
  
  try {
    const isUser = await User.findById(userId);
    if (!isUser) {
      return res.status(404).send({ message: "User not found!" });
    }
    

    let cartProducts = await addToCartModel.find({ userId }).populate('productId', 'title images price stock').lean();
    const outOfStockProducts = cartProducts.filter((item)=> item.productId.stock === 0)
    if(outOfStockProducts.length > 0){
      const productIdsToDelete = outOfStockProducts.map((item) => item.productId._id);
      await addToCartModel.deleteMany({ userId, productId: { $in: productIdsToDelete } });
      cartProducts = cartProducts.filter((item)=> item.productId.stock !== 0)
    }
    

    if (cartProducts.length === 0) {
      return res.status(200).send({ message: "Your cart is empty.", carts: [] });
    }

    return res.status(200).send({
      carts: cartProducts,
    });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};


const removeCartItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.userInfo.id;
  const io = getIo();

  try {
  
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid product ID or User ID" });
    }

    const objectProductId = new mongoose.Types.ObjectId(productId);
    const objectUserId = new mongoose.Types.ObjectId(userId);

    const isCartExist = await addToCartModel.deleteOne({
      userId: objectUserId,
      productId: objectProductId,
    });


    if (isCartExist.deletedCount === 0) {
      return res.status(404).send({ message: "Cart item not found!" });
    }

    const totalCart = await addToCartModel.find({ userId });

    io.emit("carts", totalCart.length);

    res.status(200).send({
      message: "Cart item deleted successfully",
      carts: totalCart,
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send({ message: "Something broke!" });
  }
};

const quantityChange =async(req,res)=>{
  const { productId } = req.params;
  const {quantity}= req.body;
  const userId = req.userInfo.id;
  try {
    if(quantity < 1){
      return res.status(400).send({ message: "Minimum Qunatity 1" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid product ID or User ID" });
    }

    const objectProductId = new mongoose.Types.ObjectId(productId);
    const objectUserId = new mongoose.Types.ObjectId(userId);

    const isCartExist = await addToCartModel.findOne({
      userId: objectUserId,
      productId: objectProductId,
    });
    if (isCartExist.deletedCount === 0) {
      return res.status(404).send({ message: "Cart item not found!" });
    }
    isCartExist.quantity = quantity;
    await isCartExist.save()

    res.status(200).send({
      message: "updated quantity",
      carts: isCartExist,
    });
  } catch (error) {
    console.error("Error update quantity cart item:", error);
    res.status(500).send({ message: "Something broke!" });
  }
}


const getTotalCart = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const cartItems = await addToCartModel.find({ userId });

    res.status(200).send({ count: cartItems.length });
  } catch (error) {
    res.status(500).json({ message: "something broke!" });
  }
};







module.exports = {
  addNewCart,
  getUserCarts,
  removeCartItem,
  getTotalCart,
  quantityChange
};
