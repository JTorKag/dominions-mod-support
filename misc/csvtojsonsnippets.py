import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    result_dict = {}

    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for row in csv_reader:
            event_key = row['prefix']
            result_dict[event_key] = {
                'prefix': row['prefix'],
                'body': [row['body']],
                'description': row['description']
            }

    with open(json_file_path, 'w') as json_file:
        json.dump(result_dict, json_file, indent=4)


# Example usage:
csv_file_path = r'PATH'
json_file_path = r'snippets.json'
csv_to_json(csv_file_path, json_file_path)
