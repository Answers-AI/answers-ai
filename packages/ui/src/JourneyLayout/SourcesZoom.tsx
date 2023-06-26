import React from 'react';
import AutocompleteSelect from '../AutocompleteSelect';
import { AppSettings, AnswersFilters } from 'types';

interface Props {
  appSettings: AppSettings;
  filters: AnswersFilters;
  updateFilter: (newFilter: AnswersFilters) => void;
}

const SourcesZoom = ({ appSettings, filters, updateFilter }: Props) => {
  return (
    <>
      <AutocompleteSelect
        label="Meetings"
        options={appSettings?.zoom?.meetings?.filter((s) => s.enabled)?.map((s) => s.id) || []}
        value={filters?.datasources?.zoom?.name || []}
        onChange={(value: string[]) => updateFilter({ datasources: { zoom: { name: value } } })}
      />
    </>
  );
};

export default SourcesZoom;
