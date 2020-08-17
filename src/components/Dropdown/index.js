import React, { useState } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import MaterialIcon from "../MaterialIcon";
import "../Button/styles.scss";
import "./styles.scss";

const Dropdown = props => {
  const [opts] = useState(props);
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(opts.items.length);
  const listItems = opts.items.map((item, idx) =>
        <a
          key={idx}
          id={`menu-item-${idx}`}
          className={`btn btn--orange btn--dropdown ${opts.itemClassName}`}
          onClick={item.onClick}
          href={item.href}
          {...itemProps[idx]}>{item.iconBefore && <MaterialIcon icon={item.iconBefore} />}{item.label}</a>
      );
  return (
    <div className={`dropdown ${opts.className}`}>
      <button
        className={`dropdown__button ${opts.buttonClassName}`}
        {...buttonProps} >{opts.iconBefore && <MaterialIcon icon={opts.iconBefore} />}{opts.label}</button>
      <div
        className={`dropdown__list ${opts.listClassName} ${isOpen ? "open" : "closed" }`}
        role="menu" >
        {listItems}
      </div>
    </div>
  )
}

export default Dropdown;
