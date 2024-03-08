import json

def append_to_json(data, file_path='results.json'):
    with open(file_path, 'r') as f:
        try:
            existing_data = json.load(f)
        except json.JSONDecodeError:
            existing_data = []

    existing_data.append(data)

    # Write everything back to the file
    with open(file_path, 'w') as f:
        f.write('[\n')
        for i, item in enumerate(existing_data):
            f.write(json.dumps(item) + (',' if i < len(existing_data) - 1 else '') + '\n')
        f.write(']\n')
        
def main():

    #UNTIL MATCH 7 TOTAL DATA IS WRONG
    # VERY GOOD, 51 IS EVEN BETTER

    while True:
        scouter_name = input("Enter scouter name: ")
        match_number = input("Enter match number: ")
        team_number = input("Enter team number: ")
        alliance = input ("Enter Alliance Color: ")
        starting_position = input("Enter starting position: ")
        additional_notes_location = input("Enter additional notes location: ")
        amp_notes_auton = input("Enter auton amp notes: ")
        speaker_notes_auton = input("Enter auton speaker notes: ")
        amp_notes_teleop = input("Enter teleop amp notes: ")
        speaker_notes_teleop = input("Enter teleop speaker notes: ")
        trap = input("Enter if trap: ")
        harmonize = input("Enter if harmonized: ")
        hang_or_park = input("Enter if hang or park: ")
        robot_driving = input("Enter robot driving scale: ")
        defense_capability = input("Enter defense capability: ")
        notes = input("Enter notes: ")

        totalAutonPoints = 0
        totalTeleopPoints = 0

        totalAutonPoints += int(amp_notes_auton) + int(speaker_notes_auton)
        totalTeleopPoints += int(amp_notes_teleop) + int(speaker_notes_teleop)

        # Modify the input values
        if starting_position == '1':
            starting_position = 'AMP'
        elif starting_position == '2':
            starting_position = 'Middle'
        elif starting_position == '3':
            starting_position = 'Source'

        if trap == '1':
            trap = 'Yes'
        elif trap == '2':
            trap = 'No'

        if harmonize == '1':
            harmonize = 'Yes'
        elif harmonize == '2':
            harmonize = 'No'

        if additional_notes_location == '1':
            additional_notes_location = 'None'
        elif additional_notes_location == '2':
            additional_notes_location = 'Spike'
        elif additional_notes_location == '3':
            additional_notes_location = 'Center line'
        elif additional_notes_location == '4':
            additional_notes_location = 'Both'

        if hang_or_park == '1':
            hang_or_park = 'Hang'
        elif hang_or_park == '2':
            hang_or_park = 'Park'
        elif hang_or_park == '3':
            hang_or_park = 'None'
        
        if robot_driving == '1':
            robot_driving = 'Poor'
        elif robot_driving == '2':
            robot_driving = 'Mid'
        elif robot_driving == '3':
            robot_driving = 'Excellent'
        
        if defense_capability == '1':
            defense_capability = 'Did not play defense'
        elif defense_capability == '2':
            defense_capability = 'Average'
        elif defense_capability == '3':
            defense_capability = 'Excellent'

        data = {
            'scouter_name': scouter_name,
            'match_number': match_number,
            'team_number': team_number,
            'alliance': alliance,
            'starting_position': starting_position,
            'amp_notes_auton': amp_notes_auton,
            'speaker_notes_auton': speaker_notes_auton,
            'additional_notes_location': additional_notes_location,
            'amp_notes_teleop': amp_notes_teleop,
            'speaker_notes_teleop': speaker_notes_teleop,
            'trap': trap,
            'hang_or_park': hang_or_park,
            'harmonize': harmonize,
            'robot_driving': robot_driving,
            'defense_capability': defense_capability,
            'notes': notes,
            'totalAutonPoints': totalAutonPoints,
            'totalTeleopPoints': totalTeleopPoints
        }
        
        print(data)
        append_to_json(data)

if __name__ == '__main__':
    main()