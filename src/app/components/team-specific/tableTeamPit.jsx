'use client';

import React, { useState, useEffect } from 'react';
import data from  '../../results/resultspit.json';

const TableTeamPit = ({teamNumber}) => {
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        console.log('teamNumber:', teamNumber); // Check the teamNumber prop
        console.log('data:', data); // Check the data

        let filteredData = data.find(item => String(item.team_number) === teamNumber);

        console.log('filteredData:', filteredData); // Check the filtered data

        setTeamData(filteredData);
    }, [teamNumber]);

    return (
        <div className="bg-gray-200 p-4 rounded-lg">
            {teamData ? (
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(teamData).map(([key, value], index) => (
                        <div key={index}>
                            <h2 className="font-bold text-black">{key}</h2>
                            <p className="text-black">{value || 'null'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No data found for team {teamNumber}</p>
            )}
        </div>
    );
};

export default TableTeamPit;