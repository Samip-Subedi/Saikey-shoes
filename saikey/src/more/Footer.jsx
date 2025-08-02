import React from "react";
import { Link } from "react-router-dom";
import logoo from "../Assets/Logo_trunk.png";

const Footer = () => {
  const footerStyle = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      backgroundColor: "#f4f4f4",
      borderTop: "1px solid #ddd",
      fontFamily: "Poppins, sans-serif",
      color: "#333",
    },
    logo: {
      width: "120px",
      height: "auto",
      marginBottom: "20px",
    },
    sectionsContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      width: "100%",
      maxWidth: "1200px",
    },
    section: {
      flex: "1",
      minWidth: "200px",
      margin: "20px",
      textAlign: "center",
    },
    columnTitle: {
      fontSize: "18px",
      marginBottom: "15px",
      color: "#444",
      textTransform: "uppercase",
    },
    link: {
      display: "block",
      margin: "10px 0",
      color: "#0073e6",
      textDecoration: "none",
      fontSize: "16px",
    },
    linkHover: {
      textDecoration: "underline",
    },
    item: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "10px",
    },
    icon: {
      fontSize: "18px",
      marginRight: "10px",
    },
    text: {
      fontSize: "14px",
      color: "#555",
    },
    footerBottom: {
      marginTop: "30px",
      fontSize: "14px",
      color: "#999",
      textAlign: "center",
    },
  };

  return (
    <div style={footerStyle.container}>
      {/* Footer Logo */}
      <img src={logoo} alt="Logo" style={footerStyle.logo} />

      {/* Footer Sections */}
      <div style={footerStyle.sectionsContainer}>
        {/* Info Section */}
        <div style={footerStyle.section}>
          <h5 style={footerStyle.columnTitle}>Contact Us</h5>
          <div style={footerStyle.item}>
            <span style={footerStyle.icon}>📍</span>
            <p style={footerStyle.text}>Softwarica Marga, Kathmandu, Nepal</p>
          </div>
          <div style={footerStyle.item}>
            <span style={footerStyle.icon}>✉️</span>
            <p style={footerStyle.text}>saikeyshoes@gmail.com</p>
          </div>
          <div style={footerStyle.item}>
            <span style={footerStyle.icon}>📞</span>
            <p style={footerStyle.text}>+977-9876543210</p>
          </div>
          <div style={footerStyle.item}>
            <span style={footerStyle.icon}>⏰</span>
            <p style={footerStyle.text}>24-hour service</p>
          </div>
        </div>

        {/* Account Section */}
        <div style={footerStyle.section}>
          <h5 style={footerStyle.columnTitle}>Account</h5>
          <Link to="/login" style={footerStyle.link}>
            Log In
          </Link>
          <Link to="/login" style={footerStyle.link}>
            Sign In
          </Link>
          <Link to="/login" style={footerStyle.link}>
            Registration
          </Link>
          <Link to="/password/forgot" style={footerStyle.link}>
            Forgot Password
          </Link>
        </div>

        {/* Follow Us Section */}
        <div style={footerStyle.section}>
          <h5 style={footerStyle.columnTitle}>Follow Us</h5>
          <Link to="/facebook.com" style={footerStyle.link}>
            Facebook
          </Link>
          <Link to="/youtube.com" style={footerStyle.link}>
            YouTube
          </Link>
          <Link to="/instagram.com" style={footerStyle.link}>
            Instagram
          </Link>
        </div>

        {/* Rules Section */}
        <div style={footerStyle.section}>
          <h5 style={footerStyle.columnTitle}>Rules</h5>
          <Link to="/faq" style={footerStyle.link}>
            FAQ
          </Link>
          <Link to="/contact" style={footerStyle.link}>
            Contact Us
          </Link>
          <Link to="/about" style={footerStyle.link}>
            About Us
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={footerStyle.footerBottom}>
        © {new Date().getFullYear()} Saikey Shoes. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
