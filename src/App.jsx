import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import Home from './pages/Home';
import SendLetter from './pages/SendLetter.jsx';
import Sucesso from './pages/Sucesso';
import Admin from './pages/Admin.jsx';
import CustomCursor from './components/romantic/CustomCursor';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/envio" element={<SendLetter />} />
            <Route path="/sucesso" element={<Sucesso />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<PageNotFound />}
            />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App