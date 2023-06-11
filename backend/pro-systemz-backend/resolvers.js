const Product = require("./models/Product.model");
const ProductType = require("./models/ProductType.model");
const Cart = require("./models/Cart.model");

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
      const { productName, productType, productShortDescription, price } =
        input;

      const newProduct = new Product({
        productName,
        productType,
        productShortDescription,
        price,
      });

      await newProduct.save().then((newProduct) => {
        return newProduct.populate("productType");
      });

      return newProduct;
    },
    createCart: async (_, { productId }) => {
      const newCart = await Cart.create({ products: [productId] });
      return newCart;
    },
    addProductToCart: async (_, { cartId, productId }) => {
      const cart = await Cart.findById(cartId).populate({
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
  },
};

module.exports = resolvers;
