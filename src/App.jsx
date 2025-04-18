// src/App.jsx
import React, { useState, useEffect } from "react";
import './App.css';

const mockData = [
  { name: "一支牙膏", price: 15, category: "日用品" },
  { name: "洗衣液（小瓶）", price: 18, category: "日用品" },
  { name: "一顿家常便饭（自己做）", price: 20, category: "饮食" },
  { name: "公交卡充值", price: 20, category: "出行" },
  { name: "拼多多热销T恤", price: 19.9, category: "服饰" },
  { name: "二手书一本", price: 18, category: "学习" }
];

export default function App() {
  const createSakura = () => {
    const sakuraCount = Math.floor(Math.random() * 11) + 10; // Random number between 10 and 20
    for (let i = 0; i < sakuraCount; i++) {
      const sakura = document.createElement('div');
      sakura.className = 'sakura';
      
      // Randomize starting position and animation delay
      const startLeft = Math.random() * 100;
      const animationDelay = Math.random() * 5; // Up to 5 seconds delay
      const duration = Math.random() * 5 + 5;

      sakura.style.left = `${startLeft}%`;
      sakura.style.animationDelay = `${animationDelay}s`;
      sakura.style.animationDuration = `${duration}s`;
      document.body.appendChild(sakura);
    }
  };

  useEffect(() => {
    createSakura();
    return () => {
      // Cleanup, if needed (e.g., remove sakura elements)
    };
  }, []);
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const value = parseFloat(budget);
    if (!isNaN(value)) {
      const filtered = mockData.filter(item => item.price <= value);
      setResults(filtered);
    }
  };

  return (
    <div className="app-container">
      <h1>今天的你，¥能做点啥？</h1>
      <input
        type="text"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="输入你的预算金额，比如 20"
      />
      <button onClick={handleSearch}>查一查能买啥</button>

       {results.length === 0 && !isNaN(parseFloat(budget)) && (
         <div>
         <p>没有找到适合您预算的商品哦！</p>
         
          <div className="cute-cat-container">
            <p className="cute-cat">cute cat image here</p>
          </div>
          </div>
        )}


      {results.length > 0 && (
        <div className="results-container">
          {results.map((item, index) => (
             <div key={index} >
                <div className="result-item">
                  <h3>{item.name}</h3>
                  <p>
                    价格：¥{item.price} · 类别：{item.category}
                  </p>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}
