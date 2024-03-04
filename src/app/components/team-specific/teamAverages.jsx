'use client';

import { 
    LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import data from  '../results.json';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

const teamAllAverages = ({ teamNumber }) => {

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const groupedData = _(data)
        .groupBy(item => `${item.match_number}-${item.team_number}`)
        .map((items, group) => {
            const totalTeleopPoints = _.meanBy(items, item => Number(item.totalTeleopPoints));
            const totalAutonPoints = _.meanBy(items, item => Number(item.totalAutonPoints));
    
            return {
                match_number: Number(group.split('-')[0]),
                team_number: Number(group.split('-')[1]),
                totalTeleopPoints,
                totalAutonPoints,
                total: totalTeleopPoints + totalAutonPoints,
            };
        })
        .value();
    
        const filteredData = groupedData
        .filter(item => item.team_number === Number(teamNumber))
        .sort((a, b) => a.match_number - b.match_number);
    
        setFilteredData(filteredData);
    
    }, [teamNumber]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="match_number" />
                <CartesianGrid strokeDasharray="5 5"/>
                <YAxis domain={[0, 'dataMax + 1']}/>
                <Legend />
                <Tooltip content={<CustomTooltip />}/>
                <Line type="monotone" dataKey="totalAutonPoints" stroke="#3b82f6" />
                <Line type="monotone" dataKey="totalTeleopPoints" stroke="#8b5cf6" />
                <Line type="monotone" dataKey="total" stroke="#ff0000" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm" style={{ color: '#ff0000' }}>
                    Total Notes:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
                <p className="text-sm text-indigo-400">
                    Total Teleop Notes:
                    <span className="ml-2">{payload[0].value}</span>
                </p>
                <p className="text-sm text-blue-400">
                    Total Auton Notes:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
            </div>
        );
    }
};

export default teamAllAverages;  