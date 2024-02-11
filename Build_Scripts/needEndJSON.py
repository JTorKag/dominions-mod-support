import csv
import json
import sys

def write_commands_to_json(csv_file, json_file):
    # Initialize an empty list to store command strings
    commands = []

    # Read CSV file and extract values
    with open(csv_file, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        headers = next(csv_reader)  # Read the headers

        # Add header to the commands list if it starts with "new" or "select"
        header_value = headers[0]
        if header_value.lower().startswith(("new", "select")):
            commands.append("#" + header_value)

        # Process the subsequent rows
        for row in csv_reader:
            first_column_value = row[0]
            # Add '#' at the start of each string if it starts with "new" or "select"
            if first_column_value.lower().startswith(("new", "select")):
                commands.append("#" + first_column_value)

    # Create a JSON object with the extracted commands
    json_object = {"command": commands}

    # Write JSON object to a JSON file
    with open(json_file, 'w') as jsonfile:
        json.dump(json_object, jsonfile, indent=2)

if __name__ == "__main__":
    # Check if two command-line arguments are provided
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_csv_file> <output_json_file>")
        sys.exit(1)

    input_csv_file = sys.argv[1]
    output_json_file = sys.argv[2]

    write_commands_to_json(input_csv_file, output_json_file)
