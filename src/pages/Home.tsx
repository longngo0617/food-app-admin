import React from "react";
import { Route, useRouteMatch } from "react-router";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import { Bar } from "../components/Bar";
import { MessageAlert } from "../components/MessageAlert";
import { PopupAddProduct } from "../components/PopupAddProduct";
import Table from "../components/Table";
import { TypeTable } from "../components/TypeTable";
import { db } from "../firebase/firebase";
import { UserContext } from "../utils/Provider";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { getDataType, dataType, success } = React.useContext(UserContext);
  const fetchTypes = async () => {
    db.collection("TypeFoods")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const idType = doc.id;
          const type = { ...doc.data(), idType };
          getDataType(type);
        });
      });
  };
  React.useEffect(() => {
    fetchTypes();
  }, []);
  const { url } = useRouteMatch();
  return (
    <Wrap>
      <Page>
        <Bar fc={() => setOpen(true)} />
        <Switch>
          <Route path={`${url}/quan-li-san-pham`}>
            <Table />
          </Route>
          <Route exact path={`${url}/loai-san-pham`}>
            <TypeTable data={dataType} />
          </Route>
        </Switch>
        {open && <PopupAddProduct fc={() => setOpen(false)} data={dataType} />}
        {success && <MessageAlert />}
      </Page>
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
`;
const Page = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
`;
