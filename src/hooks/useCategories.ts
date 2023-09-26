import axios from "axios";
import { useState } from "react";
import { CategoriesType } from "../types/types";

const useCategories = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  const getAllCategories = () => {

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/categories/get`, {
        headers: {
          Accept: "application/json",
          // "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.result) {
          console.log(res.data.data);
          setCategories(res.data.data.rows);
        }
      });
  };

  //create video category
  const createCategory = (name: string, type: string) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/categories`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
        },
      })
      .then((res) => {
        if (res.data.result) {
          console.log(res.data.data);
          setCategories([
            ...categories,
            {
              name: name,
              categories__id: res.data.data.row.categories__id,
            },
          ]);
        }
      });
  };

  const getAllCategoriesOfOneType = (type: string) => {
    let formData = new FormData();
    formData.append("type", type);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/categories/get`, formData, {
        headers: {
          Accept: "application/json",
          // "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.result) {
          console.log(res.data.data);
          setCategories(res.data.data.rows);
        }
      });
  };

  return {
    getAllCategories,
    categories,
    createCategory,
    getAllCategoriesOfOneType,
  };
};

export default useCategories;
