#Component Overview
The Home component is part of a management dashboard where users can view, add, edit, and delete contact details. It uses the useState and useEffect hooks for managing state and side effects. The component fetches user data from the JSONPlaceholder API, displays it, and allows for CRUD operations (Create, Read, Update, Delete) on the contact information.

#State Variables
showData: Holds the list of user data (contacts). This is an array of objects, each containing an id, name, and phone.
isLoader: A boolean flag that controls the visibility of the loading spinner. Initially set to true, it is set to false once the data is fetched.
name: Holds the value of the name input field for adding or editing a contact.
phone: Holds the value of the phone number input field for adding or editing a contact.
isUpdate: A boolean flag that determines whether the form is in "add" or "update" mode. When true, the form allows adding a new contact; when false, it allows updating an existing contact.
editId: Holds the ID of the contact currently being edited. It is used when updating the contact.

#useEffect Hook
The useEffect hook is used to fetch the user data from the JSONPlaceholder API on component mount (when the component first loads).

API Call: The getApiCall function fetches the user data from https://jsonplaceholder.typicode.com/users, processes the response, and sets the showData state with a formatted array of user data.
Loader: Once the data is fetched, isLoader is set to false to hide the loader spinner.

##Functions
onDeletedItem(id)
Deletes a contact by ID using the DELETE HTTP method.
Removes the deleted contact from showData after a successful deletion (status code 200).
onChangeNameInput(event)
Updates the name state when the user types in the name input field.
onChangePhoneInput(event)
Updates the phone state when the user types in the phone number input field.
onAddContact(event)
Adds a new contact or updates an existing one when the form is submitted.
Validation: Ensures that both the name and phone fields are not empty before proceeding.
If isUpdate is true, it creates a new contact:
A new ID is assigned based on the current length of showData.
The new contact is sent to the API using the POST method.
If the contact is successfully added, the new contact is added to showData.
If isUpdate is false, it calls the UpdateDataBtn function to update an existing contact.
onEditItem(id)
Pre-fills the form with the existing contact's name and phone when the user wants to edit a contact.
Sets isUpdate to false and sets the editId to the contact's ID.
UpdateDataBtn()
Updates an existing contact by sending the updated contact details to the API using the PUT method.
After a successful update, the contact in showData is updated, and the form is reset to "add" mode.

#UI Rendering
The component renders a form for adding or editing contacts. The form contains input fields for the name and phone of the contact, and a button that toggles between "Add" and "Update" based on the isUpdate state.
A loading spinner is shown while the user data is being fetched (when isLoader is true).
Once the data is loaded, the showData is mapped to HomeItems components, which are displayed as a list. Each HomeItems component receives contact data and functions for deleting and editing contacts.

#Child Component: HomeItems
The HomeItems component is used to display individual contact details. It receives the following props:

HomeItemsDetails: An object containing the details of a single contact (id, name, phone).
onDeletedItem: A function to delete a contact.
onEditItem: A function to edit a contact.

#CSS Classes
bg-container: A container for the entire dashboard, likely for styling the background and layout.
contact-form-container: A container for the form elements.
input: Used for styling the input fields.
button: Used for styling the submit button.
cards-container: A container for displaying the list of contacts.

#Conclusion
The Home component provides a user interface for managing contacts, including adding, editing, and deleting them. The form is used for both creating new contacts and updating existing ones. The component relies on useState for managing state and useEffect for fetching the initial data from the API. The interactions with the JSONPlaceholder API simulate CRUD operations, and the UI updates dynamically based on the actions taken by the user.
