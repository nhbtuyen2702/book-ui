import React, { Component, useContext } from 'react'

const AuthContext = React.createContext()

class AuthProvider extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    const user = localStorage.getItem('user')
    this.setState({ user })
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

  userIsAuthenticated = () => {
    return localStorage.getItem('user') !== null
  }

  userLogin = user => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState({ user })
  }

  userLogout = () => {
    localStorage.removeItem('user')
    this.setState({ user: null })
  }

  render() {
    const { children } = this.props //this.props.children để lấy ra tất cả component con của component hiện tại(AuthProvider)
    const { user } = this.state
    const { getUser, userIsAuthenticated, userLogin, userLogout } = this
    //dùng props thì phải truyền từ component cha đi xuống từng component con -->có những component con ko cần tới dữ liệu này
    //dùng context khi muốn truyền dữ liệu từ component cha sang component con -->các component con khi muốn truy cập tới dữ liệu này 
    //thì chỉ cần inject vào(Inversion of control)

    //truyền state user và tất cả các phương thức getUser, userIsAuthenticated, userLogin, userLogout qua cho các component con
    return (
      <AuthContext.Provider value={{ user, getUser, userIsAuthenticated, userLogin, userLogout}}>
        {children}
      </AuthContext.Provider>
    )
  }
}

//chỉ những class, phương thức, biến được export thì class khác mới được import
export default AuthContext 

export function useAuth() { //các component con sẽ sử dụng phương thức useAuth() để lấy các giá trị trong context
  return useContext(AuthContext) 
}

export { AuthProvider }