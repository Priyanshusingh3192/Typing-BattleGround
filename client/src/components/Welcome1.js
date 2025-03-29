import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Welcome1 = () => {
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
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
      color: '#00ff88',
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "20px",
      textShadow: "0 0 10px rgba(0, 255, 136, 0.3)",
      color: '#00ff88',
    },
    description: {
      fontSize: "1.5rem",
      marginBottom: "40px",
      color: "rgba(255, 255, 255, 0.8)",
    },
    buttonsContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
    },
    button: {
      backgroundColor: "rgba(0, 255, 136, 0.1)",
      color: '#00ff88',
      padding: "12px 24px",
      border: "1px solid rgba(0, 255, 136, 0.3)",
      borderRadius: "10px",
      textDecoration: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "rgba(0, 255, 136, 0.2)",
      transform: "scale(1.05)",
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
          <a
            href="/login"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </a>
          <a
            href="/signup"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Sign Up
          </a>
          {/* <a
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
          </a> */}
        </div>
      </animated.div>
    </div>
  );
};

export default Welcome1;
