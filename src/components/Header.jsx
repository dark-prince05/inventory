import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <>
      <header>
        <h3>Inventory</h3>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Item
          </NavLink>
          <NavLink
            to="/view-items"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            View Items
          </NavLink>
          <p>Items in Inventory: {props.items.length}</p>
        </div>
      </header>
    </>
  );
};

export default Header;
