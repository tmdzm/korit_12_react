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
    axios.get<{items : Repository[]}>(`https://api.github.com/search/repositories?q=${keyword}`)//fetch가 아니다. get요청
    .then(response => setRepodata(response.data.items))//generic안에 객체 분해, items안의 키가 repository 배열
    .catch(err => console.log(err));
  };
  
  return (
        <>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          <button onClick={handleClick}>검색</button> 
          {repodata.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            <table>
              <tbody>
                {repodata.map(repo => (
                  <tr key={repo.id}>
                    <td>{repo.full_name}</td>
                    <td>
                      <a href={repo.html_url}>{repo.html_url}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>)
          }
        </>
  )
}

export default App
