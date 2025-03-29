'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import data from '../../../../2025-NEW-RESULTS/results.json';

const AutonCoral = () => {
    const processedData = Object.values(
        data.reduce((acc, item) => {
            const teamNumber = item["Team-Number"];
            if (!acc[teamNumber]) {
                acc[teamNumber] = {
                    team_number: teamNumber,
                    L4: 0,
                    L3: 0,
                    L2: 0,
                    L1: 0,
                };
            }
            acc[teamNumber].L4 += parseInt(item["Auton-Coral-L4"] || 0) || 0;
            acc[teamNumber].L3 += parseInt(item["Auton-Coral-L3"] || 0) || 0;
            acc[teamNumber].L2 += parseInt(item["Auton-Coral-L2"] || 0) || 0;
            acc[teamNumber].L1 += parseInt(item["Auton-Coral-L1"] || 0) || 0;
            return acc;
        }, {})
    ).map((team) => ({
        ...team,
        total: team.L4 * 4 + team.L3 * 3 + team.L2 * 2 + team.L1,
    })).sort((a, b) => b.total - a.total);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="team_number" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar stackId="a" name="Total" dataKey="total" fill="#1d4ed8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">Team {label}</p>
                <p className="text-sm text-blue-400">Total: {data.total}</p>
            </div>
        );
    }
    return null;
};

export default AutonCoral;
