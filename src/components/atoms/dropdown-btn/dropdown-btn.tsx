import css from './dropdown-btn.module.scss';
import { DropdownBtnItem, DropdownBtnProps } from './dropdown-btn.types';
import Popover from '@mui/material/Popover';
import { MenuItem } from '@mui/material';
import { CSSProperties, useState } from 'react';

export default function BasicPopover() {}

export const DropdownBtn = (props: DropdownBtnProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [value, setValue] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const activeStyles: CSSProperties = {
    backgroundColor: 'var(--color-primary-01)',
    color: 'white',
  };

  function onMenuItemClick(menu: DropdownBtnItem) {
    handleClose();
    props.onValueChange(menu);
    setValue(menu.label);
  }

  return (
    <div>
      <button style={value ? activeStyles : {}} className={css.btn} onClick={handleClick}>
        {value ? value : props.placeholder}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {props.menus.map((menu) => {
          return (
            <MenuItem key={menu.id} onClick={() => onMenuItemClick(menu)}>
              {menu.label}
            </MenuItem>
          );
        })}
      </Popover>
    </div>
  );
};
