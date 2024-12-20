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

    /* separateCommand(inputString) {
        // Exclude anything that follows "--" in the line
        const lineWithoutComments = inputString.split('--')[0].trim();
    
        const pattern = /#(\S+(?:\s+\S+)*)/;
        const match = lineWithoutComments.match(pattern);
    
        if (match) {
            const values = match[1].split(/\s+/);
    
            // Convert numeric strings to numbers (floats or integers)
            const parsedValues = values.map(value => {
                const numericValue = parseFloat(value);
                return isNaN(numericValue) ? value : numericValue;
            });
    
            return parsedValues;
        } else {
            return [null];
        }
    } */

    separateCommand(inputString) {
        // Exclude anything that follows "--" in the line
        const lineWithoutComments = inputString.split('--')[0].trim();
    
        const pattern = /#(\S+(?:\s+\S+)*)/;
        const match = lineWithoutComments.match(pattern);
    
        if (match) {
            const values = match[1].split(/\s+/);
    
            // Convert numeric strings to numbers (floats or integers)
            const parsedValues = values.map(value => {
                const numericValue = /^-?\d+(\.\d+)?$/.test(value) ? parseFloat(value) : value;
                return isNaN(numericValue) ? value : numericValue;
            });
    
            return parsedValues;
        } else {
            return [null];
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


    checkCustomRangeValues(lines, diagnostics, command, minValue, maxValue, allowString = false, allowEmptyValue = false, legalValuesSet = []) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.startsWith(`${command} `) || line === command) {
                const matchedValue = this.separateCommand(line);
    
                // Check if matchedValue array has more than 2 objects
                if (matchedValue.length > 2) {
                    const range = new vscode.Range(
                        new vscode.Position(i, 0),
                        new vscode.Position(i, line.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Invalid format for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                    continue;  // Skip further checks for this line
                }
    
                if (matchedValue) {
                    const value = matchedValue[1];
    
                    if (value === null || value === undefined) {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(command)),
                            new vscode.Position(i, line.indexOf(command) + command.length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Invalid value format for ${command} command.`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    } else if (allowString && typeof value === 'string' && value !== matchedValue[0]) {
                        // Check if the string is wrapped in quotes
                        const isQuotedString = /^".*"$/.test(value);
    
                        if (!isQuotedString) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(value)),
                                new vscode.Position(i, line.indexOf(value) + value.length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `String values for ${command} should be wrapped in quotes`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
                    } else if (!allowString && typeof matchedValue[1] === 'string') {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(matchedValue[1])),
                            new vscode.Position(i, line.indexOf(matchedValue[1]) + matchedValue[1].length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `String values are not allowed for ${command} command`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    } else if (typeof value === 'number') {
                        if ((value < minValue || value > maxValue) || (legalValuesSet.length > 0 && !legalValuesSet.includes(value))) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(value)),
                                new vscode.Position(i, line.indexOf(value) + value.length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `Value ${value} for ${command} should be between ${minValue} and ${maxValue}`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
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
                }
            }
        }
    }
    
    // use this when there's two ranges a single value for a command can exist in
    checkCustomRangeTwoSetsValues(lines, diagnostics, command, minValue1, maxValue1, minValue2, maxValue2, allowString = false, allowEmptyValue = false, legalValuesSet = []) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.startsWith(`${command} `) || line === command) {
                const matchedValue = this.separateCommand(line);
    
                // Check if matchedValue array has more than 2 objects
                if (matchedValue.length > 2) {
                    const range = new vscode.Range(
                        new vscode.Position(i, 0),
                        new vscode.Position(i, line.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Invalid format for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                    continue;  // Skip further checks for this line
                }
    
                if (matchedValue[1]) {
                    const value = matchedValue[1];
    
                    if (value === null) {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(command)),
                            new vscode.Position(i, line.indexOf(command) + command.length)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `Invalid value format for ${command} command`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    } else if (allowString && typeof value === 'string' && value !== matchedValue[0]) {
                        // Check if the string is wrapped in quotes
                        const isQuotedString = /^".*"$/.test(value);
    
                        if (!isQuotedString) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(value)),
                                new vscode.Position(i, line.indexOf(value) + value.length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `String values for ${command} should be wrapped in quotes`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
                    } else if (typeof value === 'number') {
                        const isInRange1 = (value >= minValue1 && value <= maxValue1);
                        const isInRange2 = (value >= minValue2 && value <= maxValue2);
                        
                        if (!((isInRange1 || isInRange2) || (legalValuesSet.length > 0 && legalValuesSet.includes(value)))) {
                            const range = new vscode.Range(
                                new vscode.Position(i, line.indexOf(value)),
                                new vscode.Position(i, line.indexOf(value) + value.length)
                            );
                            const diagnostic = new vscode.Diagnostic(
                                range,
                                `Value ${value} for ${command} should be between ${minValue1} and ${maxValue1} or between ${minValue2} and ${maxValue2}`,
                                vscode.DiagnosticSeverity.Error
                            );
                            diagnostics.push(diagnostic);
                        }
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
                }
            }
        }
    }
    
    
    
    
    
    
    
    
    checkPowerOfTwoValues(lines, diagnostics, command, maxPower, allowEmptyValue = false, legalValuesSet = []) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
    
            if (line.startsWith(command)) {
                const matchedValue = this.separateCommand(line);
    
                if (matchedValue.length > 2) {
                    const range = new vscode.Range(
                        new vscode.Position(i, 0),
                        new vscode.Position(i, line.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Invalid format for ${command} command`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                    continue;  // Skip further checks for this line
                }
    
                // Add code here
                if (matchedValue && typeof matchedValue[1] !== 'undefined' && typeof matchedValue[1] !== 'number') {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(matchedValue[0])),
                        new vscode.Position(i, line.indexOf(matchedValue[0]) + matchedValue[0].length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Invalid value ${matchedValue[1]} for ${command}. Value should be a valid float.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                    continue; // Skip further checks for this line
                }
    
                if (matchedValue) {
                    const value = parseFloat(matchedValue[1]);
    
                    const isPowerOfTwo = (value & (value - 1)) === 0 && value !== 0 && value <= Math.pow(2, maxPower);
    
                    if (!isPowerOfTwo || (legalValuesSet.length !== 0 && legalValuesSet.includes(value))) {
                        const range = new vscode.Range(
                            new vscode.Position(i, line.indexOf(matchedValue[0])),
                            new vscode.Position(i, line.indexOf(matchedValue[0]) + matchedValue[0].length)
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

checkValueRangeAndSet(lines, diagnostics, command, minValue, maxValue, allowedValues) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith(command)) {
            const valueMatches = line.match(/(-?\d+)/g);

            if (valueMatches && valueMatches.length >= 2) {
                const value1 = parseInt(valueMatches[0]);
                const value2 = parseInt(valueMatches[1]);

                // Check if value1 is within the specified numeric range
                // and if value2 is in the allowed set.
                if ((value1 < minValue || value1 > maxValue) || !allowedValues.includes(value2)) {
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(valueMatches[0])),
                        new vscode.Position(i, line.indexOf(valueMatches[1]) + valueMatches[1].length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `The first value of ${command} must be between ${minValue} and ${maxValue}, and the second must be one of: ${allowedValues.join(', ')}.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            } else {
                // Handle cases where either value is missing or invalid
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Missing or invalid values for ${command} command.`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }
}

checkQuotedTextLength(lines, diagnostics, command, maxLength) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith(command)) {
            const quoteStartIndex = line.indexOf('"');
            if (quoteStartIndex !== -1) {
                const quoteEndIndex = line.indexOf('"', quoteStartIndex + 1);
                if (quoteEndIndex !== -1) {
                    const quotedText = line.substring(quoteStartIndex + 1, quoteEndIndex);

                    if (quotedText.length > maxLength) {
                        const range = new vscode.Range(
                            new vscode.Position(i, quoteStartIndex),
                            new vscode.Position(i, quoteEndIndex + 1)
                        );
                        const diagnostic = new vscode.Diagnostic(
                            range,
                            `The quoted text after ${command} exceeds the maximum allowed length of ${maxLength} characters. Your current message is ${quotedText.length}.`,
                            vscode.DiagnosticSeverity.Error
                        );
                        diagnostics.push(diagnostic);
                    }
                } else {
                    // No closing quote found
                    const range = new vscode.Range(
                        new vscode.Position(i, line.indexOf(command)),
                        new vscode.Position(i, line.indexOf(command) + command.length)
                    );
                    const diagnostic = new vscode.Diagnostic(
                        range,
                        `Missing closing quote for ${command} command.`,
                        vscode.DiagnosticSeverity.Error
                    );
                    diagnostics.push(diagnostic);
                }
            } else {
                // No opening quote found
                const range = new vscode.Range(
                    new vscode.Position(i, line.indexOf(command)),
                    new vscode.Position(i, line.indexOf(command) + command.length)
                );
                const diagnostic = new vscode.Diagnostic(
                    range,
                    `No quoted text found after ${command} command.`,
                    vscode.DiagnosticSeverity.Error
                );
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
        this.checkPowerOfTwoValues(lines, diagnostics, '#dt_aff', 50);
        this.checkCustomRangeValues(lines, diagnostics, "#armor", 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#selectarmor", 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#copyarmor", 0, 199, true);
        this.checkCustomRangeValues(lines, diagnostics, "#weapon", 0, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#selectweapon", 0, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#copyweapon", 0, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#secondaryeffect", 0, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#secondaryeffectalways", 0, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#restricted", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#nationrebate", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#notfornation", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#nat", 0, 499);
        this.checkCustomRangeValues(lines, diagnostics, "#startitem", 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#selectitem", 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#copyitem", 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#onebattlespell", 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#selectspell", 0, 7999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#nextspell", 0, 7999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#selectsite", 0, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#enchrebate50", 0, 101);
        this.checkCustomRangeValues(lines, diagnostics, "#enchrebate25p", 0, 101);
        this.checkCustomRangeValues(lines, diagnostics, "#enchrebate50p", 0, 101);
        this.checkCustomRangeTwoSetsValues(lines, diagnostics, "#effect",0, 699, 10000, 10699);
        this.checkCustomRangeValues(lines, diagnostics, "#req_month", 1 , 12);
        this.checkCustomRangeValues(lines, diagnostics, "#req_targsight", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#speedmult", 1, 3);
        this.checkCustomRangeValues(lines, diagnostics, "#localglobal", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#worldvisible", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#globallook", 1, 9);
        this.checkCustomRangeValues(lines, diagnostics, '#extramsg', 5, 499);
        this.checkCustomRangeValues(lines, diagnostics, '#req_nearbythrone', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_thronesite', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#aimagerec', 0, 99);
        this.checkCustomRangeValues(lines, diagnostics, '#holycost', 1, 15);
        this.checkCustomRangeValues(lines, diagnostics, "#norange", 0, 100,false,true);
        this.checkCustomRangeValues(lines, diagnostics, "#att", -100, 100);
        this.checkCustomRangeValues(lines, diagnostics, "#look", -1, 9);
        this.checkCustomRangeValues(lines, diagnostics, "#clumsy", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#falsesupply", 0, 500);
        this.checkCustomRangeValues(lines, diagnostics, "#glamourmanip", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#godsite", 0, 3999, true);
        this.checkPowerOfTwoValues(lines, diagnostics, "#addgeo", 59);
        this.checkPowerOfTwoValues(lines, diagnostics, "#remgeo", 59);
        this.checkCustomRangeValues(lines, diagnostics, "#danceweapon", 1, 3999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#dancenratt", 2, 50);
        this.checkCustomRangeValues(lines, diagnostics, "#holyifhit", -20, 999);
        this.checkCustomRangeValues(lines, diagnostics, "#killmagicifhit", -20, 999);
        this.checkCustomRangeValues(lines, diagnostics, "#killdemonifhit", -20, 999);
        this.checkCustomRangeValues(lines, diagnostics, "#holystunifhit", 1, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#petrifyifhit", 1, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#fireifhit", -20, 999);
        this.checkCustomRangeValues(lines, diagnostics, "#coldifhit", -20, 999);
        this.checkCustomRangeValues(lines, diagnostics, "#shockifhit", -20, 999);
        this.checkCustomRangeValues(lines, diagnostics, "#poisonifdmg", -20, 999);
        this.checkValueRangeAndSet(lines, diagnostics, "#aftercloud", 1, 7, [1,8,64,512,4096,32768,262144,2097152,16777216])
        this.checkCustomRangeValues(lines, diagnostics, "#aftercloudarea", 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, "#plaguedoctor", 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, "#notmounted", 1, 2);
        this.checkCustomRangeValues(lines, diagnostics, "#hidedom", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#growthrecscale", 0, 5);
        this.checkCustomRangeValues(lines, diagnostics, "#deathrecscale", 0, 5);
        this.checkCustomRangeValues(lines, diagnostics, "#orderrecscale", 0, 5);
        this.checkCustomRangeValues(lines, diagnostics, "#chaosrecscale", 0, 5);
        this.checkCustomRangeValues(lines, diagnostics, "#req_enchnearby", 0, 9999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#req_targseductions", 0, 500);
        this.checkCustomRangeValues(lines, diagnostics, "#req_targminkills", 0, 1000);
        this.checkCustomRangeValues(lines, diagnostics, "#req_targmaxkills", 0, 1000);
        this.checkCustomRangeValues(lines, diagnostics, "#req_targmaxkills", 0, 1000);
        this.checkCustomRangeValues(lines, diagnostics, "#addseduction", 0, 500);
        this.checkCustomRangeValues(lines, diagnostics, "#addkills", 0, 1000);
        this.checkCustomRangeValues(lines, diagnostics, "#req_plane", -2, 8);
        this.checkCustomRangeValues(lines, diagnostics, "#req_godawake", 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, "#req_pretismnr", 0, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, "#req_pretawake", 0, 1);
        this.checkQuotedTextLength(lines, diagnostics, "#msg",2399);
        this.checkCustomRangeValues(lines, diagnostics, "#icenatprot", -40, 40);
        this.checkCustomRangeValues(lines, diagnostics, '#holyrange', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#sorcerygems', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#elementgems', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#mobilearcher', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#animated', 0, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#domwar', -10, 10);
        this.checkQuotedTextLength(lines, diagnostics, "#portent",2399);
        this.checkQuotedTextLength(lines, diagnostics, "#cure",2399);
        this.checkCustomRangeValues(lines, diagnostics, '#req_void', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#onlyfriendlydst', 0, 2);
        this.checkCustomRangeValues(lines, diagnostics, '#req_kelp', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_gorge', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_deep', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_forestcave', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_deep', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_drip', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_crystal', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#clearvar', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#incvar', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#decvar', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#inc10var', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#dec10var', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#invvar', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#togglevar', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#gemlongevity', 0, 2);
        this.checkCustomRangeValues(lines, diagnostics, '#cavenation', 0, 3);
        this.checkCustomRangeValues(lines, diagnostics, '#req_minglobals', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#req_maxglobals', 1, 20);
        this.checkCustomRangeValues(lines, diagnostics, '#req_varpos', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#req_varneg', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#req_varzero', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#req_varone', -4, 9999);
        this.checkCustomRangeValues(lines, diagnostics, '#req_arenadone ', 0, 1);
        this.checkCustomRangeValues(lines, diagnostics, '#req_worlditem ', 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#req_noworlditem ', 0, 1999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#dispglobals', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#aiassmod', -100, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#onlysitedst', -1, 1998, true);
        this.checkCustomRangeValues(lines, diagnostics, '#napbreakrit', -100, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#req_turnrare', -100, 100);
        this.checkQuotedTextLength(lines, diagnostics, "#description", 1999);
        this.checkCustomRangeValues(lines, diagnostics, '#req_targhorrormark', 1, 200);
        this.checkCustomRangeValues(lines, diagnostics, '#templeholypoints', 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, '#mindcollar', 1, 999);
        this.checkCustomRangeValues(lines, diagnostics, '#statstorm', 0, 999);
        this.checkCustomRangeValues(lines, diagnostics, '#statbreak', 0, 999);
        this.checkCustomRangeValues(lines, diagnostics, '#req_fortid', 1, 16);
        this.checkCustomRangeValues(lines, diagnostics, '#sumhealaffs', 1, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#spikes', 1, 999);
        this.checkCustomRangeValues(lines, diagnostics, '#sleepres', -40, 40);
        this.checkCustomRangeValues(lines, diagnostics, '#req_school', 0, 7);
        this.checkCustomRangeValues(lines, diagnostics, '#req_path', 0, 9);
        this.checkCustomRangeValues(lines, diagnostics, '#req_minresearch', 0, 9);
        this.checkCustomRangeValues(lines, diagnostics, '#req_pathgems', 1, 999);
        this.checkCustomRangeValues(lines, diagnostics, '#bugshape', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#buguwshape', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#bugswarmshape', -100000, -1000);
        this.checkCustomRangeValues(lines, diagnostics, '#bugswarmuwshape', -100000, -1000);
        this.checkCustomRangeValues(lines, diagnostics, '#req_targrealmnr', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#req_targnorealmnr', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#plainrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#plaincom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#plainfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#plainfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#forestrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#forestcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#forestfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#forestfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#mountainrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#mountaincom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#mountainfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#mountainfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#swamprec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#swampcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#swampfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#swampfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#wasterec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#wastecom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#wastefortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#wastefortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#farmrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#farmcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#farmfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#farmfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#caverec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#cavecom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#cavefortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#cavefortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#driprec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#dripcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#dripfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#dripfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#coastrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#coastcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#coastfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#coastfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#searec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#seacom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#seafortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#seafortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#deeprec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#deepcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#deepfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#deepfortcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#kelprec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#kelpcom', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#kelpfortrec', 1, 19999, true);
        this.checkCustomRangeValues(lines, diagnostics, '#kelpfortcom', 1, 19999, true);
        this.checkCustomRangeTwoSetsValues(lines, diagnostics, '#worldshape', 1, 19999, -100000, -1000, true);
        this.checkCustomRangeTwoSetsValues(lines, diagnostics, '#battleshape', 1, 19999, -100000, -1000, true);
        this.checkCustomRangeValues(lines, diagnostics, '#reclimit ', -2, 100);
        this.checkCustomRangeValues(lines, diagnostics, '#caveinc ', 1, 500);
        this.checkCustomRangeValues(lines, diagnostics, '#caveres ', 1, 500);
        this.checkCustomRangeValues(lines, diagnostics, '#caverecpt ', 1, 500);

        //create monster diagnostics including transform and forcetransform
/*      These all need revision because the trailing number is being counted as the value for the command.
        this.checkCustomRangeValues(lines, diagnostics, "#path0", 0, 8);
        this.checkCustomRangeValues(lines, diagnostics, "#cost0", 1, 10);
        this.checkCustomRangeValues(lines, diagnostics, "#path1", 0, 8);
        this.checkCustomRangeValues(lines, diagnostics, "#cost1", 1, 10);
         */
        
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
