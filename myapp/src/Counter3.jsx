import { useEffect, useState } from 'react';

export default function Counter3(){
  const [count, setCount] = useState(0);

  useEffect(() => console.log('Hello from useEffect'), [count]); // count가 바뀔 때마다 실행됨, 뭔가 재렌더링과 차이가 없어보인다.
  return (
    <div>
      <p>Count = {count}</p>
        <button onClick={() => setCount(prevCount => prevCount + 1)}> 증가 </button> 
    </div>
  )
}