import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Axios from "axios"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfilePosts() {
  const [posts, setPosts] = useState([])
  const { username } = useParams()
  // if the second parameter is [], run the function inside useEffect
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        // console.log(response.data)
        setIsLoading(false)
        setPosts(response.data)
      } catch (e) {
        console.log("There was a problem")
      }
    }
    fetchPosts()
  }, [])
  // we set the state of isLoading to true. Then the idea is that when the call to axios has finished,
  //it will be set to false
  const [isLoading, setIsLoading] = useState(true)
  if (isLoading) return <LoadingDotsIcon />

  return (
    <>
      <div className="list-group">
        {posts.map((post) => {
          const date = new Date(post.createdDate)
          const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
          console.log(dateFormatted)
          return (
            <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
              <span className="text-muted small"> on {dateFormatted} </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default ProfilePosts
