// src/App.jsx
import React, { useState, useEffect } from "react";

const categoriesToEmoji = {
  "日用品": "🧼",
  "饮食": "🍱",
  "学习": "📚",
  "出行": "🚎",
  "服饰": "👕",
  "免费": ""
};
const mockData = [
  { name: "一支牙膏", price: 15, category: "日用品" },
  { name: "洗衣液（小瓶）", price: 18, category: "日用品" },
  { name: "一顿家常便饭（自己做）", price: 20, category: "饮食" },
  { name: "公交卡充值", price: 20, category: "出行" },
  { name: "拼多多热销T恤", price: 19.9, category: "服饰" },
  { name: "二手书一本", price: 18, category: "学习" }
];
const defaultItems = [
  { name: '泡泡', price: 0, category: '免费', description: '吹泡泡，追逐着玩耍，0成本收获快乐。', link: '' },
  { name: '一杯水', price: 0, category: '免费', description: '每天都要记得喝八杯水哦！', link: '' },
  { name: '整理办公桌', price: 0, category: '免费', description: '整理一下办公桌，保持愉悦的心情。', link: '' }
];

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
          <button className="bg-pink-300 text-white px-4 py-2 rounded-lg hover:scale-105 mt-auto">了解更多</button>
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
          const filtered = mockData.filter(item => item.price <= value);
          setResults(filtered);
      }
    };

  return (
    <div className="container">
      <img
        className="cute-cat"
        src="https://media.tenor.com/j6a_9W3zJ8MAAAAi/cat-run.gif"
        alt="Running Cat"
      />
      <h1 className="text-3xl font-bold text-center mb-4 text-pink-500">
        今天的你，¥能做点啥？
      </h1>
      <div className="input-container">
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
            <button className="bg-pink-300 text-white px-4 py-2 rounded-lg hover:scale-105">GitHub</button>
            <button className="bg-pink-300 text-white px-4 py-2 rounded-lg hover:scale-105">分享给朋友</button>
          </div>
        </footer>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
          <img className="w-[80px] animate-bounce" src="https://i.pinimg.com/originals/8e/0c/8b/8e0c8b73357f1b8c5793a99a5f217f69.gif" alt="Running Cat" />
        </div>
    </div>
  );
}
