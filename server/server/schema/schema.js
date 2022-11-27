const Product = require("../models/Product");
const Seller = require("../models/Seller");
const Buyer = require("../models/Buyer");
const Order = require("../models/Order");
const Review = require("../models/Review");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLFloat,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const BuyerType = new GraphQLObjectType({
  name: "Buyer",
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({ buyerId: parent.id });
      },
    },
    reviewsAdded:{ 
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ buyerId: parent.id });
      },
    }
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    buyer: {
      type: BuyerType,
      resolve(parent, args) {
        return Buyer.findById(parent.buyerId);
      },
    },
    product: {
      type: ProductType,
      resolve(parent, args) {
        return Product.findById(parent.productId);
      },
    },
    seller: {
      type: SellerType,
      resolve(parent, args) {
        return Seller.findById(parent.sellerId);
      },
    },
    phoneNumber: { type: GraphQLString },
    shippingAddress: { type: GraphQLString },
    shippingMethod: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    buyer: {
      type: BuyerType,
      resolve(parent, args) {
        return Buyer.findById(parent.buyerId);
      },
    },
    seller: {
      type: SellerType,
      resolve(parent, args) {
        return Seller.findById(parent.sellerId);
      },
    },
    rating: { type: GraphQLFloat },
    comment: { type: GraphQLString }, 
  }),
});

