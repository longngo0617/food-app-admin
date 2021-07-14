import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import styled from "styled-components";
import { UserContext } from "../utils/Provider";
import { makeStyles } from "@material-ui/core/styles";
import FormatNumber from "../utils/FormatNumber";
interface DetailBillProps {}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const DetailBill: React.FC<DetailBillProps> = (props) => {
  const { listItemBill, closeBill }: any = React.useContext(UserContext);
  const classes = useStyles();

  return (
    <Container>
      <Overlay />
      <div className="follow-main">
        <div className="follow-modal">
          <Wrapper>
            <div className="follow-modal-top" style={{ borderBottom: "0px" }}>
              <div className="follow-modal-top-icon">
                <IconButton
                  aria-label="close-icon"
                  color="primary"
                  onClick={() => closeBill()}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="follow-modal-top-text">
                <h2 className="title">Danh sách hoá đơn</h2>
              </div>
            </div>
          </Wrapper>
          <Padding>
            <div className="follow-modal-bottom" style={{maxWidth:"unset"}}>
              <div className="profile__wrapper">
                <div className="profile__wrapper">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="right">Hình</TableCell>
                            <TableCell align="right">Tên món ăn </TableCell>
                            <TableCell align="right">Đơn giá</TableCell>
                            <TableCell align="right">Số lượng</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listItemBill.map((row: any, index: number) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {index}
                              </TableCell>
                              <TableCell align="right">
                                <ImageWrap>
                                  <img
                                    src={row.food.image as string}
                                    alt={row.food.name as string}
                                  />
                                </ImageWrap>
                              </TableCell>
                              <TableCell align="right">
                                {row.food.name}
                              </TableCell>
                              <TableCell align="right">
                                {FormatNumber(row.food.price)} VND
                              </TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                </div>
              </div>
            </div>
          </Padding>
        </div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;
const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;

const ImageWrap = styled.div`
  width: 100px;
  overflow: hidden;
  margin-left: auto;
  img {
    max-width: 100%;
    object-fit: cover;
    height: auto;
  }
`;
const Padding = styled.div`
  padding: 0 12px;
`;
