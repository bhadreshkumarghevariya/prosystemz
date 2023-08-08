const jwt = require("jsonwebtoken");
const Product = require("./models/Product.model");
const ProductType = require("./models/ProductType.model");
const Cart = require("./models/Cart.model");
const User = require("./models/User.model");
const UserType = require("./models/UserType.Model");
const ShoppingCart = require("./models/ShoppingCart.model");
const Checkout = require("./models/Checkout.model");
// const Address = require("./models/Address.model");
const Order = require("./models/Order.model");
const Payment = require("./models/Payment.model");

const bcrypt = require("bcrypt");

const { generateToken } = require("./utils/authUtils");

const resolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find()
        .populate("checkout")
        .populate("payment")
        .populate("user");
    },

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
    getCart: async (_, { userId }) => {
      if (!userId) {
        throw new Error("You are not authenticated!");
      }
      const cart = await Cart.findOne({
        user: userId,
        isAddedtoShoppingCart: false,
      }).populate({
        path: "products",
        populate: {
          path: "productType",
        },
      });
      return cart;
    },

    getUserDetails: async (parent, args, context) => {
      const req = context.req;
      const token = context.token;
      if (!token) {
        throw new Error("You are not authenticated!");
      } else {
        const decodedToken = jwt.verify(token, "your-secret-key");

        const userId = decodedToken.userId;
        const user = await User.findById(userId).populate("userType");

        return user;
      }
    },
    getAllUsers: async () => {
      return await User.find().populate("userType");
    },
    getUser: async (_, { id }) => {
      return await User.findById(id).populate("userType");
    },
    getAllUserTypes: async () => {
      return await UserType.find();
    },
    getAllCartsForUser: async (_, { userId }) => {
      const carts = await Cart.find({ user: userId }).populate({
        path: "products",
        populate: {
          path: "productType",
        },
      });

      return carts;
    },
    getShoppingCart: async (_, { id, userId, status }) => {
      if (!userId) {
        throw new Error("You are not authenticated!");
      }
      const shoppingCart = await ShoppingCart.findOne({
        _id: id,
        user: userId,
        status: status,
      })
        .populate({
          path: "products",
          populate: {
            path: "productType",
          },
        })
        .populate({
          path: "carts",
          populate: {
            path: "products",
            populate: {
              path: "productType",
            },
          },
        });

      return shoppingCart;
    },
    getShoppingCartByUserId: async (_, { userId }) => {
      if (!userId) {
        throw new Error("You are not authenticated!");
      }
      const shoppingCart = await ShoppingCart.findOne({
        user: userId,
        status: "Active",
      })
        .populate({
          path: "products",
          populate: {
            path: "productType",
          },
        })
        .populate({
          path: "carts",
          populate: {
            path: "products",
            populate: {
              path: "productType",
            },
          },
        });

      return shoppingCart;
    },

    //implementation of getCartNotAddedToShoppingCart(id: ID, userId: ID): Cart
    getCartNotAddedToShoppingCart: async (_, { id, userId }) => {
      if (!userId) {
        throw new Error("You are not authenticated!");
      }
      const cart = await Cart.findOne({
        _id: id,
        user: userId,
        isAddedtoShoppingCart: false,
      }).populate({
        path: "products",
        populate: {
          path: "productType",
        },
      });
      return cart;
    },
    getCartId: async (_, { userId }) => {
      const cart = await Cart.findOne({ user: userId });
      return cart.id;
    },
    getAllOrdersForUser: async (_, { userId }) => {
      const orders = await Order.find({ user: userId })
        .populate("checkout")
        .populate("payment")
        .populate("user");
      return orders;
    },
  },
  Mutation: {
    createUserType: async (_, { userTypeName }) => {
      const newUserType = new UserType({
        userTypeName,
      });
      await newUserType.save();
      return newUserType;
    },
    createProductType: async (parent, args, context, info) => {
      const { productTypeName } = args.productType;
      const { customFields } = args;
      const { imageURL } = args;

      const productType = new ProductType({
        productTypeName,
        customFields,
        imageURL,
      });

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
        productDetails,
      } = input;

      const newProduct = new Product({
        productName,
        productType,
        productShortDescription,
        price,
        imageURL,
        productDetails,
      });

      await newProduct.save().then((newProduct) => {
        return newProduct.populate("productType");
      });

      return newProduct;
    },
    createCart: async (_, { productId, userId }) => {
      const newCart = await Cart.create({
        products: [productId],
        user: userId,
      });

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
    /*
    implementation of
    #shopping cart mutations
    createShoppingCartWithCartId(cartId: ID, userId: ID): ID
    createShoppingCartWithProductId(productId: ID, userId: ID): ID
    addProductToShoppingCart(
      ShoppingCartId: ID
      productId: ID
      userId: ID
    ): [Product]
    */
    createShoppingCartWithCartId: async (_, { cartId, userId }) => {
      const newShoppingCart = await ShoppingCart.create({
        carts: [cartId],
        user: userId,
        isAddedtoShoppingCart: false,
      });
      //update cart to isAddedtoShoppingCart: true
      const cart = await Cart.findById(cartId);
      cart.isAddedtoShoppingCart = true;
      await cart.save();

      return newShoppingCart.id;
    },
    //addCartToShoppingCart(cartId: ID, userId: ID, shoppingCartId: ID): ID
    addCartToShoppingCart: async (_, { cartId, userId, shoppingCartId }) => {
      const shoppingCart = await ShoppingCart.findById(shoppingCartId);
      shoppingCart.carts.push(cartId);
      await shoppingCart.save();

      //update cart to isAddedtoShoppingCart: true
      const cart = await Cart.findById(cartId);

      cart.isAddedtoShoppingCart = true;
      await cart.save();

      return shoppingCart.id;
    },
    createShoppingCartWithProductId: async (_, { productId, userId }) => {
      const newShoppingCart = await ShoppingCart.create({
        products: [productId],
        user: userId,
      });

      return newShoppingCart.id;
    },
    addProductToShoppingCart: async (_, { ShoppingCartId, productId }) => {
      const shoppingCart = await ShoppingCart.findById(ShoppingCartId).populate(
        {
          path: "products",
          populate: {
            path: "productType",
          },
        }
      );

      const product = await Product.findById(productId).populate("productType");

      const existingProductIndex = shoppingCart.products.findIndex((p) =>
        p.productType.equals(product.productType)
      );

      if (existingProductIndex !== -1) {
        shoppingCart.products.splice(existingProductIndex, 1, product);
        await shoppingCart.save();
        return shoppingCart.products;
      } else {
        shoppingCart.products.push(product);
        await shoppingCart.save();
        return shoppingCart.products;
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

    signup: async (_, { username, email, password, userType }) => {
      if (!userType) {
        userType = "64ab068b98352732c475c3f3";
      }
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
        userType,
      });
      const savedUser = await newUser.save().then((newUser) => {
        return newUser.populate("userType");
      });

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

    createCheckout: async (_, { userId, address, shoppingCartId }) => {
      // Retrieve the User and ShoppingCart from the database
      const user = await User.findById(userId);
      const shoppingCart = await ShoppingCart.findById(shoppingCartId);

      // Check if user and shopping cart exist
      if (!user || !shoppingCart) {
        throw new Error("User or ShoppingCart not found");
      }

      // Create a new Checkout document
      const checkout = new Checkout({
        user: user._id,
        address: address,
        shoppingCart: shoppingCartId,
      });

      // Save the Checkout document to the database
      await checkout.save().then((checkout) => {
        return checkout;
      });

      // Return the Checkout document
      return checkout;
    },

    createPayment: async (_, { input }) => {
      // Retrieve the User from the database
      const user = await User.findById(input.userId);

      // Check if user exist
      if (!user) {
        throw new Error("User not found");
      }

      // Create a new Payment document
      const payment = new Payment({
        method: input.method,
        cardNumber: input.cardNumber,
        cardExpiry: input.cardExpiry,
        cardCVV: input.cardCVV,
        user: user._id,
      });

      // Save the Payment document to the database
      await payment.save();

      // Populate user field for returning the payment
      await payment.populate("user");

      // Return the Payment document
      return payment;
    },
    createOrder: async (_, { input }) => {
      const order = new Order({
        user: input.userId,
        checkout: input.checkoutId,
        orderStatus: input.orderStatus,
        orderDate: input.orderDate,
        payment: input.paymentId,
      });

      await order.save();

      return order;
    },

    updateOrderStatus: async (_, { id, orderStatus }) => {
      const order = await Order.findById(id);
      order.orderStatus = orderStatus;
      await order.save();
      return order;
    },
    //updateShoppingCartStatus(id: ID, status: String): ShoppingCart
    updateShoppingCartStatus: async (_, { id, status }) => {
      const shoppingCart = await ShoppingCart.findById(id);
      shoppingCart.status = status;
      await shoppingCart.save();
      return shoppingCart;
    },
  },
};

module.exports = resolvers;
