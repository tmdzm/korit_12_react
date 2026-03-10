import axios from 'axios'
import { useQuery } from '@tanstack/react-query';

export default function Repositories(){
  const getRepositories = async () => {
    const response = await axios.get('https://api.github.com/search/repositories?q=korit_12');
    return response.data.items; // useQuery의 data에 들어가는 값, 즉 서로 다른 data이다
  }

  const { isLoading, isError, data} = useQuery({
    queryKey: ['repositories'],
    queryFn: getRepositories,
  });

  if(isLoading) return <p>로딩중</p>

  if(isError) return <p>오류가 발생했습니다.</p>
  else {
    return(
      <table>
        <tbody>
          {//자바 스크립트 변수
            data.map(repo => 
              <tr key={repo.id}>
                <td>{repo.full_name}</td>
                <td>
                  <a href={repo.html_url}>{repo.full_name}의 리포지토리</a>
                </td>
                <td>{repo.node_id}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }  
}