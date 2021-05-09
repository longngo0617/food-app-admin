import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface ItemOptionProps {
  href: string;
  text: string;
  IconN: any;
}

export const ItemOption: React.FC<ItemOptionProps> = ({
  href,
  text,
  IconN,
}) => {
  return (
    <Item>
      <Link to={href} activeClassName="activeLink">
        <Item>
          <IconWrap>
            <Icon className="icon">
              <IconN />
            </Icon>
          </IconWrap>
          <TitleWrap>
            <Title>{text}</Title>
          </TitleWrap>
        </Item>
      </Link>
    </Item>
  );
};

const Item = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  transition: 0.2s background-color;
  &:hover {
    background-color: #f0f2f5;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;
const IconWrap = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  margin-right: 12px;
  display: flex;
  align-self: flex-start;
  position: relative;
  cursor: pointer;
`;
const Icon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #e4e6eb;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
const TitleWrap = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h2`
  font-weight: 500;
  font-size: 15px;
  word-break: break-word;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 18px;
`;
