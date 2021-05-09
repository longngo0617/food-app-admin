import React from "react";
import { Route, useRouteMatch } from "react-router";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import { Bar } from "../components/Bar";
import { PopupAddProduct } from "../components/PopupAddProduct";
import Table from "../components/Table";
import { TypeTable } from "../components/TypeTable";
import { db } from "../firebase/firebase";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [typeFoods, setTypeFoods] = React.useState<any>([]);

  const fetchTypes = async () => {
    const response = db.collection("TypeFoods");
    const data = await response.get();
    data.docs.forEach((item) => {
      const idType = item.id;
      const type = { ...item.data(), idType };
      setTypeFoods((prevType: any) => prevType.concat(type));
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
          <Route exact path={`${url}`}>
            <Table />
          </Route>
          <Route exact path={`${url}/loai-san-pham`}>
            <TypeTable data={typeFoods} />
          </Route>
        </Switch>
        {open && <PopupAddProduct fc={() => setOpen(false)} data={typeFoods} />}
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
