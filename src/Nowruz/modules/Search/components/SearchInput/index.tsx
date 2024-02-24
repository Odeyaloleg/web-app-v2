import React, { ChangeEvent } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './search-input.module.scss';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChange, value, onEnter }) => {
  const handleOnEnter = (e: ChangeEvent<unknown>) => {
    if ('key' in e && e.key === 'Enter') {
      onEnter?.();
    }
  };

  return (
    <div className={css.container}>
      <div className="flex flex-grow">
        <Icon name="search-lg" color={variables.color_grey_500} fontSize={20} />
        <input
          value={value}
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={css.input}
          onKeyDown={handleOnEnter}
        />
      </div>
      {/* <div className={css.commandBox}>⌘/</div> */}
    </div>
  );
};
