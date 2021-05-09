import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EventIcon from "@material-ui/icons/Event";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import StorefrontIcon from "@material-ui/icons/Storefront";
import React from "react";
import styled from "styled-components";
import { ItemOption } from "./ItemOption";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";
interface BarProps {
  fc: () => void;
}

export const Bar: React.FC<BarProps> = ({ fc }) => {
  return (
    <FilterBarContainer>
      <FilterBar>
        <Header>
          <Head>Admin</Head>
        </Header>
        <Border>
          <InputContainer>
            <InputIcon />
            <Input
              name="displayname"
              autoComplete="off"
              placeholder="Search people"
              //   onChange={(e) => setValue(e.target.value)}
              //   value={value}
              // onClick={() => console.log('111')}
            />
          </InputContainer>
          <ArrayHintWrap></ArrayHintWrap>
        </Border>
        <Category>
          <Wrap>
            <ItemOption
              href="/quan-li-san-pham"
              text="Quản lí sản phẩm"
              IconN={StorefrontIcon}
            />
            <ItemOption
              href="/market/you/selling"
              text="Tài khoản của bạn"
              IconN={PersonIcon}
            />
            <ButtonWrap>
              <Button onClick={fc}>
                <IconAdd />
                <Text>Thêm sản phẩm</Text>
              </Button>
            </ButtonWrap>
            <Type>Chức năng</Type>
            <ItemOption
              href="/loai-san-pham"
              text="Loại sản phẩm"
              IconN={AssignmentIcon}
            />
            <ItemOption href="/su-kien" text="Sự kiện" IconN={EventIcon} />
            <ItemOption
              href="/home/khach-hang"
              text="Khách hàng"
              IconN={PeopleIcon}
            />
            <ItemOption
              href="/home/don-hang"
              text="Đơn hàng"
              IconN={ShoppingCartIcon}
            />
          </Wrap>
        </Category>
      </FilterBar>
    </FilterBarContainer>
  );
};
const FilterBarContainer = styled.div`
  min-width: 360px;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 100%;
`;
const FilterBar = styled.div`
  width: 360px;
  background-color: #fff;
  border-right: 1px solid rgb(235, 238, 240);
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  top: 0;
`;
const Header = styled.div`
  padding: 12px 16px;
  position: relative;
  display: flex;
  align-items: center;
`;
const Head = styled.h2`
  font-size: 28px;
  font-weight: 800;
  line-height: 24px;
  color: rgb(15, 20, 25);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  overflow-wrap: break-word;
`;
const ArrowBack = styled(ArrowBackIcon)`
  cursor: pointer;
  color: #1877f2;
  margin-right: 15px;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: #f0f2f5;
  border-radius: 9999px;
`;
const InputIcon = styled(SearchIcon)`
  color: rgb(91, 112, 131);
  padding: 6px;
`;
const Input = styled.input`
  flex: 1;
  border: 0;
  outline: none;
  padding: 10px;
  background-color: inherit;
  border-radius: inherit;
`;
const Border = styled.div`
  padding: 0 16px;
  position: relative;
  margin-bottom: 12px;
`;
const ArrayHintWrap = styled.div``;

const Category = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  will-change: transform, scroll-position;
  display: flex;
  z-index: 0;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  overscroll-behavior-y: contain;
`;
const Wrap = styled.div``;
const ButtonWrap = styled.div`
  margin: 8px 16px;
  user-select: none;
`;
const Button = styled.div`
  margin: 0;
  background-color: rgba(45, 156, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 12px;
  cursor: pointer;
`;
const IconAdd = styled(AddIcon)`
  color: #1877f2;
`;
const Text = styled.div`
  margin: 0 3px;
  font-family: inherit;
  font-size: 15px;
  color: #1877f2;
`;
const Type = styled.div`
  height: 36px;
  display: flex;
  align-items: flex-end;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 0 12px;
`;
