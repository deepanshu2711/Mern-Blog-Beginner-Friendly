import Header from "./Header.jsx"
import CreatePost from "./pages/CreatePost.jsx"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import FullPost from "./pages/fullPost.jsx"
import EditPost from "./pages/EditPost.jsx"

function App() {
  

  return (
    
    <BrowserRouter>
    <main className="max-w-5xl mx-auto my-5">
    <Header />
    
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/register" element={<RegisterPage />}/>
    <Route path="/post/:id" element={<FullPost />}/>
    <Route element={<PrivateRoute />}>
    <Route path="/create" element ={<CreatePost />}/>
    <Route path="/edit/:id" element ={<EditPost />}/>

    </Route>
    </Routes>
    </main>
    </BrowserRouter>

    
    

    
  )
}

export default App
