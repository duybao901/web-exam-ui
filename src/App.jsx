import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const redirectUrl = "http://localhost:4000/"
  const WIDTH_POPUP = 760
  const HEIGHT_POPUP = 600

  function openPopupResize(urlNavigitation, popupName) {

    const screenLeft = window.screenLeft || window.screenX // IE8
    const screenTop = window.screenTop || window.screenY

    const width = window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const height = window.outerHeight || document.documentElement.clientHeight || document.body.clientHeight

    const left = Math.max(0, (width / 2) - (WIDTH_POPUP / 2) + screenLeft)
    const top = Math.max(0, (height / 2) - (HEIGHT_POPUP / 2) + screenTop)

    const config = `width=${WIDTH_POPUP}, height=${HEIGHT_POPUP}, top=${top}, left=${left}, scrollbars=yes`

    return window.open(urlNavigitation, popupName, config)
  }

  const handleRegiser = () => {
    const host = "http://localhost:3000/register"
    const url = host + `?redirect_url=${redirectUrl}`

    console.log(url)

    const registerWindowPopup = openPopupResize(url, "Tm3 Register")
    console.log("windowpopup", registerWindowPopup)

    if (!registerWindowPopup) {
      toast.warning("Popup Blocked")
    }

    if (registerWindowPopup.focus) {
      window.focus()
    }

    // checking status window
    const intervalId = setInterval(() => {
      if (registerWindowPopup.closed) {
        toast.warning("User Canelled")
        clearInterval(intervalId)
      }

      let href = ""
      try {
        href = registerWindowPopup.location.href
        console.log(href)
      } catch (err) {
        console.log(err)
      }

      // checking href or black page
      if (!href || href === "about::blank") {
        return;
      }

      console.log("href:: back end flask redirect with origin", href)

      if (href.startsWith(redirectUrl)) {
        clearInterval(intervalId)
        toast(href)
        registerWindowPopup.close()
      }


    }, 50)
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
        <button style={{ marginRight: "10px" }}>
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
