import React, { useState, useReducer, useEffect } from "react"
import { useImmerReducer } from "use-immer"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:8080"

// Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import Profile from "./components/Profile"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"

// Contexts
//import ExampleContext from "./ExampleContext"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexAppToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexAppToken"),
      username: localStorage.getItem("complexAppUsername"),
      avatar: localStorage.getItem("complexAppAvatar"),
    },
  }
  // useReducer will call us a function with an initial state for every property. It returns then 2 things,
  // the new state and the dispatch. It is powerful since we can handle a combination of state and action we
  // can handle in a single point
  //
  // const [state, dispatch] = useReducer(ourReducer, initialState)
  // immer gives us a copy of state, call draft
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  // anytime loggedIn changes, the  function body will run
  useEffect(() => {
    if (state.loggedIn) {
      // save data to localStorage
      localStorage.setItem("complexAppToken", state.user.token)
      localStorage.setItem("complexAppUsername", state.user.username)
      localStorage.setItem("complexAppAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("complexAppToken")
      localStorage.removeItem("complexAppUsername")
      localStorage.removeItem("complexAppAvatar")
    }
  }, [state.loggedIn])
  // all logic in this function
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        // return { loggedIn: true, flashMessages: state.flashMessages } // flashMessages we don't mutate directly the state
        // use immer with draft
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        // return { loggedIn: false, flashMessages: state.flashMessages }
        // use immer with draft
        draft.loggedIn = false
        return
      case "flashMessage":
        // return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
        draft.flashMessages.push(action.value)
        return
    }
  }

  // The useState with these 2 const will not be used anymore because of useReducer
  //const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexAppToken")))
  //const [flashMessages, setFlashMessages] = useState([])

  //function addFlashMessage(msg) {
  //  setFlashMessages((prev) => prev.concat(msg))
  //}

  return (
    // any child component in value will be able to access that value.
    // This is removed
    // <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>

    // This leads to performance issues, we have to separate state and dispatch
    //<ExampleContext.Provider value={{ state, dispatch }}>

    // A context for state and a context for dispatch
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/profile/:username" exact>
              <Profile />
            </Route>
            <Route path="/create-post" exact>
              <CreatePost></CreatePost>
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
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
