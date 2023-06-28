import React, { useState, useEffect } from 'react';
import { Select, MenuItem, SelectChangeEvent, Box, Typography } from '@mui/material';
import { sidekicks } from '@utils/sidekicks';
import Cookies from 'js-cookie';
import { Sidekick } from 'types';

interface SidekickSelectProps {
  onSidekickSelected: (sidekick: Sidekick) => void;
  initialSidekick: Sidekick;
  selectedSidekick: Sidekick;
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
    toSentenceCase(Cookies.get('department') || 'Administrative')
  );
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<string>(
    'Select a Sidekick for specialized tasks!'
  );

  let cookieSidekick: Sidekick;
  try {
    cookieSidekick = JSON.parse(Cookies.get('sidekick')!);
  } catch (error) {
    // If we can't parse the sidekick cookie, assume it's because it's an old string format.
    // Clear the cookie and default to the initial sidekick.
    // remove this after a while
    Cookies.remove('sidekick');
    cookieSidekick = initialSidekick || sidekicks[0];
  }
  const [selectedSidekick, setSelectedSidekick] = useState<Sidekick>(cookieSidekick);
  const [departmentSidekicks, setDepartmentSidekicks] = useState<Sidekick[]>(sidekicks);

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

  useEffect(() => {
    const sidekicksInDepartment = sidekicks
      .filter((s) => s.departments.includes(selectedDepartment.toLowerCase()))
      .sort((a, b) => a.label.localeCompare(b.label));
    setDepartmentSidekicks(sidekicksInDepartment);

    const lastUsedSidekicks = JSON.parse(Cookies.get('lastUsedSidekicks') || '{}');
    const lastUsedSidekick = lastUsedSidekicks[selectedDepartment.toLowerCase()];
    if (lastUsedSidekick) {
      setSelectedSidekick(lastUsedSidekick);
      onSidekickSelected(lastUsedSidekick);
    } else if (sidekicksInDepartment[0]) {
      setSelectedSidekick(sidekicksInDepartment[0]);
      onSidekickSelected(sidekicksInDepartment[0]);
    }
  }, [selectedDepartment]);

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    Cookies.set('department', department.toLowerCase());
  };

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickValue = event.target.value;
    const selectedSidekick = departmentSidekicks.find((s) => s.value === sidekickValue);
    if (!selectedSidekick) return; // If no matching sidekick, abort

    setSelectedSidekick(selectedSidekick);
    Cookies.set('sidekick', JSON.stringify(selectedSidekick));

    console.log('selectedSidekick', selectedSidekick);

    // Save the last used sidekick for this department
    const lastUsedSidekicks = JSON.parse(Cookies.get('lastUsedSidekicks') || '{}');
    lastUsedSidekicks[selectedDepartment.toLowerCase()] = selectedSidekick;
    Cookies.set('lastUsedSidekicks', JSON.stringify(lastUsedSidekicks));

    setSelectedPlaceholder(selectedSidekick.placeholder);
    onSidekickSelected(selectedSidekick);
  };

  return departments.length ? (
    <>
      <Select
        labelId="department-select-label"
        id="department-select"
        label="Department"
        value={selectedDepartment || 'administrative'}
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
        value={selectedSidekick.value || 'defaultPrompt'}
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
