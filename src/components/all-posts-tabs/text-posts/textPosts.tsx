import { NavLink, useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import classes from "./textPosts.module.scss";
import useGetAllPosts from "../../../hooks/useGetAllposts";
import useDeleteBlogs from "../../../hooks/blogs/useDeleteBlogs";
import { Modal } from "./../../modal/modal";
import { Input } from "./../../input/input";
import useCategories from "../../../hooks/useCategories";

interface FormCreateCategory {
  name: string;
  // type: string;
}

export const TextPosts: React.FC = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState<boolean>(false);
  let categorySelect = useRef<HTMLSelectElement | null>(null);
  const { getAllPosts, posts } = useGetAllPosts();
  const { deleteBlogs } = useDeleteBlogs();

  const [blogsId, setBlogsId] = useState<GridRowSelectionModel>([]);
  const [selectedRows, setSelectedRow] = useState<GridRowSelectionModel>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormCreateCategory>();

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "coverImage",
      headerName: "عکس",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={classes.image}>
            <img src={params.row.cover} alt={params.row.userName} />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "title", headerName: "عنوان", width: 130 },
    { field: "author", headerName: "نویسنده", width: 200 },
    { field: "read_time", headerName: "زمان مطالعه", width: 200 },
    { field: "category_name", headerName: "اسم دسته بندی", width: 200 },
    {
      field: "actions",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={classes.buttons}>
            <button
              onClick={() => editItem(params.row.blogs__id)}
              className={`${classes.button} ${classes.edit}`}
            >
              Edit
            </button>
          </div>
        );
      },
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 90,
    // },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  const changeSelectedRows = () => {
    setChecking((state) => !state);
  };

  const [rows, setRows] = useState<any[]>([]);

  const changeCategory = () => {
    console.log(categorySelect.current?.value);
  };

  const editItem = (blogs__id: string) => {
    navigate("/admin/posts/text-post", {
      state: {
        blogs__id,
      },
    });
  };

  useEffect(() => {
    getAllCategoriesOfOneType("blogs");
    getAllPosts("blogs");
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      console.log(posts);
      setRows([]);
      posts.forEach((post, index) => {
        post.id = index + 1;
        if (!post.category) {
          post.category_name = "--";
        }else {
          post.category_name = post.category.name;
        }
      });
      setRows(posts);
    }
  }, [posts]);

  useEffect(() => {
    console.log(selectedRows);
    let selectedDatas: any[] = [];
    selectedRows.forEach((row) => {
      if (posts) {
        let postId = posts.find((item) => item.id === row);
        selectedDatas.push(postId.blogs__id);
      }
    });
    setBlogsId(selectedDatas);
  }, [selectedRows]);

  const deletedSelectedRows = () => {
    deleteBlogs(blogsId);
    getAllPosts("blogs");
  };

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const { createCategory, categories, getAllCategoriesOfOneType } =
    useCategories();

  const closeModal = () => {
    setModalStatus((state) => !state);
  };

  const createCategoryFunc = (data: any) => {
    console.log(data);
    createCategory(data.name, "blogs");
    setModalStatus(false);
  };

  return (
    <>
      <Modal closeModal={closeModal} modalStatus={modalStatus}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <div className={classes.title}>
              <h2>ایجاد دسته بندی جدید</h2>
            </div>
          </div>
          <form
            className={classes.form}
            onSubmit={handleSubmit(createCategoryFunc)}
          >
            <Input
              full={true}
              label="اسم دسته بندی"
              message={errors.name && errors.name.message}
            >
              <input
                type="text"
                {...register("name", {
                  required: "اسم کتگوری خود را انتخاب کنید",
                })}
              />
            </Input>
            <div className={classes.buttons}>
              <button type="submit" className={classes.button}>
                <p>ثبت دسته بندی</p>
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className={classes.text_posts}>
        {/* <div className={classes.category}>
          <div className={classes.label}>
            <p>دسته بندی ها</p>
          </div>
          <form>
            <select onChange={() => changeCategory()} ref={categorySelect}>
              <option value="default">یک دسته بندی انتخاب کن</option>
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <option value={`${category.categories__id}`} key={index}>
                    {category.name}
                  </option>
                ))}
            </select>
            <button type="button" onClick={() => closeModal()}>
              <p>ایجاد دسته بندی جدید</p>
            </button>
          </form>
        </div> */}
        <NavLink to="/admin/posts/text-post" className={classes.new_post}>
          ایجاد پست جدید
        </NavLink>
        {rows.length > 0 ? (
          <div className={classes.table}>
            <div className={classes.header_table}>
              <div
                className={classes.checkbox_wrapper}
                onClick={() => changeSelectedRows()}
              >
                <input type="checkbox" />
                <div className={classes.checkbox}></div>
                <p>انتخاب چند پست</p>
              </div>
              {checking ? (
                <div className={classes.buttons}>
                  <button
                    typeof="button"
                    onClick={() => deletedSelectedRows()}
                    className={`${classes.button} ${classes.delete}`}
                  >
                    <p>delete</p>
                  </button>
                </div>
              ) : null}
            </div>
            <DataGrid
              rows={rows}
              columns={columns}
              // initialState={{
              //   pagination: {
              //     paginationModel: { page: 0, pageSize: 5 },
              //   },
              // }}
              onRowClick={() => {
                console.log(true);
              }}
              onRowSelectionModelChange={(
                newSelection: GridRowSelectionModel,
                details: GridCallbackDetails<any>
              ) => {
                console.log(details);
                console.log(newSelection.values);
                setBlogsId([]);
                setSelectedRow(newSelection);
              }}
              // pageSizeOptions={[5, 10]}
              checkboxSelection={checking ? true : false}
            />
          </div>
        ) : (
          <div className={classes.empty_table}>
            <p>پستی وجود ندارد</p>
          </div>
        )}
      </div>
    </>
  );
};
