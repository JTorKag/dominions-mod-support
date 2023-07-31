# dominions-mod-support README

This extension provides syntax highlighting, autocomplete and hover information on commands. 

## Features

Full list of known commands and information about it. As well as auto formated snippets when creating/editing objects like monsters or items.
![Auto Complete & Snippets](examples/autocompleteexample.png)


Addtional details including relevent tables for some keywords. Will add more in the future
![Hover Details](examples/hoverexample.png)
 

## Known Issues

I'm sure there's a handful. Just undocumented so far. See below.

+ Copy Sprite hover will always show monster details regardless if its in an item's section. 

## Release Notes

There is likely errors in my data for all the commands. I did a lot of scraping and regex instead of going through it by hand. If you catch any and are feeling extra generous please fix and submit a pull request. Or if not and it's small just let me know via discord @zegma and I can include the fix in during an update. 

### 1.0.1

Added hover details for unit, spell, item, site, ench ids. 

### Credits
I wanted to highlight [djmcgill](https://github.com/djmcgill/vscode-syntax-highlighting-dominions-5-) for creating a syntax highlighting tool years ago. Used that for a while and the decided I wanted to improve on that base. 

Thanks [logg-y](https://github.com/Logg-y) for the list of mod manual missing commands. 

Thanks [larzm42](https://github.com/larzm42/dom5inspector) for raw game data.

### ToDO

In no particular order things I want to do. 

+ Change the hover for ID on monster and item sprite commands to return sprite in addition to other data
+ Allow hover to return data on items/monsters by name instead of just by ID. Problematic due to all the damn warriors....

**Enjoy!**
