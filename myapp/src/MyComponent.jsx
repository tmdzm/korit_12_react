import { useState } from "react";

export default function MyComponent() {
  //훅 함수는 최상단에 선언되어야 한다.
  const [firstName, setFirstName] = useState('김영');
  
  return(
    <>
      <div>Hello {firstName}</div>
    </>
  );
}