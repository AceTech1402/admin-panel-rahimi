import axios from "axios";

const useDeleteVideos = () => {
  const deleteVideos = (data: any[]) => {
    const formData = new FormData();
    formData.append("selected_items",JSON.stringify(data));

    axios.post(`${process.env.REACT_APP_BASE_URL}/videos/delete`, formData, {
      headers:{
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
      }
    }).then((res) => {
      console.log(res)
    })
  }

  return {
    deleteVideos,
  }
}

export default useDeleteVideos;