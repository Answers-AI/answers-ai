import { getAppSettings } from '@ui/getAppSettings';
import React from 'react';

import NewJourneyForm from '@ui/JourneyLayout/NewJourneyForm';

const NewJourneyLayout = async ({ children, params, ...other }: any) => {
  const appSettings = await getAppSettings();

  return (
    <>
      <NewJourneyForm appSettings={appSettings}></NewJourneyForm>
      {React.cloneElement(children, { appSettings })}
    </>
  );
};

export default NewJourneyLayout;
