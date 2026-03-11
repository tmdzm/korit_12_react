import { Container, AppBar, Toolbar, Typography , List, ListItem, ListItemText} from '@mui/material';
import { useState } from 'react';
import './App.css'
import AddItem from './components/AddItem';

export type Item = {
  product: string;
  amount: string;//나중에 숫자로 바뀔수도, 일단은 string
}

function App() {
  const [ items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item, ...items]); // 스프레드 연산자, 근데 순서가 뒤, item을 앞에 새로 추가하고, 나머지는 뒤에 추가하겠다는 의미
    //순서를 바꾸면 방금 추가한 item이 리스트의 맨 뒤에 있게 되는 것이다.
  }

  return (
    <>
      <Container maxWidth="lg">
        <AppBar >
          {/* position='static' */}
          <Toolbar>
            <Typography variant='h6'>
              Shopping list
            </Typography>
          </Toolbar>
        </AppBar>
        <AddItem addItem={addItem}/>
        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                <ListItemText
                  primary={item.product}
                  secondary={item.amount}
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
