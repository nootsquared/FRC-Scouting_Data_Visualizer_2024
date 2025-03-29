'use client';

import React, { useState, useEffect } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const MatchNumberTable = ({ teamNumber }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    import('../../../../2025-NEW-RESULTS/results.json').then((module) => {
      const resultsData = module.default;
      const teamData = resultsData
        .filter(item => String(item["Team-Number"]) === String(teamNumber))
        .sort((a, b) => Number(a["Match-Number"]) - Number(b["Match-Number"]));

      setFilteredData(teamData);
    });
  }, [teamNumber]);

  if (!filteredData.length) {
    return <div>No data found for team {teamNumber}</div>;
  }

  // Extract all unique keys from the data to dynamically generate table columns
  const allKeys = Array.from(
    new Set(filteredData.flatMap(item => Object.keys(item)))
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {allKeys.map((key, index) => (
              <TableCell key={index}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {allKeys.map((key, colIndex) => (
                <TableCell key={colIndex}>{item[key] || 'N/A'}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchNumberTable;