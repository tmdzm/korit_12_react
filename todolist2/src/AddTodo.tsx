import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Todo } from "./App";

e
xport default function AddTodo(props: { addItem: (item: Todo) => void }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Todo>({
    todo: '',
    checkbox: false
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItem({ todo: '', checkbox: false });
  };

  const addItem = () => {
    if (item.todo.trim() === "") return; // 빈 내용 방지
    props.addItem(item);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2, mb: 2 }}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Todo</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            value={item.todo} 
            label='할일' 
            margin="dense" 
            fullWidth 
            onChange={ e => setItem({...item, todo : e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addItem} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}