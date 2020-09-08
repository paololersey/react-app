import React, { useEffect, useState, useContext } from "react"
//import ExampleContext from "../ExampleContext"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { Link } from "react-router-dom"

function HeaderLoggedIn(props) {
  //const { setLoggedIn } = useContext(ExampleContext)
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  function handleLogout() {
    //props.setLoggedIn(false)

    //replace te following with the dispatch action
    // setLoggedIn(false)
    appDispatch({ type: "logout" })
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
        <Link className="mr-2" to={`/profile/${appState.user.username}`}>
          <img className="small-header-avatar" src={appState.user.avatar} />
        </Link>
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
