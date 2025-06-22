import { useContext, useEffect, useRef, useState } from "react";
import { ItemsContext } from "../App";

const ViewItemPage = () => {
  const { items, setItems } = useContext(ItemsContext);
  const [curItem, setcurItem] = useState({});
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef();

  const closePreview = () => {
    setIsOpen(false);
    dialogRef.current.close();
  };

  useEffect(() => {
    if (!isOpen) return;
    let ind = 1;
    setImage(curItem.additionalImg[0]);
    const interval = setInterval(() => {
      setImage(curItem.additionalImg[ind]);
      ind = (ind + 1) % curItem.additionalImg.length;
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleRemove = (ind) => {
    const newItems = items.filter((_, i) => ind !== i);
    setItems(newItems);
  };
  const handleClick = (ind) => {
    setcurItem(items[ind]);
    dialogRef.current.showModal();
    setIsOpen(true);
  };
  return (
    <main className="view-items">
      <h1>Items in Inventory</h1>
      <div className="item-container">
        {items.map((item, ind) => {
          return (
            <div key={ind} className="item" onClick={() => handleClick(ind)}>
              <img src={item.coverImg} alt={item.itemName} />
              <p>{item.itemName}</p>
              <p>Type: {item.itemType}</p>
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(ind);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <dialog ref={dialogRef}>
        <div className="preview">
          <div className="image-container">
            {image && <img src={image} alt="image" />}
          </div>
          <div className="desc-container">
            <button onClick={closePreview}>x</button>
            <p>
              <b> Name: </b>
              {curItem.itemName}
            </p>
            <p>
              <b>Type:</b> {curItem.itemType}
            </p>
            <p>
              <b>Description:</b> {curItem.desc}
            </p>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default ViewItemPage;
