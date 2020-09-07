import React, { useEffect, useState, useContext } from "react"
import DispatchContext from "../DispatchContext"
import ExampleContext from "../ExampleContext"
import Axios from "axios"

function HeaderLoggedOut(props) {
  //const { setLoggedIn } = useContext(ExampleContext)
  const appDispatch = useContext(DispatchContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    // Axios.post(url, data)
    try {
      const response = await Axios.post("http://localhost:8080/login", {
        username,
        password,
      })
      if (response.data) {
        // console.log(response.data)
        // we don't work to localStorage anymore

        //props.setLoggedIn(true)
        //replace te following with the dispatch action
        //setLoggedIn(true)
        // appDispatch({ type: "login" })
        appDispatch({ type: "login", data: response.data })
      } else {
        console.log("incorrect username/password")
      }
    } catch (e) {
      console.log("user logged out")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={(e) => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={(e) => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
