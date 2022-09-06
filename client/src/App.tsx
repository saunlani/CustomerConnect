import { Home } from './Components/Home/Home'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App() {
  return (<>
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  </>)
}