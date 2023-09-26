import axios from "axios";
import { useState } from "react";

const useGetAllPosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([])

  const getAllPosts = (post: string) => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_BASE_URL}/${post}`, {
      headers: {
        Accept: "application/json",
      },
    }).then((res) => {
      setLoading(false)
      if(res.data.result) {
        console.log(res.data.data.rows)
        setPosts(res.data.data.rows)
      }
    })
  };

  return {
    getAllPosts,
    loading,
    posts,
  }
};

export default useGetAllPosts;
