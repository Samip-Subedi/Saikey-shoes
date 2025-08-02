import React from "react";
import "./Rules.css";
import Header from "../component/Home/Header";
import BottomTab from "./BottomTab";
import MetaData from "./MetaData";
import Footer from "./Footer";

const Rules = () => {
  return (
    <>
      <MetaData title="Rules" />
      <Header />
      <div className="rules-container">
        <div className="rules-header">
          <h1 className="rules-title">Customer Guidelines & Store Policies</h1>
          <p className="rules-subtitle">Help us create a great shopping experience for all footwear lovers</p>
          <div className="rules-header-decoration"></div>
        </div>
        
        <div className="rules-intro">
          <div className="intro-graphic">
            <div className="rules-icon-container">
              <div className="rules-icon">👟</div>
            </div>
          </div>
          <div className="intro-text">
            <p>
              Welcome to Saikey Shoes! Whether you're looking for the perfect pair of sneakers or stylish boots, we’re committed to providing a smooth, secure, and enjoyable shopping experience. Please review these rules and policies to ensure respectful conduct and successful purchases.
            </p>
          </div>
        </div>
        
        <div className="rules-timeline">
          <div className="rule-card">
            <div className="rule-number">01</div>
            <div className="rule-content">
              <h2 className="rule-heading">Respectful Community Conduct</h2>
              <p className="rule-text">
                All customers are expected to engage respectfully with our team and fellow shoppers. Avoid using offensive or inappropriate language in product reviews, support chats, or forums.
              </p>
            </div>
          </div>
          
          <div className="rule-card">
            <div className="rule-number">02</div>
            <div className="rule-content">
              <h2 className="rule-heading">Account Registration & Security</h2>
              <p className="rule-text">
                To place orders or save your favorite styles, users must register an account with valid details. Please ensure your login information is kept private and secure to prevent unauthorized access.
              </p>
            </div>
          </div>
          
          <div className="rule-card">
            <div className="rule-number">03</div>
            <div className="rule-content">
              <h2 className="rule-heading">Product Descriptions & Images</h2>
              <p className="rule-text">
                All product descriptions, images, and content are protected by copyright. Do not reuse, copy, or distribute this content without permission.
              </p>
            </div>
          </div>
          
          <div className="rule-card">
            <div className="rule-number">04</div>
            <div className="rule-content">
              <h2 className="rule-heading">Shoe Reviews & Feedback</h2>
              <p className="rule-text">
                Share your experience with our shoes, boots, and accessories! Keep reviews constructive, respectful, and based on actual product usage to help other shoppers make informed decisions.
              </p>
            </div>
          </div>
          
          <div className="rule-card">
            <div className="rule-number">05</div>
            <div className="rule-content">
              <h2 className="rule-heading">Payment, Shipping & Taxes</h2>
              <p className="rule-text">
                Before placing an order, please review our payment and shipping policies. Ensure your billing and shipping details are accurate. Additional taxes or delivery charges may apply based on your region.
              </p>
            </div>
          </div>
          
          <div className="rule-card">
            <div className="rule-number">06</div>
            <div className="rule-content">
              <h2 className="rule-heading">Returns, Repairs & Exchanges</h2>
              <p className="rule-text">
                We accept returns and exchanges for eligible products within the stated period. For damaged or faulty shoes, you may also request repair or replacement per our return policy. Please retain the original packaging for returns.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rules-agreement">
          <div className="agreement-checkmark">✓</div>
          <div className="agreement-text">
            <p className="thank-you">Thank you for being part of the Saikey Shoes community.</p>
            <p className="compliance-message">By using our website, you agree to follow these store guidelines.</p>
          </div>
        </div>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Rules;
