import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import classes from "./tableAcceptedUsers.module.scss";
import { SearchIcon } from "../../svgs/svgs";
import { useState } from "react";

export const TableAcceptedUsers: React.FC = () => {
  const [checking, setChecking] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 70 },
    { field: "profileImage", headerName: "عکس", width: 130 },
    { field: "userName", headerName: "اسم کاربر", width: 130 },
    { field: "email", headerName: "ایمیل", width: 130 },
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

  const rows = [
    { id: 1, profileImage: "Snow", userName: "Jon", email: 35 },
    { id: 2, profileImage: "Lannister", userName: "Cersei", email: 42 },
    { id: 3, profileImage: "Lannister", userName: "Jaime", email: 45 },
    { id: 4, profileImage: "Stark", userName: "Arya", email: 16 },
    { id: 5, profileImage: "Targaryen", userName: "Daenerys", email: null },
    { id: 6, profileImage: "Melisandre", userName: null, email: 150 },
    { id: 7, profileImage: "Clifford", userName: "Ferrara", email: 44 },
    { id: 8, profileImage: "Frances", userName: "Rossini", email: 36 },
    { id: 9, profileImage: "Roxie", userName: "Harvey", email: 65 },
  ];

  const changeSelectedRows = () => {
    setChecking((state) => !state);
  };

  return (
    <div className={classes.table_wrapper}>
      <div className={classes.header}>
        <div className={classes.search}>
          <input type="search" placeholder="سرچ بر اساس اسم کاربر" />
          <button type="submit" className={classes.button_search}>
            <div className={classes.icon}>
              <SearchIcon />
            </div>
          </button>
        </div>
        <div className={classes.buttons}>
          <button className={`${classes.button} ${classes.delete}`}>
            <p>حذف</p>
          </button>
          <button className={`${classes.button} ${classes.accept}`}>
            <p>قبول کردن</p>
          </button>
          <button className={`${classes.button} ${classes.reject}`}>
            <p>رد کردن</p>
          </button>
        </div>
      </div>
      <div className={classes.table}>
        <div
          className={classes.checkbox_wrapper}
          onClick={() => changeSelectedRows()}
        >
          <input type="checkbox" />
          <div className={classes.checkbox}></div>
          <p>انتخاب چند کاربر</p>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={checking ? true : false}
        />
      </div>
    </div>
  );
};
