import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import classes from "./tableAllUsers.module.scss";
import { SearchIcon } from "../../svgs/svgs";
import { createRef, useState } from "react";
import { Modal } from "./../../modal/modal";

//images
import ProfileImage from "./../../../assets/pics/data-users-profile/profile-image.jpg";

export const TableAllUsers: React.FC = () => {
  const [checking, setChecking] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  let InputSearch = createRef<HTMLInputElement>();

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "profileImage",
      headerName: "عکس",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={classes.image}>
            <img src={params.row.avatar} alt={params.row.userName} />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "userName", headerName: "اسم کاربر", width: 170 },
    { field: "email", headerName: "ایمیل", width: 250 },
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
  const [rows, setrows] = useState<any[]>([
    {
      id: 1,
      avatar: ProfileImage,
      userName: "Jon Snow",
      email: "example@gmail.com",
    },
    {
      id: 2,
      avatar: ProfileImage,
      userName: "Cersei Lannister",
      email: "example@gmail.com",
    },
    {
      id: 3,
      avatar: ProfileImage,
      userName: "Jaime Lannister",
      email: "example@gmail.com",
    },
    {
      id: 4,
      avatar: ProfileImage,
      userName: "Arya Stark",
      email: "example@gmail.com",
    },
    {
      id: 5,
      avatar: ProfileImage,
      userName: "Daenerys Targaryen",
      email: "example@gmail.com",
    },
    {
      id: 6,
      avatar: ProfileImage,
      userName: "bardia Melisandre",
      email: "example@gmail.com",
    },
    {
      id: 7,
      avatar: ProfileImage,
      userName: "Ferrara Clifford",
      email: "example@gmail.com",
    },
    {
      id: 8,
      avatar: ProfileImage,
      userName: "Rossini Frances",
      email: "example@gmail.com",
    },
    {
      id: 9,
      avatar: ProfileImage,
      userName: "Harvey Roxie",
      email: "example@gmail.com",
    },
  ]);

  const [listUsers, setListUsers] = useState<any[]>(rows);
  // const [filterUsers, setFilterUsers] = useState<any[]>([])

  const changeSelectedRows = () => {
    setChecking((state) => !state);
  };

  const SearchinputFilter = () => {
    // let allUsers = rows;
    let filterUsers: any[] = [];
    setListUsers([]);
    if (InputSearch.current) {
      if (InputSearch.current.value !== "") {
        let value = InputSearch.current.value.toLowerCase();
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].userName.toLowerCase().indexOf(value) > -1) {
              filterUsers = [...filterUsers, rows[i]];
            }
          }
          setListUsers(filterUsers);
        }
      } else {
        setListUsers(rows);
      }
    }
  };

  const closeModal = () => {
    setModalStatus((state) => !state);
  };
  const showModal = (data: any) => {
    setModalStatus(true);
    console.log(data);
  };

  return (
    <>
      <Modal modalStatus={modalStatus} closeModal={closeModal}>
        <div className={classes.header}>
          <div className={classes.title}>
            <h2>اطلاعات کاربران</h2>
          </div>
        </div>
        <div className={classes.body}></div>
      </Modal>
      <div className={classes.table_wrapper}>
        <div className={classes.header}>
          <div className={classes.search}>
            <input
              type="search"
              placeholder="سرچ بر اساس اسم کاربر"
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
          {listUsers.length > 0 ? (
            <>
              <div
                className={classes.checkbox_wrapper}
                onClick={() => changeSelectedRows()}
              >
                <input type="checkbox" />
                <div className={classes.checkbox}></div>
                <p>انتخاب چند کاربر</p>
              </div>
              <DataGrid
                rows={listUsers}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                onRowClick={(data: any) => showModal(data)}
                pageSizeOptions={[5, 10]}
                checkboxSelection={checking ? true : false}
              />
            </>
          ) : (
            <div className={classes.empty_column}>
              <p>کاربری پیدا نشد</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
