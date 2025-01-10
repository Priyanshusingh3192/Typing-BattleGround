import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./CSS/TypingSpeedTest.css"; // CSS for bubbles and grass

function TypingSpeedTest() {
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are a great way to improve keyboard skills.",
    "A journey of a thousand miles begins with a single step.",
    "Practice makes perfect, so keep typing to improve speed.",
    "Coding challenges help in building logical thinking skills.",
    "React is a popular JavaScript library for building user interfaces.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "All work and no play makes Jack a dull boy.",
    "JavaScript is versatile and widely used in web development.",
    "To be, or not to be, that is the question.",
  ];

  const [sampleText, setSampleText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    setSampleText(
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
    );
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;

    if (!isTyping) {
      setStartTime(new Date());
      setIsTyping(true);
    }

    const correctText = sampleText.substring(0, input.length);
    if (input === correctText) {
      setUserInput(input);
    }

    if (input === sampleText) {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (isTyping && userInput.length > 0) {
      const timeElapsed = (new Date() - startTime) / 1000 / 60; // Time in minutes
      const wordCount = userInput.split(" ").length; // Correct word count
      const calculatedWpm = Math.round(wordCount / timeElapsed);
      setWpm(calculatedWpm);
    }
  }, [userInput, isTyping, startTime]);

  const resetTest = () => {
    setSampleText(
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
    );
    setUserInput("");
    setStartTime(null);
    setIsTyping(false);
    setWpm(0);
  };

  return (
    <MDBContainer
      fluid
      className="typing-speed-container"
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Static Bubbles */}
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>

      {/* Main Card */}
      <MDBCard
        style={{
          maxWidth: "900px",
          width: "90%",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          background: "#fff3e0", // Uniform light creamy color
          zIndex: 2,
        }}
      >
        <MDBCardBody className="d-flex justify-content-between align-items-start">
          {/* Typing Section */}
          <div style={{ width: "60%" }}>
            <h3 className="mb-4" style={{ fontWeight: "700", color: "#333" }}>
              Typing Speed Test
            </h3>
            <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
              Type the text below as quickly and accurately as possible.
            </p>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                padding: "15px",
                backgroundColor: "#fff9e6", // Lighter creamy background
                borderRadius: "10px",
                marginBottom: "20px",
                wordWrap: "break-word",
              }}
            >
              {sampleText}
            </div>
            <MDBInput
              type="textarea"
              rows="5"
              value={userInput}
              onChange={handleInputChange}
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                padding: "15px",
                borderRadius: "10px",
                borderColor: "#ccc",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              disabled={!isTyping && userInput === sampleText}
            />
            <MDBBtn
              color="primary"
              onClick={resetTest}
              className="mt-3"
              style={{
                fontSize: "1.1rem",
                padding: "10px 20px",
                borderRadius: "30px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {userInput === sampleText ? "Retry" : "Reset"}
            </MDBBtn>
          </div>

          {/* Speed Display Section */}
          <div
            style={{
              width: "35%",
              backgroundColor: "#fff9e6",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px",
                fontSize: "1.3rem",
              }}
            >
              Typing Speed
            </h4>
            <h2
              style={{
                fontSize: "3rem",
                color: "#ff8c00",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {wpm}
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#777",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Words Per Minute
            </p>
          </div>
        </MDBCardBody>
      </MDBCard>

      {/* Grass Section */}
      <div className="grass"></div>
    </MDBContainer>
  );
}

export default TypingSpeedTest;
