import { Card, Typography, Button } from "@mui/material";




function List({ todo, deleteTodo }) {
    const handleDelete = () => {
      if (confirm("Are you sure you want to delete this todo?")) {
        deleteTodo(todo._id);
      }
    };
  
    return (
      <Card style={{
        width: 500,
        height: 100,
        margin: 10,
        overflow: "auto",
      }}>
        <Typography style={{ color: "black", display: "flex", justifyContent: "center", margin: 10 }} variant="h5">
          {todo.title}
        </Typography>
        <Button
          onClick={handleDelete}
          style={{ background: "blue", color: "white", marginLeft: 220 }}
        >
          Delete
        </Button>
      </Card>
    );
  }
  
export default List