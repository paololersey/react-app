import React, { useEffect, useState, useContext } from "react"
//import ExampleContext from "../ExampleContext"
import DispatchContext from "../DispatchContext"
import { Link } from "react-router-dom"

function HeaderLoggedIn(props) {
  //const { setLoggedIn } = useContext(ExampleContext)
  const appDispatch = useContext(DispatchContext)

  function handleLogout() {
    //props.setLoggedIn(false)

    //replace te following with the dispatch action
    // setLoggedIn(false)
    appDispatch({ type: "logout" })

    localStorage.removeItem("complexAppToken")
    localStorage.removeItem("complexAppUsername")
    localStorage.removeItem("complexAppAvatar")
  }

  return (
    <>
      <div className="flex-row my-3 my-md-0">
        <a href="#" className="text-white mr-2 header-search-icon">
          <i className="fas fa-search"></i>
        </a>
        <span className="mr-2 header-chat-icon text-white">
          <i className="fas fa-comment"></i>
          <span className="chat-count-badge text-white"> </span>
        </span>
        <a href="#" className="mr-2">
          <img className="small-header-avatar" src={localStorage.getItem("complexAppAvatar")} />
        </a>
        <Link className="btn btn-sm btn-success mr-2" to="/create-post">
          Create Post
        </Link>
        <button onClick={handleLogout} className="btn btn-sm btn-secondary">
          Sign Out
        </button>
      </div>
    </>
  )
}

export default HeaderLoggedIn
