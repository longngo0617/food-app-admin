import {
  createStyles,
  IconButton,
  lighten,
  makeStyles,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import React from "react";
import styled from "styled-components";
import { FormType } from "./FormType";
import { db } from "../firebase/firebase";
import { UserContext } from "../utils/Provider";

interface CustomerTableProps {}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    table: {
      minWidth: 650,
    },
  })
);
interface TypeTableProps {
  data: any;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({}) => {
  const classes = useToolbarStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [customerList, setCustomerList] = React.useState<any[]>([]);
  const [addressList, setAddressList] = React.useState<any[]>([]);
  let numSelected = selected.length;
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const { getUsers } = React.useContext(UserContext);
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const fetchUser = () => {
    if (!customerList.length) {
      db.collection("Users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            const user = { ...doc.data(), id };
            setCustomerList((customerList) => customerList.concat(user));
          });
        });
    }
  };

  const fetchAddress = () => {
    if (!addressList.length) {
      db.collection("Address")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            const address = { ...doc.data(), id };
            setAddressList((addressList) => addressList.concat(address));
            getUsers(address);
          });
        });
    }
  };

  const getPhone = (id: string) => {
    const user = addressList.find((p: any) => p.userId === id);
    if (user) {
      return user.phoneNumber;
    } else {
      return undefined;
    }
  };

  const getAddress = (id: string) => {
    const address = addressList.filter((p: any) => p.userId === id);
    if (address) {
      return address;
    }
    return undefined;
  };
  React.useEffect(() => {
    fetchUser();
    fetchAddress();
  }, []);

  return (
    <Page>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Quản lí khách hàng
          </Typography>
        )}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    numSelected > 0 && numSelected < customerList.length
                  }
                  checked={
                    customerList.length > 0 &&
                    numSelected === customerList.length
                  }
                  //   onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerList &&
              customerList.map((row: any, index: number) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row.email}
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.fullname}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {getPhone(row.id) && getPhone(row.id)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {getAddress(row.id) &&
                        getAddress(row.id)?.map((p) => <p>{p.address}</p>)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  padding: 16px 32px;
`;
