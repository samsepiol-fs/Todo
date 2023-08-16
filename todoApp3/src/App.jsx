  import { useState, useEffect } from "react";
  import axios from 'axios';
  import List from "./List";
  import { Typography, Card, Button, TextField } from '@mui/material';
  import { yellow } from "@mui/material/colors";

  function App() {
    const [todos, setTodos] = useState([]);
    const[title,setTitle] = useState("");

    useEffect(() => {
      fetchTodos();
    }, []);

    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setTodos(response.data.todos);
        setTitle("");
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };


    
    const deleteTodo = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`);

        console.log("Hello from delete");

        // Fetch the updated list of todos
        fetchTodos();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    };

    console.log("rendering")

    return (
      <>
        <div style={{display:"flex", justifyContent:"center", marginTop : 10}}>
          <Typography variant="h1" style={{color:"#edffa5"}}>Todoiee</Typography>
        </div>
        <div style={{display:"flex", justifyContent:"space-evenly" }}>
          <div style={{width:200,height:200}}>
            <Card variant="outlined" style={{width:500, height:250, marginLeft : 150, marginTop : 150, background:"#161616"}}>
                <Typography variant="h2" style={{display:"flex", justifyContent:"center", margin:10, color:"whitesmoke"}}>Add Todo (+) </Typography>
                <TextField style={{margin:10, width:475}} id="outlined-basic" label="Todo" variant="filled" fullWidth={true} sx={{background: "#242424", input: { color: 'whitesmoke' }}}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        />
                <br />
                <Button style={{background:"#edffa5", color:"black", width:100, height:50, marginLeft : 190, marginTop : 20}} variant="contained" 
                onClick={async ()=>{
                  await axios.post("http://localhost:3000/todos", {
                  title
                });
            
                setTitle("");
                fetchTodos();
                }}
                >Add</Button>
            </Card>
          </div>
          <div style={{width:1000, height:500, marginLeft:750, marginRight:50, marginTop : 50, background : "#edffa5", borderRadius : "10px", height: "calc(100vh - 200px)", overflowY: "auto", overflowX : 'hidden'}}>
            {todos.map(todo => (
              <List key={todo._id} todo={todo} deleteTodo={deleteTodo} />
            ))}
          </div>
        </div>
      </>
    );
  }




  export default App;
