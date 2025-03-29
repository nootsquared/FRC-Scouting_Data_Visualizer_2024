'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import data from '../../../../2025-NEW-RESULTS/results.json';

const AutonAlgae = () => {
    const processedData = Object.values(
        data.reduce((acc, item) => {
            const teamNumber = item["Team-Number"];
            if (!acc[teamNumber]) {
                acc[teamNumber] = {
                    team_number: teamNumber,
                    Net: 0,
                    Processor: 0,
                };
            }
            acc[teamNumber].Net += parseInt(item["Auton-Algae-Net"] || 0) || 0;
            acc[teamNumber].Processor += parseInt(item["Auton-Algae-Processor"] || 0) || 0;
            return acc;
        }, {})
    ).map((team) => ({
        ...team,
        total: team.Net * 2 + team.Processor,
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

export default AutonAlgae;
