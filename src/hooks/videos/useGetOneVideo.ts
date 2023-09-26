import axios from "axios";
import { useState } from "react";

const useGetOneVideo = () => {
  const [dataVideo, setDataVideo] = useState<any>()
  const getOneVideoPost = (videos__id: string) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/videos/${videos__id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        if(res.data.result) {
          setDataVideo(res.data.data.row)
        }
      });
  };

  return {
    getOneVideoPost,
    dataVideo
  };
};

export default useGetOneVideo;
