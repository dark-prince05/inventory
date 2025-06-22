import { useState, useContext } from "react";
import { ItemsContext } from "../App";

const AddItemPage = () => {
  const { items, setItems } = useContext(ItemsContext);
  const [formData, setFormData] = useState({
    itemName: "",
    itemType: "",
    desc: "",
    coverImg: null,
    additionalImg: [],
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const createImageURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgURL = await createImageURL(formData.coverImg);
    const addImgURLs = await Promise.all(
      formData.additionalImg.map((file) => createImageURL(file)),
    );
    addImgURLs.unshift(imgURL);
    const newItem = {
      ...formData,
      coverImg: imgURL,
      additionalImg: addImgURLs,
    };

    setItems([...items, newItem]);
    setFormData({
      itemName: "",
      itemType: "",
      desc: "",
      coverImg: null,
      additionalImg: [],
    });
    setIsSuccess(true);
  };

  return (
    <main className="add-form">
      <h1>Add Items</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-area">
          <label htmlFor="item-name">Item Name:</label>
          <input
            type="text"
            name="item-name"
            value={formData.itemName}
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            required
          />
        </div>
        <div className="input-area">
          <label htmlFor="item-type">Item Type:</label>
          <select
            name="item-type"
            value={formData.itemType}
            onChange={(e) =>
              setFormData({ ...formData, itemType: e.target.value })
            }
            required
          >
            <option value="" disabled hidden>
              -- Select Item Type --
            </option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Shoe">Shoe</option>
            <option value="Sports Gear">Sports Gear</option>
            <option value="Gym Gear">Gym Gear</option>
          </select>
        </div>
        <div className="input-area">
          <label htmlFor="desc">Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
            rows={5}
          ></textarea>
        </div>
        <div className="input-area">
          <label htmlFor="cover-img">Cover Image:</label>
          <input
            type="file"
            name="cover-img"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0)
                setFormData({ ...formData, coverImg: e.target.files[0] });
            }}
            required
          />
        </div>
        <div className="input-area">
          <label htmlFor="additional-img">Additional Images(max: 10):</label>
          <input
            type="file"
            name="additional-img"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files.length > 0)
                setFormData({
                  ...formData,
                  additionalImg: Array.from(e.target.files),
                });
            }}
            required
          />
        </div>
        <br />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      {isSuccess && (
        <div className="modal">
          <div>
            <p>Item added successfully</p>
            <button className="close-btn" onClick={() => setIsSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AddItemPage;
