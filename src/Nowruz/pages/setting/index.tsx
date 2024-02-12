import { Tabs } from "src/components/atoms/tabs/tabs";
import { Tab } from "src/components/atoms/tabs/tabs.types";
import Account from "src/Nowruz/pages/setting/sections/account/account"
export const Setting = () =>{
    const tabs: Tab[] = [
        {
          name: 'Account',
          content: <Account/>,
          default: true,
        },
        {
          name: 'Password',
          content: <h1>Password</h1>,
          default: false,
        },
        {
          name: 'Team',
          content: <h1>Team</h1>,
          default: false,
        },
        {
          name: 'Working Prefrences',
          content: <h1>Working</h1>,
          default: false,
        },
        {
          name: 'Notification',
          content: <h1>Notif</h1>,
          default: false,
        },
      ];

    return (

        <div className="p-4">
          <h2 className="gap-5 text-3xl">Setting</h2>
          <Tabs tabs={tabs} alignLeft={true} />
        </div>
    )
}
