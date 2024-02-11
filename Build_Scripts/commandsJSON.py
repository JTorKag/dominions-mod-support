import csv
import json
import sys

def csv_to_json(csv_file, json_file):
    # Initialize an empty list to store JSON objects
    json_objects = []

    # Read CSV file and convert each row to a JSON object
    with open(csv_file, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        headers = next(csv_reader)  # Read the headers

        # Include the header row as a special JSON object
        header_friendly_name = headers[0]
        header_description = headers[1]
        header_json_object = {"Friendly name": header_friendly_name, "description": header_description}
        json_objects.append(header_json_object)

        # Process the subsequent rows
        for row in csv_reader:
            friendly_name = row[0]
            description = row[1]
            json_object = {"Friendly name": friendly_name, "description": description}
            json_objects.append(json_object)

    # Write JSON objects to a JSON file
    with open(json_file, 'w') as jsonfile:
        json.dump(json_objects, jsonfile, indent=2)

if __name__ == "__main__":
    # Check if two command-line arguments are provided
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_csv_file> <output_json_file>")
        sys.exit(1)

    input_csv_file = sys.argv[1]
    output_json_file = sys.argv[2]

    csv_to_json(input_csv_file, output_json_file)
