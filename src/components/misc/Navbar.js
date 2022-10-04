import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { useAuth } from '../context/AuthContext'; //chỗ này import từ export phương thức useAuth() của AuthContext -->chạy vào useAuth()

//thứ tự các phương thức sẽ luôn được gọi trong 1 class component hoặc function component -->Constuctor > render/return > componentDidMount
function Navbar() { //Constructor sẽ luôn được chạy đầu tiên
  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const adminPageStyle = () => {
    const user = getUser()
    return user && user.role === 'ADMIN' ? { "display": "block" } : { "display": "none" }
  }

  const userPageStyle = () => {
    const user = getUser()
    return user && user.role === 'USER' ? { "display": "block" } : { "display": "none" }
  }

  const enterMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "none" } : { "display": "block" }
  }

  const logoutMenuStyle = () => {
    return userIsAuthenticated() ? { "display": "block" } : { "display": "none" }
  }

  const colorMenuStyle = () => {
    const user = getUser()
    return user && user.role === 'ADMIN' ? 'teal' : 'blue'
  }

  const logout = () => {
    userLogout() //nếu chạy dòng này nó sẽ gọi qua phương thức userLogout() của AuthContext
  }

  const getUserName = () => {
    const user = getUser()
    return user ? user.name : ''
  }

  //render/return sẽ luôn được chạy sau Constructor -->tất cả các phương thức trong return sẽ được chạy
  //trong render/return muốn hiển thị giá trị hoặc gọi bất kỳ phương thức nào thì dùng dấu {}
  return (
    <Menu inverted color={colorMenuStyle()} stackable size='massive' style={{ borderRadius: 0 }}>
      <Container>
        <Menu.Item header>Book-UI</Menu.Item>
        <Menu.Item as={Link} exact='true' to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/adminpage" style={adminPageStyle()}>AdminPage</Menu.Item>
        <Menu.Item as={Link} to="/userpage" style={userPageStyle()}>UserPage</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/login" style={enterMenuStyle()}>Login</Menu.Item>
          <Menu.Item as={Link} to="/signup" style={enterMenuStyle()}>Sign Up</Menu.Item>
          <Menu.Item header style={logoutMenuStyle()}>{`Hi ${getUserName()}`}</Menu.Item>
          <Menu.Item as={Link} to="/" style={logoutMenuStyle()} onClick={logout}>Logout</Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Navbar
