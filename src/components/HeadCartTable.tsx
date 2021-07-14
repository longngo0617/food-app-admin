import {
    TableRow,
    TableCell,
    Checkbox,
    TableSortLabel,
  } from "@material-ui/core";
  import React from "react";
  import TableHead from "@material-ui/core/TableHead";
  
  type Order = "asc" | "desc";
  
  interface Data {
    id: string;
    createdAt: number;
    status: boolean;
    total: number;
  }
  
  interface HeadCartTableProps {
    classes: any;
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
  const headCells: HeadCell[] = [
    { id: "id", numeric: false, disablePadding: true, label: "STT" },
    { id: "createdAt", numeric: true, disablePadding: false, label: "Ngày lập" },
    { id: "status", numeric: true, disablePadding: false, label: "Tình trạng" },
    { id: "total", numeric: true, disablePadding: false, label: "Tổng tiền" },
  ];
  export const HeadCartTable: React.FC<HeadCartTableProps> = (props) => {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property: keyof Data) => (
      event: React.MouseEvent<unknown>
    ) => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  