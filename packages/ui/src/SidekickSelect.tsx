import React, { useState, useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
import { Sidekick } from 'types';
import axios from 'axios';

interface SidekickSelectProps {
  onSidekickSelected: (sidekick: Sidekick) => void;
}

const toSentenceCase = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const SidekickSelect = ({ onSidekickSelected }: SidekickSelectProps) => {
  const [departments, setDepartments] = useState<string[]>([]);
  const [sidekicks, setSidekicks] = useState<Sidekick[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    toSentenceCase(Cookies.get('department') || 'Administrative')
  );
  const [selectedSidekick, setSelectedSidekick] = useState<Sidekick | null>(null);
  const [departmentSidekicks, setDepartmentSidekicks] = useState<Sidekick[]>([]);

  useEffect(() => {
    const fetchSidekicks = async () => {
      try {
        const response = await axios.get('/api/sidekicks');
        const retrievedSidekicks = response.data;

        // Determine the unique departments based on the retrieved sidekicks
        const uniqueDepartments = Array.from(
          new Set(retrievedSidekicks.flatMap((s: Sidekick) => s.departments).filter(Boolean))
        )
          .map(toSentenceCase)
          .sort();

        setDepartments(uniqueDepartments);
        setSidekicks(retrievedSidekicks);
      } catch (error) {
        console.error('Error fetching sidekicks:', error);
      }
    };

    fetchSidekicks();
  }, []);

  useEffect(() => {
    if (!!sidekicks?.length && !!selectedDepartment) {
      const sidekicksInDepartment = sidekicks
        .filter((s) => s.departments.includes(toSentenceCase(selectedDepartment)))
        .sort((a, b) => a.label.localeCompare(b.label));
      setDepartmentSidekicks(sidekicksInDepartment);
      setSelectedSidekick(sidekicksInDepartment[0]);
    }
  }, [sidekicks, selectedDepartment]);

  useEffect(() => {
    if (selectedSidekick) {
      onSidekickSelected(selectedSidekick);
      Cookies.set('sidekick', JSON.stringify(selectedSidekick));

      const lastUsedSidekicks = JSON.parse(Cookies.get('lastUsedSidekicks') || '{}');
      lastUsedSidekicks[selectedDepartment.toLowerCase()] = selectedSidekick;
      Cookies.set('lastUsedSidekicks', JSON.stringify(lastUsedSidekicks));
    }
  }, [selectedSidekick, selectedDepartment, onSidekickSelected]);

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    Cookies.set('department', department.toLowerCase());
  };

  const handleSidekickChange = (event: SelectChangeEvent<string>) => {
    const sidekickValue = event.target.value;
    const selectedSidekick = departmentSidekicks.find((s) => s.id === sidekickValue);
    setSelectedSidekick(selectedSidekick || null);
  };

  return departments.length ? (
    <>
      <FormControl size="small">
        <FormLabel id="department-select-label" sx={{ pb: 1 }}>
          Department
        </FormLabel>
        <Select
          labelId="department-select-label"
          id="department-select"
          size="small"
          value={selectedDepartment}
          onChange={handleDepartmentChange}>
          {departments.map((department) => (
            <MenuItem key={department} value={department}>
              {department}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <FormLabel id="sidekick-select-label" sx={{ pb: 1 }}>
          Sidekick
        </FormLabel>
        <Select
          labelId="sidekick-select-label"
          id="sidekick-select"
          size="small"
          value={selectedSidekick?.id?.toString() ?? ''}
          onChange={handleSidekickChange}>
          {departmentSidekicks.map((sidekick) => (
            <MenuItem key={sidekick.id} value={sidekick.id}>
              {sidekick.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  ) : null;
};
