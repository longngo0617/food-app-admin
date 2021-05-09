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

export const TypeTable: React.FC<TypeTableProps> = ({ data }) => {
  const classes = useToolbarStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  let numSelected = selected.length;
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n: any) => n.idType);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleDelete = (event: React.MouseEvent<unknown>) => {
    selected.map((id: string) => {
      return db
        .collection("TypeFoods")
        .doc(id)
        .delete()
        .then(() => {
          removeDataType(id);
        })
        .catch((error: any) => {
          console.error("Error removing document: ", error);
        });
    });
    setSelected([]);
  };
  if (!data) return null;
  return (
    <Page>
      <FormType />
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
            Quản lí loại sản phẩm
          </Typography>
        )}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
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
                  indeterminate={numSelected > 0 && numSelected < data.length}
                  checked={data.length > 0 && numSelected === data.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              <Cell align="right">Tên loại</Cell>
              <Cell align="right">Hình loại sản phẩm</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row: any, index: number) => {
                const isItemSelected = isSelected(row.idType);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row.name}
                    hover
                    onClick={(event) => handleClick(event, row.idType)}
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
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <ImageWrap>
                        <img src={row.image} alt={row.image} />
                      </ImageWrap>
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
const ImageWrap = styled.div`
  width: 100px;
  overflow: hidden;
  img {
    max-width: 100%;
    object-fit: cover;
    height: auto;
  }
`;
const Cell = styled(TableCell)`
  text-align: left !important;
`;
