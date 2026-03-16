import {CarResponse} from '../types'
import axios from 'axios'
import { Car , CarEntry} from '../types';

// GET
export const getCars = async () : Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);//

    return response.data._embedded.cars; // cars까지 해야 list가 나온다. 스프링데이터 레스트-> 웹에 컨트롤러를 안만들어도 되는것이 장점
    //스프링 데이터 레스트를 왜~! 주의해야 할까
  }

// Delete
export const deleteCar = async (link:string) => {
  const response = await axios.delete(link);// db로찍었을때 id가 long으로 바뀌기 때문에 아직 string, 즉 리액트에선 string, 스프링부트에서 long id가 된다. 물론 우린 _links.~~해서 그런거지 항상 그런건 아니다.
  return response.data;
}

//POST
export const addCar = async (car: Car) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, car, {
    headers: {
      'Content-Type' : 'application/json'
    }
  })// 인자가 2개, 첫번째는 url, create에는 id가 없다.
  return response.data;
}

// PUT 요청
export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers:{
      'Content-Type' : 'application/json',
    }
  })

  return response.data;
}
