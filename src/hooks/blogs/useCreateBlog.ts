import axios from "axios";
import { useState } from "react";

const useCreateBlog = () => {
  const [loading, setloading] = useState<boolean>(false);

  const callAPiPostBlog = (data: any) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("cover", data.cover);
    formData.append("body", data.body);
    formData.append("read_time", data.read_time);
    formData.append("summary", data.summary);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/blogs`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "token-admin"
          )}`,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return {
    loading,
    callAPiPostBlog,
  };
};

export default useCreateBlog;
