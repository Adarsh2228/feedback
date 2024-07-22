import React, { useEffect, useState } from 'react';
import './Home1.css';

const HomePage1 = () => {
  const maxScrollFor100 = 250;
  const maxPadding = 100;
  const [padding, setPadding] = useState(maxPadding);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sY = window.scrollY;
      const percent = 100 - (sY >= maxScrollFor100 ? 100 : sY / (maxScrollFor100 / 100));
      const newPadding = maxPadding * (percent / 100);
      setPadding(newPadding);
      setGlow(sY >= maxScrollFor100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images = [
    "https://th.bing.com/th/id/OIP.5YsJaac2ntvHqVy4TYcdNgHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://www.singleton-associates.org/wp-content/uploads/2014/04/Feedback.jpg",
    "https://th.bing.com/th/id/OIP.LPq_dq9K5CjpQ6WQRWvQsAHaEK?w=280&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP._dF3h309digWf96LoMjMfwHaGu?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.5YsJaac2ntvHqVy4TYcdNgHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://www.singleton-associates.org/wp-content/uploads/2014/04/Feedback.jpg",
    "https://th.bing.com/th/id/OIP.LPq_dq9K5CjpQ6WQRWvQsAHaEK?w=280&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP._dF3h309digWf96LoMjMfwHaGu?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  ];

  const quotes = [
    { text: "We all need people who will give us feedback. That's how we improve.", author: "Bill Gates" },
    { text: "Feedback is the breakfast of champions.", author: "Ken Blanchard" },
    { text: "It takes humility to seek feedback. It takes wisdom to understand it, analyze it and appropriately act on it.", author: "Stephen Covey" },
    { text: "The key to learning is feedback. It is nearly impossible to learn anything without it.", author: "Steven Levitt" },
    { text: "We all need people who will give us feedback. That's how we improve.", author: "Bill Gates" },
    { text: "Feedback is the breakfast of champions.", author: "Ken Blanchard" },
    { text: "It takes humility to seek feedback. It takes wisdom to understand it, analyze it and appropriately act on it.", author: "Stephen Covey" },
    { text: "The key to learning is feedback. It is nearly impossible to learn anything without it.", author: "Steven Levitt" }
  ];

  return (
    <div className="home-page-container">
      {images.map((image, index) => (
        <section
          className={`image-quote-section ${index % 2 === 0 ? '' : 'reverse'} ${glow ? 'glow-effect' : ''}`}
          style={{ padding: `${padding}px` }}
          key={index}
        >
          <div className="image-box">
            <img src={image} alt={`Feedback related image ${index + 1}`} /> {/* Updated alt text */}
          </div>
          <div className="quote-box">
            {quotes[index] ? (
              <p>{quotes[index].text}</p>
            ) : (
              <p>No quote available</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage1;