import { Radio, RadioGroup } from '@mui/material';
import { Check } from 'public/icons/nowruz/check';
import variables from 'src/components/_exports.module.scss';

import css from './cardRadioButton.module.scss';
import { CardRadioButtonProps } from './cardRadioButton.types';
import { CardRadioButtonIcon } from './cardRadioButtonIcon';
import { Checkbox } from '../checkbox/checkbox';

const RBIcon: React.FC = () => {
  return <div className={css.rbIcon} />;
};

const RBSelectedIcon: React.FC = () => {
  return (
    <div className={css.rbSelectedIcon}>
      <Check stroke={variables.color_white} width={10} height={10} />
    </div>
  );
};

export const CardRadioButton: React.FC<CardRadioButtonProps> = (props) => {
  const { items, selectedValue, setSelectedValue } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioGroup sx={{ gap: '12px' }}>
      {items.map((item) => (
        <div
          key={item.title}
          className={`${css.container} ${selectedValue === item.value ? css.selectedContainer : css.normalContainer} `}
          onClick={() => setSelectedValue(item.value)}
        >
          {item.img ? (
            item.img
          ) : item.icon ? (
            <CardRadioButtonIcon icon={item.icon} selected={selectedValue === item.value} />
          ) : (
            ''
          )}

          <div className={css.content}>
            <div className={`${css.title} ${selectedValue === item.value ? css.selectedTitle : ''}`}>{item.title}</div>
            <div className={`${css.desc} ${selectedValue === item.value ? css.selectedDesc : ''}`}>
              {item.description}
            </div>
          </div>
          <div className={css.rbContainer}>
            {/* <Radio
              checked={selectedValue === item.value}
              onChange={handleChange}
              value={item.value}
              name={item.title}
              icon={<RBIcon />}
              checkedIcon={<RBSelectedIcon />}
              sx={{ padding: '0' }}
            /> */}
            <Checkbox
              id={item.title}
              type="checkCircle"
              size="small"
              onChange={handleChange}
              value={item.value}
              checked={selectedValue === item.value}
            />
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};
