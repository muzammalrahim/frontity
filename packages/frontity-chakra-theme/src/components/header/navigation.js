import { Box, Stack } from "@chakra-ui/react";
import { styled } from "frontity";
import React from "react";
import FrontityLink from "../link";
import { css } from "frontity";

const Link = styled(FrontityLink)`
  position: relative;
  color: #fff;
  text-decoration: none;

  &:after {
    transition: bottom ease 0.25s, background-color ease 0.25s;
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: transparent;
  }

  &:hover {
    &:after {
      bottom: -5px;
      background-color: ${p => p.theme.colors.accent[400]};
    }
  }
`;

const Link2 = styled(FrontityLink)`
  position: relative;
  color: #fff;
  text-decoration: none;

  &:after {
    transition: bottom ease 0.25s, background-color ease 0.25s;
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: transparent;
  }

  &:hover {
    &:after {
      bottom: -5px;
      background-color: ${p => p.theme.colors.accent[400]};
    }
  }
`;

export const SiteMenu = props => (
  <Stack
    ml="50px"
    spacing="50px"
    as="ul"
    listStyleType="none"
    align="center"
    direction="row"
    color="white"
    {...props}
  />
);



const SiteMenuItem = ({ link, ...props }) => (
  <Box
    as="li"
    color="white"
    fontSize={{ base: "sm", lg: "md" }}
    fontWeight="medium"
    fontFamily="Kelson"
    textTransform="uppercase"
    position="relative"
    cursor="pointer"
    {...props}
  >
    <Link link={link}>{props.children}</Link>
  </Box>
);

const SiteMenuItem2 = ({ link, ...props }) => (
  <Box
    as="li"
    color="white"
    fontSize={"10px"}
    fontWeight="medium"
    fontFamily="Kelson"
    textTransform="uppercase"
    position="relative"
    cursor="pointer"
    margin="15px"
    {...props}
  >
    <Link2 link={link}>{props.children}</Link2>
  </Box>
);

const Navigation = ({ menu, ...props }) => (
  <Box as="nav" width="100%" position="absolute" display={{ base: "none", lg: "block" }} {...props}>
    <SiteMenu>
      {menu.map(({name, link,submenu}) => (
        <div class="mmenu" css={css`
        position:relative;`
      }>
        <SiteMenuItem  key={name} link={link}>
          {name} 
        </SiteMenuItem>

        <MenuItem2 >
        <MenuItem class="innermenu" key={name} css={css`
        position: absolute;
        top: 47px;
        background: #000;
        
        `}>
        { submenu &&  submenu.map(({name, link,}) => {
          
          return (
            <>
            
            <SiteMenuItem2 key={name} link={link}>
        <div css={css` 
         position : relative  
      } `}>{name} </div>  
        </SiteMenuItem2>
                 
        </> );
        })
      } 
      </MenuItem></MenuItem2>

      </div>
      ))}
    
    </SiteMenu>
  </Box>
);

export default Navigation;


const MenuItem2 = styled.div`
position: absolute;
        top: 47px;
        background: #000;
        width:155px;
`;
const MenuItem = styled.ul`
font-size: 10px ! important
border : 2px solid
background : black
position : relative
list-style : none;
`;


const StyledMenu = styled.ul`
  display: flex;
  flex-direction: ${({submenu}) => submenu && 'column'};
  visibility: ${({submenu}) => submenu && 'hidden'};
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.0277em;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  margin: ${({submenu}) => submenu ? '10px' : 0};
  width: ${({submenu}) => submenu && '100px'};

  ${MenuItem}:hover & {
    visibility: ${({submenu}) => submenu && 'visible'};
  }
 
  @media (min-width: 1220px) {
    margin-top: ${({submenu}) => submenu ? '10px' : '-0.8rem'}; ;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: -2.5rem;
  }
`;
