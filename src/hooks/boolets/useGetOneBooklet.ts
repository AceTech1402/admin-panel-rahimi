import axios from "axios";
import { useState } from "react";

const useGetOneBooklet = () => {
  const [dataBooklet, setDataBooklet] = useState<any>()
  const getOneBookletPost = (booklets__id: string) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/booklets/${booklets__id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        if(res.data.result) {
          setDataBooklet(res.data.data.row)
        }
      });
  };

  return {
    getOneBookletPost,
    dataBooklet
  };
};

export default useGetOneBooklet;
