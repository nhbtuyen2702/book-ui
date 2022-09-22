import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import PrivateRoute from './components/misc/PrivateRoute'
import Navbar from './components/misc/Navbar'
import Home from './components/home/Home'
import Login from './components/home/Login'
import Signup from './components/home/Signup'
import AdminPage from './components/admin/AdminPage'
import UserPage from './components/user/UserPage'

function App() {
  //thuộc tính exact dùng để nói rằng khi truy cập đúng 100% đường dẫn khai báo thì nó mới vào
  //nếu ko có exact thì nó chỉ cần thấy đúng phần đầu của đường dẫn là nó sẽ vào -->/login, /signup, /adminpage, /userpage sẽ cùng vào / vì phần đầu là /
  //thứ tự luồng chạy khi truy cập đường dẫn localhost:3000 là App.js(khởi tạo các route) > AuthContext.js(khởi tạo context) > Navbar.js > Home.js(vì đang truy cập /)
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <PrivateRoute path='/adminpage' component={AdminPage} />
        <PrivateRoute path='/userpage' component={UserPage} />
      </Router>
    </AuthProvider>
  )
}

export default App
