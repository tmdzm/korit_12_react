//components / AddItem.tsx
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Item } from "../App";
//4 번 라인의 경우 전에는 types.ts에서 불러왔었다.

type AddItemProps = {
  addItem: (item : Item) => void;
}

export default function AddItem(props : AddItemProps){//props
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Item>({
    product: '',
    amount: '',
    price : 0,
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () => {
    props.addItem(item); // 항목을 추가하는 상위 컴포넌트의 함수 addItem()
    // 그 다음에 TextField value를 지울것이다.
    setItem({product:'', amount: '',price: 0});
    handleClose();
  }//이름을 똑같이 가져간다.

  const handleSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };
//e.target.value를 그냥 쓰면 string 자료형인것을 기억하라
  return(
    <>
      <Button onClick={handleOpen} variant="outliend">Add Item</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} label='Product' margin="dense" fullWidth 
          name="product"
          onChange={handleSet}
          >

          </TextField>
          <TextField value={item.amount}  label='Amount' margin="dense" fullWidth
          name="amount"
          onChange={handleSet}
          >

          </TextField>
          <TextField value={item.price}  label='Price' margin="dense" fullWidth
          name="price"
          onChange={handleSet}
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