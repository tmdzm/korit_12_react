// components/carlist.tsx
import { useQuery } from "@tanstack/react-query";
import { CarResponse } from "../types";
import axios from 'axios';

export default function Carlist(){
  const getCars = async () : Promise<CarResponse[]> => {
    const response = await axios.get('http://localhost:8080/api/vehicles');

    return response.data._embedded.cars; // cars까지 해야 list가 나온다. 스프링데이터 레스트-> 웹에 컨트롤러를 안만들어도 되는것이 장점
    //스프링 데이터 레스트를 왜~! 주의해야 할까
  }

  const { data, error, isSuccess } = useQuery({
      queryKey: ['cars'],
      queryFn: getCars
  })

  if(!isSuccess){
    return <span>Loading ...</span>
  } else if(error){
    return <span> 자동차 데이터를 가져오던 중 오류가 발생했습니다.</span>
  } else {
    return(
      <table>
        <tbody>
          {
            data.map((car: CarResponse) =>
              <tr key={car._links.self.href}> {/**DB에서 숨겨야 하는 값인 id같은것을 숨길 수 있다. */}
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.color}</td>
                <td>{car.registrationNumber}</td>
                <td>{car.modelYear}</td>
                <td>{car.price}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    )
  }
}