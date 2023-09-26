import axios from "axios";
import { useState } from "react";

const useUpdateBooklet = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const updateBooklet = (bookletId: string, data: any) => {
    setLoading(true)
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    data.cover && formData.append("cover", data.cover);
    formData.append("body", data.body);
    formData.append("read_time", data.read_time);
    formData.append("summary", data.summary);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/booklets/update/${bookletId}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        console.log(res);
      });
  };

  return{
    updateBooklet,
    loading
  }
};

export default useUpdateBooklet;
