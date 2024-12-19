import React, { useState } from 'react'
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import "./Login_Register.css"
const AuthForm = () => {
    const [isLogin,setIsLogin] = useState(true)

  return (
    <div className="container">
        <div className="form-container">
            <div className='form-toggle'>
                <button className={isLogin ? 'active' :""} onClick={()=>setIsLogin(true)}>Login</button>
                <button className={!isLogin ? 'active' :""} onClick={()=>setIsLogin(false)}>Signup</button>
            </div>
            {isLogin ? <>
                <LoginPage isLogin={isLogin} setIsLogin={setIsLogin}/>
            </>:<>
            <RegisterPage/>
            </>}
        </div>
    </div>
  )
}

export default AuthForm