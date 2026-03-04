import { useState , useEffect} from 'react';

export default function Counter4(){
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // useEffect(() => {console.log('count1 상태가 변경되었습니다.')},[count1]);
  useEffect(() => {console.log('첫번째 렌더링 시에만 useEffect의 callback 함수가 호출')},[]); 
  useEffect(() => {console.log('count2 상태가 변경되었습니다.')},[count2]);

  return (
    <>
      <p>Count : {count1} | {count2}</p>
      <button onClick={() => setCount1(preValue => preValue + 1)}>count1 증가</button>
      <br/>
      <button onClick={() => setCount2(preValue => preValue + 1)}>count2 증가</button>
    </>
  )
} 