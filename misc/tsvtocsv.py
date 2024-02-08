import os

def change_extension(folder_path, old_extension, new_extension):
    try:
        # List all files in the folder
        files = os.listdir(folder_path)

        for file_name in files:
            # Check if the file has the old extension
            if file_name.endswith(old_extension):
                # Generate the new file name with the new extension
                new_file_name = os.path.splitext(file_name)[0] + new_extension
                old_file_path = os.path.join(folder_path, file_name)
                new_file_path = os.path.join(folder_path, new_file_name)

                # Rename the file
                os.rename(old_file_path, new_file_path)
                print(f"Renamed: {file_name} to {new_file_name}")

        print("Extension change complete.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Replace 'path/to/folder' with the actual path of your folder
folder_path = r'PATH'
old_extension = '.csv'
new_extension = '.tsv'

change_extension(folder_path, old_extension, new_extension)
