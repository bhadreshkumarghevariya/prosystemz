const Product = require("./models/Product.model");
const ProductType = require("./models/ProductType.model");

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

      // Create a new product object
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
  },
};

module.exports = resolvers;
