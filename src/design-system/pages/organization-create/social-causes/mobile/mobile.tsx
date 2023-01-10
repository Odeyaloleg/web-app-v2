import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { Button } from '../../../../atoms/button/button';
import { CategoriesClickable } from '../../../../atoms/categories-clickable/categories-clickable';
import { Search } from '../../../../atoms/search/search';
import { Steps } from '../../../../atoms/steps/steps';
import { SOCIAL_CAUSES } from '../social-causes.services';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={5} current={2} />
        </div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>What are your social causes?</div>
        <div className={css.limitStatement}>Select up to 5 social causes.</div>
      </div>
      <div className={css.search}>
        <Search
          width="100%"
          placeholder="Search"
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </div>
      <div className={css.main}>
        <div className={css.categoryTitle}>Popular</div>
        <CategoriesClickable clickable onChange={console.log} list={SOCIAL_CAUSES} selected={[]} />
      </div>

      <div className={css.bottom}>
        <Button onClick={() => navigate({ to: '../social-causes' })}>Continue</Button>
      </div>
    </div>
  );
};
