import { Container, AppBar, Toolbar, Typography , List, ListItem, ListItemText} from '@mui/material';
import { useState } from 'react';
import './App.css'
import AddTodo from './AddTodo';

export type Todo = {
  todo : string,
  checkbox : boolean,
  
}

function App() {
  const [ items, setItems] = useState<Todo[]>([]);

  const addItem = (item: Todo) => {
    setItems([item, ...items]); // 스프레드 연산자, 근데 순서가 뒤, item을 앞에 새로 추가하고, 나머지는 뒤에 추가하겠다는 의미
    //순서를 바꾸면 방금 추가한 item이 리스트의 맨 뒤에 있게 되는 것이다.
  }

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position='static'>
          {/* position=static을 지우니까 버튼이 묻힌다ㅏ. */}
          <Toolbar>
            <Typography variant='h6'>
              Todo List
            </Typography>
          </Toolbar>
        </AppBar>
        <AddTodo addItem={addItem}/>
        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                <ListItemText
                  primary={item.todo}
                />
              </ListItem>
            )
          }
        </List>

      </Container>
    </>
  )
}

export default App
