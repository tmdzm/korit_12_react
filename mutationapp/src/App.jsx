
import './App.css'
import { useQuery, useMutation, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PlusCircle, Loader2, FileText, Send, Plus } from "lucide-react";

//GET 요청하는 함수 -> 나중에 JS로 분리 가능
const getPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
  if(!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다.') // ok가 아니라면
  return response.json(); // 아까 전엔 data에 넣어서 그걸 리턴했었다<div className=""></div>
}

// POST 요청하는 함수 -> 나중에 js로 분리가능
const createPost = async ({title,body}) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
    method : 'POST',
    body: JSON.stringify({title, body, userId : 1}),
    headers: {'Content-Type' : 'application/json; charset=UTF-8'}
  });
  return response.json();
}

// React Query 이용하기 위한 객체 생성
const queryClient = new QueryClient();

function PostApp() {
  const client = useQueryClient();

  const {isLoading, error, data : posts} = useQuery({ // 구조분해로 선언
    queryKey : ['posts'],
    queryFn : getPosts
  });

  const createMutate = useMutation({
    mutationFn: createPost,
    onSuccess : (newPost) => {
      client.invalidateQueries(['posts']);
      console.log(`포스트 발급 완료 : ${newPost}`)
    }
  })

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const title = formData.get('title');
  const content = formData.get('content');

  if(!title || !content) return;
  //mutate 함수를 호출하여 API 요청을 보낼 예정
  createMutate.mutate({title,body: content}); // body라는 이름으로 content 넣음

  //form 약식 초기화
  e.currentTarget.reset();
}

  return(
  <>
    <div>
      <header>
        <h1>
          <FileText/> JSON Placeholder
        </h1>
        <p>react-query 활용 데이터 관리 예제</p>
      </header>
      {/* Post 작성 부분, required가 뭐지*/ }
      <section>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">제목</label>
              <input 
                name="title"
                type="text" 
                placeholder='제목을 입력하세요!'
                required/>
            </div>
            <div>
              <label>내용</label>
              <textarea 
                name="content"
                rows='3'
                placeholder='내용을 입력하세요!'
                required
              ></textarea>
            </div>
            <button 
              type='submit'
              disabled={createMutate.isPending}
            >
              {
                createMutate.isPending ? (
                  <Loader2/>
                ) : (
                  <Send/>
                )}
              {createMutate.isPending ? '전송 중 ...' : '포스트 작성하기'}
            </button>
          </form>
      </section>

      {/*포스트 목록 출력 */}
      <section>
        <h2>
          <PlusCircle/>
          Current Posts
        </h2>
        {
          isLoading ? (
            <div>
              <Loader2/>
              <p>데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div>오류가 발생했습니다. : {error.message}</div>
          ) : (
            <div>
              {
                posts.map(post => (
                  <div
                    key={post.id}
                  >
                    <span>Post : # {post.id}</span>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                ))//post => ()는 한줄로 여기라는 것
              }
            </div>
          )
        }
      </section>
    </div>
  </>
);
}

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <PostApp/>
    </QueryClientProvider>
  )
}

export default App
