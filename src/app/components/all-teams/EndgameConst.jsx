'use client';

import { 
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import raw_data from  '../../results/resultsmatch.json';
import { useEffect, useState } from 'react';

const AllTeamsEndgame = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        let acc = {}
        raw_data.forEach((item) => {
            if (!acc[item.team_number]) {
                acc[item.team_number] = {
                    team_number: item.team_number,
                    climbs: item.hang_or_park === "Hang" ? 1 : 0,
                    harmony: item.harmony === "Yes" ? 1 : 0,
                    traps: item.trap === "Yes" ? 1 : 0,
                };
            } else {
                acc[item.team_number].climbs += item.hang_or_park === "Hang" ? 1 : 0;
                acc[item.team_number].harmony += item.harmony === "Yes" ? 1 : 0;
                acc[item.team_number].traps += item.trap === "Yes" ? 1 : 0;
            }
        })

        setData(Object.values(acc).sort((a, b) => (b.climbs + b.harmony + b.traps) - (a.climbs + a.harmony + a.traps)) )

    }, [])


    useEffect(() => {
        console.log(data)
    }, [data])
//   const sortedData = finalData.sort((a, b) => (b.avgSpeakerNotes + b.avgAmpNotes) - (a.avgSpeakerNotes + a.avgAmpNotes));

  const maxYValue = Math.max(data.map(item => item.ckimbs + item.harmony + item.traps));

  return (
      <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="team_number" />
              {/* <CartesianGrid strokeDasharray="5 5"/> */}
              <YAxis domain={[0, maxYValue + 1]}/>
              <Legend />
              <Tooltip content={<CustomTooltip />}/>
              <Bar name="Hang" dataKey="climbs" stackId="a" fill="#8b5cf6" />
              <Bar name="Harmony" dataKey="harmony" stackId="a" fill="#db74b2" />
              <Bar name="Trap" dataKey="traps" stackId="a" fill="#5e9981" />
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
                  Total Climbs:
                  <span className="ml-2">{payload[0].value}</span>
              </p>
              <p className="text-sm text-[#db74b2]">
                  Total Harmonies:
                  <span className="ml-2">{payload[1].value}</span>
              </p>
              <p className="text-sm text-[#5e9981]">
                  Total Traps:
                  <span className="ml-2">{payload[2].value}</span>
              </p>

          </div>
      );
  }
};

export default AllTeamsEndgame;