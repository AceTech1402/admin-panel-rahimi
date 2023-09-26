import axios from "axios";
import { useState } from "react";

const useGetOneBook = () => {
  const [dataBook, setDataBook] = useState<any>()
  const getOneBookPost = (books__id: string) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/books/${books__id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        if(res.data.result) {
          setDataBook(res.data.data.row)
        }
      });
  };

  return {
    getOneBookPost,
    dataBook
  };
};

export default useGetOneBook;
