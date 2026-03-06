import { useState } from 'react'

export default function Users() {

  const [users  , setUsers] = useState('')  
  const [password, setPassword] = useState('')  
  const [email  , setEmail] = useState('')

  // const [users, setUsers] = useState({
  //   users: '',
  //   password: '',
  //   email: ''
  // })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`유저이름은 ${users}, password: ${password}, email: ${email}`)
  }

  // const handleChange = (e) => {
  //   setUsers({
  //     ...users,
  //     [e.target.name]: e.target.value
  //   })
  // }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="users">Users</label><br />
      <input type="text" value={users} onChange={(e) => setUsers(e.target.value)}/><br /><br />
      <label htmlFor="password">Password</label><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br /><br />
      <label htmlFor="email">Email</label><br />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/><br /><br />
      <br />
      {/* <button onClick={handleSubmit}>제출</button> form으로 감싼뒤 제출하는것과 아닌것의 차이는 뭔가*/}
      <input type="submit" />
    </form>
      
  )

}