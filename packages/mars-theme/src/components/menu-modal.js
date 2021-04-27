import { styled, connect } from "frontity";
import Link from "./link";

const Menu = ({options, currentPageLink}) => (
  <StyledMenu submenu={submenu}>
    {options.map(({name, link, submenu}) => {
      const isCurrentPage = currentPageLink === link;
      return (
        <MenuItem key={name}>
          {/* If link url is the current page, add `aria-current` for a11y */}
          <MenuLink
          link={link}
          aria-current={isCurrentPage ? "page" : undefined}
        >
          {name}
        </MenuLink>
       
        </MenuItem>
      );
    })}
  </StyledMenu>
)


const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        {isThereLinks &&   <Menu options={menu} currentPageLink={state.router.link} />
         }
      </MenuContent>
    </>
  );
};
const StyledMenu = styled.ul`
  display: flex;
  flex-direction: ${({submenu}) => submenu && 'column'};
  visibility: ${({submenu}) => submenu && 'hidden'};
  position: ${({submenu}) => submenu && 'absolute'};
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
const MenuOverlay = styled.div`
  background-color: #1f38c5;
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
`;

const MenuContent = styled.div`
  z-index: 3;
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  font-size: 20px;
  text-align: center;
  padding: 1.2rem 0;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
  /* styles for active link */
  &[aria-current="page"] {
    color: yellow;
    font-weight: bold;
    /* border-bottom: 4px solid yellow; */
  }
`;



export default connect(MenuModal);
