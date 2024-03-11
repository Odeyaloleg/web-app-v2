import { Button } from 'src/Nowruz/modules/general/components/Button';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import css from './referral.module.scss';
import { useLoaderData } from 'react-router-dom';
import { User } from 'src/core/api';

export const ReferralOrg = () => {
  //const status = useSelector((state: RootState) => state.identity.status);
  const { user } = useLoaderData() as { user: User };

  return (
    <div className="flex h-screen">
      <div className={css.body}>
        <div className={css.logoContainer}>
          <img src="/icons/nowruz/logo-primary.svg" height={32} />
        </div>

        <h1 className={css.title}>{user.first_name} {user.last_name} invited you to Socious</h1>
        <h2 className={css.subtitle}>{"Register now and find thousands of purpose-driven professionals!"}</h2>

        <div>
          <Button color="primary" style={{ margin: '24px 0 24px 24px' }}>
            Join now
          </Button>
        </div>

        <h2 className={css.subtitle}>
          Thanks,<br />
          Socious team
        </h2>

        <div className={css.footerContainer}>
          <h2 className={css.footerText}>
            This email was sent to your E-Mail. If you'd rather not receive this kind of email,
            you can unsubscribe or manage your email preferences.<br />
            <br />
            © 2023 Socious Inc., Nihonbashi 3-2-14-1F, Chuo-ku, Tokyo 103-0027, Japan
          </h2>
        </div>

        <div className={css.footerLogoContainer}>
          <img src="/icons/nowruz/logo-primary.svg" height={24} />
          <div className={css.socialsContainer}>
            <img src="/icons/twitter-x.svg" height={20} />
            <img src="/icons/facebook.svg" height={20} />
            <img src="/icons/instagram.svg" height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
