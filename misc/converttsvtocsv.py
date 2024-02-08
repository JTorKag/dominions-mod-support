import os
import csv

def tsv_to_csv(folder_path):
    try:
        # List all files in the folder
        files = os.listdir(folder_path)

        for file_name in files:
            # Check if the file has the .tsv extension
            if file_name.endswith('.tsv'):
                tsv_file_path = os.path.join(folder_path, file_name)
                
                # Generate the new file name with the .csv extension
                csv_file_name = os.path.splitext(file_name)[0] + '.csv'
                csv_file_path = os.path.join(folder_path, csv_file_name)

                # Convert .tsv to .csv
                with open(tsv_file_path, 'r', newline='', encoding='utf-8', errors='replace') as tsv_file, \
                     open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
                    tsv_reader = csv.reader(tsv_file, delimiter='\t')
                    csv_writer = csv.writer(csv_file)

                    for row in tsv_reader:
                        csv_writer.writerow(row)

                print(f"Converted: {file_name} to {csv_file_name}")

        print("Conversion complete.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Replace 'path/to/folder' with the actual path of your folder
folder_path = r'PATH'

tsv_to_csv(folder_path)
