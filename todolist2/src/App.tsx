import { 
  Container, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemText, Checkbox, Button, ListItemSecondaryAction , Box, Dialog, DialogActions, DialogContent, DialogTitle,
  Paper,
  IconButton,
  TextField
} from '@mui/material';
//import DeleteIcon from '@mui/icons-material/Delete'; // 삭제 아이콘 추가
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import './App.css'
import AddTodo from './AddTodo';

export type Todo = {
  id : number;
  text : string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputvalue, setInputValue] = useState('');
  const [ open, setOpen] = useState(false);

  // 1. 항목 추가
  const handleAddTodo = () => {
    if(inputvalue.trim() !== ''){
      setTodos([...todos,
        {id : Date.now(), text: inputvalue.trim(), completed: false}//shopping list와는 다르다
      ])
    }
    setInputValue('');
    setOpen(false); //엔터키로 입력하면 안먹힘... 왜?
  };

  // 2. 체크박스 토글
  const handleToggleTodo = (id : number) => {
    setTodos(
      todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    )
  };

  // 3. 항목 삭제 (index를 기준으로 필터링)
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); // 왜 이렇게 됐는지 .filter()메서드 확인, delete랑 동일한 기능
  };

  //모달 열리고 닫히는 부분
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setInputValue('');
  }

  //mt는 마진 탑의 준말이다.  p는 패딩(안쪽 영역)
  return (
    <>
      <Container maxWidth="sm" sx={{mt: 5}}>
        <Paper elevation={3} sx={{p:4, borderRadius : 2}}> {/**그림자 생성 */}
          {/**타이틀 및 추가 버튼 영역 */}
          <Box sx = {{dispaly : 'flex', justifyContent : 'space-between', alignItems: 'center', mb:3}}>
            <Typography
              variant='h4'
              component='h1'
              color='primary'
              fontWeight='bold'
              sx={{m:0}}
            >
              📋할 일 목록</Typography>

              <Button
                variant='contained'
                color='primary'
                onClick={handleOpenDialog}
                startIcon={<AddIcon/> /**+아이콘 하나 받아왔다 */}
                sx={{mt: 5}}
                disableElevation
              >
                새 할 일
              </Button>
          </Box>

          {/* 할일 list 출력 부분 */}
          <List>
            {
              todos.map(todo => (
                <ListItem
                  key={todo.id}
                  divider
                  secondaryAction={
                    <IconButton edge='end' aria-label='delete' onClick={()=> handleDeleteTodo(todo.id)}>
                      <DeleteIcon color='error'/>
                    </IconButton>
                  }
                  disablePadding
                >
                  <Checkbox
                    edge='start'
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <ListItemText
                    primary={todo.text}
                    sx = {{textDecoration: todo.completed ? 'line-through' : 'none'}}
                  />
                </ListItem>
              ))}
          </List>  
        </Paper>
        {/*추가 버튼 눌렀을 때 dialog 모달 뛰우기  */}
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth='xs'>
          <DialogTitle>새 할일 추가</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='할 일 입력'
              type='text'
              fullWidth
              variant='outlined'
              value={inputvalue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter'){
                  handleAddTodo();
                  setOpen(false);
                } 
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>취소</Button>
            <Button onClick={handleAddTodo} variant='contained' disableElevation>추가</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}

export default App;