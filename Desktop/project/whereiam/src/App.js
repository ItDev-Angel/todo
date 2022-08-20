/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as User } from './icons/man-user.svg';
import { ReactComponent as Menu } from './icons/menu.svg';
import { ReactComponent as Arrow } from './icons/backward.svg';
import { CSSTransition } from 'react-transition-group';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

function App() {
  return (
    <> 
  <Navbar>
    <h2 className="dfc">▶е я є</h2>
    <div className="dfc mark"><FmdGoodIcon/>
    Австралія
    </div>
    <NavItem icon={<User/>}/>
    <NavItem icon={<Menu/>}>
        <DropdownMenu></DropdownMenu>
    </NavItem>
  </Navbar>
    </>

  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>Мій профіль</DropdownItem>
          <DropdownItem
            goToMenu="continents">
            Частини світу<ArrowForwardIosIcon/>
          </DropdownItem>
          <DropdownItem
            goToMenu="countries">
            Країни<ArrowForwardIosIcon/>
          </DropdownItem>
          <DropdownItem
            goToMenu="cities">
            Міста<ArrowForwardIosIcon/>
          </DropdownItem>
          <DropdownItem
            goToMenu="wheretogo">
            Куди піти?<ArrowForwardIosIcon/>
          </DropdownItem>
          <DropdownItem
            goToMenu="wheretoeat">
            Де поїсти?<ArrowForwardIosIcon/>
          </DropdownItem>
          <DropdownItem
            goToMenu="wheretorent">
            Де зняти житло?<ArrowForwardIosIcon/>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'continents'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<Arrow />}>
            <h2>Частини світу</h2>
          </DropdownItem>
          <DropdownItem>Америка</DropdownItem>
          <DropdownItem>Європа</DropdownItem>
          <DropdownItem>Азія</DropdownItem>
          <DropdownItem>Австралія</DropdownItem>
          <DropdownItem>Африка</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'countries'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<Arrow />}>
            <h2>Країни</h2>
          </DropdownItem>
          <DropdownItem>Австралія</DropdownItem>
          <DropdownItem>Фінляндія</DropdownItem>
          <DropdownItem>Швейцарія</DropdownItem>
          <DropdownItem>Нідерланди</DropdownItem>
          <DropdownItem>Єгипет</DropdownItem>
          <DropdownItem>Туніс</DropdownItem>
          <DropdownItem>ОАЕ</DropdownItem>
          <DropdownItem>Сінгапур</DropdownItem>
          <DropdownItem>Турція</DropdownItem>
          <DropdownItem>Індонезія</DropdownItem>
          <DropdownItem>США</DropdownItem>
          <DropdownItem>Канада</DropdownItem>
          <DropdownItem>Мексика</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'cities'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<Arrow />}>
            <h2>Міста</h2>
          </DropdownItem>
          <DropdownItem>Канберра</DropdownItem>
          <DropdownItem>Хельсінки</DropdownItem>
          <DropdownItem>Берн</DropdownItem>
          <DropdownItem>Амстердам</DropdownItem>
          <DropdownItem>Каір</DropdownItem>
          <DropdownItem>Туніс</DropdownItem>
          <DropdownItem>Абу-Дабі</DropdownItem>
          <DropdownItem>Сінгапур</DropdownItem>
          <DropdownItem>Анкара</DropdownItem>
          <DropdownItem>Джакарта</DropdownItem>
          <DropdownItem>Вашингтон</DropdownItem>
          <DropdownItem>Оттава</DropdownItem>
          <DropdownItem>Мехіко</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
export default App;
