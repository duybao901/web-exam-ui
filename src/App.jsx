import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

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

    if(!registerWindowPopup){
      
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
        <button style={{ marginRight: "10px" }}>
          Login
        </button>

        <button onClick={handleRegiser}>
          Register
        </button>
      </div>
    </div>
  )
}

export default App
