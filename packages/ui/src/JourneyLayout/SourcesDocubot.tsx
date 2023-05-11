import React from 'react';
import AutocompleteSelect from '../AutocompleteSelect';
import { AppSettings, AnswersFilters } from 'types';

interface Props {
  appSettings: AppSettings;
  filters: AnswersFilters;
  updateFilter: (newFilter: AnswersFilters) => void;
}

const SourcesDocubot = ({ appSettings, filters, updateFilter }: Props) => {
  return (
    <>
      <AutocompleteSelect
        label="Repository"
        options={appSettings?.docubot?.repos?.filter((s) => s.enabled)?.map((s) => s.id) || []}
        value={filters?.datasources?.docubot?.repo || []}
        onChange={(value: string[]) => updateFilter({ datasources: { docubot: { repo: value } } })}
      />
    </>
  );
};

export default SourcesDocubot;
