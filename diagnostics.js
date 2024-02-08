const vscode = require('vscode');
const fs = require('fs');

class ErrorDiagnosticProvider {
    constructor() {
        this.needEndJson = {};
    }

    async loadJson(filename) {
        try {
            const data = await fs.promises.readFile(filename, 'utf8');
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (error) {
            console.error('Error reading JSON file:', error);
            return null;
        }
    }

    checkMissingEnd(lines, diagnostics, startValues) {
        let lastCommand = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.includes('#end')) {
                lastCommand = null;
            }
            
            for (const command of startValues.command) {
                if (line.startsWith(command)) {
                    if (lastCommand && !line.endsWith('#end')) {
                        const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
                        const diagnostic = new vscode.Diagnostic(range, `Missing #end command for ${lastCommand} above this.`, vscode.DiagnosticSeverity.Error);
                        diagnostic.code = 'missing-end-above';
                        diagnostics.push(diagnostic);
                    }
                    lastCommand = command;
                    break; // No need to continue checking after a match
                }
            }
        }
        
        // Check if there's a missing #end by the end of the document after a startValue
        if (lastCommand) {
            const lastLineIndex = lines.length - 1;
            const lastLine = lines[lastLineIndex].trim();
            if (!lastLine.endsWith('#end')) {
                const range = new vscode.Range(new vscode.Position(lastLineIndex, 0), new vscode.Position(lastLineIndex, lastLine.length));
                const diagnostic = new vscode.Diagnostic(range, `Missing #end command for ${lastCommand} at the end of the document.`, vscode.DiagnosticSeverity.Error);
                diagnostic.code = 'missing-end-below';
                diagnostics.push(diagnostic);
            }
        }
    }
    
    checkFloatValues(lines, diagnostics) {
        const exclusionCommands = ['#color', '#maptextcol', '#secondarycolor', '#version'];
    
        let insideQuotes = false;
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            // Check if the line starts with any of the exclusion commands
            if (exclusionCommands.some(command => line.startsWith(command))) {
                continue;
            }
    
            let lineWithoutComment = line;
            const commentIndex = line.indexOf('--');
            if (commentIndex !== -1) {
                lineWithoutComment = line.substring(0, commentIndex).trim();
            }
    
            let lineWithoutQuotes = '';
            for (let j = 0; j < lineWithoutComment.length; j++) {
                const char = lineWithoutComment[j];
                if (char === '"') {
                    insideQuotes = !insideQuotes;
                }
                if (!insideQuotes) {
                    lineWithoutQuotes += char;
                }
            }
    
            const words = lineWithoutQuotes.split(/\s+/);
            for (const word of words) {
                // Check if the word contains a period (.) indicating a potential floating-point number
                if (/\d+\./.test(word)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(word)),
                        new vscode.Position(i, line.indexOf(word) + word.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        'Floating-point value found',
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            }
        }
    }
    

    checkColorValues(lines, diagnostics) {
        const colorCommands = ['#color', '#maptextcol', '#secondarycolor'];
    
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            for (const command of colorCommands) {
                if (line.startsWith(command)) {
                    const valueMatches = line.match(/(\d+\.\d+)/g);
    
                    if (valueMatches && valueMatches.length === 3) {
                        const values = valueMatches.map(match => parseFloat(match));
                        const isValid = values.every(value => value >= 0.0 && value <= 1.0);
    
                        if (!isValid) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(valueMatches[0])),
                                new vscode.Position(i, line.indexOf(valueMatches[2]) + valueMatches[2].length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `Values for ${command} should be between 0.0 and 1.0`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
                    } else {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(command)),
                            new vscode.Position(i, line.indexOf(command) + command.length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Invalid or missing values for ${command} command`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostic.code = 'show-hover';
                        diagnostics.push(diagnostic);
                    }
                    break; // No need to continue checking after a match
                }
            }
        }
    }
    
checkCustomRangeValues(lines, diagnostics, command, minValue, maxValue, allowEmptyValue = false, showHover = false, legalValuesSet = []) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith(command)) {
            const valueMatch = line.match(/(-?\d+)/);

            if (valueMatch) {
                const value = parseInt(valueMatch[0]);
                if (
                    (value < minValue || value > maxValue) &&
                    (legalValuesSet.length === 0 || !legalValuesSet.includes(value))
                ) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(valueMatch[0])),
                        new vscode.Position(i, line.indexOf(valueMatch[0]) + valueMatch[0].length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Value ${value} for ${command} should be between ${minValue} and ${maxValue}`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            } else if (!allowEmptyValue && !line.endsWith(command)) {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Missing or invalid value for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            } else if (!allowEmptyValue && line.endsWith(command)) {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Value missing for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            } else if (allowEmptyValue && !line.endsWith(command)) {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `String value not allowed for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }
}
    
checkPowerOfTwoValues(lines, diagnostics, command, maxPower, allowEmptyValue = false, showHover = false, legalValuesSet = []) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith(command)) {
            const valueMatch = line.match(/(-?\d+)/);

            if (valueMatch) {
                const value = parseInt(valueMatch[0]);
                const isPowerOfTwo = (value & (value - 1)) === 0 && value !== 0 && value <= Math.pow(2, maxPower);

                if (!isPowerOfTwo || (legalValuesSet.length !== 0 && legalValuesSet.includes(value))) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(valueMatch[0])),
                        new vscode.Position(i, line.indexOf(valueMatch[0]) + valueMatch[0].length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Value ${value} for ${command} should be a power of 2 up to 2^${maxPower}`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            } else if (!allowEmptyValue && !line.endsWith(command)) {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Missing or invalid value for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            } else if (!allowEmptyValue && line.endsWith(command)) {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Value missing for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            } else if (allowEmptyValue && !line.endsWith(command)) {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `String value not allowed for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }
}
    


checkTwoCustomRangeValues(lines, diagnostics, command, minValueSet1, maxValueSet1, minValueSet2, maxValueSet2, legalValuesSet1 = [], legalValuesSet2 = []) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith(command)) {
            const valueMatches = line.match(/(-?\d+)/g);

            if (valueMatches && valueMatches.length >= 2) {
                const value1 = parseInt(valueMatches[0]);
                const value2 = parseInt(valueMatches[1]);

                if (
                    ((value1 < minValueSet1 || value1 > maxValueSet1) && (legalValuesSet1.length === 0 || !legalValuesSet1.includes(value1))) ||
                    ((value2 < minValueSet2 || value2 > maxValueSet2) && (legalValuesSet2.length === 0 || !legalValuesSet2.includes(value2)))
                ) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(valueMatches[0])),
                        new vscode.Position(i, line.indexOf(valueMatches[1]) + valueMatches[1].length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Values for ${command} should be within specified ranges or legal alternatives`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            } else {
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Missing or invalid values for ${command} command`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostic.code = 'show-hover';
                diagnostics.push(diagnostic);
            }
        }
    }
}





    async analyzeDocument(document, diagnosticCollection, startValues) {
        const diagnostics = [];

        const lines = document.getText().split('\n');

        //Refactor all of this to new methods to avoid repeating the same standard values for repeat stuff like range or boost

        this.checkMissingEnd(lines, diagnostics, startValues);
        this.checkFloatValues(lines, diagnostics);
        this.checkColorValues(lines,diagnostics);
        this.checkCustomRangeValues(lines, diagnostics, '#newweapon', 1000, 3999);
        this.checkCustomRangeValues(lines, diagnostics, '#newarmor', 400, 1999);
        this.checkCustomRangeValues(lines, diagnostics, '#newmonster', 5000, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#ressize', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#size', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#minsize', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#maxsize', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#montag', 1000, 100000);
        this.checkCustomRangeValues(lines, diagnostics, '#researchlevel', 0, 9);
        //make a custom checker for #path, needs two values, just check mod manual this is complicated cuz there's two #paths. will need to check for command after previous #end
        this.checkCustomRangeValues(lines, diagnostics, '#selectnametype', 100, 399);
        this.checkCustomRangeValues(lines, diagnostics, '#newsite', 1500, 1998, true);
        this.checkTwoCustomRangeValues(lines, diagnostics, '#gems', 0, 8, 0, 99);
        this.checkCustomRangeValues(lines, diagnostics, '#level', 0, 4);
        this.checkCustomRangeValues(lines, diagnostics, '#selectnation', 5, 499);
        //this.checkCustomRangeValues(lines, diagnostics, '#victorycondition',null,null,false,true,[76,89]);
        this.checkCustomRangeValues(lines, diagnostics, '#fort', 1, 29);
        this.checkTwoCustomRangeValues(lines, diagnostics, '#magicskill', 0, 9, 1, 10, [50,51,52,53]);
        // create a custom checker for #custommagic, needs two values 1st is path mask (from table 18) and 2nd is the chance (1 to 100)
        this.checkCustomRangeValues(lines, diagnostics, '#mainpath', -1, 9);
        this.checkCustomRangeValues(lines, diagnostics, '#secondarypath', -1, 9);
        this.checkCustomRangeValues(lines, diagnostics, '#cluster', 1, 32000);
        this.checkCustomRangeValues(lines, diagnostics, '#reconst', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#firerange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#airrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#waterrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#earthrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#astralrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#deathrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#naturerange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#glamourrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#bloodrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#elementrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#sorceryrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#deathshock', 1, 50);
        this.checkCustomRangeValues(lines, diagnostics, '#deathslime', 1, 50);
        this.checkCustomRangeValues(lines, diagnostics, '#nightmareaura', 1, 50);
        this.checkCustomRangeValues(lines, diagnostics, '#falseregen', 1, 50);
        this.checkCustomRangeValues(lines, diagnostics, '#dread', 1, 50);
        this.checkCustomRangeValues(lines, diagnostics, '#undisleader', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#assencloc', 0, 7);
        this.checkCustomRangeValues(lines, diagnostics, '#extralives', 1, 50);
        this.checkCustomRangeValues(lines, diagnostics, '#startresearch', 1, 1000);
        this.checkCustomRangeValues(lines, diagnostics, '#regainmount', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#skilledrider', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#mountiscom', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#bravemount', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#smartmount', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#req_gem', 0, 8);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathfire', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathglamour', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathwater', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathearth', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathastral', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathdeath', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathnature', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathglamour', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathblood', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathholy', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathfire', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathglamour', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathwater', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathearth', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathastral', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathdeath', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathnature', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathglamour', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathblood', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathholy', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nopathall', 1, 10);
        this.checkPowerOfTwoValues(lines, diagnostics, '#dt_aff', 50)
        this.checkCustomRangeValues(lines, diagnostics, "#armor", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#selectarmor", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#copyarmor", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#weapon", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#selectweapon", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#copyweapon", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#secondaryeffect", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#secondaryeffectalways", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#restricted", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#nationrebate", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#notfornation", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#nat", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#selectnation", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#startitem", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#selectitem", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#copyitem", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#onebattlespell", 0, 1999);
        this.checkCustomRangeValues(lines, diagnostics, "#selectspell", 0, 7999);
        this.checkCustomRangeValues(lines, diagnostics, "#nextspell", 0, 7999);
        this.checkCustomRangeValues(lines, diagnostics, "#selectsite", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#newsite", 0, 3999);
        this.checkCustomRangeValues(lines, diagnostics, "#enchrebate50", 0, 101);
        this.checkCustomRangeValues(lines, diagnostics, "#enchrebate25p", 0, 101);
        this.checkCustomRangeValues(lines, diagnostics, "#enchrebate50p", 0, 101);
        
        diagnosticCollection.set(document.uri, diagnostics);
    }

    async activate(context) {
        console.log('Error Diagnostic Provider active');
    
        this.needEndJson = await this.loadJson(context.asAbsolutePath('/json/needEnd.json'));
    
        const diagnosticCollection = vscode.languages.createDiagnosticCollection('dominionsmod');
    
        vscode.workspace.onDidOpenTextDocument(document => this.analyzeDocument(document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidChangeTextDocument(event => this.analyzeDocument(event.document, diagnosticCollection, this.needEndJson), this, context.subscriptions);
        vscode.workspace.onDidCloseTextDocument(document => diagnosticCollection.delete(document.uri), null, context.subscriptions);
    
        const codeActionProvider = vscode.languages.registerCodeActionsProvider(
            'dominionsmod', // Language ID
            {
                provideCodeActions: (document, rangeOrSelection, context, token) => {
                    const fixes = [];

                    // Check if the diagnostic has the missing #end warning
                    for (const diagnostic of context.diagnostics) {
                        if (diagnostic.code === 'missing-end-above' && diagnostic.range.contains(rangeOrSelection.start)) {
                            const fix = new vscode.CodeAction('Add #end command above', vscode.CodeActionKind.QuickFix);
                            fix.edit = new vscode.WorkspaceEdit();

                            const lineToAdd = diagnostic.range.start.line;
                            const newText = '#end\n';

                            fix.edit.insert(document.uri, new vscode.Position(lineToAdd, 0), newText);

                            fix.isPreferred = true;
                            fix.diagnostics = [diagnostic];
                            fixes.push(fix);
                        } else if (diagnostic.code === 'missing-end-below' && diagnostic.range.isEqual(rangeOrSelection)) {
                            const fix = new vscode.CodeAction('Add #end command at the end of the document', vscode.CodeActionKind.QuickFix);
                            fix.edit = new vscode.WorkspaceEdit();

                            const lineToAdd = document.lineCount; // Insert at the end of the document
                            const newText = '\n#end\n';

                            fix.edit.insert(document.uri, new vscode.Position(lineToAdd, 0), newText);

                            fix.isPreferred = true;
                            fix.diagnostics = [diagnostic];
                            fixes.push(fix);
                        }
                    }

                    return fixes;
                }
            }
        );
    
        context.subscriptions.push(diagnosticCollection, codeActionProvider);
    }

    dispose() {
        
    }
}

module.exports = ErrorDiagnosticProvider;
