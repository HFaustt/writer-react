import { deleteBtnProps } from "../../../types";

function DeleteBtn({ id, onDelete }: deleteBtnProps) {
  const handleDelete = () => {
    if (id) {
      onDelete(id);
    } else {
      console.error("ID is undefined");
    }
  };
  return (
    <button onClick={handleDelete} style={{ cursor: "pointer" }}>
      Delete post
    </button>
  );
}

export default DeleteBtn;
