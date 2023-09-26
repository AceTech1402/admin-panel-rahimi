import axios from "axios";
import { useState } from "react";

const useCreateVideo = () => {
  const [loading, setloading] = useState<boolean>(false);

  const callAPiPostVideo = (data: any) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("link", data.link);
    formData.append("cover", data.cover);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    data.categories__id && formData.append("categories__id", data.categories__id);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/videos`, formData, {
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
    callAPiPostVideo,
  };
};

export default useCreateVideo;
