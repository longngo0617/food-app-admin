import {
    Checkbox, createStyles,
    makeStyles, Paper, Table,
    TableBody, TableCell, TableContainer, TablePagination, TableRow, Theme
} from "@material-ui/core";
import moment from 'moment';
import React from "react";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import FormatNumber from '../utils/FormatNumber';
import { UserContext } from "../utils/Provider";
import { HeadCartTable } from "./HeadCartTable";
import { CartToolBar } from "./CartToolBar";

interface BillTableProps {}
interface Data {
    id: string;
    createdAt: number;
    status: boolean;
    total: number;
}
type Order = "asc" | "desc";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "12px 16px",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

const Page = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  padding: 16px 32px;
`;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

export const BillTable: React.FC<BillTableProps> = ({}) => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [cartList, setCartList] = React.useState<any[]>([]);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("total");
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, cartList.length - page * rowsPerPage);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const { removeDataType } = React.useContext(UserContext);
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

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = cartList.map((n: Data) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchCarts = async () => {
    if (!cartList.length) {
      db.collection("Carts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            const cart = { ...doc.data(), id };
            setCartList((cartList) => cartList.concat(cart));
          });
        });
    }
  };

  const handleDelete = () => {
      console.log('11')
    selected.map((id: string) => (
      db.collection("Carts")
        .doc(id)
        .delete()
        .then(() => {
            const filtered = cartList.filter((x:any) => x.id !== id);
            setCartList(filtered);
            setSelected([]);
        })
        .catch((error: any) => {
          console.error("Error removing document: ", error);
        })
    ));
  };

  console.log(selected)

  React.useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CartToolBar
          numSelected={selected.length}
          handleDelete={() => handleDelete()}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <HeadCartTable
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={cartList.length}
            />
            <TableBody>
              {stableSort(cartList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id as string);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                         onClick={(event) => handleClick(event, row.id as string)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {index}
                      </TableCell>
                      <TableCell align="right">{moment(row.createdAt).format('L')}</TableCell>
                      <TableCell align="right">{row.status ? "Đã hoàn thành" : "Đang xử lý"}</TableCell>
                      <TableCell align="right" padding="none">
                        {FormatNumber(row.total as number)} VND
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cartList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
