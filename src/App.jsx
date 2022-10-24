import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExamAuth from './authen-libs'

function App() {

  const redirectUrl = "http://localhost:4000/"
  const [email, setEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState("")

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  const handleRegiser = async () => {
    const host = "http://localhost:3000/register"
    try {
      const res = await ExamAuth.AuthPopup(host, redirectUrl, "Register")
      console.log("resgister success::", res)
      const search = new URL(res.href).searchParams

      if(search.get("error")){
        toast.error(search.get("error"))
        return
      }

      const emailReturn = search.get("email");
      // Login 
      toast.success(emailReturn)
    } catch (error) {
      toast.error(error.msg)
      console.log("resgister fails::", error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const host = "http://localhost:3000/login"

    if (!validateEmail(email)) {
      toast.error("Email invalidate")
      return;
    }

    try {

      if(!email){
        setErrorEmail("")
      }

      const res = await ExamAuth.AuthPopup(host, redirectUrl, "Login")
      console.log("login success::", res)
      const search = new URL(res.href).searchParams
      const emailReturn = search.get("email");

      // Login 
      console.log({ email, emailReturn })
      if (email === emailReturn) {
        console.log("Login...")
      } else {
        toast.error("Face not match")
      }

    } catch (error) {
      toast.error(error.msg)
      console.log("login fails::", error)
    }
  }

  return (
    <div className="App">
      <div>
        <a href="#">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Login + Register</h1>
      <div className="card">
        <label id="email">Email</label>
        <input required type='text' value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
        <button type='submit'  onClick={handleLogin} style={{ marginRight: "10px" }}>
          Login
        </button>

        <button onClick={handleRegiser}>
          Register
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
