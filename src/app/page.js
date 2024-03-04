'use client';

import AutonConst from './components/all-teams/AutonConst';
import TeleopConst from './components/all-teams/TeleopConst';
import AllTeamsTotal from './components/all-teams/AllTeamsTotal';
import TeamAutons from './components/team-specific/teamAutons';
import TeamTeleops from './components/team-specific/teamTeleops';
import TeamAverages from './components/team-specific/teamAverages';
import Graph from './components/team-specific/tableTeam';
import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';

export default function Home() {
  const [teamNumber, setTeamNumber] = useState(); // Replace 226 with your initial team number

  const handleTeamNumberChange = (event) => {
    setTeamNumber(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-14">
      <div>
        <h1 className="text-4xl font-bold text-white mb-12">226 Data Visualization by Pranav M</h1>
      </div>

      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="All Teams">
          <AllTeamsTotal />
        </GridItem>
      </div>

      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Auton">
          <AutonConst />
        </GridItem>

        <GridItem title="Teleop">
          <TeleopConst />
        </GridItem>
      </div>

      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[400px] max-h-[400px] mb-12 text-white">
        <h1 className="text-2xl font-bold text-white  text-center">Team Number Input:</h1>
        <TextField
            focused
            InputProps={{
                style: { color: 'white' }
            }}
            margin="normal"
            color="primary"
            id="teamNumber"
            label="Team Number"
            value={teamNumber}
            onChange={handleTeamNumberChange}
        />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-12">Team {teamNumber}</h1>
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Auton">
          <TeamAutons teamNumber={teamNumber} />
        </GridItem>

        <GridItem title="Teleop">
          <TeamTeleops teamNumber={teamNumber} />
        </GridItem>
      </div>
      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Averages">
          <TeamAverages teamNumber={teamNumber} />
        </GridItem>
      </div>
      <div className="grid xl:grid-cols-1 lg:grid-cols-2 w-full gap-10 max-w-[1400px] mb-12">
        <GridItem title="Data Per Match">
          <Graph teamNumber={teamNumber} />
        </GridItem>
      </div>
    </main>
  );
}

function GridItem({ title, children }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-slate-900 bg-slate-900/50 rounded-xl h-[400px]">
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}