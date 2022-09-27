import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

//<PrivateRoute path='/adminpage' component={AdminPage} /> -->Component = {AdminPage} và ...rest = path='/adminpage'
//có thể sử dụng function PrivateRoute(props) {
//  const { component,  path } = props; //biến component có giá trị là {AdminPage} và biến path có giá trị là '/adminpage'
//}
function PrivateRoute({ component: Component, ...rest }) {
  const { userIsAuthenticated } = useAuth()

  //chỗ này đang tự tạo ra 1 Route bằng cách mới, ko dùng cách cũ là <Route path='/adminpage' component={AdminPage}  />
  //vì nếu khai báo thuộc tính path trong Route mới thì nó sẽ kiểm tra khi nào path khớp nó mới vào nhưng mà mình đang muốn nó luôn vào chỉ kiểm tra login hay chưa thôi
  //ko dùng path mà muốn đi tới component đó thì dùng render, trong render sẽ khai báo điều kiện kiểm tra và đường dẫn sẽ đến nếu điều kiện đúng
  return <Route {...rest} render={props => (
    userIsAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />  //phải đặt <Redirect> trong return/return, 
    //props.location là đường dẫn người dùng đang muốn truy cập sau khi login thành công
  )} />
}

export default PrivateRoute