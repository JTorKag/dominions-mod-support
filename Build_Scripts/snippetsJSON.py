import csv
import json
import sys

def csv_to_snippets(csv_file, output_file):
    snippets = {}
    
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        header = next(reader)  # Read the header line

        for row in reader:
            prefix, description = row
            snippet_body = [f"#{prefix}"]

            if prefix.lower().startswith(("new", "select")):
                snippet_body.append("")  # Add a new line
                snippet_body.append("#end")  # Add a line with "#end"

            snippet = {
                "prefix": f"#{prefix}",
                "body": snippet_body,
                "description": description.strip()
            }
            snippets[f"#{prefix}"] = snippet

    with open(output_file, 'w') as out_file:
        json.dump(snippets, out_file, indent=2)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(1)

    input_csv_file = sys.argv[1]
    output_json_file = sys.argv[2]

    csv_to_snippets(input_csv_file, output_json_file)

