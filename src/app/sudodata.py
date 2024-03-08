import json
import random

def generate_data():
    data = []
    team_numbers = list(range(1, 81))  # Generate 80 unique team numbers

    match_number = 1
    while len(team_numbers) >= 6:  # While there are enough teams for a match
        match_teams = random.sample(team_numbers, 6)  # Select 6 unique teams for the match
        for team_number in match_teams:
            team_numbers.remove(team_number)  # Remove the team from the list so it can't be selected again for this match
            auton_points = random.randint(1, 10)
            speaker_notes_auton = auton_points + random.randint(-2, 2)
            teleop_points = random.randint(1, 10)
            speaker_notes_teleop = teleop_points + random.randint(-2, 2)
            data_point = {
                "scouter_name": "PM",
                "match_number": str(match_number),
                "team_number": str(team_number),
                "starting_position": random.choice(["Near the AMP", "Middle", "Near the source"]),
                "amp_notes_auton": str(auton_points),
                "speaker_notes_auton": str(speaker_notes_auton),  # Correlated with amp_notes_auton
                "disabled": random.choice(["Yes", "No"]),
                "additional_notes_location": random.choice(["None", "Ground line", "Center line", "Both"]),
                "amp_notes_teleop": str(teleop_points),
                "speaker_notes_teleop": str(speaker_notes_teleop),  # Correlated with amp_notes_teleop
                "trap": random.choice(["Yes", "No"]),
                "hang_or_park": random.choice(["Hang", "Park"]),
                "harmonize": random.choice(["Yes", "No"]),
                "penalized": random.choice(["Yes", "No"]),
                "robot_driving": str(random.randint(1, 5)),
                "defense_capability": str(random.randint(1, 5)),
                "notes": "",
                "totalAutonPoints": auton_points + speaker_notes_auton,  # Sum of amp_notes_auton and speaker_notes_auton
                "totalTeleopPoints": teleop_points + speaker_notes_teleop,  # Sum of amp_notes_teleop and speaker_notes_teleop
            }
            data.append(data_point)
        match_number += 1  # Increment match number after each match

    # Write the data to a JSON file
    with open('results.json', 'w') as f:
        json.dump(data, f, indent=4)

if __name__ == '__main__':
    generate_data()