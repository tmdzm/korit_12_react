import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { Car } from "../types";
import {ChangeEvent, useState} from "react";
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CarDialogContent from "./CarDialogContent";

export default function AddCar(){
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar,{
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
    onError: err => console.log(err),
  });

  const [open, setOpen ] = useState(false);
  const [car, setCar] = useState<Car>(
    {
      brand : '',
      model : '',
      color : '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    })// []쓰던 건 뭐더라

    //한줄 짜리, 여러번 써야하니 그냥 선언
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { //React.은 너무 당연해서 생략해도 된다.
      setCar({...car, [event.target.name] : event.target.value})
    }

    const handleSave = () => {
      mutate(car);//car는 매개변수 즉, 파라미터, carapi.ts에 있는 addCar() 함수에 해당한다.
      setCar({
      brand : '',
      model : '',
      color : '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
      });
      handleClickClose();
    }

  return(
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>새로운 차</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange /*이벤트 명이 아니라 키정도*/}/>
        <DialogActions>
          <Button onClick={handleClickClose}>취소</Button>
          <Button onClick={handleSave}>추가하기</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}