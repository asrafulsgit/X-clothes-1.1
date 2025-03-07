const User = require("../Models/user.model");
const Product = require("../Models/products.model");
const Favourite = require("../Models/addToFavourite.model");
const { getIo } = require("../socket");

const addToFavourite = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userInfo.id;
  const io = getIo();
  try {
    const userExist = await User.findById(userId);
    const productExist = await Product.findById(productId);
    const fovouriteExist = await Favourite.findOne({
      $and: [{ userId }, { productId }],
    });
    if (!userExist) {
      return res.status(404).send({ message: "User is not valid!" });
    }
    if (!productExist) {
      return res.status(404).send({ message: "Product is not found!" });
    }
    if (fovouriteExist) {
      return res.status(404).send({ message: "Product is added!" });
    }

    const addToFavourite = new Favourite({
      userId,
      productId,
    });

    await addToFavourite.save();
    const totalFavourite = await Favourite.countDocuments({ userId });
    io.emit("favourites", totalFavourite);

    res.status(201).send({
      message: "Product is added on favourite",
      product: addToFavourite,
    });
  } catch (error) {
    return res.status(500).send({ message: "somthing broke!" });
  }
};

const getFavouriteProducts = async (req, res) => {
  const userId = req.userInfo.id;
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
     return res.status(404).send({ message: "User is not valid!" });
    }

    const favouriteProducts = await Favourite.find({ userId }).populate('productId', 'title images stock price');
    
    if (!favouriteProducts) {
      return res.status(404).send({ message: "Favourite is empty!" });
    }

    return res.status(201).send({
      products: favouriteProducts,
    });
  } catch (error) {
    res.status(500).send({ message: "somthing broke!" });
  }
};

const removeFavouriteItem = async (req, res) => {
  const { productId } = req.params; 
  const userId = req.userInfo?.id; 

  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }
  const io = getIo();

  try {
    const productExist = await Product.findById(productId);
    if (!productExist) {
      return res.status(404).send({ message: "Product is not found in store!" });
    }

    const isFavouriteExist = await Favourite.deleteOne({ userId, productId });

    if (isFavouriteExist.deletedCount === 0) {
      return res.status(404).send({ message: "Product is not found in favorite!" });
    }

    const totalFavourite = await Favourite.countDocuments({ userId });
    io.emit("favourites", totalFavourite);

    res.status(200).send({
      message: "Favourite item is deleted",
      product: productExist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something broke!" });
  }
};

const getTotalfavorite = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const favoriteItems = await Favourite.find({ userId });

    res.status(200).send({ count: favoriteItems.length });
  } catch (error) {
    res.status(500).json({ message: "something broke!" });
  }
};

const isFavouriteWithHover = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const isFavouriteExist = await Favourite.findOne({
      $and: [{ userId }, { productId }],
    });
    if (!isFavouriteExist) {
      res.status(404).send({
        message: "Product is not found!",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "Favourite item is found",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "somthing broke!" });
  }
};

module.exports = {
  addToFavourite,
  getFavouriteProducts,
  removeFavouriteItem,
  isFavouriteWithHover,
  getTotalfavorite,
};
