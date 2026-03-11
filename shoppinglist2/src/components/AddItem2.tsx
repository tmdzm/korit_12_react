//components / AddItem.tsx
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Item } from "../App";
//4 번 라인의 경우 전에는 types.ts에서 불러왔었다.

export default function AddItem2(){//props
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Item>({
    product: '',
    amount: '',
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };
//e.target.value를 그냥 쓰면 string 자료형인것을 기억하라
  return(
    <>
      <Button onClick={handleOpen}>Add Item</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} label='Product' margin="dense" fullWidth 
           onChange={ e => setItem({...item, product : e.target.value})}
          >
            {/* //Tlqkf 왜 오류가 나지 */}

          </TextField>
          <TextField value={item.amount}  label='Amount' margin="dense" fullWidth
           onChange={ e => setItem({...item, amount : e.target.value})} 
          >

          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button>
            {/* Add item, onClick={addItem} */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}