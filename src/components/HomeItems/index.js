// Importing the CSS file for styling
import "./index.css";

// HomeItems functional component to display individual item details
const HomeItems = (props) => {
  // Destructuring props for cleaner access
  const { HomeItemsDetails, onDeletedItem, onEditItem } = props;
  const { id, name, phone } = HomeItemsDetails; // Destructuring item details

  // Handler function to trigger delete action
  const onClickDeleteItem = () => {
    onDeletedItem(id);
  };

  // Handler function to trigger edit action
  const onClickEditBtn = () => {
    onEditItem(id);
  };

  // Rendering the UI for a single item
  return (
    <li>
      <div className="card">
        <h4>Name:- {name}</h4> {/* Displaying the item name */}
        <p>Phone:- {phone}</p> {/* Displaying the item phone number */}
        <div>
          {/* Edit button with an event handler */}
          <button className="hover-btn" type="button" onClick={onClickEditBtn}>
            Edit
          </button>
          {/* Delete button with an event handler */}
          <button
            className="delete-btn"
            type="button" // Corrected typo: "buttton" to "button"
            onClick={onClickDeleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

// Exporting the component for use in other parts of the application
export default HomeItems;
