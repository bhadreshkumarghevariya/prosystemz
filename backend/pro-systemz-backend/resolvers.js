const Product = require("./models/Product.model");
const ProductType = require("./models/ProductType.model");
const Cart = require("./models/Cart.model");
const User = require("./models/User.model");
const bcrypt = require("bcrypt");

const { generateToken } = require("./utils/authUtils");

const resolvers = {
  Query: {
    getProductType: async () => {
      const productTypes = await ProductType.find();
      return productTypes;
    },
    getAllProducts: async () => {
      return await Product.find().populate("productType");
    },
    getProduct: async (_, { id }) => {
      return await Product.findById(id).populate("productType");
    },
    getProductsByType: async (_, { productType }) => {
      return await Product.find({ productType }).populate("productType");
    },
    getCart: async (_, { id }) => {
      const cart = await Cart.findById(id).populate({
        path: "products",
        populate: {
          path: "productType",
        },
      });
      return cart.products;
    },
  },
  Mutation: {
    createProductType: async (parent, args, context, info) => {
      const { productTypeName } = args.productType;
      const productType = new ProductType({ productTypeName });
      await productType.save();
      return productType;
    },
    createProduct: async (_, { input }) => {
      const {
        productName,
        productType,
        productShortDescription,
        price,
        imageURL,
      } = input;

      const newProduct = new Product({
        productName,
        productType,
        productShortDescription,
        price,
        imageURL,
      });

      await newProduct.save().then((newProduct) => {
        return newProduct.populate("productType");
      });

      return newProduct;
    },
    createCart: async (_, { productId }) => {
      const newCart = await Cart.create({ products: [productId] });
      return newCart.id;
    },
    addProductToCart: async (_, { CartId, productId }) => {
      const cart = await Cart.findById(CartId).populate({
        path: "products",
        populate: {
          path: "productType",
        },
      });

      const product = await Product.findById(productId).populate("productType");

      const existingProductIndex = cart.products.findIndex((p) =>
        p.productType.equals(product.productType)
      );

      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1, product);
        await cart.save();
        return cart.products;
      } else {
        cart.products.push(product);
        await cart.save();
        return cart.products;
      }
    },
    findExitingProductFromCart: async (_, { cartId, productId }) => {
      const cart = await Cart.findById(cartId).populate({
        path: "products",
        populate: {
          path: "productType",
        },
      });

      const productToAdd = await Product.findById(productId).populate(
        "productType"
      );

      const existingProduct = cart.products.find(
        (product) =>
          product.productType.toString() === productToAdd.productType.toString()
      );

      return existingProduct;
    },

    signup: async (_, { username, email, password }) => {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with this email already exists.");
      }

      // Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      // Generate a token
      const token = generateToken(savedUser);

      return { token, user: savedUser };
    },
    login: async (_, { email, password }) => {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password.");
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid email or password.");
      }

      // Generate a token
      const token = generateToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
