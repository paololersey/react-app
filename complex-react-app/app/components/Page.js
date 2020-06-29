import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title}`
    window.scrollTo(0, 0) // scroll to upper left of the screen
  }, []) // run this only the first time the component is rendered
  return (
    <>
      <Container wide={props.wide}>{props.children}</Container>
    </>
  )
}

export default Page
