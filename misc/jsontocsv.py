import json
import csv

def json_to_csv(json_file, csv_file):
    # Read JSON file
    with open(json_file, 'r') as json_file:
        data = json.load(json_file)

    # Open CSV file for writing
    with open(csv_file, 'w', newline='') as csv_file:
        # Create a CSV writer object
        csv_writer = csv.writer(csv_file)

        # Write header using keys from the first JSON object
        header = data[0].keys()
        csv_writer.writerow(header)

        # Write data from JSON to CSV
        for row in data:
            csv_writer.writerow(row.values())

# Example usage
json_file_path = r'C:\Users\jimmy\dominions-mod-support\json\commands.json'
csv_file_path = r'C:\Users\jimmy\dominions-mod-support\json\commands.csv'

json_to_csv(json_file_path, csv_file_path)
