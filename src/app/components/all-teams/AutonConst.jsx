'use client';

import { 
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import data from  '../results.json';

const AllTeamsAuton = () => {

    const groupedData = data.reduce((acc, item) => {
        const key = `${item.team_number}-${item.match_number}`;
        if (!acc[key]) {
            acc[key] = {
                team_number: item.team_number,
                match_number: item.match_number,
                totalSpeakerNotes: 0,
                totalAmpNotes: 0,
                count: 0,
            };
        }
        acc[key].totalSpeakerNotes += Number(item.speaker_notes_auton);
        acc[key].totalAmpNotes += Number(item.amp_notes_auton);
        acc[key].count++;
        return acc;
    }, {});

    const averagedData = Object.values(groupedData).map(item => ({
        ...item,
        avgSpeakerNotes: item.totalSpeakerNotes / item.count,
        avgAmpNotes: item.totalAmpNotes / item.count,
    }));

    const teamData = averagedData.reduce((acc, item) => {
        if (!acc[item.team_number]) {
            acc[item.team_number] = {
                team_number: item.team_number,
                totalSpeakerNotes: 0,
                totalAmpNotes: 0,
                count: 0,
            };
        }
        acc[item.team_number].totalSpeakerNotes += item.avgSpeakerNotes;
        acc[item.team_number].totalAmpNotes += item.avgAmpNotes;
        acc[item.team_number].count++;
        return acc;
    }, {});

    const finalData = Object.values(teamData).map(item => ({
      ...item,
      avgSpeakerNotes: item.totalSpeakerNotes / item.count,
      avgAmpNotes: item.totalAmpNotes / item.count,
  }));

  const sortedData = finalData.sort((a, b) => ((b.avgSpeakerNotes + b.avgAmpNotes) / 2) - ((a.avgSpeakerNotes + a.avgAmpNotes) / 2));

  return (
      <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="team_number" />
              <CartesianGrid strokeDasharray="5 5"/>
              <YAxis domain={[0, 'dataMax + 1']}/>
              <Legend />
              <Tooltip content={<CustomTooltip />}/>
              <Bar type="monotone" dataKey="avgSpeakerNotes" fill="#3b82f6" stackId="a" />
              <Bar type="monotone" dataKey="avgAmpNotes" fill="#8b5cf6" stackId="a" />
          </BarChart>
      </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-indigo-400">
                    Average Amp Notes Auton:
                    <span className="ml-2">{payload[1].value}</span>
                </p>
                <p className="text-sm text-blue-400">
                    Average Speaker Notes Auton:
                    <span className="ml-2">{payload[0].value}</span>
                </p>

            </div>
        );
    }
};

export default AllTeamsAuton;