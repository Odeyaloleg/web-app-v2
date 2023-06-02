import { CardSlideUp } from 'src/components/templates/card-slide-up/card-slide-up';
import css from './category.module.scss';
import { CategoryItem, CategoryProps } from './category.types';
import { useState } from 'react';
import { printWhen } from 'src/core/utils';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { isTouchDevice } from 'src/core/device-type-detector';
import { Modal } from 'src/components/templates/modal/modal';
import { Search } from 'src/components/atoms/search/search';

function translate(selected: string | number, list: CategoryProps['list']): string {
  const translation = list.find((item) => item.value === selected);
  if (!translation?.label) {
    console.warn('Translation does not exist');
    return translation?.value as string;
  }
  return translation.label;
}

export const Category = (props: CategoryProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Array<CategoryItem>>(props.list);
  const [selected, setSelected] = useState<Array<string | number>>(
    (props.register.controls[props.name].value as []) || []
  );

  function onChange(list: string[]) {
    setSelected(list);
    props.register.controls[props.name].setValue(list);
  }

  function onSearch(value: string) {
    const filtered = props.list.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(filtered);
  }

  const modal = (
    <Modal zIndex={2} width="25rem" height="33rem" open={open} onClose={() => setOpen(false)}>
      <div className={css.modalContainer}>
        <div className={css.modalHeader}>
          <Search onValueChange={onSearch} placeholder="Search" />
        </div>
        <div className={css.modalContent}>
          <CategoriesClickable clickable onChange={onChange} selected={selected} list={list} />
        </div>
      </div>
    </Modal>
  );

  const slideUp = (
    <CardSlideUp open={open} onClose={() => setOpen(false)}>
      <div className={css.slideUpContainer} style={{ height: '65vh' }}>
        <div className={css.slideUpHeader}>
          <Search onValueChange={onSearch} width="100%" placeholder="Search" />
        </div>
        <div className={css.slideUpContent}>
          <CategoriesClickable clickable onChange={onChange} selected={selected} list={list} />
        </div>
      </div>
    </CardSlideUp>
  );

  return (
    <div className={css.container}>
      {printWhen(slideUp, isTouchDevice())}
      {printWhen(modal, !isTouchDevice())}
      {printWhen(<div className={css.label}>{props.label}</div>, !!props.label)}
      <div className={css.list} onClick={() => setOpen(true)}>
        {printWhen(<div className={css.placeholder}>{props.placeholder}</div>, selected.length === 0)}
        {selected.map((value) => (
          <div key={value} className={css.item}>
            {translate(value, props.list)}
          </div>
        ))}
      </div>
    </div>
  );
};
