import React, { useContext, useState } from 'react';
import TeamNumberContext from './TeamNumberContext';

const TeamNumberProvider = ({ children }) => {
  const [teamNumber, setTeamNumber] = useState(226);

  const updateTeamNumber = (newNumber) => {
    setTeamNumber(newNumber);
  };

  return (
    <TeamNumberContext.Provider value={{ teamNumber, updateTeamNumber }}>
      {children}
    </TeamNumberContext.Provider>
  );
};

export default TeamNumberProvider;