import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Repositories from './Repositories';
import './App.css'

const queryClient = new QueryClient();

function App() {

  //input을 넣으려면?
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Repositories/>
      </QueryClientProvider>
    </>
  )
}

export default App
