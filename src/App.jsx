// src/App.jsx
import React, { useState, useEffect } from "react";
import data from "./mockData.json";;
import myImage from "./assets/running_dog_2.gif";


let hasSent = false
const url = "/increment"
const sendRequest = () => {
  fetch(url).catch(error => {
    console.error("There was an error!", error);
  });
}





const defaultItems = [
  { name: '泡泡', price: 0, category: '免费', description: '吹泡泡，追逐着玩耍，0成本收获快乐。', link: '' },
  { name: '一杯水', price: 0, category: '免费', description: '每天都要记得喝八杯水哦！', link: '' },
  { name: '整理办公桌', price: 0, category: '免费', description: '整理一下办公桌，保持愉悦的心情。', link: '' }
];
const categoriesToEmoji = {
  日用品: "🧼",
  饮食: "🍱",
  学习: "📚",
  出行: "🚎",
  服饰: "👕",
  免费: "",
};

const getEmoji = (category) => categoriesToEmoji[category] || "";

const ResultCard = ({ item }) => {
  return (
    <div className="result-item">
        <div className="result-card">
          <h3 className="text-lg font-bold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-2">价格：{item.price} 元</p>
          <p className="text-gray-600 mb-2">{getEmoji(item.category)}{" "}
          {item.category}</p>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
  );
};

export default function App() {
  useEffect(() => {
    if (!hasSent) {
      sendRequest();
      hasSent = true
      console.log("send")
    }
    return () => {

    
    };
  }, []);
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [extraMessage, setExtraMessage] = useState("");

  const handleSearch = () => {
    const value = parseFloat(budget);
    if (isNaN(value) || value <= 0) {
      setErrorMessage("请输入大于0的数字哦～");      
      setResults(defaultItems);
      return;    
    } else {
      if (value <= 50) {
        setExtraMessage("这个预算很棒哦，可以看看今天都有什么小确幸！😊");
      } else if (value <= 100) {
        setExtraMessage("这个预算刚刚好，看看有什么适合自己的东西呢？🥳");
      } else if (value <= 500) {
        setExtraMessage("这个预算还不错，可以犒劳下自己啦！但也要记得理性消费哟~😘");
      } else if (value > 500) {
        setExtraMessage("哇~这个预算有点高呢！可以再看看有没有更适合自己的小确幸哟😉");
      }
    }
    if (!isNaN(value) && value > 0) {
       setErrorMessage("");
    }
    let filtered;
    if (value <= 50) {
      filtered = data.data.filter((item) => item.price <= value);
     } else if (value <= 100) {
      filtered = data.data.filter(
        (item) => item.price > 50 && item.price <= value
      );
     } else if (value <= 500) {
      filtered = data.data.filter(
        (item) => item.price > 100 && item.price <= value
      );
    } else if (value > 500) {
      filtered = data.data.filter((item) => item.price > 500);
    }
      
    if (filtered && filtered.length === 0) {      
      setResults([]);
    } else if (filtered) {
      filtered.sort((a, b) => b.price - a.price);    
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
      {errorMessage && (
        <p className="text-sm text-red-500 text-center">{errorMessage}</p>
      )}
      {extraMessage && (
        <p className="text-sm text-center text-pink-300 mb-4 mt-[-10px]">
          {extraMessage}
        </p>)}
      {results.length === 0 && errorMessage === "" &&(
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
        <div className="mt-2 flex gap-4"></div>
      </footer>
      {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
          <img className="w-[20px] animate-bounce" src={myImage} alt="Running Dog" />
        </div> */}
    </div>

  );

}
