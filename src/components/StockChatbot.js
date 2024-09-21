import React, { useEffect, useState } from "react";
import data from "../data.json";
import { Button } from "react-bootstrap";
import "./StockChatbot.css";

const StockChatbot = () => {
  // Step state (1=home, 2=stocks, 3=price)
  const [step, setStep] = useState("home");

  // Selection state (exchange and stock)
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  // Chatbot window states
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setMessages((prev) => [
        ...prev,
        { text: ` Hello! Please select an exchange:`, type: "bot" },
      ]);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleExchangeSelect = (exchange) => {
    setSelectedExchange(exchange);
    setStep("stocks");
    setMessages((prev) => [
      ...prev,
      { text: `${exchange.stockExchange}`, type: "user" },
      {
        text: ` Please select a stock from ${exchange.stockExchange}:`,
        type: "bot",
      },
    ]);
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setStep("price");
    setMessages((prev) => [
      ...prev,
      { text: `${stock.stockName}`, type: "user" },
      {
        text: ` The price for ${stock.stockName} is $${stock.price}.`,
        type: "bot",
      },
    ]);
  };

  const renderExchangeOptions = () => {
    return data.map((exchange) => (
      <Button
        key={exchange.code}
        onClick={() => handleExchangeSelect(exchange)}
        className="spacing"
      >
        {exchange.stockExchange}
      </Button>
    ));
  };

  const renderStockOptions = () => {
    return selectedExchange.topStocks.map((stock) => (
      <Button
        key={stock.code}
        onClick={() => handleStockSelect(stock)}
        className="spacing"
      >
        {stock.stockName}
      </Button>
    ));
  };

  const goBack = () => {
    if (step === "stocks") {
      setStep("home");
      setSelectedExchange(null);
      setMessages((prev) => [
        ...prev,
        { text: `Back to exchanges`, type: "user" },
        { text: ` Please select an exchange:`, type: "bot" },
      ]);
    } else if (step === "price") {
      setStep("stocks");
      setSelectedStock(null);
      setMessages((prev) => [
        ...prev,
        { text: `Back to stocks`, type: "user" },
      ]);
    }
  };

  const goHome = () => {
    setStep("home");
    setSelectedExchange(null);
    setSelectedStock(null);
    setMessages((prev) => [
      ...prev,
      { text: `Home`, type: "user" },
      { text: ` Please select an exchange:`, type: "bot" },
    ]);
  };

  return (
    <>
      <div className="chat-container">
        {isOpen ? (
          <Button className="chat-button" onClick={toggleChat}>
            <h3>Open Chatbot</h3>
          </Button>
        ) : (
          <div className="chat-box">
            <Button variant="light" onClick={toggleChat}>
              <div className="chat-header">
                <h3>Close Chatbot</h3>
              </div>
            </Button>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.type === "user" ? "user-message" : "bot-message"
                  }
                >
                  {msg.text}
                </div>
              ))}
              {step === "home" && renderExchangeOptions()}
              {step === "stocks" && renderStockOptions()}

              <div className="footer-buttons">
                <Button variant="secondary" onClick={goHome}>
                  Home
                </Button>
                <Button
                  className="go-back-button"
                  variant="secondary"
                  onClick={goBack}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StockChatbot;
