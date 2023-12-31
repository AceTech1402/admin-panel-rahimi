import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import classes from "./tableAcceptedClubs.module.scss";
import { SearchIcon } from "../../svgs/svgs";
import { createRef, useState } from "react";

export const TableAcceptedClubs: React.FC = () => {
  const [checking, setChecking] = useState<boolean>(false);

  let InputSearch = createRef<HTMLInputElement>();

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

  const changeSelectedRows = () => {
    setChecking((state) => !state);
  };

  const [rows, setRows] = useState<any[]>([
    { id: 1, profileImage: "Snow", userName: "Jon", email: 35 },
    { id: 2, profileImage: "Lannister", userName: "Cersei", email: 42 },
    { id: 3, profileImage: "Lannister", userName: "Jaime", email: 45 },
    { id: 4, profileImage: "Stark", userName: "Arya", email: 16 },
    { id: 5, profileImage: "Targaryen", userName: "Daenerys", email: null },
    { id: 6, profileImage: "Melisandre", userName: "bardia", email: 150 },
    { id: 7, profileImage: "Clifford", userName: "Ferrara", email: 44 },
    { id: 8, profileImage: "Frances", userName: "Rossini", email: 36 },
    { id: 9, profileImage: "Roxie", userName: "Harvey", email: 65 },
  ]);

  const [listClub, setListClub] = useState<any[]>(rows);

  const SearchinputFilter = () => {
    // let allUsers = rows;
    let filterUsers: any[] = [];
    setListClub([]);
    if (InputSearch.current) {
      if (InputSearch.current.value !== "") {
        let value = InputSearch.current.value.toLowerCase();
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].userName.toLowerCase().indexOf(value) > -1) {
            filterUsers = [...filterUsers, rows[i]];
          }
        }
        setListClub(filterUsers);
      } else {
        setListClub(rows);
      }
    }
  };

  return (
    <div className={classes.table_wrapper}>
      <div className={classes.header}>
        <div className={classes.search}>
          <input
            type="search"
            placeholder="سرچ بر اساس اسم کلاب"
            ref={InputSearch}
            onInput={() => SearchinputFilter()}
          />
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
        {listClub.length > 0 ? (
          <>
            <div
              className={classes.checkbox_wrapper}
              onClick={() => changeSelectedRows()}
            >
              <input type="checkbox" />
              <div className={classes.checkbox}></div>
              <p>انتخاب چند کلاب</p>
            </div>
            <DataGrid
              rows={listClub}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection={checking ? true : false}
            />
          </>
        ) : (
          <div className={classes.empty_column}>
            <p>کلابی پیدا نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};
