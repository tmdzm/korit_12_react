import {useState} from 'react';
import axios from 'axios';
import './App.css'

type Repository = {
  id : number; // 고유값을 통해서 나중에 .map() 적용했을 때 사용
  full_name: string;
  html_url: string;
};


function App() {
  const [ keyword, setKeyword] = useState('')
  const [ repodata, setRepodata ] = useState<Repository[]>([]);

  const handleClick = () => {
    axios.get<{itmes : Repository[]}>(`https://api.github.com/search/repositories?q=${keyword}`)//fetch가 아니다. get요청
    .then(response => setRepodata(response.data.itmes))//generic안에 객체 분해, items안의 키가 repository 배열
    // .then(data => {
    //   setRepodata({
    //     id: data.items.id,
    //     full_name: data.items.full_name, 
    //     html_url: data.itmens.html_url 이런건 필요없다.
    //   })
    // })
    .catch(err => console.log(err));
  };
  
  return (
        <>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          <button onClick={handleClick}>검색</button> 
        </>

  )
}
//버튼 대신 링크로 한다면???
//버튼 클릭시 GET 요청이 keyword를 포함해서 가야한다.
export default App
