import csv
import json
import sys

def generate_vscode_language_json(csv_file_path, output_json_path):
    # Read CSV file
    with open(csv_file_path, 'r') as csv_file:
        reader = csv.reader(csv_file)
        header = next(reader)  # Get header

        # Extract only the first value from the header
        first_header_value = header[0]

        # Extract values from the first column, excluding the header
        match_values = [row[0] for row in reader]

    # Generate JSON content
    vscode_language_json = {
        "scopeName": "source.dm",
        "name": "Dominions 6 Mod",
        "patterns": [
            {
                "include": "#keywords"
            },
            {
                "include": "#strings"
            },
            {
                "include": "#numbers"
            },
            {
                "include": "#comments"
            }
        ],
        "repository": {
            "keywords": {
                "patterns": [
                    {
                        "name": "keyword.control.dominionsmod",
                        "match": "\\s*#(" + first_header_value + '|' + '|'.join(match_values) + ")\\b\\s*"
                    }
                ]
            },
            "strings": {
                "name": "string.quoted.double.dominionsmod",
                "begin": "\"",
                "end": "\""
            },
            "numbers": {
                "patterns": [
                    {
                        "name": "constant.numeric.integer.decimal.dominionsmod",
                        "match": "\\s*[[:digit:]]+\\b\\s*"
                    }
                ]
            },
            "comments": {
                "name": "comment.line.double-dash.dominionsmod",
                "begin": "--",
                "end": "$\n"
            }
        }
    }

    # Write generated JSON to output file
    with open(output_json_path, 'w') as json_file:
        json.dump(vscode_language_json, json_file, indent=2)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_csv_file> <output_json_file>")
        sys.exit(1)

    input_csv_file = sys.argv[1]
    output_json_file = sys.argv[2]

    generate_vscode_language_json(input_csv_file, output_json_file)
