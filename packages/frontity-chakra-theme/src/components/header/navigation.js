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
    border="2px solid"
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
      <StyledMenu submenu={submenu}>
        <SiteMenuItem  key={name} link={link}>
          {name} 
        </SiteMenuItem>

        <MenuItem2 submenu={submenu}>
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
                          } `}>{name} 
                </div>  
            </SiteMenuItem2>            
          </> );
        })
      } 
        </MenuItem>
      </MenuItem2>

      </StyledMenu>
      </div>
      ))}
   
    </SiteMenu>
  </Box>
);

export default Navigation;



const MenuItem = styled.ul`
font-size: 10px ! important
border : 2px solid
background : black
position : relative
list-style : none;
`;

const MenuItem2 = styled.div`
position: absolute;
        top: 47px;
        background: #000;
        width:155px;
        visibility: ${({submenu}) => submenu && 'visible'};

        &: hover  {
        visibility: ${({submenu}) => submenu && 'hidden'};
     
        }

      

`;
const StyledMenu = styled.ul`

  ${MenuItem}:hover & {
    visibility: ${({submenu}) => submenu && 'hidden'};
  }

`;