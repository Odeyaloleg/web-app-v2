import { HeaderProps } from './header.types';
import css from './header.module.scss';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';

export const Header: React.FC<HeaderProps> = ({ name, type, username, img, lastOnline }) => {
  return (
    <div className={css.container}>
      <div className={css.title}>
        <ProfileView img={img} type={type} size="2.5rem" name={name} username={username} location={lastOnline} />
      </div>
      {/* <div>
        <img src="/icons/three-dots-blue.svg" />
      </div> */}
    </div>
  );
};
