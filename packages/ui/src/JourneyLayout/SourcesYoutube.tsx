import React from 'react';
import AutocompleteSelect from '../AutocompleteSelect';
import { AppSettings, AnswersFilters } from 'types';

interface Props {
  appSettings: AppSettings;
  filters: AnswersFilters;
  updateFilter: (newFilter: AnswersFilters) => void;
}

const SourcesYoutube = ({ appSettings, filters, updateFilter }: Props) => {
  return (
    <>
      <AutocompleteSelect
        label="Videos"
        options={appSettings?.youtube?.video?.filter((s) => s.enabled)?.map((s) => s.id) || []}
        value={filters?.datasources?.youtube?.name || []}
        onChange={(value: string[]) => updateFilter({ datasources: { youtube: { name: value } } })}
      />
    </>
  );
};

export default SourcesYoutube;
