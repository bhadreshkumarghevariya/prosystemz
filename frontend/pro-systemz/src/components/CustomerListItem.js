import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";
import DetailsButton from "./DetailsButton";

const CustomerListItem = ({ user }) => {
  const navigate = useNavigate();
  const handleEdit = (props) => {
    // Handle edit button click with user details

    navigate(`/edit-user/${user.id}`);
  };

  const handleDelete = () => {
    // Handle delete button click with user details
  };
  return (
    <tr key={user.id}>
      <td className="ps-1 m-4 p-3">
        <h5 className="mb-0">{user.username}</h5>
      </td>
      <td>{user.email}</td>
      <td>{user.userType && user.userType.userTypeName}</td>
      <td>
        <DetailsButton />
      </td>
      <td>
        <EditButton onClick={handleEdit} />
      </td>
      <td>
        <DeleteButton onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default CustomerListItem;
