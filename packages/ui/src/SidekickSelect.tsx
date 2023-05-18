import React, { useState, useEffect } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { sidekicks } from '@utils/sidekicks';
import Cookies from 'js-cookie';

interface SidekickSelectProps {
  onSidekickSelected: (value: string) => void;
  initialSidekick: string;
  selectedSidekick: string;
}

const toSentenceCase = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const SidekickSelect = ({
  onSidekickSelected,
  selectedSidekick: initialSidekick
}: SidekickSelectProps) => {
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    toSentenceCase(Cookies.get('department') || 'General')
  );
  const [selectedSidekick, setSelectedSidekick] = useState<string>(
    Cookies.get('sidekick') || initialSidekick
  );
  const [departmentSidekicks, setDepartmentSidekicks] = useState(sidekicks);

  useEffect(() => {
    const uniqueDepartments = Array.from(
      new Set(
        sidekicks
          .flatMap((s) => s.departments) // flatMap will create a new array with all department values
          .filter(Boolean) // filter out null or undefined values
      )
    )
      .map(toSentenceCase)
      .sort(); // sort alphabetically
    setDepartments(uniqueDepartments);
  }, []);

  // Inside the useEffect that is handling department changes, after the setSelectedSidekick line
  useEffect(() => {
    const sidekicksInDepartment = sidekicks
      .filter((s) => s.departments.includes(selectedDepartment.toLowerCase()))
      .sort((a, b) => a.label.localeCompare(b.label));
    setDepartmentSidekicks(sidekicksInDepartment);

    const lastUsedSidekicks = JSON.parse(Cookies.get('lastUsedSidekicks') || '{}');
    const lastUsedSidekick = lastUsedSidekicks[selectedDepartment.toLowerCase()];
    if (lastUsedSidekick) {
      setSelectedSidekick(lastUsedSidekick);
      onSidekickSelected(lastUsedSidekick); // New line
    } else if (sidekicksInDepartment[0]) {
      setSelectedSidekick(sidekicksInDepartment[0].value);
      onSidekickSelected(sidekicksInDepartment[0].value); // New line
    }
  }, [selectedDepartment]);

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    Cookies.set('department', department.toLowerCase());
  };

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekick = event.target.value;
    setSelectedSidekick(sidekick);
    Cookies.set('sidekick', sidekick);

    // Save the last used sidekick for this department
    const lastUsedSidekicks = JSON.parse(Cookies.get('lastUsedSidekicks') || '{}');
    lastUsedSidekicks[selectedDepartment.toLowerCase()] = sidekick;
    Cookies.set('lastUsedSidekicks', JSON.stringify(lastUsedSidekicks));

    onSidekickSelected(sidekick);
  };

  return departments.length ? (
    <>
      <Select
        labelId="department-select-label"
        id="department-select"
        label="Department"
        value={selectedDepartment}
        onChange={handleDepartmentChange}>
        {departments.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
      <Select
        labelId="sidekick-select-label"
        id="sidekick-select"
        label="Sidekick"
        value={selectedSidekick}
        onChange={handleSidekickChange}>
        {departmentSidekicks.map((sidekick) => (
          <MenuItem key={sidekick.value} value={sidekick.value}>
            {sidekick.label}
          </MenuItem>
        ))}
      </Select>
    </>
  ) : null;
};
