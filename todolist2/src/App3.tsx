//삭제는 없고 체크박스기능만 있음
import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { useState } from 'react';
import './App.css'
import AddTodo from './AddTodo';

export type Todo = {
  todo: string,
  checkbox: boolean,
}

function App() {
  const [items, setItems] = useState<Todo[]>([]);

  const addItem = (item: Todo) => {
    setItems([item, ...items]); 
  };

  // 체크박스 상태를 토글하는 함수
  const toggleTodo = (index: number) => {
    const newItems = [...items];
    newItems[index].checkbox = !newItems[index].checkbox;
    setItems(newItems);
  };

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              Todo List
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 항목 추가 컴포넌트 */}
        <AddTodo addItem={addItem}/>

        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                {/* 1. 체크박스 추가 */}
                <Checkbox 
                  checked={item.checkbox} 
                  onChange={() => toggleTodo(index)} 
                />
                <ListItemText
                  primary={item.todo}
                  // 2. 체크 시 텍스트에 취소선 효과 (선택사항)
                  style={{ textDecoration: item.checkbox ? 'line-through' : 'none', color: item.checkbox ? 'gray' : 'black' }}
                />
              </ListItem>
            )
          }
        </List>
      </Container>
    </>
  )
}

export default App;