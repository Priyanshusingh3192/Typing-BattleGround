import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Welcome2 = () => {
  // Animation for the title
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 300,
  });

  // Animation for the buttons
  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 800,
  });

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #4b79a1, #283e51)",
      color: "white",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "20px",
      textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
    },
    description: {
      fontSize: "1.5rem",
      marginBottom: "40px",
      color: "#e0e0e0",
    },
    buttonsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
    },
    button: {
      backgroundColor: "#2196f3",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s, background-color 0.3s",
    },
    buttonHover: {
      transform: "scale(1.05)",
      backgroundColor: "#1976d2",
    },
  };

  return (
    <div style={styles.container}>
      {/* Animated Title */}
      <animated.h1 style={{ ...styles.title, ...titleAnimation }}>
        Welcome to Typing Battleground!
      </animated.h1>

      {/* Description */}
      <p style={styles.description}>
        Sharpen your typing skills and compete with friends in real-time!
      </p>

      {/* Animated Buttons */}
      <animated.div style={buttonAnimation}>
        <div style={styles.buttonsContainer}>
          {/* <a
            href="/login"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </a> */}
          {/* <a
            href="/signup"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Sign Up
          </a> */}
          <a
            href="/create-room"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Create Room
          </a>
          <a
            href="/join-room"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Join Room
          </a>
        </div>
      </animated.div>
    </div>
  );
};

export default Welcome2;
