import axios from "axios";
import { useState } from "react";

const useCreateBooklet = () => {
  const [loading, setloading] = useState<boolean>(false);

  const callAPiPostBooklet = (data: any) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("cover", data.cover);
    formData.append("description", data.description);
    formData.append("link", data.link);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/booklets`, formData, {
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
    callAPiPostBooklet,
  };
};

export default useCreateBooklet;
