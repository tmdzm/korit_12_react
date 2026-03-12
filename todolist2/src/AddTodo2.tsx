//components / AddItem.tsx
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Todo } from "./App";
//4 번 라인의 경우 전에는 types.ts에서 불러왔었다.

export default function AddTodo(props){//props
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Todo>({
    todo:'',
    checkbox: false
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = () => {
    props.addItem(item); // 항목을 추가하는 상위 컴포넌트의 함수 addItem()
    // 그 다음에 TextField value를 지울것이다.
    setItem({todo:'',checkbox: false});
    handleClose();
  }//이름을

//e.target.value를 그냥 쓰면 string 자료형인것을 기억하라
  return(
    <>
      <Button onClick={handleOpen}>Add Item</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Todo</DialogTitle>
        <DialogContent>
          <TextField value={item.todo} label='할일' margin="dense" fullWidth 
           onChange={ e => setItem({...item, todo : e.target.value})}
          >
          </TextField>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addItem}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}