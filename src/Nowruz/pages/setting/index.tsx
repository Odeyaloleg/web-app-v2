import { useEffect, useState } from "react";
import { HorizontalTabs } from "src/Nowruz/modules/general/components/horizontalTabs";
import { SearchDropdown } from "src/Nowruz/modules/general/components/SearchDropdown";
import Account from "src/Nowruz/modules/settings/components/account/";
import Notification from "src/Nowruz/modules/settings/components/notification";
import Password from "src/Nowruz/modules/settings/components/password";

export const Setting = () => {
  const tabs = [
    {
      label: 'Account',
      content: <Account />,
      default: true,
    },
    {
      label: 'Password',
      content: <Password />
    },
    {
      label: 'Notification',
      content: <Notification/>
    },
  ];
  const items: any[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Password', value: 'Password' },
    { label: 'Notification', value: 'Notification' },
  ];

  const [content, setContent] = useState<ReactNode>();

  const setValue = (value) => {
    console.log('value',value);
    
    if (value.value === 'Account')
      return setContent(<Account />);
    if (value.value === 'Password')
      return setContent(<Password />);
    if (value.value === 'Notification')
      return setContent(<Notification />);
  };

  useEffect(() => {
    setValue({label: 'Account', value: 'Account'});
  }, []);


  return (
    <>
      <div className="container">
        <div className="col-12">
        <div className="p-4">
          <h2 className="gap-5 text-3xl mb-6">Settings</h2>

       
            <div className="block lg:hidden">
            <SearchDropdown
              required
              id="end-month"
              options={items}
              hasDropdownIcon
              onChange={(value) => { setValue(value);}}
              className="flex-1" />

            <div className="mt-6">{content}</div>
          </div>
      
          
          <div className="hidden lg:block">
            <HorizontalTabs tabs={tabs} />

          </div>
        </div>
        </div>
      </div>
    </>
  );
};
