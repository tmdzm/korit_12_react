import { useState } from 'react';

export default function MyForm3() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello ${user.firstName} ${user.lastName} !`);
  };

  //어차피 이니셜밸류(initialValue)가 JS객체니까 함수를 따로 뺐다.
  const handleChange = (e) => {
    setUser({ // 함수를 호출해야하니까 소괄호, argument는 js형식이까 중괄호
      ...user, //기존의 user객체를 복사해서 가져오고
      [e.target.name]: e.target.value //이름이 firstName이든 lastName이든 email이든 상관없이 name속성값을 키로 하고 value값을 값으로 하는 새로운 객체를 만들어서 기존의 user객체에 덮어씌운다.
    });//스프레드 연산자가 객체에서 사용될 때
  };

  return(
    <form onSubmit={handleSubmit}>
      <label>First Name</label><br />
      <input type="text" name="firstName" onChange={handleChange} value={user.firstName}/><br />
      <label>Last Name</label><br />
      <input type="text" name="lastName" onChange={handleChange} value={user.lastName}/><br />
      <label>E-mail</label><br />
      <input type="text" name="email" onChange={handleChange} value={user.email}/><br />
      <br />
      <input type="submit" />
    </form>
  );

}