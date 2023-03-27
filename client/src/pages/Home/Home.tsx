import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PROJECT_DESCRIPTION, TOAST_CONFIG } from "../../constants/constants";
import ENDPOINTS from "../../constants/endpoints";
import PATHS from "../../constants/routes";
import useFetchUsers from "../../hooks/useFetchUsers";
import Banner from "../../library/Banner/Banner";
import Button from "../../library/Button/Button";
import Container from "../../library/Container/Container";
import Dialog from "../../library/Dialog/Dialog";
import Table from "../../library/Table/Table";
import Wrapper from "../../library/Wrapper/Wrapper";
import "./Home.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { loading, setLoading, setUsers, users } = useFetchUsers();
  const [dialogConfig, setDialogConfig] = useState({
    visible: false,
    id: 0,
  });

  const cols = [
    {
      id: "id",
      label: "ID",
    },
    {
      id: "name",
      label: "Name",
      sort: true,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
    },
    {
      id: "email",
      label: "Email Address",
    },
    {
      id: "actions",
      label: "Action",
    },
  ];

  const deleteData = async (id: number) => {
    setLoading(true);
    const response = await fetch(
      ENDPOINTS.USER_INFO_WITH_ID.replace(":id", id.toString()),
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    const newData = users?.filter(
      (filteredData) => filteredData.id !== data.id
    );
    setUsers(newData);
    setLoading(false);

    setDialogConfig({
      visible: false,
      id: 0,
    });
    toast.info("User Deleted", TOAST_CONFIG);
  };

  const deleteHandler = (id: number) => {
    setDialogConfig({
      visible: true,
      id: id,
    });
  };

  const tableDefs = {
    cols,
    rows: users?.map((data) => {
      return {
        name: data.name,
        id: data.id,
        email: data.email,
        phoneNumber: data.phoneNumber,
        actions: (
          <div className="table-actions">
            <Button
              variant="solid"
              onClick={() =>
                navigate(
                  `${PATHS.USER_FORM.replace(":mode", "edit")}?userId=${
                    data.id
                  }`
                )
              }
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteHandler(data.id ?? 0)}
            >
              Delete
            </Button>
          </div>
        ),
      };
    }),
  };

  const addDataHandler = () => {
    navigate(PATHS.USER_FORM.replace(":mode", "add"));
  };

  return (
    <Wrapper loading={loading} error={false} className="home-wrapper">
      <Container>
        <Banner
          title={PROJECT_DESCRIPTION.TITLE}
          description={PROJECT_DESCRIPTION.DESCRIPTION}
        />
        <div className="page-actions">
          <Button onClick={addDataHandler} variant="solid">
            Add Data
          </Button>
        </div>
        <Table cols={tableDefs.cols} rows={tableDefs.rows} />
        <Dialog
          onClose={() =>
            setDialogConfig({
              id: 0,
              visible: false,
            })
          }
          text="Are you sure you want to delete this user?"
          isVisible={dialogConfig.visible}
          header="Delete Confirmation"
          onButtonClick={() => deleteData(dialogConfig.id)}
        />
      </Container>
    </Wrapper>
  );
};

export default Home;
