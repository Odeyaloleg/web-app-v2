import { useNavigate } from '@tanstack/react-location';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { useNetworkShared } from '../network.shared';
import { ProfileCard } from 'src/components/templates/profile-card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { printWhen } from 'src/core/utils';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const { navigateNetwork, identity } = useNetworkShared();
  const { isLoggedIn } = useAuth();

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Followings', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  const jobsMenuListUser = [
    {
      label: 'My applications',
      icon: '/icons/my-applications.svg',
      link: () => navigate({ to: `/d/jobs/applied/${identity.id}` }),
    },
  ];

  const jobsMenuListOrg = [
    {
      label: 'Created',
      icon: '/icons/folder-black.svg',
      link: () => navigate({ to: `/d/jobs/created/${identity.id}` }),
    },
  ];

  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <div className={css.leftContainer}>
        <ProfileCard />
        <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListUser} />, identity.type === 'users')}
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListOrg} />, identity.type === 'organizations')}
      </div>
      <div className={css.rightContainer}>
        <div className={css.banner}>
          <div className={css.title}>People</div>
          <div className={css.tagline}>Connect with skilled professionals</div>
        </div>
        <Card className={css.network}>
          <div className={css.network__item} onClick={() => navigateNetwork('connections')}>
            <div className={css.network__logo}>
              <img src="/icons/network.svg" />
            </div>
            Connections
          </div>
          <div className={css.network__item} onClick={() => navigateNetwork('followings')}>
            <div className={css.network__logo}>
              <img src="/icons/followers-blue.svg" />
            </div>
            Following
          </div>
        </Card>
        <Card className={css.recommand}>
          <div className={css.recommand__noItem}>No recommendations</div>
        </Card>
      </div>
    </TwoColumnCursor>
  );
};
