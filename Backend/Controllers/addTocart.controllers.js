const addToCartModel = require("../Models/addToCart.model");
const Product = require("../Models/products.model");
const User = require("../Models/user.model");
const { getIo } = require("../socket");

const addNewCart = async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  console.log(quantity, size, color);
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
  const { id } = req.userInfo;
  const userId = id;
  const isUser = await User.findById(userId);
  try {
    if (!isUser) {
      return res.status(404).send({ message: "User is not found!" });
    }
    const cartProducts = await addToCartModel.find({ userId });
    if (!cartProducts) {
      return res.status(404).send({ message: "You have no cart!" });
    }
    const productIds = cartProducts.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const addingQuantityWithProduct = products.map((product) => {
    const machingProductId = cartProducts.find(
        (item) => item.productId.toString() === product._id.toString()
      );
      if (machingProductId) {
        return {
          ...product.toObject(),
          quantity: machingProductId.quantity,
        };
      }
      return product;
    });
    return res.status(200).send({
      carts: addingQuantityWithProduct,
    });
  } catch (error) {
    return res.status(500).send({ message: "somthing broke!" });
  }
};

const getTotalCart = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const cartItems = await addToCartModel.find({ userId });

    res.status(200).send({ count: cartItems.length });
  } catch (error) {
    res.status(500).json({ message: "something broke!" });
  }
};

const removeCartItem = async (req, res) => {
  const { productId } = req.params;
  const { id } = req.userInfo;
  const userId = id;
  const io = getIo();
  try {
    const isCartExist = await addToCartModel.deleteOne({
      $and: [{ userId }, { productId }],
    });
    if (!isCartExist) {
      return res.status(404).send({ message: "Cart is not found!" });
    }
    const totalCart = await addToCartModel.find({ userId });
    io.emit("carts", totalCart.length);
    res.status(200).send({
      message: "Cart is deleted",
      carts: totalCart,
    });
  } catch (error) {
    res.status(500).send({ message: "somthing broke!" });
  }
};

module.exports = {
  addNewCart,
  getUserCarts,
  removeCartItem,
  getTotalCart,
};
