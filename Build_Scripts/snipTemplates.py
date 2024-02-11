import json
import sys

def merge_snippets(snippets_json, template_json):
    with open(snippets_json, 'r') as snippets_file:
        existing_snippets = json.load(snippets_file)

    with open(template_json, 'r') as template_file:
        template_snippets = json.load(template_file)

    merged_snippets = {**template_snippets, **existing_snippets}

    with open(snippets_json, 'w') as out_file:
        json.dump(merged_snippets, out_file, indent=2)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(1)

    snippets_json_file = sys.argv[1]
    template_json_file = sys.argv[2]

    merge_snippets(snippets_json_file, template_json_file)
