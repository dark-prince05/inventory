import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

export const ItemsContext = createContext({
  items: [],
  setItems: [],
});

const App = () => {
  const [items, setItems] = useState([]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      <Header items={items} />
      <Outlet />
    </ItemsContext.Provider>
  );
};

export default App;
