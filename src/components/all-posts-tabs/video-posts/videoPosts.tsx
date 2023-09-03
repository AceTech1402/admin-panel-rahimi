import { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { NavLink } from "react-router-dom";
import classes from "./videoPosts.module.scss";

export const VideoPosts: React.FC = () => {
  const [checking, setChecking] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 70 },
    { field: "title", headerName: "عنوان", width: 130 },
    { field: "videoLink", headerName: "آدرس ویدیو", width: 200 },
    { field: "coverLink", headerName: "آدرس کاور", width: 200 },
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

  const rows = [
    { id: 1, title: "Snow", videoLink: "Jon", coverLink: 35 },
    { id: 2, title: "Lannister", videoLink: "Cersei", coverLink: 42 },
    { id: 3, title: "Lannister", videoLink: "Jaime", coverLink: 45 },
    { id: 4, title: "Stark", videoLink: "Arya", coverLink: 16 },
    { id: 5, title: "Targaryen", videoLink: "Daenerys", coverLink: null },
    { id: 6, title: "Melisandre", videoLink: null, coverLink: 150 },
    { id: 7, title: "Clifford", videoLink: "Ferrara", coverLink: 44 },
    { id: 8, title: "Frances", videoLink: "Rossini", coverLink: 36 },
    { id: 9, title: "Roxie", videoLink: "Harvey", coverLink: 65 },
  ];

  return (
    <div className={classes.video_posts}>
      <NavLink to="/admin/posts/video-post" className={classes.new_post}>ایجاد پست جدید</NavLink>
      <div className={classes.table}>
        <div
          className={classes.checkbox_wrapper}
          onClick={() => changeSelectedRows()}
        >
          <input type="checkbox" />
          <div className={classes.checkbox}></div>
          <p>انتخاب چند پست</p>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          onRowClick={() => {
            console.log(true);
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={checking ? true : false}
        />
      </div>
    </div>
  );
};
