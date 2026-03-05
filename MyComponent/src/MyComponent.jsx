export default function MyComponent() {
  const handleClick = () => {
    console.log('Button pressed!');
  }
  return (
    <button onClick={handleClick}>Press me</button>
    //괄호를 쓰고 안쓰고의 차이, handleClick()는 함수로 retrun이 있다 즉, 함수의 호출 결과를 담는다. 언제 ? 렌더링 될때
    //괄호를 쓰지 않으면 함수자체를 담지만 호출은 하지 않는다. 호출은 이벤트가 발생하고 나서
  );
} 