import React from "react";
import { useSelector } from "react-redux";
import Header from "../Home/Header";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import "./About.css";
import Footer from "../../more/Footer";

const About = () => {
  const { loading } = useSelector((state) => state.profile);

  const brown = "#5a3e2b";

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="About - Saikey Shoes" />
          <Header />
          <div style={{ width: "90%", margin: "0 auto" }}>
            <div className="about__page" style={{ color: brown }}>
              {/* Introduction Section */}
              <div className="row flex">
                <div className="col__2">
                  <img
                    src="https://res.cloudinary.com/dt9l5u08d/image/upload/v1753982323/c7c14ae487a9a1893effcccd4da333ef_inff1x.jpg"
                    alt="Shoe Shop Display"
                    style={{ borderRadius: "5px", width: "100%" }}
                  />
                </div>
                <div className="col__2">
                  <div className="meta" style={{ color: brown }}>
                    <span style={{ fontSize: "40px", fontWeight: "700", lineHeight: "1.2" }}>
                      Welcome to Saikey Shoes
                    </span>
                    <p>
                      At Saikey Shoes, we believe that the right pair of shoes is more than just footwear — it’s a statement. We offer a carefully curated collection of shoes, sneakers, boots, and accessories, ensuring comfort, style, and durability for every step you take.
                    </p>
                    <p>
                      Whether you're looking for daily wear or a show-stopping pair for special occasions, Saikey Shoes brings you the perfect fit for your lifestyle.
                    </p>
                  </div>
                </div>
              </div>

              {/* Growing Story Section */}
              <div className="row flex" style={{ marginTop: "40px" }}>
                <div className="col__2">
                  <div className="meta" style={{ color: brown }}>
                    <span style={{ fontSize: "40px", fontWeight: "700", lineHeight: "1.2" }}>
                      Our Growing Story
                    </span>
                    <p>
                      Since 2024, Saikey Shoes has been making its mark as a premier destination for shoe enthusiasts across Nepal. What began as an online store has quickly become a trusted name in footwear, with an expanding range of products and a growing customer base.
                    </p>
                    <p>
                      In late 2024, we opened our first physical store in Kathmandu, creating a space where fashion and comfort come together. Today, we proudly ship shoes to every corner of Nepal, with a collection that spans over 1000 unique styles.
                    </p>
                    <p>
                      Our mission is simple: to provide accessible, high-quality footwear for everyone, ensuring comfort and style are always within reach.
                    </p>
                  </div>
                </div>
                <div className="col__2">
                  <img
                    src="https://res.cloudinary.com/dt9l5u08d/image/upload/v1753982372/a214321b12a61b37bfda77e00bfbf815_yilcns.jpg"
                    alt="Shoe Shelves"
                    style={{ borderRadius: "10px", width: "100%" }}
                  />
                </div>
              </div>

              {/* What Makes Us Unique Section */}
              <div className="second" style={{ marginTop: "50px" }}>
                <div className="heading" style={{ color: brown }}>
                  <h2>What Makes Us Unique?</h2>
                </div>
                <div className="row flex">
                  <div className="col__3">
                    <div
                      style={{
                        padding: "10px",
                        border: "1px solid rgb(0 0 0 / 14%)",
                        minHeight: "230px",
                        color: brown,
                      }}
                    >
                      <div className="flex align__items__center justify__content__center image">
                        <img
                          src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg"
                          alt="Shoe Variety"
                        />
                      </div>
                      <span>Wide Variety for Every Need</span>
                      <p>
                        From casual sneakers to formal shoes, we offer a vast collection to suit every occasion, style, and budget.
                      </p>
                    </div>
                  </div>
                  <div className="col__3">
                    <div
                      style={{
                        padding: "10px",
                        border: "1px solid rgb(0 0 0 / 14%)",
                        minHeight: "230px",
                        color: brown,
                      }}
                    >
                      <div className="flex align__items__center justify__content__center image">
                        <img
                          src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-2.svg"
                          alt="Quality Shoes"
                        />
                      </div>
                      <span>Crafted with Care</span>
                      <p>
                        Every pair of shoes is meticulously crafted to ensure the highest standards of quality, comfort, and durability.
                      </p>
                    </div>
                  </div>
                  <div className="col__3">
                    <div
                      style={{
                        padding: "15px",
                        border: "1px solid rgb(0 0 0 / 14%)",
                        minHeight: "230px",
                        color: brown,
                      }}
                    >
                      <div className="flex align__items__center justify__content__center image">
                        <img
                          src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-3.svg"
                          alt="Delivery"
                        />
                      </div>
                      <span>Fast & Reliable Delivery</span>
                      <p>
                        We guarantee that your shoes will be delivered quickly, safely, and right to your doorstep — anywhere in Nepal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Testimonials */}
              <div className="testimonials" style={{ marginTop: "50px", color: brown }}>
                <div className="heading">
                  <h2>What Our Customers Say</h2>
                </div>
                <div className="testimonial-box">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Customer 1" />
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p>
                    "I bought a pair of sneakers from Saikey Shoes, and they’re incredibly comfortable! I wear them every day, and they still look brand new."
                  </p>
                  <span>- Sushil G.</span>
                </div>
                <div className="testimonial-box">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Customer 2" />
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p>
                    "I needed a pair of boots for hiking, and Saikey Shoes had exactly what I was looking for. Super sturdy and stylish!"
                  </p>
                  <span>- Rajesh k.</span>
                </div>
                <div className="testimonial-box">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Customer 3"
                  />
                  <div className="rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p>
                    "Best shoe shopping experience ever! The website is easy to navigate, and the delivery was quick. Highly recommended!"
                  </p>
                  <span>- Priya</span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default About;
