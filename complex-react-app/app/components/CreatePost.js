import React, { useEffect, useState, useContext } from "react"
import Page from "./Page"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import DispatchContext from "../DispatchContext"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  // const { addFlashMessage } = useContext(ExampleContext)
  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: localStorage.getItem("complexAppToken") })
      console.log("new post was created")
      // redirect to te new post url
      props.history.push(`/post/${response.data}`)

      //replace te following with the dispatch action
      //props.addFlashMessage("Great message")
      appDispatch({ type: "flashMessage" }, { value: "Great message!" })
    } catch (e) {
      console.log("new post wasn't created")
    }
  }
  return (
    <>
      <Page title="Create a new post">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-title" className="text-muted mb-1">
              <small>Title</small>
            </label>
            <input autoFocus onChange={(e) => setTitle(e.target.value)} name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="post-body" className="text-muted mb-1 d-block">
              <small>Body Content</small>
            </label>
            <textarea onChange={(e) => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
          </div>
          <button className="btn btn-primary">Save New Post</button>
        </form>
      </Page>
    </>
  )
}
export default withRouter(CreatePost)
