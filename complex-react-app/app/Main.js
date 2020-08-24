import React, { useState } from "react"
import ReactDOM from "react-dom"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexAppToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <BrowserRouter>
      <FlashMessages messages={flashMessages} />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/create-post" exact>
          <CreatePost addFlashMessage={addFlashMessage}></CreatePost>
        </Route>
        <Route path="/post/:id" exact>
          <ViewSinglePost></ViewSinglePost>
        </Route>
        <Route path="/about-us" exact>
          <About></About>
        </Route>
        <Route path="/terms" exact>
          <Terms></Terms>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
