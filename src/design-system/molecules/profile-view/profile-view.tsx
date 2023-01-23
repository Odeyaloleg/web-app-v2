import css from './profile-view.module.scss';
import { Avatar } from '../../atoms/avatar/avatar';
import { ProfileViewProps } from './profile-view.types';

export const ProfileView = (props: ProfileViewProps): JSX.Element => {
  const { type, img, name, location } = props;

  return (
    <div className={css.container}>
      <Avatar img={img} type={type} />
      <div className={css.detail}>
        <div className={css.name}>{name}</div>
        <div className={css.location}>{location}</div>
      </div>
    </div>
  );
};
