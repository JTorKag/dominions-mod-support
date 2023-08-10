const vscode = require('vscode');
const fs = require('fs');


class HoverProvider {
    constructor() {

        this.commandJson = {};
        
    }

    separateCommand(inputString) {
        const pattern = /#(\w+)\s+(\d+)/;
        const match = inputString.match(pattern);
        return match ? [match[1], parseInt(match[2])] : [null, null];
    }

    async loadJson(filename) {
        try {
            const data = await fs.promises.readFile(filename, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData
          } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
          }
    }

    generateMarkdownTable(data, customMessage = "") {
        const tableHeader = '| Property | Value |\n|:--------:|:-----:|';
        const tableRow = Object.entries(data)
            .filter(([prop, val]) => val !== "") // Skip rows where the value is blank (empty string)
            .map(([prop, val]) => `| ${prop} | ${val} |`)
            .join('\n');
        const tableContent = `${tableHeader}\n${tableRow}`;
  
        // Check if the custom message is not empty, then include it before the table
        return customMessage ? `${customMessage}\n\n${tableContent}` : tableContent;
    }

    generateHoverTableContent(matchedValue, customMessage) {
        const markdownTable = this.generateMarkdownTable(matchedValue);
        const markdownContent = customMessage ? `${customMessage}\n\n${markdownTable}` : markdownTable;
        return new vscode.Hover(new vscode.MarkdownString(markdownContent, true));
    }

    async activate(context) {
        console.log('Hover active');

        this.commandJson = await this.loadJson(context.asAbsolutePath('/json/commands.json'));

        vscode.languages.registerHoverProvider('dominionsmod', {
            provideHover: async (document, position, token) => {
   
               const range = document.getWordRangeAtPosition(position);
               const word = document.getText(range);
               const line = document.lineAt(position.line).text;
               const command = this.separateCommand(line);
   
               console.log('Hovered command', command[0]);
               console.log('Hovered value', command[1]);
               console.log('Hovered Word', word);
   
               const nationcmds = ["restricted", "nationrebate", "notfornation", "nat", "selectnation"]
               const unitcmds = ["selectmonster", "selectmonster","copystats", "copyspr", "monpresentrec","ownsmonrec","raiseshape","shapechange","prophetshape","firstshape","secondshape","secondtmpshape","forestshape","plainshape","foreignshape","homeshape","domshape","notdomshape","springshape","summershape","autumnshape","wintershape","landshape","landshape","watershape","twiceborn","domsummon","domsummon2","domsummon20","raredomsummon","templetrainer","makemonsters1","makemonsters2","makemonsters3","makemonsters4","makemonsters5","summon1","summon2","summon3","summon4","summon5","battlesum1", "battlesum2","battlesum3", "battlesum4", "battlesum5","batstartsum1","batstartsum2","batstartsum3","batstartsum4","batstartsum5","batstartsum1d3","batstartsum1d6","batstartsum2d6","batstartsum3d6","batstartsum4d6","batstartsum5d6","batstartsum6d6","batstartsum7d6","batstartsum8d6","batstartsum9d6","slaver","farsumcom","onlymnr","notmnr","homemon","homecom","mon","com","natmon","natcom","summon","summonlvl2","summonlvl3","summonlvl4","wallcom","wallunit","uwwallunit","uwwallcom","startcom","coastcom1","coastcom2","addforeignunit", "addforeigncom","forestrec", "mountainrec", "swamprec","wasterec","caverec","coastrec","startscout","forestcom","mountaincom","swampcom","wastecom","cavecom","coastcom","startunittype1","startunittype2","addrecunit","addreccom","uwrec","uwcom","coastunit1","coastunit2","coastunit3","landrec","landcom","hero1","hero2","hero3","hero4","hero5","hero6","hero7","hero8","hero9","hero10","multihero1","multihero2","multihero3","multihero4","multihero5","multihero6","multihero7","defcom1","defcom2","defunit1", "defunit1b","defunit1c", "defunit1d", "defunit2","defunit2b","delgod","cheapgod20","cheapgod40"]
               const itemcmds = ["startitem","selectitem","copyitem"]
               const spellcmds = ["onebattlespell", "selectspell","nextspell"]
               const sitescmds = ["selectsite", "newsite"]
               const enchtcmds = ["enchrebate50", "enchrebate25p", "enchrebate50p",]
   
   
               if (nationcmds.some(cmd => cmd === command[0]) && word !== command[0]) {
               
                   const jsonData = await this.loadJson(context.asAbsolutePath('/json/nations.json'));
                   const keyToFind = "id";
                   const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
   
                   if (matchedValue) {
                       const customMessage = null;
           
                       // Call the function to generate the hover content
                       return this.generateHoverTableContent(matchedValue, customMessage);
                   }
               }
               else if (unitcmds.some(cmd => cmd === command[0]) && word !== command[0]) {
               
                   const jsonData = await this.loadJson(context.asAbsolutePath('/json/BaseU.json'));
                   const keyToFind = "id";
                   const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
   
                   if (matchedValue) {
                       const customMessage = null;
           
                       // Call the function to generate the hover content
                       return this.generateHoverTableContent(matchedValue, customMessage);
                   }
               }
   
               else if (itemcmds.some(cmd => cmd === command[0]) && word !== command[0]) {
               
                   const jsonData = await this.loadJson(context.asAbsolutePath('/json/BaseI.json'));
                   const keyToFind = "id";
                   const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
   
                   if (matchedValue) {
                       const customMessage = null;
           
                       // Call the function to generate the hover content
                       return this.generateHoverTableContent(matchedValue, customMessage);
                   }
               }
   
               else if (spellcmds.some(cmd => cmd === command[0]) && word !== command[0]) {
               
                   const jsonData = await this.loadJson(context.asAbsolutePath('/json/spells.json'));
                   const keyToFind = "id";
                   const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
   
                   if (matchedValue) {
                       const customMessage = null;
           
                       // Call the function to generate the hover content
                       return this.generateHoverTableContent(matchedValue, customMessage);
                   }
               }
   
               else if (sitescmds.some(cmd => cmd === command[0]) && word !== command[0]) {
               
                   const jsonData = await this.loadJson(context.asAbsolutePath('/json/MagicSites.json'));
                   const keyToFind = "id";
                   const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
   
                   if (matchedValue) {
                       const customMessage = null;
           
                       // Call the function to generate the hover content
                       return this.generateHoverTableContent(matchedValue, customMessage);
                   }
               }
   
               else if (enchtcmds.some(cmd => cmd === command[0]) && word !== command[0]) {
               
                   const jsonData = await this.loadJson(context.asAbsolutePath('/json/enchantments.json'));
                   const keyToFind = "id";
                   const matchedValue = jsonData.find(obj => obj[keyToFind] === word);
   
                   if (matchedValue) {
                       const customMessage = null;
           
                       // Call the function to generate the hover content
                       return this.generateHoverTableContent(matchedValue, customMessage);
                   }
               }
   
               else if (word != null) {
                    const matchedValue = this.commandJson.find(obj => obj["Friendly name"] === word);
                    //console.log("word not null");

                    return new vscode.Hover({
                        language: "English",
                        value: matchedValue.description
                        });
                }

               else {
               }
           }
       });
    }

    deactivate() {   
    }
}

module.exports = HoverProvider;