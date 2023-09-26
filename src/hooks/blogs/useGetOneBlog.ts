import axios from "axios";
import { useState } from "react";

const useGetOneBlog = () => {
  const [dataBlog, setDataBlog] = useState<any>()
  const getOneBlogPost = (blog__id: string) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/blogs/${blog__id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        if(res.data.result) {
          setDataBlog(res.data.data.row)
        }
      });
  };

  return {
    getOneBlogPost,
    dataBlog
  };
};

export default useGetOneBlog;
