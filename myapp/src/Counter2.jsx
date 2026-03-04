import { useState } from 'react';

export default function Counter(){
  //초기값이 0인  count 상태 선언 및 초기화 
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const inCrement = () => {
    setCount1(prevCount1 => prevCount1 + 1); // 아직 재렌더링이 일어나지 않음, 원랜 바뀌자마자 재렌더링이 일어나서 setCount2가 일어나지 않아야 하는데
    setCount2(prevCount2 => prevCount2 + 1); // 즉 하나로 묶어놓으면 재렌더링이 안되게 막을 수 있다.
    // 모든 상태가 업데이트되고 나서 컴노넌트 재렌더링됨, 근데 리렌더링이 재렌더링인가
  }
  return (
    <>
      <p>Count : {count1} | {count2}</p>
      <button onClick={inCrement}>증가</button>
    </>
  )
}