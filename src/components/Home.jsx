


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Star, RefreshCcw, ArrowRight, ArrowUp, Twitter, Facebook, Instagram } from 'lucide-react';
import axios from 'axios';
import o1 from "../assets/images/product-01.jpg"
import o2 from "../assets/images/blog-1.jpg"
import o3 from "../assets/images/blog-2.jpg"
import o4 from "../assets/images/blog-3.jpg"
import o5 from "../assets/images/collection-1.jpg"
import o6 from "../assets/images/collection-2.jpg"
import o7 from "../assets/images/collection-3.jpg"
import o12 from "../assets/images/banner-1.jpg"
import o13 from "../assets/images/feature-1.jpg"
import o14 from "../assets/images/feature-2.jpg"
import o15 from "../assets/images/feature-3.jpg"
import o16 from "../assets/images/offer-banner-1.jpg"
import o17 from "../assets/images/offer-banner-2.jpg"
import o18 from "../assets/images/product-02.jpg"
import o19 from "../assets/images/product-03.jpg"
import o20 from "../assets/images/product-04.jpg"
import o21 from "../assets/images/product-05.jpg"
import o22 from "../assets/images/product-06.jpg"
import o23 from "../assets/images/product-07.jpg"
import o24 from "../assets/images/product-08.jpg"
import o25 from  "../assets/images/hero-banner-1.jpg"
import o26 from "../assets/images/hero-banner-2.jpg"
import o27 from "../assets/images/hero-banner-3.jpg"
import o28 from "../assets/images/banner-2.jpg"
const products = [
  {
    id: 1,
    name: "Facial Serum",
    price: { original: 899, discounted: 684 },
    image: o1,
    discount: 20,
    rating: 5,
    reviews: 5170
  },
  {
    id: 2,
    name: "coffee Bean Caffeine Eye Cream",
    price: { original: 250, discounted: 225 },
    image: o18,
    discount: 10,
    rating: 5,
    reviews: 4190
  },
  {
    id: 3,
    name: "Hydra eye serum path",
    price: { original: 690, discounted: 621 },
    image: o19,
    discount: 10,
    rating: 4,
    reviews: 3490
  },
  {
    id: 4,
    name: "ceramide & hyaluronic Face Moisturizer",
    price: { original: 389, discounted: 308 },
    image: o20,
    discount: 20,
    rating: 4,
    reviews: 5678
  },
  {
    id: 5,
    name: "Facial Cleanser",
    price: { original: 300, discounted: 240 },
    image: o21,
    discount: 20,
    rating: 5,
    reviews: 7170
  },
  {
    id: 6,
    name: "face mist with green tea & Niacinamide",
    price: { original: 599, discounted: 539 },
    image: o22,
    discount: 10,
    rating: 5,
    reviews: 3490
  },
  {
    id: 7,
    name: "advanced organics tea tree skin",
    price: { original: 349, discounted: 280 },
    image: o23,
    discount: 20,
    rating: 5,
    reviews: 8134
  },
  {
    id: 8,
    name: "acne avert foaming mousse",
    price: { original: 399, discounted: 320 },
    image: o24,
    discount: 20,
    rating: 5,
    reviews: 6784
  },
  
];
const addToCart = async (product) => {
  try {
    const userId = 'testUser'; // Replace with actual user ID when you have authentication
    const response = await axios.post('http://localhost:4003/api/cart/add', {
      userId,
      item: product
    });
    console.log('Item added to cart:', response.data);
    // You can dispatch an event or update state here to reflect the cart change in the UI
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};




const blogPosts = [
  { title: "Find a Store", image: o2, a: "https://www.newu.in/" },
  { title: "From Our Blog", image: o3, a: "https://www.newu.in/blogs/news" },
  { title: "Our Story", image: o4, a: "https://www.newu.in/pages/about-us" }
];

export default function Home() {
  const [isHeaderActive, setIsHeaderActive] = useState(false);
 
  return (
    <>
      
      <main>
        <article>
        <section className="section hero" id="home" aria-label="hero">
      <div className="container">
        <ul className="has-scrollbar">
          <li className="scrollbar-item">
            <div className="hero-card has-bg-image" style={{backgroundImage: `url('${o25}')`}}>
              <div className="card-content">
                <motion.h1 
                  className="h1 hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Reveal The <br />
                  Beauty of Skin
                </motion.h1>
                <motion.p 
                  className="hero-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Made using clean, non-toxic ingredients, our products are designed for everyone.
                </motion.p>
                <motion.p 
                  className="price"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Solution for every skin type
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <a href="#" className="btn btn-primary">Explore now :)</a>
                </motion.div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="hero-card has-bg-image" style={{backgroundImage: `url('${o26}')`}}>
              <div className="card-content">
                <motion.h1 
                  className="h1 hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Discover Your <br />
                  Perfect Glow
                </motion.h1>
                <motion.p 
                  className="hero-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Experience the power of nature with our organic skincare line.
                </motion.p>
                <motion.p 
                  className="price"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Starting at Rs.899
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <a href="#" className="btn btn-primary">Shop Now</a>
                </motion.div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="hero-card has-bg-image" style={{backgroundImage: `url('${o27}')`}}>
              <div className="card-content">
                <motion.h1 
                  className="h1 hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Radiant Skin <br />
                  Awaits You
                </motion.h1>
                <motion.p 
                  className="hero-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Transform your skincare routine with our innovative formulas.
                </motion.p>
                <motion.p 
                  className="price"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Starting at Rs.899
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <a href="#" className="btn btn-primary">Shop Now</a>
                </motion.div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

          <section className="section collection" id="collection" aria-label="collection">
            <div className="container">
              <ul className="collection-list">
                {[
                  { title: "Oily skin, meet your hero", text: "", image: o5 },
                  { title: "", text: "Irritation, Interrupted.", image: o6 },
                  { title: "Dry skin, no more.", text: "Nature's hydration, in a bottle", image: o7 }
                ].map((item, index) => (
                  <li key={index}>
                    <motion.div 
                      className="collection-card has-before hover:shine"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h2 className="h2 card-title">{item.title}</h2>
                      <p className="card-text">{item.text}</p>
                      <a to="#" className="btn-a">
                        <span className="span">{index === 0 ? 'Shop Now' : 'Discover Now'}</span>
                        <ArrowRight size={24} />
                      </a>
                      <div className="has-bg-image" style={{backgroundImage: `url('${item.image}')`}}></div>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section shop" id="shop" aria-label="shop">
            <div className="container">
              <div className="title-wrapper">
                <h2 className="h2 section-title">Our Bestsellers</h2>
                <a to="#" className="btn-a">
                  <span className="span">Shop All Products</span>
                  <ArrowRight size={24} />
                </a>
              </div>

              <ul className="has-scrollbar">
                {products.map((product) => (
                  <li key={product.id} className="scrollbar-item">
                    <motion.div 
                      className="shop-card"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="card-banner img-holder" >
                        <img src={product.image} width="540" height="720" loading="lazy" alt={product.name} className="img-cover" />
                        {product.discount && <span className="badge" aria-label={`${product.discount}% off`}>-{product.discount}%</span>}
                        <div className="card-actions">
                          <a to="/cart" className="action-btn" onClick={() => addToCart(product)} aria-label="add to cart">
                            <ShoppingBag size={24} />
                          </a>
                          <button className="action-btn" aria-label="add to wishlist">
                            <Star size={24} />
                          </button>
                          <button className="action-btn" aria-label="compare">
                            <RefreshCcw size={24} />
                          </button>
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="price">
                          {product.price.original !== product.price.discounted && <del className="del">Rs.{product.price.original}</del>}
                          <span className="span">Rs.{product.price.discounted}</span>
                        </div>
                        <h3>
                          <a to="#" className="card-title">{product.name}</a>
                        </h3>
                        <div className="card-rating">
                          <div className="rating-wrapper" aria-label={`${product.rating} star rating`}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <p className="rating-text">{product.reviews} reviews</p>
                        </div>
                      </div>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          
          <section className="section banner" aria-label="banner">
            <div className="container">
              <ul className="banner-list">
                <li>
                  <motion.div 
                    className="banner-card banner-card-1 has-before hover:shine"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="card-subtitle">New Collection</p>
                    <h2 className="h2 card-title">Discover Our Autumn Skincare</h2>
                    <a to="/form1" className="btn btn-primary">Quiz</a>
                    <div className="has-bg-image" style={{backgroundImage: `url('${o12}')`}}></div>
                  </motion.div>
                </li>
                <li>
                  <motion.div 
                    className="banner-card banner-card-2 has-before hover:shine"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h2 className="h2 card-title">25% off Everything</h2>
                    <p className="card-text">
                      Makeup with extended range in colors for every human.
                    </p>
                    <a to="#" className="btn btn-secondary">Shop Sale</a>
                    <div className="has-bg-image" style={{backgroundImage: `url('${o28}')`}}></div>
                  </motion.div>
                </li>
              </ul>
            </div>
          </section>

          
          <section className="section feature" aria-label="feature">
            <div className="container">
              <h2 className="h2-large section-title">Why Shop with Glowing?</h2>
              <ul className="flex-list">
                {[
                  { title: "Guaranteed PURE", image: o13 },
                  { title: "Completely Cruelty-Free", image: o14 },
                  { title: "Ingredient Sourcing", image: o15 }
                ].map((feature, index) => (
                  <li key={index} className="flex-item">
                    <motion.div 
                      className="feature-card"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img src={`${feature.image}`} width="204" height="236" loading="lazy" alt={feature.title} className="card-icon" />
                      <h3 className="h3 card-title">{feature.title}</h3>
                      <p className="card-text">
                        All Grace formulations adhere to strict purity standards and will never contain harsh or toxic ingredients
                      </p>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          
          <section className="section offer" id="offer" aria-label="offer">
            <div className="container">
              <figure className="offer-banner">
                <img src={o16} width="305" height="408" loading="lazy" alt="offer products" className="w-100" />
                <img src={o17} width="450" height="625" loading="lazy" alt="offer products" className="w-100" />
              </figure>

              <div className="offer-content">
                <p className="offer-subtitle">
                  <span className="span">Special Offer</span>
                  <span className="badge" aria-label="20% off">-20%</span>
                </p>
                <h2 className="h2-large section-title">Mountain Pine Bath Oil</h2>
                <p className="section-text">
                  Made using clean, non-toxic ingredients, our products are designed for everyone.
                </p>
                <div className="countdown">
                  <span className="time" aria-label="days">15</span>
                  <span className="time" aria-label="hours">21</span>
                  <span className="time" aria-label="minutes">46</span>
                  <span className="time" aria-label="seconds">08</span>
                </div>
                <a to="#" className="btn btn-primary">Get Only Rs.999</a>
              </div>
            </div>
          </section>

          
          <section className="section blog" id="blog" aria-label="blog">
            <div className="container">
              <h2 className="h2-large section-title">More to Discover</h2>
              <ul className="flex-list">
                {blogPosts.map((blog, index) => (
                  <li key={index} className="flex-item">
                    <motion.div 
                      className="blog-card"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <figure className="card-banner img-holder has-before hover:shine" style={{ height: 450}}>
                        <img src={`${blog.image}`} width="700" height="450" loading="lazy" alt={blog.title} className="img-cover" />
                      </figure>
                      <h3 className="h3">
                        <a to="#" className="card-title">{blog.title}</a>
                      </h3>
                      <a to={blog.a} className="btn-a">
                        <span className="span">Our Store</span>
                        <ArrowRight size={24} />
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </main>

   


      <a to="#top" className={`back-top-btn ${isHeaderActive ? 'active' : ''}`} aria-label="back to top">
        <ArrowUp size={24} />
      </a>
    </>
  );
}




