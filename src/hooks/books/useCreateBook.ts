import axios from "axios";
import { useState } from "react";

const useCreateBook = () => {
  const [loading, setloading] = useState<boolean>(false);

  const callAPiPostBook = (data: any) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("cover", data.cover);
    formData.append("description", data.description);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/books`, formData, {
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
    callAPiPostBook,
  };
};

export default useCreateBook;
