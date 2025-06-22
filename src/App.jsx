import { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import tShirt from "./assets/tshirt.webp";
import preview1 from "./assets/preview1.webp";
import preview2 from "./assets/preview2.webp";
import preview3 from "./assets/preview3.webp";
import preview4 from "./assets/preview4.webp";

export const ItemsContext = createContext({
  items: [],
  setItems: [],
});

const App = () => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems && storedItems.length > 2
      ? JSON.parse(storedItems)
      : [
          {
            itemName: "T-shirt for men",
            itemType: "Shirt",
            desc: "Introducing the ultimate comfort for your active lifestyle – our Crew Neck Performance T-Shirt. Made of polyester, our crew neck has breathability, ensuring you remain cool even during the most intense workouts. Versatile enough to keep you stylish on your most laid-back days, it effortlessly transitions from fitness sessions to casual hangouts! And with an unbeatable price point, this high-quality performance gear is within reach for every fitness enthusiast or casual wearer.",
            coverImg: tShirt,
            additionalImg: [tShirt, preview1, preview2, preview3, preview4],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <Header items={items} />
      <Outlet />
    </ItemsContext.Provider>
  );
};

export default App;
