import axios from "axios";
import { useState } from "react";

const useUpdateVideo = () => {

  const [loading, setLoading] = useState<boolean>(false)

  const updateVideo = (videoId: string, data: any) => {
    setLoading(true)
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("link", data.link);
    data.cover && formData.append("cover", data.cover);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/videos/update/${videoId}`,
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
    updateVideo,
    loading
  }
};

export default useUpdateVideo;
