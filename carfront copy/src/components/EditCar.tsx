//EditCar
import { useState } from "react";
import { CarResponse, Car, CarEntry } from "../types";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { addCar, updateCar } from "../api/carapi";
import {useMutation, useQueryClient} from '@tanstack/react-query'

type FormProps = {
  cardata : CarResponse;
}

export default function EditCar({ cardata } : FormProps){//FormProps랑 CarResponse는 사실상 같다. 왜?
  const [open, setOpen] = useState(false)
  const [ car, setCar ] = useState<Car>({
    brand : '',
      model : '',
      color : '',
      registrationNumber: '',
      modelYear: 0,
      price: 0
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateCar, {//버전 4라 이렇게 쓰는거지 5는 다르다.
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: (err) =>{
      console.log(err)
    }
  });

  const handleClickOpen = () => {
    setCar({
      brand : cardata.brand,
      model : cardata.model,
      color : cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price
    });
    setOpen(true);
  }

  const handleClickClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntry : CarEntry = {car,url};
    mutate(carEntry);
    setOpen(false);
  }

  const handleChange =  (e : React.ChangeEvent<HTMLInputElement>) => {
      setCar({...car, [e.target.name] : e.target.value})
  }

  return(
    <>
      <button onClick={handleClickOpen}>
        Edit
      </button>
      <Dialog open = {open} onClose={handleClickClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClickClose}>취.소</button>
          <button onClick={handleSave}>변경 내용 저장</button>
        </DialogActions>

      </Dialog>
    </>
  );
}