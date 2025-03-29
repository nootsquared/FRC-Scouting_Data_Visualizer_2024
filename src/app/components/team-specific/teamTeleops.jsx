'use client';

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import resultsData from '../../../../2025-NEW-RESULTS/results.json';
import React, { useState, useEffect } from 'react';

const TeamTeleops = ({ teamNumber }) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const newFilteredData = resultsData
            .filter(item => String(item["Team-Number"]) === String(teamNumber))
            .map(item => ({
                match_number: Number(item["Match-Number"]),
                L4: Number(item["Teleop-Coral-L4"] || 0),
                L3: Number(item["Teleop-Coral-L3"] || 0),
                L2: Number(item["Teleop-Coral-L2"] || 0),
                L1: Number(item["Teleop-Coral-L1"] || 0),
                Processor: Number(item["Teleop-Algae-Processor"] || 0),
                Barge: Number(item["Teleop-Algae-Net"] || 0),
            }))
            .sort((a, b) => a.match_number - b.match_number);

        setFilteredData(newFilteredData);
    }, [teamNumber]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="match_number" />
                <YAxis />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
                <Line name="L4" type="monotone" dataKey="L4" stroke="#1d4ed8" />
                <Line name="L3" type="monotone" dataKey="L3" stroke="#3b82f6" />
                <Line name="L2" type="monotone" dataKey="L2" stroke="#93c5fd" />
                <Line name="L1" type="monotone" dataKey="L1" stroke="#bfdbfe" />
                <Line name="Processor" type="monotone" dataKey="Processor" stroke="#34d399" />
                <Line name="Barge" type="monotone" dataKey="Barge" stroke="#10b981" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">Match {label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default TeamTeleops;