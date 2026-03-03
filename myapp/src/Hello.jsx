export default function Hello({firstName, lastName}) {
  return <h1>Hello {firstName} {lastName}</h1>
}
// props는 객체이므로 구조분해할당으로 바로 꺼내서 사용할 수 있다.