import axios from "axios";

const useDeleteBooks = () => {
  const deleteBooks = (data: any[]) => {
    const formData = new FormData();
    formData.append("selected_items",JSON.stringify(data));

    axios.post(`${process.env.REACT_APP_BASE_URL}/Books/delete`, formData, {
      headers:{
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
      }
    }).then((res) => {
      console.log(res)
    })
  }

  return {
    deleteBooks,
  }
}

export default useDeleteBooks;