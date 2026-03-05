import { useState } from 'react';

export default function MyForm2() {
  const [text, setText] = useState('');// setText는 최신값으로 덮어쓰는 함수

  const handleChange = (event) => {
    console.log(event.target.value);
    setText(event.target.value);
  };

  const handleSubmit = event => {// 하나라서 괄호 생략가능
    event.preventDefault();
    alert(`당신은 ${text}라고 입력하셨네요!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder='내용을 입력하시오'
      />
      <input type="submit" value="Press Me!" />
    </form>
  );
}