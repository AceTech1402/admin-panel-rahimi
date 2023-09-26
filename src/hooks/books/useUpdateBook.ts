import axios from "axios";
import { useState } from "react";

const useUpdateBook = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const updateBook = (bookId: string, data: any) => {
    setLoading(true)
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    data.cover && formData.append("cover", data.cover);
    formData.append("description", data.description);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/books/update/${bookId}`,
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
    updateBook,
    loading
  }
};

export default useUpdateBook;