const SellerType = new GraphQLObjectType({
  name: "Seller",
  fields: () => ({
    id: { type: GraphQLID },
    image: { type: GraphQLString },
    businessName: { type: GraphQLString },
    businessDescription: { type: GraphQLString },
    webLink: { type: GraphQLString },
    socialMediaLink: { type: GraphQLString },
    businessEmail: { type: GraphQLFloat },
    phoneNumber: { type: GraphQLFloat },
    province: { type: GraphQLString },
    district: { type: GraphQLString },
    streetAddress: { type: GraphQLString },
    otherAddressDescription: { type: GraphQLString },
    legalDocument: { type: GraphQLString },
    applicationStatus: { type: GraphQLString },
    addedProducts: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ sellerId: parent.id });
      },
    },
    ordersReceived:{ 
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find({ sellerId: parent.id });
      },
    },
    reviewsReceived:{
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ sellerId: parent.id });
      },
    }
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    unit: { type: GraphQLString },
    quantity: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    seller: {
      type: SellerType,
      resolve(parent, args) {
        return Seller.findById(parent.sellerId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find();
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    sellers: {
      type: new GraphQLList(SellerType),
      resolve(parent, args) {
        return Seller.find();
      },
    },
    seller: {
      type: SellerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Seller.findById(args.id);
      },
    },
    buyer: { 
      type: BuyerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Buyer.findById(args.id);
      },
    }
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        image: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        category: {
          type: new GraphQLEnumType({
            name: "ProductCategory",
            values: {
              foodAndDrinks: { value: "Food and Drinks" },
              electronics: { value: "Electronics" },
              clothing: { value: "Clothing" },
              personalCare: { value: "Personal Care" },
              fitness: { value: "Fitness" },
            },
          }),
        },
        unit: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: new GraphQLNonNull(GraphQLFloat) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        sellerId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const product = new Product({
          image: args.image,
          name: args.name,
          description: args.description,
          category: args.category,
          unit: args.unit,
          quantity: args.quantity,
          price: args.price,
          sellerId: args.sellerId,
        });

        return product.save();
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Product.findByIdAndRemove(args.id);
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        category: {
          type: new GraphQLEnumType({
            name: "ProductCategoryUpdate",
            values: {
              foodAndDrinks: { value: "Food and Drinks" },
              electronics: { value: "Electronics" },
              clothing: { value: "Clothing" },
              personalCare: { value: "Personal Care" },
              fitness: { value: "Fitness" },
            },
          }),
        },
        unit: { type: GraphQLString },
        quantity: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        return Product.findByIdAndUpdate(
          args.id,
          {
            $set: {
              image: args.image,
              name: args.name,
              description: args.description,
              category: args.category,
              unit: args.unit,
              quantity: args.quantity,
              price: args.price,
            },
          },
          { new: true }
        );
      },
    },
    addSeller: {
      type: SellerType,
      args: {
        image: { type: new GraphQLNonNull(GraphQLString) },
        businessName: { type: new GraphQLNonNull(GraphQLString) },
        businessDescription: { type: new GraphQLNonNull(GraphQLString) },
        businessEmail: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        socialMediaLink: { type: new GraphQLNonNull(GraphQLString) },
        webLink: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        district: { type: new GraphQLNonNull(GraphQLString) },
        streetAddress: { type: new GraphQLNonNull(GraphQLString) },
        otherAddressDescription: { type: new GraphQLNonNull(GraphQLString) },
        legalDocument: { type: new GraphQLNonNull(GraphQLString) },
        applicationStatus: {
          type: new GraphQLEnumType({
            name: "SellerStatus",
            values: {
              approved: { value: "Approved" },
              rejected: { value: "Rejected" },
              pending: { value: "Pending" },
            },
          }),
          defaultValue: "Pending",
        },
      },
      resolve(parent, args) {
        const seller = new Seller({
          image: args.image,
          businessName: args.businessName,
          businessDescription: args.businessDescription,
          businessEmail: args.businessEmail,
          phoneNumber: args.phoneNumber,
          socialMediaLink: args.socialMediaLink,
          webLink: args.webLink,
          province: args.province,
          district: args.district,
          streetAddress: args.streetAddress,
          otherAddressDescription: args.otherAddressDescription,
          legalDocument: args.legalDocument,
          applicationStatus: args.applicationStatus,
        });

        return seller.save();
      },
    },
    deleteSeller: {
      type: SellerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Product.find({ sellerId: args.id }).then((products) => {
          products.forEach((product) => {
            product.remove();
          });
        });
        Order.find({ sellerId: args.id }).then((orders) => {
          orders.forEach((order) => {
            order.remove();
          });
        });
        Review.find({ sellerId: args.id }).then((reviews) => {
          reviews.forEach((review) => {
            review.remove();
          });
        });
        return Seller.findByIdAndRemove(args.id);
      },
    },
    updateSeller: {
      type: SellerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: GraphQLString },
        businessName: { type: GraphQLString },
        businessDescription: { type: GraphQLString },
        webLink: { type: GraphQLString },
        socialMediaLink: { type: GraphQLString },
        businessEmail: { type: GraphQLFloat },
        phoneNumber: { type: GraphQLFloat },
        province: { type: GraphQLString },
        district: { type: GraphQLString },
        streetAddress: { type: GraphQLString },
        otherAddressDescription: { type: GraphQLString },
        legalDocument: { type: GraphQLString },
        applicationStatus: {
          type: new GraphQLEnumType({
            name: "SellerStatusUpdate",
            values: {
              approved: { value: "Approved" },
              rejected: { value: "Rejected" },
              pending: { value: "Pending" },
            },
          }),
          defaultValue: "Pending",
        },
      },
      resolve(parent, args) {
        return Seller.findByIdAndUpdate(
          args.id,
          {
            $set: {
              image: args.image,
              businessName: args.businessName,
              businessDescription: args.businessDescription,
              businessEmail: args.businessEmail,
              phoneNumber: args.phoneNumber,
              socialMediaLink: args.socialMediaLink,
              webLink: args.webLink,
              province: args.province,
              district: args.district,
              streetAddress: args.streetAddress,
              otherAddressDescription: args.otherAddressDescription,
              legalDocument: args.legalDocument,
              applicationStatus: args.applicationStatus,
            },
          },
          { new: true }
        );
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        
      },
      
      async resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          phoneNumber: args.phoneNumber,
          password: await bcrypt.hash(args.password, 12)
        });

        return user.save();
      },
    },
    // addBuyer: {
    //   type: BuyerType,
    //   args: {
    //     user: { type: BuyerType }
    //   },
    //   resolve(parent, args) {
    //     const buyer = new Buyer({
    //       user: args.user
    //     });

    //     return buyer.save();
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
