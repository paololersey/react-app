import React from "react"
import ReactDOM from "react-dom"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import { BrowserRouter, Switch, Route } from "react-router-dom"

function ExampleComponent() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomeGuest></HomeGuest>
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

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
