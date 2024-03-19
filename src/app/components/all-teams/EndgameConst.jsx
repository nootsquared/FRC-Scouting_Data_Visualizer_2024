'use client';

import { 
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip,
} from 'recharts';
import raw_data from  '../results.json';

const AllTeamsEndgame = () => {

    const [data, setData] = useState({});

    useEffect(() => {

        

    }, [])

  const sortedData = finalData.sort((a, b) => (b.avgSpeakerNotes + b.avgAmpNotes) - (a.avgSpeakerNotes + a.avgAmpNotes));

  const maxYValue = Math.max(...sortedData.map(item => item.avgSpeakerNotes + item.avgAmpNotes));

  return (
      <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="team_number" />
              <CartesianGrid strokeDasharray="5 5"/>
              <YAxis domain={[0, maxYValue + 1]}/>
              <Legend />
              <Tooltip content={<CustomTooltip />}/>
              <Bar name="Park" dataKey="avgSpeakerNotes" stackId="a" fill="#3b82f6" />
              <Bar name="Hang" dataKey="avgAmpNotes" stackId="a" fill="#8b5cf6" />
              <Bar name="Harmony" dataKey="avgAmpNotes" stackId="a" fill="#db74b2" />
              <Bar name="Trap" dataKey="avgAmpNotes" stackId="a" fill="#69dbad" />
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
                  Average Amp Notes Teleop:
                  <span className="ml-2">{payload[1].value}</span>
              </p>
              <p className="text-sm text-blue-400">
                  Average End:
                  <span className="ml-2">{payload[0].value}</span>
              </p>

          </div>
      );
  }
};

export default AllTeamsEndgame;