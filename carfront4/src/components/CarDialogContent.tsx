//CarDialogContent.tsx
import { HtmlHTMLAttributes } from "react";
import { Car } from "../types";
import { DialogContent, TextField, Stack} from "@mui/material";


type DialogFormProps = {
  car : Car;
  handleChange : (event : React.ChangeEvent<HTMLInputElement>) => void;//setCar는 void 유형이다. java의 setter와 똑같이 call3유형 입력은 있지만 리턴은 없다. 
}

export default function CarDialogContent({car, handleChange} : DialogFormProps) {
  return(
    <>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField type="text" label="브랜드" name='brand' value={car.brand} onChange={handleChange}/>
          <TextField type="text" label="모델" name='model' value={car.model} onChange={handleChange}/>
          <TextField type="text" label="색상" name='color' value={car.color} onChange={handleChange}/>
          <TextField type="text" label="차량번호" name='registrationNumber' value={car.registrationNumber} onChange={handleChange}/>
          <TextField type="number" label="제작년도" name='modelYear' value={car.modelYear} onChange={handleChange}/>
          <TextField type="number" label="가격" name='price' value={car.price} onChange={handleChange}/>
        </Stack>
      </DialogContent>
    </>
  );
}