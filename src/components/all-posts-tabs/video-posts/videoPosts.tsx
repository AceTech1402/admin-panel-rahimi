import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowParams,
  GridRowSelectionCheckboxParams,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { NavLink, useNavigate } from "react-router-dom";
import classes from "./videoPosts.module.scss";
import { Modal } from "./../../modal/modal";
import { Input } from "./../../input/input";
import useCategories from "../../../hooks/useCategories";

import picture from "./../../../assets/pics/data-users-profile/profile-image.jpg";
import useGetAllPosts from "../../../hooks/useGetAllposts";
import useDeleteVideos from "../../../hooks/videos/useDeleteVideos";

interface FormCreateCategory {
  name: string;
  // type: string;
}

export const VideoPosts: React.FC = () => {
  const navigate = useNavigate();
  let categorySelect = useRef<HTMLSelectElement | null>(null);
  const [checking, setChecking] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [typeTab, setTypeTab] = useState<string>("");
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormCreateCategory>();

  const { getAllCategoriesOfOneType, categories, createCategory } =
  useCategories();
  const { getAllPosts, posts } = useGetAllPosts();

  const editItem = (videos__id: string) => {
    navigate("/admin/posts/video-post", {
      state: {
        videos__id,
      },
    });
  };

  const [videosId, setVideosId] = useState<GridRowSelectionModel>([]);
  const [selectedRows, setSelectedRow] = useState<GridRowSelectionModel>([]);

  const { deleteVideos } = useDeleteVideos();

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
    { field: "link", headerName: "لینک ویدیو", width: 200 },
    { field: "category_name", headerName: "اسم دسته بندی", width: 200 },
    {
      field: "actions",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={classes.buttons}>
            <button
              onClick={() => editItem(params.row.videos__id)}
              className={`${classes.button} ${classes.edit}`}
            >
              Edit
            </button>
          </div>
        );
      },
    },
    // { field: "coverLink", headerName: "آدرس کاور", width: 200 },
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

  const closeModal = () => {
    setModalStatus((state) => !state);
  };

  const [rows, setRows] = useState<any[]>([
    // {
    //   id: 1,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 2,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 3,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 4,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 5,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 6,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 7,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 8,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
    // {
    //   id: 9,
    //   cover: picture,
    //   title: "کتاب 1",
    //   link: "https://www.google.com",
    // },
  ]);

  const changeCategory = () => {
    console.log(categorySelect.current?.value);
  };

  const createCategoryFunc = (data: any) => {
    console.log(data);
    createCategory(data.name, "videos");
    setModalStatus(false);
  };

  useEffect(() => {
    getAllCategoriesOfOneType("videos");
    getAllPosts("videos");
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
        selectedDatas.push(postId.videos__id);
      }
    });
    setVideosId(selectedDatas);
  }, [selectedRows]);

  const deletedSelectedRows = () => {
    deleteVideos(videosId);
    getAllPosts("videos");
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
      <div className={classes.video_posts}>
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
        <NavLink to="/admin/posts/video-post" className={classes.new_post}>
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
              // onRowClick={(params: GridRowParams) => {
              //   setVideosId([...videosId, params.row.videos__id]);
              // }}
              onRowSelectionModelChange={(
                newSelection: GridRowSelectionModel,
                details: GridCallbackDetails<any>
              ) => {
                console.log(details);
                console.log(newSelection.values);
                setVideosId([]);
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
