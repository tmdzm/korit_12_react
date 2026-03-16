//CarDialogContent.tsx
import { HtmlHTMLAttributes } from "react";
import { Car } from "../types";
import { DialogContent, DialogProps } from "@mui/material";

type DialogFormProps = {
  car : Car;
  handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void;//setCar는 void 유형이다. java의 setter와 똑같이 call3유형 입력은 있지만 리턴은 없다. 
}

export default function CarDialogContent({car, handleChange} : DialogFormProps) {
  return(
    <>
      <DialogContent>
          <input type="text" placeholder="브랜드" name='brand' value={car.brand} onChange={handleChange}/><br />
          <input type="text" placeholder="모델" name='model' value={car.model} onChange={handleChange}/><br />
          <input type="text" placeholder="색상" name='color' value={car.color} onChange={handleChange}/><br />
          <input type="text" placeholder="차량번호" name='registrationNumber' value={car.registrationNumber} onChange={handleChange}/><br />
          <input type="number" placeholder="제작년도" name='modelYear' value={car.modelYear} onChange={handleChange}/><br />
          <input type="number" placeholder="가격" name='price' value={car.price} onChange={handleChange}/><br />
      </DialogContent>
    </>
  );
}