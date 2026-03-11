import { 
  Container, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemText, Checkbox, Button, ListItemSecondaryAction 
} from '@mui/material';
//import DeleteIcon from '@mui/icons-material/Delete'; // 삭제 아이콘 추가
import { useState } from 'react';
import './App.css'
import AddTodo from './AddTodo';

export type Todo = {
  todo: string,
  checkbox: boolean,
}

function App() {
  const [items, setItems] = useState<Todo[]>([]);

  // 1. 항목 추가
  const addItem = (item: Todo) => {
    setItems([item, ...items]); 
  };

  // 2. 체크박스 토글
  const toggleTodo = (index: number) => {
    const newItems = [...items];
    newItems[index].checkbox = !newItems[index].checkbox;
    setItems(newItems);
  };

  // 3. 항목 삭제 (index를 기준으로 필터링)
  const deleteTodo = (index: number) => {
    // filter를 사용해 클릭한 index가 아닌 것들만 남깁니다.
    const newItems = items.filter((_, i) => i !== index);
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

        <AddTodo addItem={addItem}/>

        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                <Checkbox 
                  checked={item.checkbox} 
                  onChange={() => toggleTodo(index)} 
                />
                <ListItemText
                  primary={item.todo}
                  style={{ 
                    textDecoration: item.checkbox ? 'line-through' : 'none', 
                    color: item.checkbox ? 'gray' : 'black' 
                  }}
                />
                {/* 리스트 오른쪽에 삭제 버튼 배치 */}
                <ListItemSecondaryAction>
                  <Button aria-label="delete" onClick={() => deleteTodo(index)}>
                    삭제
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>
      </Container>
    </>
  )
}

export default App;