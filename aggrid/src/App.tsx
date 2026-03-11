import {useState} from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRenderer, ICellRendererParams } from 'ag-grid-community';
import './App.css'

//themeQuartz라는 테마형식 안씀, 밑의 import에 사용
// 기본이 쿼츠

//추가된 부분
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ AllCommunityModule ]);

type Repository = {
  id : number; // 고유값을 통해서 나중에 .map() 적용했을 때 사용
  full_name: string;
  html_url: string;
};

function App() {
  const [ keyword, setKeyword] = useState('')
  const [ repodata, setRepodata ] = useState<Repository[]>([]);
  const [ columnDefs ] = useState<ColDef[]>([
    {field: 'id', sortable: true, filter: true},
    {field: 'full_name', sortable: true, filter: true},
    {field: 'html_url', sortable: true, filter: true, headerName : 'url',
      cellRenderer: (params : ICellRendererParams) => (// :가 뜬금없이(삼항연산자같은게 아니라면) 튀어나왔다면 타입스크립트다
        <a 
          href={params.value}
        >
          {params.value}
        </a>
      )
    },
  ]);//컬럼이 여러개니까 배열

  const handleClick = () => {
    axios.get<{items : Repository[]}>(`https://api.github.com/search/repositories?q=${keyword}`)//fetch가 아니다. get요청
    .then(response => setRepodata(response.data.items))//generic안에 객체 분해, items안의 키가 repository 배열
    .catch(err => console.log(err));
  };
  
  return (
        <div className='App'>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
          <button onClick={handleClick}>검색</button> 
          <div className="ag-theme-material"
            style={{ height:500, width: 850}}
          >
            <AgGridReact
              rowData={repodata}
              columnDefs={columnDefs}
              //theme={themeQuartz} 난 안썻다
              pagination={true} // 페이지를 만들기
              paginationPageSize={5}
            />
          </div>
        </div>
  )
}

export default App
