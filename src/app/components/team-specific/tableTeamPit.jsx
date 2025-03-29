'use client';

import React, { useState, useEffect } from 'react';
import pitData from '../../../../2025-NEW-RESULTS/resultspit.json';

const TableTeamPit = ({ teamNumber }) => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const filteredData = pitData.find(item => String(item["Team-Number"]) === String(teamNumber));
    setTeamData(filteredData);
  }, [teamNumber]);

  if (!teamData) {
    return <div>No data found for team {teamNumber}</div>;
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Pit Scouting Data for Team {teamNumber}</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(teamData).map(([key, value], index) => (
          <div key={index} className="bg-white p-2 rounded shadow">
            <h3 className="font-bold text-gray-700">{key}</h3>
            <p className="text-gray-900">{value || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTeamPit;