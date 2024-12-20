import json

with open('spells.json', 'r') as json_file:
    spells = json.load(json_file)

with open('output.txt', 'w') as output_file:
    for spell in spells:
        if spell.get("school") == "-1":
            continue
        else:
            output_file.write(f"#selectspell {spell['id']}\n")
            output_file.write(f"#precision " + str(int(spell['precision'])+ int(spell['researchlevel']) + 2) + "\n")
            output_file.write("#end\n\n")  
print("tada")





 