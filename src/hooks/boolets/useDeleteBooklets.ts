import axios from "axios";

const useDeleteBooklets = () => {
  const deleteBooklets = (data: any[]) => {
    const formData = new FormData();
    formData.append("selected_items",JSON.stringify(data));

    axios.post(`${process.env.REACT_APP_BASE_URL}/booklets/delete`, formData, {
      headers:{
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
      }
    }).then((res) => {
      console.log(res)
    })
  }

  return {
    deleteBooklets,
  }
}

export default useDeleteBooklets;