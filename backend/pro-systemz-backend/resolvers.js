const ProductType = require("./models/ProductType.model");

const resolvers = {
  Query: {
    getProductType: async () => {
      const productTypes = await ProductType.find();
      return productTypes;
    },
  },
  Mutation: {
    createProductType: async (parent, args, context, info) => {
      const { productTypeName } = args.productType;
      const productType = new ProductType({ productTypeName });
      await productType.save();
      return productType;
    },
  },
};

module.exports = resolvers;
