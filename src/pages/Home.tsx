import React from "react";
import { Route, useRouteMatch } from "react-router";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import { Bar } from "../components/Bar";
import { MessageAlert } from "../components/MessageAlert";
import { PopupAddProduct } from "../components/PopupAddProduct";
import { PopupEditProduct } from "../components/PopupEditProduct";
import Table from "../components/Table";
import { TypeTable } from "../components/TypeTable";
import { db } from "../firebase/firebase";
import { UserContext } from "../utils/Provider";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { getDataType, dataType, success,stateEdit } = React.useContext(UserContext);
  const fetchTypes = async () => {
    if (!dataType.length) {
      db.collection("TypeFoods")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const idType = doc.id;
            const type = { ...doc.data(), idType };
            getDataType(type);
          });
        });
    }
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
          <Route path={`/loai-san-pham`}>
            <TypeTable data={dataType} />
          </Route>
          <Route path={`/quan-li-san-pham`}>
            <Table />
          </Route>
          <Route exact path={`/`}>
            <Table />
          </Route>
        </Switch>
        {open && <PopupAddProduct fc={() => setOpen(false)} data={dataType} />}
        {stateEdit && <PopupEditProduct  data={dataType} />}
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
