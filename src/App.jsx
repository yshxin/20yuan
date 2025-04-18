// src/App.jsx
import React, { useState, useEffect } from "react";
import data from "./mockData.json";
import myImage from './assets/running_dog_2.gif';

const categoriesToEmoji = {
  "日用品": "🧼",
  "饮食": "🍱",
  "学习": "📚",
  "出行": "🚎",
  "服饰": "👕",
  "日用品": "🧼",
  "饮食": "🍱",
  "学习": "📚",
  "出行": "🚎",
  "服饰": "👕",
  "免费": ""
}

const getEmoji = (category) => {
  return categoriesToEmoji[category] || "";
};


const ResultCard = ({ item }) => {
  return (
    <div className="result-item">
        <div className="result-card">
          <h3 className="text-lg font-bold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-2">价格：{item.price} 元</p>
          <p className="text-gray-600 mb-2">
            {getEmoji(item.category)} {item.category}
          </p>
          <p className="text-gray-600">{item.description}</p>
        </div>
    </div>
  );
};


export default function App() {  
  useEffect(() => {
    return () => {
    
    };
  }, []);
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
      const value = parseFloat(budget);
      if (isNaN(value) || !budget) {
          setResults(defaultItems);
      } else {
          const filtered = data.data
            .filter(item => item.price <= value)
            .sort((a, b) => b.price - a.price);

          if (filtered.length > 6) {
              const shuffled = [...filtered].sort(() => 0.5 - Math.random());
              const randomResults = shuffled.slice(0, 6);
              setResults(randomResults);
          } else {
              setResults(filtered);
          }

      }
    };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-4 text-pink-500">
        今天的你，¥能做点啥？
      </h1>
      <div className="input-container flex items-center gap-4">
        <img className="w-[30px] h-[30px] mr-2" src={myImage} alt="Running Dog" />
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="输入你的预算金额，比如 20 元 🍬"
        />
        <button onClick={handleSearch} className="search-button">
          查一查能买啥
        </button>
      </div>
      <p className="text-sm text-center text-pink-300 mb-4 mt-[-10px]">
        没有预算也能看看今天有什么小确幸哦~ 👇
      </p>

      {results.length === 0 && !isNaN(parseFloat(budget)) && (
        <p className="mt-4 text-center text-gray-500">没有找到适合您预算的商品哦！</p>
      )}

      {results.length > 0 && (
        <div className="results-container">
          {results.map((item, index) => (
            <ResultCard key={index} item={item} />
          ))}
        </div>
      )}
      <footer className="footer">
          <p>© 2024 ¥20 Project ｜ Made with 💖</p>
          <div className="mt-2 flex gap-4">
          </div>
        </footer>
        {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
          <img className="w-[20px] animate-bounce" src={myImage} alt="Running Dog" />
        </div> */}
    </div>
  );
}
