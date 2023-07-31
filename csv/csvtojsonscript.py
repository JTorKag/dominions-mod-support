import csv
import json
import os

folder_path = './path/to/csv/folder'  # Replace this with the path to your folder containing CSV files

def csv_to_json(csv_file_path, json_file_path):
    data = []
    with open(csv_file_path, 'r', newline='') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)
    
    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)

def convert_csv_files_to_json():
    try:
        for file in os.listdir(folder_path):
            if file.endswith('.csv'):
                csv_file_path = os.path.join(folder_path, file)
                json_file_path = os.path.join(folder_path, f'{os.path.splitext(file)[0]}.json')

                csv_to_json(csv_file_path, json_file_path)
                print(f'Converted {file} to JSON.')

        print('Conversion completed.')
    except Exception as e:
        print('Error converting CSV files to JSON:', e)

convert_csv_files_to_json()
