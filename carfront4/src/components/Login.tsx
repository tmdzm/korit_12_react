import axios from "axios"; // post용
import { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";
import Carlist from "./Carlist";
import { Snackbar } from "@mui/material";

type User = {
  username : string,
  password : string
}

export default function Login(){

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<User>({
    username: '',
    password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user,[e.target.name] : e.target.value })
  }

  const handleLogin = () => {
    axios.post(import.meta.env.VITE_API_URL + '/login',user ,{
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      const jwtToken = res.headers.authorization;
      if(jwtToken !== null && jwtToken !== undefined){
        localStorage.setItem('jwt',jwtToken);
        setAuth(true);
      }
    }).catch(err => {
      console.log('로그인 중 오류 발생 :',err);
      setOpen(true);
    })
  }

  const handleLogOut = () => {
    setAuth(false);
    localStorage.setItem('jwt','');//jwt에 담긴내용 날리기
  }

  if(isAuthenticated){
    return <Carlist logout={handleLogOut}/>
  } else {
    return(
    <>
    <Snackbar
          open={open}
          autoHideDuration={3000/**3초 동안 떠있는다. */} 
          onClose={() => setOpen(false)}
          message='ID 혹은 비밀번호가 틀렸습니다.'
        />
    <Stack spacing={2} alignItems='center' mt = {2}>
      <TextField name='username' label='사용자 이름' onChange={handleChange}></TextField>
      <TextField name='password' label='비밀번호' onChange={handleChange}></TextField>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleLogin}
      >로그인</Button>
    </Stack >
    </>
      )
  }
}