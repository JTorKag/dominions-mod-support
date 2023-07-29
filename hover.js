const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "Dominions Mod Support" is now active!');

    vscode.languages.registerHoverProvider('dominionsmod', {
        provideHover(document, position, token) {

            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            console.log('Hovered word:', word);
/*
            if (word === 'tableExample') {
                const markdown = new vscode.MarkdownString(` Blah Blah Blah here.
|Table|Header|
|:----:|:----:|
|0|Fire|
|1|Air|
|2|Water|
|3|Earth|
|4|Astral|
|5|Death|
|6|Nature|
|7|Blood|
|8|Priest|
|50|Random|
|51|Elemental|
|52|Sorcery|
|53|All (not priest)|
`);

        markdown.isTrusted = true;

        return new vscode.Hover(markdown);
    }
*/


            if (word == "newarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Armor nbr should be a number between 300 and 999. It must not be the same as any other armor. This new armor will be affected by the following modding commands and there should be an #end command at the end."
                });
            }
            
            if (word == "newevent") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command creates a new event. All subsequent commands will modify this event until modding the event is finished with the #end command."
                });
            }
            
            if (word == "newitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "Creates a new magic item and selects it for modding by the following commands. End modding the magic item with the #end command."
                });
            }
            
            if (word == "newmerc") {
                return new vscode.Hover({
                    language: "English",
                    value: "Creates a new mercenary band. Always end modifying it with an #end command."
                });
            }
            
            if (word == "newmonster") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster nbr should be a number between 3500 and 8999. It must not be the same as any other monster. This new monster will be affected by the following modding commands and there should be an #end command at the end. It is not necessary to set a monster number when creating a new monster. It is not recommended to use a monster number with monsters that have unique names like Sorceress of the Sacred Fire because that will reduce the risk of conflicts between mods. If a monster number is not used, Dominions will automatically use the first free number from 3500+ for the monster. In this instance all references to the monster in other modding (such as spells or magic sites) must be by name. Using lower hard coded numbers later in the mod may overwrite the number initially assigned by a numberless #newmonster command."
                });
            }
            
            if (word == "newnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command can be used to add a new nation instead of #selectnation. The command automatically uses the first free nation number of 120 or higher that is available. Always use #end command at the end of modifying a nation."
                });
            }
            
            if (word == "newsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Site nbr (optional) should be a number between 1500 and 1999. It must not be the same as any other site. This new site will be affected by the following modding commands and there should be an #end command at the end."
                });
            }
            
            if (word == "newspell") {
                return new vscode.Hover({
                    language: "English",
                    value: "Creates a new spell and selects it for modding by the following commands. End creating the spell with the #end command."
                });
            }
            
            if (word == "newweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Weapon number for new weapons should be a number between 800 and 1999. It must not be the same as any other weapon. This new weapon will be affected by the following modding commands and there should be an #end command at the end."
                });
            }
            
            if (word == "selectarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the armor that will be affected by the following modding commands. End modding this armor with the #end command. To find out what the number of a particular unit’s armor, look at the unit’s stats in the game and press ctrl+i."
                });
            }
            
            if (word == "selectitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the magic item that will be affected by the following modding commands. End modding this item with the #end command. In the game you can press shift+i when viewing a magic item to see what number it has. Use numbers 500 – 999 for modding."
                });
            }
            
            if (word == "selectnametype") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the nametype that will be affected by the following modding commands. Nametype nbr is a number between 100 and 200. See hover for nametype table. Numbers 127 and 128 as well as numbers 165 – 299 can be used to make your own name tables without altering existing ones.  Always #end command at the end of modifying a nametype."
                });
            }
            
            if (word == "selectmonster") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the monster that will be affected by the following modding commands. End modding this unit with the #end command. To find out what number a particular unit has, look at his stats in the game and press ctrl+i."
                });
            }
            
            if (word == "selectnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the nation that will be affected by the following modding commands. End modding this nation with the #end command. Nation number is a number between 5 and 249. See hover tables for currently used numbers.  Always #end command at the end of modifying a nametype.You can use number 120 to 249 in order to create new nations without overwriting an existing one. Numbers 0 – 4 are used for various independents and temporary monsters in the game and cannot be used for modding. Always #end command at the end of modifying a nametype."
                });
            }
            
            if (word == "selectpoptype") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the poptype that will be affected by the following modding commands. See hover table for poptype numbers. End modding this poptype with the #end command."
                });
            }
            
            if (word == "selectsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the magic site that will be affected by the following modding commands. End modding this site with the #end command."
                });
            }
            
            if (word == "selectspell") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects an existing spell that will be affected by the following modding commands. End modding this spell with the #end command."
                });
            }
            
            if (word == "selectweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Selects the weapon that will be affected by the following modding commands. End modding this weapon with the #end command. To find out the numbers of a particular unit’s weapons, look at the unit’s stats in the game and press ctrl+i."
                });
            }
            
            // everything else besides the new and select hovers in alphabetical order

            if (word == "10d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 10d6 units."
                });
            }
            
            if (word == "11d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 11d6 units."
                });
            }
            
            if (word == "12d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 12d6 units."
                });
            }
            
            if (word == "13d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 13d6 units."
                });
            }
            
            if (word == "14d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 14d6 units."
                });
            }
            
            if (word == "15d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 15d6 units."
                });
            }
            
            if (word == "16d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 16d6 units."
                });
            }
            
            if (word == "1d3units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 1d3 units."
                });
            }
            
            if (word == "1d3vis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gain 1d3 gems of specified type."
                });
            }
            
            if (word == "1d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 1d6 units."
                });
            }
            
            if (word == "1d6vis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gain 1d6 gems of specified type."
                });
            }
            
            if (word == "1unit") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains one unit."
                });
            }
            
            if (word == "2com") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains two commanders of the specified type."
                });
            }
            
            if (word == "2d3units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 2d3 units."
                });
            }
            
            if (word == "2d4vis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gain 2d4 gems of specified type."
                });
            }
            
            if (word == "2d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 2d6 units."
                });
            }
            
            if (word == "2d6vis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gain 2d6 gems of specified type."
                });
            }
            
            if (word == "3d3units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 3d3 units."
                });
            }
            
            if (word == "3d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 3d6 units."
                });
            }
            
            if (word == "3d6vis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gain 3d6 gems of specified type."
                });
            }
            
            if (word == "4com") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains four commanders of the specified type."
                });
            }
            
            if (word == "4d3units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 4d3 units."
                });
            }
            
            if (word == "4d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 4d6 units."
                });
            }
            
            if (word == "4d6vis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gain 4d6 gems of specified type."
                });
            }
            
            if (word == "5com") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains five commanders of the specified type."
                });
            }
            
            if (word == "5d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 5d6 units."
                });
            }
            
            if (word == "6d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 6d6 units."
                });
            }
            
            if (word == "7d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 7d6 units."
                });
            }
            
            if (word == "8d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 8d6 units."
                });
            }
            
            if (word == "9d6units") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains 9d6 units."
                });
            }
            
            if (word == "acid") {
                return new vscode.Hover({
                    language: "English",
                    value: "This weapon does acid damage. Acid weapons can damage armor. Damaged armor will break if subjected to more blows but will be repaired if there are enough resources in the province the monster is in."
                });
            }
            
            if (word == "aciddigest") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster digests any swallowed creatures and causes their armor to be weakened like the Rust Mist spell."
                });
            }
            
            if (word == "acidshield") {
                return new vscode.Hover({
                    language: "English",
                    value: "Anyone striking this monster will take"
                });
            }
            
            if (word == "addequip") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds magic items to a commander. Equipment level is from 1 to 4 and corresponds to item level from trinkets to very powerful items. Use the value 9 for equipment level and a bracketed [item name] in the #msg text to add a specific magic item. An item is not guaranteed at equipment level 1. The command also gives the commander gems appropriate to his magic paths."
                });
            }
            
            if (word == "addforeigncom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can only be recruited in provinces with no fort."
                });
            }
            
            if (word == "addforeignunit") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can only be recruited in provinces with no fort."
                });
            }
            
            if (word == "addgod") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds this monster as a god to the nations list of valid gods. The monster must have the #startdom and #pathcost commands set. If the monster does not have a defined homerealm this command is the only way to add it as a god."
                });
            }
            
            if (word == "addname") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a name to the selected nametype."
                });
            }
            
            if (word == "addrandomage") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the monster start 1 to years (a random die) older."
                });
            }
            
            if (word == "addreccom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a commander to the recruitment list."
                });
            }
            
            if (word == "addrecunit") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a unit to the recruitment list."
                });
            }
            
            if (word == "addsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a new, already discovered site to the province. Use -1 for site number to place [sitename] instead. [Sitename] must be added to event message text in brackets."
                });
            }
            
            if (word == "addupkeep") {
                return new vscode.Hover({
                    language: "English",
                    value: "Upkeep will be calculated as if the unit cost this much more to recruit."
                });
            }
            
            if (word == "adventureruin") {
                return new vscode.Hover({
                    language: "English",
                    value: "A commander who enters the ruin has a chance to discover gold gems magic items or other rewards. Those who fail may fall victim to lethal traps or bloodthirsty monsters."
                });
            }
            
            if (word == "aiairnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Air magic is used a lot in this nation and that an air god is probably good."
                });
            }
            
            if (word == "aiastralnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Astral magic is used a lot in this nation and that an astral god is probably good."
                });
            }
            
            if (word == "aiawake") {
                return new vscode.Hover({
                    language: "English",
                    value: "When playing this nation the AI will have this much extra chance of choosing an awake pretender."
                });
            }
            
            if (word == "aibadlvl") {
                return new vscode.Hover({
                    language: "English",
                    value: "The spell AI will never choose this spell if is is level or higher in the required magic path."
                });
            }
            
            if (word == "aibloodnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Blood magic is used a lot in this nation and that a blood god is probably good."
                });
            }
            
            if (word == "aicheapholy") {
                return new vscode.Hover({
                    language: "English",
                    value: "Informs the AI that this nation has cheap expendable sacred units. So a Charge Body bless effect or something similar could be appropriate. Marignon and Mictlan has this hint."
                });
            }
            
            if (word == "aideathnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Death magic is used a lot in this nation and that a death god is probably good."
                });
            }
            
            if (word == "aiearthnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Earth magic is used a lot in this nation and that a earth god is probably good."
                });
            }
            
            if (word == "aifirenation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Fire magic is used a lot in this nation and that a fire god is probably good."
                });
            }
            
            if (word == "aigoodbless") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use to increase the chance of creating a powerful bless. 100=only do gods with a powerful bless effects for this nation."
                });
            }
            
            if (word == "aiholdgod") {
                return new vscode.Hover({
                    language: "English",
                    value: "When playing this nation the AI will never leave the home province with the pretender."
                });
            }
            
            if (word == "aiholyranged") {
                return new vscode.Hover({
                    language: "English",
                    value: "Informs the AI that this nation has sacred ranged units. So a Wind Guide bless or something similar could be appropriate."
                });
            }
            
            if (word == "aimusthavemag") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes AI pretender have at least 3 in this magic school. Only one of these possible per nation."
                });
            }
            
            if (word == "ainaturenation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Nature magic is used a lot in this nation and that a nature god is probably good."
                });
            }
            
            if (word == "ainocast") {
                return new vscode.Hover({
                    language: "English",
                    value: "The spell AI will never select this spell unless it has been scripted. Use this for spells like Returning that should normally never be cast."
                });
            }
            
            if (word == "ainorec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Will tell the AI to never recruit this monster."
                });
            }
            
            if (word == "airattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "airblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "airboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Air magic."
                });
            }
            
            if (word == "airrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Air rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "airshield") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster gains the airshield special ability."
                });
            }
            
            if (word == "aisinglerec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Will tell the AI to only recruit a single one of these per batch."
                });
            }
            
            if (word == "aispellmod") {
                return new vscode.Hover({
                    language: "English",
                    value: "This modifies the spell AI to (dis)like this spell. Usually there is no need for this command. A value of -100 makes it never be cast and a value of 100 makes it twice as likable for the spell AI."
                });
            }
            
            if (word == "aiwaternation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Hint to AI that Water magic is used a lot in this nation and that a water god is probably good."
                });
            }
            
            if (word == "alchemy") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is more efficient when casting spells the converts gems into gold. A typical Alchemist has a value of 50."
                });
            }
            
            if (word == "allies") {
                return new vscode.Hover({
                    language: "English",
                    value: " These two players will not attack each other. This command will only affect computer players."
                });
            }
            
            if (word == "allowedplayer") {
                return new vscode.Hover({
                    language: "English",
                    value: " Makes this nation one of the allowed nations to play on this map. Use this command multiple times or the map will only be able to host one player. Nation numbers can be found in the tables below. This command can be used to make era specific maps."
                });
            }
            
            if (word == "allrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All magic rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "allret") {
                return new vscode.Hover({
                    language: "English",
                    value: "Extra chance of returning from any of the other planes a monster can be banished to."
                });
            }
            
            if (word == "almostliving") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unit will require not undead leadership to lead even though it is undead. This command must come after the #undead command."
                });
            }
            
            if (word == "almostundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unit will require undead leadership to lead even though it isnt an undead or a demon."
                });
            }
            
            if (word == "altcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Alteration school cast in this province cost"
                });
            }
            
            if (word == "ambidextrous") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster gets reduced attack penalty when using two weapons. A normal value is 2 or 3."
                });
            }
            
            if (word == "ammo") {
                return new vscode.Hover({
                    language: "English",
                    value: "This is the number of times that this weapon can be fired in combat. The default value is 12. The maximum value is 30."
                });
            }
            
            if (word == "amphibian") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can travel both under and over water."
                });
            }
            
            if (word == "animal") {
                return new vscode.Hover({
                    language: "English",
                    value: "Indicates that the monster is an animal. Animals are affected by the Animal Awe power. Animals receive a morale bonus when led to combat by a beast master."
                });
            }
            
            if (word == "animalawe") {
                return new vscode.Hover({
                    language: "English",
                    value: "Bonus can be a value of one or more. A bonus of one means that animals with a morale of 11 have about 50% chance of daring to strike. A bonus of 10 means that you need a morale of 20 to get a 50% chance. Standard value is 1 (for Awe(+1) )."
                });
            }
            
            if (word == "aoe") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the area of effect for this spell. Add 1000 to this value to give larger areas to more powerful casters. E.g. 1001 means area = 1+1/level of caster (area would be 2 for a level 1 mage). A value of 666 means that the entire battlefield is affected. 663 means that 50% of all squares are affected 665 = 25% 664 = 10% 662 = 5%."
                });
            }
            
            if (word == "ap") {
                return new vscode.Hover({
                    language: "English",
                    value: "The number of action points when the monster is unencumbered. This should be about 12 for a human 20 for a knight or 25 for light cavalry. Action points is the same as combat speed."
                });
            }
            
            if (word == "aquatic") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can only live under water."
                });
            }
            
            if (word == "arena") {
                return new vscode.Hover({
                    language: "English",
                    value: "Opens the Area Death Match for competitors. Players will be able to send heroes to the arena this turn."
                });
            }
            
            if (word == "armor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Defines what kind of armor if any the units gets when it uses the item. Use #armor 0 to clear an existing armor from a copied item."
                });
            }
            
            if (word == "armornegating") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon is armor negating. Armor is completely ignored when determining damage."
                });
            }
            
            if (word == "armorpiercing") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon is armor piercing. Armor protection is halved when determining damage."
                });
            }
            
            if (word == "assassin") {
                return new vscode.Hover({
                    language: "English",
                    value: "An assassin of this type attacks a random commander in the province. If a target requirement for the event is set, the assassin attacks that commander."
                });
            }
            
            if (word == "assowner") {
                return new vscode.Hover({
                    language: "English",
                    value: "The following assassins created by this event will be owned by this nation."
                });
            }
            
            if (word == "astralattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "astralblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "astralboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Astral magic."
                });
            }
            
            if (word == "astralrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Astral rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "att") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants an attack bonus."
                });
            }
            
            if (word == "autobless") {
                return new vscode.Hover({
                    language: "English",
                    value: "This bearer of this item will be blessed automatically if it is sacred. Like the Flask of Holy Water magic item."
                });
            }
            
            if (word == "autocompete") {
                return new vscode.Hover({
                    language: "English",
                    value: "The bearer of this item will automatically compete in the Arena deathmatch."
                });
            }
            
            if (word == "autodisgrinder") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster automatically heals disease from"
                });
            }
            
            if (word == "autodishealer") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster automatically heals disease from"
                });
            }
            
            if (word == "autohealer") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster automatically heals"
                });
            }
            
            if (word == "autospell") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the item cast this spell automatically in battle. It will only be cast once unless #autospellrepeat is also used."
                });
            }
            
            if (word == "autospellrepeat") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes an item cast its autospell every round of combat."
                });
            }
            
            if (word == "autoundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations Dominion automatically spawns undead like Ashen Empire Ermor."
                });
            }
            
            if (word == "autumnshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changes into another monster when this season is active."
                });
            }
            
            if (word == "awe") {
                return new vscode.Hover({
                    language: "English",
                    value: "Bonus can be a value of one or more. A bonus of one means that people with a morale of 11 have about 50% chance of daring to strike. A bonus of 10 means that you need a morale of 20 to get a 50% chance. Standard value is 1 (for Awe(+1) ). 24"
                });
            }
            
            if (word == "badindpd") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation will not have national PD troops in any forted province except the home province."
                });
            }
            
            if (word == "banefireshield") {
                return new vscode.Hover({
                    language: "English",
                    value: "Anyone striking this monster will take"
                });
            }
            
            if (word == "banished") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements is banished to another plane.  -11 = The Void -12 = Inferno -13 = Kokytos"
                });
            }
            
            if (word == "barkskin") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item automatically applies the Barkskin spell to the bearer like the Barkskin Amulet."
                });
            }
            
            if (word == "batmap") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the battleground that fights take place in for the current province. You can use the special name  empty  for no battleground"
                });
            }
            
            if (word == "batstartsum1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum1d3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons 1d3 monsters at start of battle."
                });
            }
            
            if (word == "batstartsum1d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum2d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum3d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum4d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum5") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum5d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum6d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum7d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum8d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "batstartsum9d6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "battlesum1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "battlesum2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "battlesum3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "battlesum4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "battlesum5") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons x monsters at start of battle."
                });
            }
            
            if (word == "beam") {
                return new vscode.Hover({
                    language: "English",
                    value: "Beam weapon like dragon breath."
                });
            }
            
            if (word == "beartattoo") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic tattoo like the units of Marverni and Sauromatia have."
                });
            }
            
            if (word == "beastmaster") {
                return new vscode.Hover({
                    language: "English",
                    value: "All animals under the command of this monster have their morale increased by"
                });
            }
            
            if (word == "beckon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster the ability to lure enemy commanders like the Siren. The value indicates the difficulty of the morale check 10 is standard."
                });
            }
            
            if (word == "bers") {
                return new vscode.Hover({
                    language: "English",
                    value: "The bearer of the item will go berserk as soon as battle begins. Berserker Pelt has this attribute."
                });
            }
            
            if (word == "berserk") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can go berserk like a barbarian chief or a minotaur. The bonus value will be added to strength and attack and subtracted from defense. It also increases encumbrance. A normal bonus value is 3."
                });
            }
            
            if (word == "bird") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this for birds rocs couatl and similar things."
                });
            }
            
            if (word == "bless") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item automatically applies the Bless spell to the bearer like the Shroud of the Battle Saint."
                });
            }
            
            if (word == "blessairshld") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get Air Shield like from an Air bless. An existing Air bless is augmented."
                });
            }
            
            if (word == "blessanimawe") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get Animal Awe. An existing Animal Awe ability is augmented."
                });
            }
            
            if (word == "blessatt") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Attack skill."
                });
            }
            
            if (word == "blessawe") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get Awe. An existing Awe ability is augmented."
                });
            }
            
            if (word == "blessbers") {
                return new vscode.Hover({
                    language: "English",
                    value: "Will make unit go berserk when blessed."
                });
            }
            
            if (word == "blesscoldres") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Cold Resistance."
                });
            }
            
            if (word == "blessdarkvis") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get Darkvision. An existing Darkvision ability is augmented."
                });
            }
            
            if (word == "blessdef") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Defense skill."
                });
            }
            
            if (word == "blessdtv") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get undying like the undying bless effect. An existing undying bless is augmented."
                });
            }
            
            if (word == "blessfireres") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Fire Resistance."
                });
            }
            
            if (word == "blessfly") {
                return new vscode.Hover({
                    language: "English",
                    value: "Will grant the unit flying when blessed."
                });
            }
            
            if (word == "blesshp") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Hit Points."
                });
            }
            
            if (word == "blessmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Morale."
                });
            }
            
            if (word == "blessmr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Magic Resistance."
                });
            }
            
            if (word == "blesspoisres") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Poison Resistance."
                });
            }
            
            if (word == "blessprec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Precision skill."
                });
            }
            
            if (word == "blessreinvig") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Reinvigoration like from a bless with the same name. An existing reinvigoration bless is augmented."
                });
            }
            
            if (word == "blessshockres") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Shock Resistance."
                });
            }
            
            if (word == "blessstr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Blessed troops get increased Strength."
                });
            }
            
            if (word == "blind") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has no eyes and cannot be affected by blindness."
                });
            }
            
            if (word == "blink") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #teleport but only in combat."
                });
            }
            
            if (word == "bloodattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "bloodblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "bloodboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Blood magic."
                });
            }
            
            if (word == "bloodcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Blood Magic school cast in this province cost"
                });
            }
            
            if (word == "bloodnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the AI more likely to research blood magic and hunt for blood slaves. Mictlan has this hint."
                });
            }
            
            if (word == "bloodrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Blood rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "bloodvengeance") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has the Blood Vengeance ability. Any creature that hits the monster must make a magic resistance check or suffer the same damage that it inflicts on its target. Strength works identically to #damagerev."
                });
            }
            
            if (word == "blunt") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon does blunt damage. Monsters with Blunt Resistance only take half damage."
                });
            }
            
            if (word == "bluntres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster takes half damage from blunt weapons."
                });
            }
            
            if (word == "boartattoo") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic tattoo like the units of Marverni and Sauromatia have."
                });
            }
            
            if (word == "bodyguard") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monsters morale is increased by"
                });
            }
            
            if (word == "bodyguards") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives bodyguards to the active commander. This command only affects independents. AI nations will ignore this command."
                });
            }
            
            if (word == "bonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "This is an intrinsic weapon that will not incur a multiple weapon penalty or get replaced when the commander is equipped with a magic weapon item."
                });
            }
            
            if (word == "bonusspells") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster gets the Innate Spellcaster ability and can cast a number of spells every combat round in addition to its normal attacks. The spellcasting cannot be interrupted or prevented by adjacent enemy units unlike normal spellcasting. A maximum value of 4 can be used but no unit in the standard game has more than 3."
                });
            }
            
            if (word == "bossname") {
                return new vscode.Hover({
                    language: "English",
                    value: "Name of the bands leader."
                });
            }
            
            if (word == "bowstr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only one third of the weapon wielders strength will be added to the damage. This is normally used for missile weapons like bows."
                });
            }
            
            if (word == "brief") {
                return new vscode.Hover({
                    language: "English",
                    value: "A very brief description for popups."
                });
            }
            
            if (word == "bringeroffortune") {
                return new vscode.Hover({
                    language: "English",
                    value: "A bringer of fortune has a percentage chance -100 to 100 to generate a good or bad (based on postitive or negative) random event in the province where it is located. Multiple units with this ability do stack, though the chances for each to generate an event are rolled independently, allowing for many such events to be generated each turn. This ability allows for bypassing the normal random event limit incurred by natural events."
                });
            }
            
            if (word == "bug") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monsters with this tag are summoned by the Swarm spell on land."
                });
            }
            
            if (word == "bugreform") {
                return new vscode.Hover({
                    language: "English",
                    value: "This is a combat ability. When killed the monster will turn into a myriad of bugs and reform a little while later. The worm mage has this ability"
                });
            }
            
            if (word == "buildcoastfort") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will build this type of fort in coastal provinces instead of the default one for their fortera."
                });
            }
            
            if (word == "buildfort") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will build this type of fort instead of the default one for their fortera."
                });
            }
            
            if (word == "builduwfort") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will build this type of underwater fort instead of the default one for their fortera."
                });
            }
            
            if (word == "carcasscollector") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can turn  These commands grant other uncategorized magic abilities related to spells item forging and other planes of existence."
                });
            }
            
            if (word == "castledef") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a castle defense bonus to the monster. The monster counts as"
                });
            }
            
            if (word == "castleprod") {
                return new vscode.Hover({
                    language: "English",
                    value: "Resource bonus for forts. Middle Era Ulm has 25 in this meaning they get 25% more resources in their fortified provinces than another nation with the same fort. Default is 0."
                });
            }
            
            if (word == "casttime") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the casting time of a spell the casting time is 100 for a standard spell. There is usually no need to set this value as Dominions will automatically give certain spells like battle enchantments higher casting time to fit in with all the other spells."
                });
            }
            
            if (word == "cavecom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can be recruited in cave provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "cavenation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the nations preference for starting in cave provinces.  0 = never start in caves 1 = can start in caves 2 = always start in a cave"
                });
            }
            
            if (word == "caverec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can be recruited in cave provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "champprize") {
                return new vscode.Hover({
                    language: "English",
                    value: "This item is given as a reward for winning the championship of the Arena deathmatch."
                });
            }
            
            if (word == "chaospower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases or decreases depending on the Turmoil scale."
                });
            }
            
            if (word == "chaosrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is cheaper to recruit if there are Turmoil scales in the province. The monster costs ["
                });
            }
            
            if (word == "charge") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon will receive a damage bonus on its first attack. This bonus is proportional to the units maximum number of action points."
                });
            }
            
            if (word == "cheapgod20") {
                return new vscode.Hover({
                    language: "English",
                    value: "Nation can choose this god for 20 design points less."
                });
            }
            
            if (word == "cheapgod40") {
                return new vscode.Hover({
                    language: "English",
                    value: "Nation can choose this god for 40 design points less."
                });
            }
            
            if (word == "chestwound") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item bearer suffers a Chest Wound affliction which cannot be healed until the item is removed."
                });
            }
            
            if (word == "claim") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effects of magic site commands that appear after this command are not active until the throne is claimed by a god a disciple a prophet or a priest with Holy level 3 or higher."
                });
            }
            
            if (word == "claimthrone") {
                return new vscode.Hover({
                    language: "English",
                    value: "Any throne in the province is claimed by the event owner."
                });
            }
            
            if (word == "cleanshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will heal all afflictions and hp if changing shape from secondshape to firstshape. This command must be applied to the monsters firstshape so for a werewolf the human form."
                });
            }
            
            if (word == "clear") {
                return new vscode.Hover({
                    language: "English",
                    value: "Clears the attributes of the selected magic site."
                });
            }
            
            if (word == "clearallevents") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command removes all events from the game. You usually dont want to use this command."
                });
            }
            
            if (word == "clearallitems") {
                return new vscode.Hover({
                    language: "English",
                    value: "All forgeable magic items are removed from the game."
                });
            }
            
            if (word == "clearallspells") {
                return new vscode.Hover({
                    language: "English",
                    value: "All researchable spells are removed from the game."
                });
            }
            
            if (word == "cleararmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes all armor from the active monster. Must be used before assigning new armor or armor assignment does not work correctly."
                });
            }
            
            if (word == "cleardef") {
                return new vscode.Hover({
                    language: "English",
                    value: "Clears province defence units from the poptype."
                });
            }
            
            if (word == "cleargods") {
                return new vscode.Hover({
                    language: "English",
                    value: "Clears the list of pretender gods for this nation. The #clearnation command also does this. This command does not clear homerealm but #clearnation does. Homerealm gods must be removed with the #delgod command."
                });
            }
            
            if (word == "clearmagic") {
                return new vscode.Hover({
                    language: "English",
                    value: " Removes all magic skills from the active commander."
                });
            }
            
            if (word == "clearmercs") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes all mercenary bands."
                });
            }
            
            if (word == "clearnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Clears away all special settings for the nation like ideal cold reanimating priests underwater nation starting sites heroes pretender god list local defense fort type etc. The list of recruitable units and commanders is not cleared with this command."
                });
            }
            
            if (word == "clearrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Clears the recruitment list of all units and commanders."
                });
            }
            
            if (word == "clearsites") {
                return new vscode.Hover({
                    language: "English",
                    value: "Clears all start sites for this nation."
                });
            }
            
            if (word == "clearspec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes all special abilities from the active monster. The special abilities are stuff like Holy Fire Resistance Awe etc."
                });
            }
            
            if (word == "clearweapons") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes all weapons from the active monster. Must be used before assigning new weapons or the monster will have both old and new weapons."
                });
            }
            
            if (word == "cluster") {
                return new vscode.Hover({
                    language: "English",
                    value: "Assigns a cluster value to a throne. A throne is likely to appear together with other thrones of same cluster value when a map is created. For example the Throne of Spring and the Throne of Autumn have the same cluster value and if one of them appears on the map the other is also very likely to appear. Cluster value can be a number from 1 to 32000."
                });
            }
            
            if (word == "coastcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can be recruited in coast provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "coastcom1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable commanders for this nation in coastal forts only."
                });
            }
            
            if (word == "coastcom2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable commanders for this nation in coastal forts only."
                });
            }
            
            if (word == "coastnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations capital is in a coastal land province."
                });
            }
            
            if (word == "coastrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can be recruited in coast provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "coastunit1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable units for this nation in coastal forts only."
                });
            }
            
            if (word == "coastunit2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable units for this nation in coastal forts only."
                });
            }
            
            if (word == "coastunit3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable units for this nation in coastal forts only."
                });
            }
            
            if (word == "code") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the event code of the current province (when planned for globals)"
                });
            }
            
            if (word == "code2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the eventcode of the current province (when executed for globals)"
                });
            }
            
            if (word == "codedelay") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the event code of the current province, but not immediately. It will be set after all events have been executed this turn."
                });
            }
            
            if (word == "codedelay2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the event code of the current province, but not immediately. It will be set after all events have been executed on the next turn."
                });
            }
            
            if (word == "cold") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is surrounded by cold like a Winter Wolf. The chill aura is"
                });
            }
            
            if (word == "coldblood") {
                return new vscode.Hover({
                    language: "English",
                    value: "Cold blooded like the lizards of Ctis."
                });
            }
            
            if (word == "coldincome") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect cold and heat have on income. Default is 5."
                });
            }
            
            if (word == "coldpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases or decreases depending on the Cold scale."
                });
            }
            
            if (word == "coldrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Cold scale requirement for recruitment."
                });
            }
            
            if (word == "coldres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a Cold Resistance bonus."
                });
            }
            
            if (word == "coldsupply") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect cold and heat has on supplies. Default is 10."
                });
            }
            
            if (word == "color") {
                return new vscode.Hover({
                    language: "English",
                    value: "Each of the three colors is a number between 0.0 and 1.0. This color is used for the score graphs."
                });
            }
            
            if (word == "com") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains a commander of the specified type."
                });
            }
            
            if (word == "combatcaster") {
                return new vscode.Hover({
                    language: "English",
                    value: "A combat caster has a 50% chance to attempt to cast spells over trying to attack in melee. Additionally, they have a halved chance of being interrupted when casting spells, and do not suffer double armor encumbrance for casting spells."
                });
            }
            
            if (word == "command") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases leadership value by this amount.  In addition to these commands a monster has magic leadership based on its magic paths (10 per level of Astral and 5 per level of any other magic than Death) These commands govern the level of undead leadership the monster possesses. Additionally undead leadership is increased by 15 points for each priest level if the priest serves a nation that can reanimate undead. The nations that have this benefit are Lanka Asphodel Sceleria Ermor (Ashen Empire) and Lemuria."
                });
            }
            
            if (word == "commander") {
                return new vscode.Hover({
                    language: "English",
                    value: " Puts one of these commanders in the active province. The commander will have a random name according to its nametype. This commander will be the active commander."
                });
            }
            
            if (word == "commaster") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is automatically a communion master and does not need to cast the Communion Master spell to join a communion like the Trophimos Oppressors."
                });
            }
            
            if (word == "comname") {
                return new vscode.Hover({
                    language: "English",
                    value: " Replaces the active commanders random name with this one."
                });
            }
            
            if (word == "computerplayer") {
                return new vscode.Hover({
                    language: "English",
                    value: " This nation will always be controlled by the computer. Difficulty ranges from one to five. One is Easy AI. Two is Standard difficulty"
                });
            }
            
            if (word == "comslave") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is automatically a communion slave and does not need to cast the Communion Slave spell to join a communion like the Theurg Communicant of Pythium in the middle era."
                });
            }
            
            if (word == "conjcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Conjuration school cast in this province cost"
                });
            }
            
            if (word == "constcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Construction school cast in this province cost"
                });
            }
            
            if (word == "constlevel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Level of construction required to forge this item. This level can be 02468 or 12 for items that cannot be forged. To disable an item set this value to 12."
                });
            }
            
            if (word == "copyarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Copies all stats from an existing armor. This command will overwrite all stats for the selected armor so it should be used as the first command after the #newarmor command."
                });
            }
            
            if (word == "copyitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "Copies all stats from an existing item to the current item."
                });
            }
            
            if (word == "copyspell") {
                return new vscode.Hover({
                    language: "English",
                    value: "Copies all stats including name from the specified spell to the current spell."
                });
            }
            
            if (word == "copyspr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Copies the sprite of the specified magic item to the current magic item."
                });
            }
            
            if (word == "copystats") {
                return new vscode.Hover({
                    language: "English",
                    value: "Copies all weapons armors stats magic skills and special abilities from an existing monster. The existing monster can be a monster that has been created previously in the mod. Copystats will overwrite all previous commands for the selected monster so it should be used as the first command after the #newmonster command."
                });
            }
            
            if (word == "copyweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Copies all stats from an existing weapon. This command will overwrite all stats for the selected weapon so it should be used as the first command after the #newweapon command."
                });
            }
            
            if (word == "corpseeater") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will eat this amount of corpses per month if possible and gain HP for it equal to the value in #deadhp."
                });
            }
            
            if (word == "corpselord") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will receive extra units when creating Corpse Men. This ability will not be visible when inspecting the monster."
                });
            }
            
            if (word == "crippled") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item bearer becomes Crippled. The affliction cannot be healed until the item is removed."
                });
            }
            
            if (word == "crossbreeder") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is skilled in crossbreeding and gets a bonus when using the Crossbreeding or Improved Crossbreeding ritual from the Blood magic school. The crossbreeder receives more units per casting and a higher chance of extraordinary results."
                });
            }
            
            if (word == "curse") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every unit in the province has this chance of being cursed."
                });
            }
            
            if (word == "cursed") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item is cursed and cannot be dropped."
                });
            }
            
            if (word == "curseluckshield") {
                return new vscode.Hover({
                    language: "English",
                    value: "Grants the Fateweaving ability. Anyone striking the unit will have their fate rewritten and suffer from misfortunes for the next few rounds of battle. The effect can be resisted with a successful Magic Resistance check. The penetration bonus makes the effect harder to resist."
                });
            }
            
            if (word === 'custommagic') {
                const markdown = new vscode.MarkdownString(`Gives a chance for another magic skill to the active monster. The path mask must be a number from Table 18 or a sum of multiple masks from this table.
|Number|Path|
|:----:|:----:|
|128|Fire|
|256|Air|
|512|Water|
|1024|Earth|
|2048|Astral|
|4096|Death|
|8192|Nature|
|16384|Blood|
|32768|Priest|
`);

        markdown.isTrusted = true;

        return new vscode.Hover(markdown);
    }
            
            if (word == "damage") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the damage for this spell. Add 1000 to dmg to make the damage be variable with the level of the caster. Damage means damage for damage spells but it can also mean many other things for different spells. E.g. summoning spells use this value to determine which monster is summoned."
                });
            }
            
            if (word == "damagemon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this to set a spells damage to a monster if you dont know its number."
                });
            }
            
            if (word == "damagerev") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has the Damage Reversal ability. Any creature that hits the monster must make a magic resistance check or suffer the damage itself instead of harming the target. Strength must be at least one and strength minus one is the penalty to the MR check. Use strength 1 for standard damage reversal with no penalty."
                });
            }
            
            if (word == "darkpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases in darkness. Only active in combat."
                });
            }
            
            if (word == "darkvision") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives monster darkvision lessening penalties for fighting under darkness. Use value 100 for perfect darkvision."
                });
            }
            
            if (word == "deadhp") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of HP gained per corpse eaten."
                });
            }
            
            if (word == "deathattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "deathbanish") {
                return new vscode.Hover({
                    language: "English",
                    value: "Whoever strikes the killing blow against this monster is banished to another plane. -11=The Void -12=The Inferno -13=Kokytos"
                });
            }
            
            if (word == "deathblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "deathboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Death magic."
                });
            }
            
            if (word == "deathcurse") {
                return new vscode.Hover({
                    language: "English",
                    value: "When this monster dies the unit that strikes the killing blow is cursed."
                });
            }
            
            if (word == "deathdeath") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect death and growth has on population death in 0.01% per month. Default is 20."
                });
            }
            
            if (word == "deathdisease") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster bursts in a cloud of disease ridden fumes when it dies infecting its killer and anyone nearby with disease."
                });
            }
            
            if (word == "deathfire") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster erupts in a fiery explosion when it dies inflicting 10 AP fire damage to everyone in the area of effect."
                });
            }
            
            if (word == "deathincome") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect death and growth has on income. Default is 2."
                });
            }
            
            if (word == "deathparalyze") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster erupts in a paralyzing explosion on death forcing everyone in the area of effect to make a MR check or become paralyzed."
                });
            }
            
            if (word == "deathpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases or decreases depending on the Death scale."
                });
            }
            
            if (word == "deathrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Death rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "deathrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is cheaper to recruit if there are Death scales in the province. Works identically to #chaosrec. Growth scales do not affect the price."
                });
            }
            
            if (word == "deathsupply") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect death and growth has on supplies. Default is 10."
                });
            }
            
            if (word == "decscale") {
                return new vscode.Hover({
                    language: "English",
                    value: "Decreases the specified scale in the province by one step."
                });
            }
            
            if (word == "decscale2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Decreases the specified scale in the province by two steps."
                });
            }
            
            if (word == "decscale3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Decreases the specified scale in the province by three steps."
                });
            }
            
            if (word == "decunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "The site decreases unrest in the province. The value can be negative in order to increase unrest."
                });
            }
            
            if (word == "def") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a defense bonus."
                });
            }
            
            if (word == "defchaos") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the default value of the chaos scale for this nation."
                });
            }
            
            if (word == "defcom1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the secondary commander for this poptypes PD when PD is 20 or higher."
                });
            }
            
            if (word == "defcom2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Extra commander for fortified provinces with a province defense equal to or greater than 20."
                });
            }
            
            if (word == "defdeath") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the default value of the death scale for this nation."
                });
            }
            
            if (word == "defdrain") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the default value of the drain scale for this nation."
                });
            }
            
            if (word == "defector") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a chance to become independent if owned by a player. The Unfettered form of the Eater of the Dead uses this mechanic. This command only affects commanders."
                });
            }
            
            if (word == "defence") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the province defence of the active nation. This command cannot be used for independent provinces."
                });
            }
            
            if (word == "defmisfortune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the default value of the misfortune scale for this nation."
                });
            }
            
            if (word == "defmult1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of units per 10 points of defense. E.g. __#defmult1 20 will yield 2 units per point of defense which is also the default."
                });
            }
            
            if (word == "defmult1b") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of units per 10 points of defense for the second unit type."
                });
            }
            
            if (word == "defmult1c") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of units per 10 points of defense for the third unit type."
                });
            }
            
            if (word == "defmult1d") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of units per 10 points of defense for the fourth unit type. The default value is 10."
                });
            }
            
            if (word == "defmult2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of bonus units per 10 points of defense equal to or greater than 20."
                });
            }
            
            if (word == "defmult2b") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of units per 10 points of defense equal to or greater than 20 for the second bonus unit type. The default value is 10."
                });
            }
            
            if (word == "defsloth") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the default value of the sloth scale for this nation."
                });
            }
            
            if (word == "defunit1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the first type of unit in the poptype PD."
                });
            }
            
            if (word == "defunit1b") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the second type of unit in the poptype PD."
                });
            }
            
            if (word == "defunit1c") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the third type of unit in the poptype PD."
                });
            }
            
            if (word == "defunit1d") {
                return new vscode.Hover({
                    language: "English",
                    value: "Fourth type of standard unit for local defense. They appear like defunit1. Usually there is no fourth type and this command isnt used."
                });
            }
            
            if (word == "defunit2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Bonus units for local defense equal to or greater than 20 in provinces with forts only."
                });
            }
            
            if (word == "defunit2b") {
                return new vscode.Hover({
                    language: "English",
                    value: "Second type of bonus units for local defense equal to or greater than 20 in provinces with forts."
                });
            }
            
            if (word == "delay") {
                return new vscode.Hover({
                    language: "English",
                    value: "Succeeding event occurs  turns after this event. The succeeding event will not occur normally."
                });
            }
            
            if (word == "delay25") {
                return new vscode.Hover({
                    language: "English",
                    value: "Succeeding event occurs  +/- 25% turns after this event. The succeeding event will not occur normally."
                });
            }
            
            if (word == "delay50") {
                return new vscode.Hover({
                    language: "English",
                    value: "Succeeding event occurs  +/- 50% turns after this event. The succeeding event will not occur normally."
                });
            }
            
            if (word == "delayskip") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this command right after a delay command. This is the chance that the next next event will be used instead of the next one, when determining what delayed event to execute. The next next event will not occur normally."
                });
            }
            
            if (word == "delgod") {
                return new vscode.Hover({
                    language: "English",
                    value: "Deletes a god that is otherwise gained through homerealm use."
                });
            }
            
            if (word == "demon") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is a demon."
                });
            }
            
            if (word == "demononly") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon only causes affects demons."
                });
            }
            
            if (word == "demononly") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon only causes affects demons."
                });
            }
            
            if (word == "demonundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon only affects demons and undead."
                });
            }
            
            if (word == "demonundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon only affects demons and undead."
                });
            }
            
            if (word == "descr") {
                return new vscode.Hover({
                    language: "English",
                    value: "A full description of the nation."
                });
            }
            
            if (word == "description") {
                return new vscode.Hover({
                    language: "English",
                    value: " The description of the map that is shown after selecting a map to play on. Use two newlines to add a new paragraph. Alternatively"
                });
            }
            
            if (word == "deserter") {
                return new vscode.Hover({
                    language: "English",
                    value: "A commander with this attribute has chance of deserting each month."
                });
            }
            
            if (word == "details") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command is not necessary. If used it will set the yellow spell detail text under the main spell description."
                });
            }
            
            if (word == "digest") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster digests any swallowed creatures. Swallowed creatures take"
                });
            }
            
            if (word == "disableoldnations") {
                return new vscode.Hover({
                    language: "English",
                    value: "Disables all old nations (up to number 119)"
                });
            }
            
            if (word == "disease") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every unit in the province has this chance of becoming diseased."
                });
            }
            
            if (word == "diseasecloud") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster is surrounded by a disease cloud. Standard size is 6. The disease cloud adds the Plague Carrier icon to the monster."
                });
            }
            
            if (word == "diseaseres") {
                return new vscode.Hover({
                    language: "English",
                    value: "Protects a unit when diseased. Value is the chance of not being negatively affected by the disease each month."
                });
            }
            
            if (word == "divineins") {
                return new vscode.Hover({
                    language: "English",
                    value: "There can only be a number of divinely inspired researchers per province equal to the dominion strength in that province. Any extra divinely inspired researchers have their research value ignored. The monks of Man use this mechanic.  These commands cause the monster to produce permanent or temporary magic gems when it is a commander."
                });
            }
            
            if (word == "djinn") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this for djinns with a humanoid body but no lower part."
                });
            }
            
            if (word == "dmg") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage value of the weapon. A spear has a damage value of 3 and a sword has 6."
                });
            }
            
            if (word == "doheal") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unit heals normally despite not usually being able to heal."
                });
            }
            
            if (word == "dom2title") {
                return new vscode.Hover({
                    language: "English",
                    value: " The title of the map. This must be the first command for every map. The reason why this command is named #dom2title instead of #dom5title is because the map command syntax used here was first introduced in Dominions 2: The Ascension Wars and much of it has been kept the same since then."
                });
            }
            
            if (word == "domdeathsense") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of unburied corpses will be known where this dominion has influence."
                });
            }
            
            if (word == "domimmortal") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is dominion immortal like a Phoenix."
                });
            }
            
            if (word == "dominion") {
                return new vscode.Hover({
                    language: "English",
                    value: "The site will spread the gods dominion by automatically initiating a number of temple checks per month."
                });
            }
            
            if (word == "dominionstr") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the dominion strength of a nation to a value between 1 and 10."
                });
            }
            
            if (word == "domkill") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations Dominion kills population like Ashen Empire Ermor. Value of 10=1%*Dominion killed every month."
                });
            }
            
            if (word == "dompower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases or decreases depending on the strength of the dominion in the province."
                });
            }
            
            if (word == "domrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can only be recruited if the dominion value of the province is at least this high."
                });
            }
            
            if (word == "domsail") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations Dominion enables all units to sail like the dark vessels ability of Phaeacia."
                });
            }
            
            if (word == "domshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when inside a friendly dominion."
                });
            }
            
            if (word == "domsummon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Summons a number of monsters each month spent inside friendly dominion. The amount summoned is a dominion strength sided open ended die roll."
                });
            }
            
            if (word == "domsummon2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Half as effective as #domsummon."
                });
            }
            
            if (word == "domsummon20") {
                return new vscode.Hover({
                    language: "English",
                    value: "A twentieth as effective as #domsummon."
                });
            }
            
            if (word == "domunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations Dominion causes unrest. Unrest increase is equal to value*0.1*dominion per month. Value can be negative for unrest reducing Dominions."
                });
            }
            
            if (word == "domversion") {
                return new vscode.Hover({
                    language: "English",
                    value: " Set the minimum version of Dominions required to use this map. This number is usually 450 for Dominions 5 maps"
                });
            }
            
            if (word == "domwar") {
                return new vscode.Hover({
                    language: "English",
                    value: "Dominion conflict bonus."
                });
            }
            
            if (word == "doomhorror") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monsters with this tag are used as doom horrors."
                });
            }
            
            if (word == "douse") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster gets a blood magic bonus when searching for blood slaves. Works like a Sanguine Dousing Rod (this item has a bonus of 1)."
                });
            }
            
            if (word == "dragonlord") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will receive extra units when summoning Drakes of different kind."
                });
            }
            
            if (word == "drainimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is immune to the effects of Drain scale like the Master Smiths of Ulm. There is no research penalty from Drain scale and in combat the fatigue costs of spells are not increased by the Drain scale. The monster gains all normal bonuses from an increased Magic scale."
                });
            }
            
            if (word == "drake") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is a drake and is affected by the Dragon Master ability."
                });
            }
            
            if (word == "drawsize") {
                return new vscode.Hover({
                    language: "English",
                    value: "The value indicates how many percent larger size the sprite should be drawn at. A negative value means it will be draw at a smaller size than normal."
                });
            }

            if (word === 'dt_aff') {
                const markdown = new vscode.MarkdownString(` Sets the damage type of the weapon to a special effect or affliction. The specific affliction the weapon inflicts is set with the #dmg command so the weapons damage value is interpreted as a bitmask value according to the (affliction table)(#afflictions). The table uses bitmask values meaning powers of 2. The numbers are expressed as powers of 2 because numbers after about 2^20 get very big very quickly.
|2^x|Affliction|
|:----:|:----:|
|0|disease|
|1|curse|
|3|plauge|
|5|curse of stones|
|6|entangle|
|7|rage|
|8|decay|
|9|burn|
|10|asleep|
|11|rusty armor|
|12|blind|
|13|blodd|
|14|earth grip|
|16|fire bonds|
|17|false fetters|
|18|limp|
|19|lost eye|
|20|weakness|
|21|battle fright|
|22|mute|
|23|chest wound|
|24|crippled|
|25|feeble minded|
|26|never healing wound|
|27|slime|
|28|frozen|
|29|webbed|
|30|arm loss|
|32|shrinked|
|34|confused|
|36|slowed|
|41|rusty|
|49|soul slayed|
|50|caught in net|
`);

        markdown.isTrusted = true;

        return new vscode.Hover(markdown);
    }
            
            if (word == "dt_bouncekill") {
                return new vscode.Hover({
                    language: "English",
                    value: "This effect will bounce a few times to nearby targets like a chain lightning. Weapons with this effect should have aoe = 1."
                });
            }
            
            if (word == "dt_cap") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to capped damage (max 1 HP damage) like a whip or a blowgun."
                });
            }
            
            if (word == "dt_constructonly") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only inanimate beings are affected by this weapon."
                });
            }
            
            if (word == "dt_demon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to anti-demon damage. This means double damage to demons."
                });
            }
            
            if (word == "dt_drain") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon drains life force from its target healing damage and reducing fatigue for the attacker."
                });
            }
            
            if (word == "dt_holy") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to holy damage. This means triple damage to undead and demons."
                });
            }
            
            if (word == "dt_interrupt") {
                return new vscode.Hover({
                    language: "English",
                    value: "This damage is not real but it can still interrupt mages casting spells."
                });
            }
            
            if (word == "dt_large") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon does triple damage against creatures larger than the attacker."
                });
            }
            
            if (word == "dt_magic") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon does double damage to magic beings."
                });
            }
            
            if (word == "dt_normal") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to normal damage. This is the default."
                });
            }
            
            if (word == "dt_paralyze") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to paralyze. Damage value is NOT directly turns of paralysis. Use 10 for a standard strength paralyze."
                });
            }
            
            if (word == "dt_poison") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage delivery mechanism to poison damage. Poison damage is caused over several combat rounds. To make a poisoned weapon do NOT use this command. Use a secondary effect that has both #poison and this command."
                });
            }
            
            if (word == "dt_raise") {
                return new vscode.Hover({
                    language: "English",
                    value: "If the target is killed by the weapon it is animated as a soulless servant of the attacker."
                });
            }
            
            if (word == "dt_realstun") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to stun. The damage value for stun weapons should be 100. Stunned units are unable to take any action for about 1 combat round."
                });
            }
            
            if (word == "dt_sizestun") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to fatigue damage that is less effective on large targets. Effectively the same as #dt_stun + #sizeresist."
                });
            }
            
            if (word == "dt_small") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon does double damage against creatures smaller than the attacker."
                });
            }
            
            if (word == "dt_stun") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the damage type to fatigue damage."
                });
            }
            
            if (word == "dt_weakness") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon drains strength from its target instead of doing normal damage."
                });
            }
            
            if (word == "dt_weapondrain") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon drains life but max 5 points of the damage is used to heal the wielder. Use this for draining weapons that can be wielded or forged."
                });
            }
            
            if (word == "dungeon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is a suitable encounter in a dungeon."
                });
            }
            
            if (word == "dyingdom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Dominion is dying and needs blood sacrifice. Temples have no effect here except if blood sacrifices are performed there or if a priest preaches there. Mictlan has a dominion like this combined with #nopreach and #sacrificedom."
                });
            }
            
            if (word == "earthattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "earthblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "earthboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Earth magic."
                });
            }
            
            if (word == "earthrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Earth rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "effect") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the effect of the spell. Some of the most common eff values can be seen in tables Ritual spell effects and Combat spell effects. Value higher than 10000 are rituals and those lower are combat spells. There are many other values that can be used but these are the only documented ones for now. Press ctrl-i in game when viewing the spell details to see some modding information including the effect value."
                });
            }
            
            if (word == "elegist") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is more effective than its normal priest level when calling a god or disciple back from death. The Elegist value is added to its priest level when performing this action."
                });
            }
            
            if (word == "elementrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Elemental magic (Fire Air Water Earth) rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "emigration") {
                return new vscode.Hover({
                    language: "English",
                    value: "A percentage of the province population emigrates elsewhere."
                });
            }
            
            if (word == "enc") {
                return new vscode.Hover({
                    language: "English",
                    value: "The basic encumbrance of the monster. Normal humans have 3 and undead beings or machines have 0. Monsters with 0 encumbrance never get exhausted by fighting only spellcasting."
                });
            }
            
            if (word == "enchcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Enchantment school cast in this province cost"
                });
            }
            
            if (word == "enchrebate25p") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will be 25 percent cheaper to recruit when this enchantment is active."
                });
            }
            
            if (word == "enchrebate50") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will be 50 gold cheaper to recruit when this enchantment is active."
                });
            }
            
            if (word == "enchrebate50p") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will be 50 percent cheaper to recruit when this enchantment is active."
                });
            }
            
            if (word == "end") {
                return new vscode.Hover({
                    language: "English",
                    value: "Always use this command at the end of modifying an event."
                });
            }
            
            if (word == "enemyimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Enemy units are immune to this weapon."
                });
            }
            
            if (word == "entangle") {
                return new vscode.Hover({
                    language: "English",
                    value: "Anyone striking this monster may get entangled."
                });
            }
            
            if (word == "epithet") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the epithet of a nation e.g. Enigma of Steel for Early Era Ulm."
                });
            }
            
            if (word == "era") {
                return new vscode.Hover({
                    language: "English",
                    value: "Which era should this nation appear in. 1 = early 2 = mid 3 = late or 0 to disable the nation. Two nations with the same name cannot be in the same era. If you change this it must be set right after #name and #epithet."
                });
            }
            
            if (word == "eramask") {
                return new vscode.Hover({
                    language: "English",
                    value: "The era mask determines which eras the band can appear in. See table Era masks. The default value is All eras."
                });
            }
            
            if (word == "ethereal") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is ethereal. Non-magical weapons have only 25% chance of harming the monster when they hit but when they do they inflict full damage unless mitigated by another ability. Ethereal monsters can pass through walls during the storming of a fortress."
                });
            }
            
            if (word == "eventisrare") {
                return new vscode.Hover({
                    language: "English",
                    value: "Random events are divided into two categories common and rare. This value is the chance of a random event to be a rare one. Default is 15."
                });
            }
            
            if (word == "evil") {
                return new vscode.Hover({
                    language: "English",
                    value: "The throne is evil and is likely to be defended by evil monsters."
                });
            }
            
            if (word == "evocost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Evocation school cast in this province cost"
                });
            }
            
            if (word == "exactgold") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains  gold. Use negative numbers for gold loss.  Scale effects alter the scales of a province. Each #incscale command functions as the equivalent #decscale of its opposite."
                });
            }
            
            if (word == "expertleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "Leadership value 120. Commander cost +100. Commanded units have a morale modifier of +2 for up to 4 squads and -1 for every additional squad."
                });
            }
            
            if (word == "expertmagicleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 120 magic beings. This is a very rare ability that only most magic beings possess."
                });
            }
            
            if (word == "expertundeadleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 120 undead beings. This is a rare ability that usually only demons or undead beings possess."
                });
            }
            
            if (word == "explspr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the particle effect to be used when this spell explodes. -1 = no explosion. See table Explosion fx to find a suitable explosion."
                });
            }
            
            if (word == "extralife") {
                return new vscode.Hover({
                    language: "English",
                    value: "The bearer of the item is resurrected once when killed in combat. The item disappears when the bearer is resurrected."
                });
            }
            
            if (word == "eyeloss") {
                return new vscode.Hover({
                    language: "English",
                    value: "Anyone striking this monster may lose an eye."
                });
            }
            
            if (word == "eyes") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the number of eyes for a monster. Number of eyes must be at least one unless the monster is #blind. The number of eyes affects how easily a monster goes blind by battle afflictions."
                });
            }
            
            if (word == "fallpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has increased hit points in autumn and lowered hit points in spring."
                });
            }
            
            if (word == "falsearmy") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster creates the false impression of greater numbers than there really are. Enemy scouting reports will inflate the size of the army by"
                });
            }
            
            if (word == "farsail") {
                return new vscode.Hover({
                    language: "English",
                    value: "Commander will be able to sail further if it can sail."
                });
            }
            
            if (word == "farsumcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the commander for farsummoned units to something other than the normal units."
                });
            }
            
            if (word == "farthronekill") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will automatically destroy thrones in the same province even if they are protected by a fort. Part is the percentage part that will be destroyed each turn 100 means it will be destroyed in a single turn."
                });
            }
            
            if (word == "fastcast") {
                return new vscode.Hover({
                    language: "English",
                    value: "Affects the spell casting time for commanders. Speedup 100=half time 200=one third time -50=double time."
                });
            }
            
            if (word == "fatiguecost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the fatigue cost for this spell. Every 100 in fatigue cost raises the required number of gems or blood slaves by one. Must be used also for rituals to set their gem cost."
                });
            }
            
            if (word == "fear") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is very fearsome. A high value indicates higher fear. The standard value is 5. Death magic increases the fear value. The monster lowers the morale of enemy units in"
                });
            }
            
            if (word == "feature") {
                return new vscode.Hover({
                    language: "English",
                    value: " Puts a specific magic site in the active province. This command can be used a maximum of eight times per province"
                });
            }
            
            if (word == "features") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the magic site frequency. This command will override the site frequency specified in the game setup screen."
                });
            }
            
            if (word == "feeblemind") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item bearer becomes Feebleminded. The affliction cannot be healed until the item is removed."
                });
            }
            
            if (word == "female") {
                return new vscode.Hover({
                    language: "English",
                    value: "Being female is a minor advantage that makes you immune to being charmed by the Succubus. Commanders with this tag get feminine names."
                });
            }
            
            if (word == "fire") {
                return new vscode.Hover({
                    language: "English",
                    value: "This weapon does fire damage. A fire resistant being will take reduced damage from this weapon."
                });
            }
            
            if (word == "fireattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "fireblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "fireboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Fire magic."
                });
            }
            
            if (word == "firepower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases or decreases depending on the Heat scale."
                });
            }
            
            if (word == "firerange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Fire rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "fireres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a Fire Resistance bonus."
                });
            }
            
            if (word == "fireshield") {
                return new vscode.Hover({
                    language: "English",
                    value: "Anyone striking this monster will take"
                });
            }
            
            if (word == "firstshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will change shape to its first shape when it feels ok. Werewolves have this ability in their wolf shapes. Monster nbr can be negative for montags."
                });
            }
            
            if (word == "fixedname") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a fixed name to a monster if it is a commander. Useful for giving specific names to heroes."
                });
            }
            
            if (word == "fixedresearch") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces this amount of research even without magic skills."
                });
            }
            
            if (word == "fixforgebonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gem reduction when forging items. The value is in absolute numbers of gems not in percent like the other forgebonus. This is the default forgebonus mechanic in Dominions 5."
                });
            }
            
            if (word == "flag") {
                return new vscode.Hover({
                    language: "English",
                    value: "Replace the flag with an image. The image must be 128 pixels wide and 128 pixels high. The flag should be positioned at the bottom of this image and should usually be smaller than the entire image. A standard flag only covers about 75 percent of the height."
                });
            }
            
            if (word == "flagland") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets or removes an event flag from a province. The event flag is displayed as an image of a book on the map.  1 = set flag 0 = remove flag Requires an event code in the province. If the event code is reset to 0, the flag automatically disappears."
                });
            }
            
            if (word == "flail") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon has a +2 attack bonus against shields. Morningstars and flails have this feature. Whips do not because they do not have enough momentum when they wrap around a shield."
                });
            }
            
            if (word == "flightspr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the sprite or particle effect to be used when this spell is flying. The flysprite nbr should be a value from the table Flysprites."
                });
            }
            
            if (word == "float") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants its bearer the ability to float."
                });
            }
            
            if (word == "fly") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants its bearer the ability to fly."
                });
            }
            
            if (word == "flying") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can fly. To be able to fly in a storm the monster must also be #stormimmune. The monster can cross rivers. It can also cross mountain passes if it is not cold in the provinces the pass connects."
                });
            }
            
            if (word == "flyingimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Flying and floating beings are immune to this weapon."
                });
            }
            
            if (word == "flyspr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this command to set how the arrow looks like for a missile weapon. A value of -1 for a flysprite means there is no flysprite at all. Table Flysprites shows some numbers that can be used for missile weapons. Flysprite numbers of 10000 and higher are particle effects, lower numbers are hand drawn sprites."
                });
            }
            
            if (word == "fogcol") {
                return new vscode.Hover({
                    language: "English",
                    value: " Color the world with the specified colors for fights in the current province. Color values range from 0 to 255."
                });
            }
            
            if (word == "foolscouts") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster creates the false impression of uniformity in its own army. Enemy scouting reports will perceive the army to only contain one type of troop. The reported troop type is usually the most common troop type present."
                });
            }
            
            if (word == "foolscouts") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster creates the false impression of uniformity in its own army. Enemy scouting reports will perceive the army to only contain one type of troop. The reported troop type is usually the most common troop type present."
                });
            }
            
            if (word == "foreignshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when moving out of its home province."
                });
            }
            
            if (word == "forestcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can be recruited in forest provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "forestlabcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gold cost for building a lab in a forest. Default is 500."
                });
            }
            
            if (word == "forestrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can be recruited in forest provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "forestshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when moving from a non-forest province to a forest province."
                });
            }
            
            if (word == "forestsurvival") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster has the Forest Survival skill. Forest terrain does not hinder movement."
                });
            }
            
            if (word == "foresttemplecost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gold cost for building a temple in a forest. Default is 400."
                });
            }
            
            if (word == "forgebonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes it cheaper to create magic items."
                });
            }
            
            if (word == "formationfighter") {
                return new vscode.Hover({
                    language: "English",
                    value: "A formation fighter is well drilled in using tight formations and can fit more units into one square. The xsize value indicates the extra size points that will fit in a square. Use a value of 2 for a normal formation fighting human."
                });
            }
            
            if (word == "fort") {
                return new vscode.Hover({
                    language: "English",
                    value: " Puts a specific fort in the active province. Fort nbr is a number between 1 and 29 and the list of fort numbers can be found in the Fortifications table. Will replace a nations default fort if used on a capital location."
                });
            }
            
            if (word == "fortcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Extra cost is the additional amount of gold the nation must pay for its forts expressed as a percentage of the normal cost for building a fort. The default value is 0."
                });
            }
            
            if (word == "fortera") {
                return new vscode.Hover({
                    language: "English",
                    value: "Determines what kind of forts the nation can build.  0 = palisades only 1 = standard forts for early era 2 = standard forts for middle era 3 = standard forts for late era 4 = better than standard forts for late era"
                });
            }
            
            if (word == "fortkill") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will automatically destroy forts in the same province. Chance is the chance in percent that the fort will be destroyed each turn."
                });
            }
            
            if (word == "fortunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unrest will increase by 1-value (open ended die roll) in all forts each month.  These commands are set the special attributes of the nation and its Dominion."
                });
            }
            
            if (word == "friendlyench") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 means the enchantment created by this spell is friendly. It will be dispelled automatically if the province is conquered by the enemy."
                });
            }
            
            if (word == "friendlyimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Friendly units are immune to this weapon."
                });
            }
            
            if (word == "fullstr") {
                return new vscode.Hover({
                    language: "English",
                    value: "The full weapon wielders strength will be added to the damage. This is the default and need not be specified."
                });
            }
            
            if (word == "futuresite") {
                return new vscode.Hover({
                    language: "English",
                    value: "This will cause any linked units and commanders to show up on a nations overview screen. Very useful to show summons or other national units upfront."
                });
            }
            
            if (word == "gainaff") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements gains the specified affliction. Afflictions are listed in the table below. The bitmask is expressed as powers of 2. Add together several bitmasks if more than one affliction is desired."
                });
            }
            
            if (word == "gainmark") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements gains one level of horrormark."
                });
            }
            
            if (word == "gcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The cost in gold. Most human troops have a gold cost of 10."
                });
            }
            
            if (word == "gemloss") {
                return new vscode.Hover({
                    language: "English",
                    value: "Lose 3d6 gems of specified type. Gem type 53 can be used for all types, then 1d6 will be lost of each type of gem. Use gem type 56 to exclude blood slaves."
                });
            }
            
            if (word == "gemprod") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster produces a number of magic gems each month. The type ranges from 0 (fire gems) to 7 (blood slaves). See table Magic path numbers."
                });
            }
            
            if (word == "gems") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives gem income to the magic site. Path should be a number between 0 and 7. See table magic paths numbers."
                });
            }
            
            if (word == "ghostreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priest of this nation will create ghosts like Lemuria.  NOTE, Caelian Atlantian Jotun Rephaite and monkey undead are hard coded for their respective nations and their reanimation cannot be unlocked for modding using reanimation commands.  National Reanimation Lists Use the various monster summoning commands such as #makemonsters15 with a #montag value to create custom reanimation lists for those priests that need it.  18 Poptype Modding Use these commands to mod poptypes."
                });
            }
            
            if (word == "giftofwater") {
                return new vscode.Hover({
                    language: "English",
                    value: "A commander with this ability is able to bring a number of units underwater with him as long as their combined size points do not exceed the value of this ability."
                });
            }
            
            if (word == "goddomchaos") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the Turmoil or chaos scale of the gods dominion. Use a negative value to increase Order."
                });
            }
            
            if (word == "goddomcold") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the Cold scale of the gods dominion. Use a negative value to increase Heat."
                });
            }
            
            if (word == "goddomdeath") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the Death scale of the gods dominion. Use a negative value to increase Growth."
                });
            }
            
            if (word == "goddomdrain") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the Drain scale of the gods dominion. Use a negative value to increase Magic."
                });
            }
            
            if (word == "goddomlazy") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the Sloth scale of the gods dominion. Use a negative value to increase Production."
                });
            }
            
            if (word == "goddommisfortune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the Misfortune scale of the gods dominion. Use negative value to increase Luck."
                });
            }
            
            if (word == "godpathspell") {
                return new vscode.Hover({
                    language: "English",
                    value: "This is used for divine spells that should only be available when the God is best with this particular magic path. -1 can be used for the fallback spell that should be available when the god has no path that is good enough."
                });
            }
            
            if (word == "godrebirth") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations god does not lose any magic path levels when recalled from the dead by priests."
                });
            }
            
            if (word == "gold") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains  gold. Use negative numbers for gold loss. The value varies with +/- 50%."
                });
            }
            
            if (word == "golemhp") {
                return new vscode.Hover({
                    language: "English",
                    value: "Inanimate beings in gain a percentage boost to their hit points for each dominion candle (Golem Cult dominion like Agartha)."
                });
            }
            
            if (word == "goodleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "Leadership value 80. Commander cost +60. Commanded units have a morale modifier of +1 for up to 3 squads and -1 for every additional squad."
                });
            }
            
            if (word == "goodmagicleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 80 magic beings. This is a very rare ability that only most magic beings possess."
                });
            }
            
            if (word == "goodundeadleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 80 undead beings. This is a rare ability that usually only demons or undead beings possess."
                });
            }
            
            if (word == "greaterhorror") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monsters with this tag are used as horrors."
                });
            }
            
            if (word == "greekreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priest of this nation will create greek ghosts like Therodos."
                });
            }
            
            if (word == "groundcol") {
                return new vscode.Hover({
                    language: "English",
                    value: " Color the world with the specified colors for fights in the current province. Color values range from 0 to 255."
                });
            }
            
            if (word == "growhp") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster grows into the previous monster once it has this many hit points or more. Hydras use this mechanic."
                });
            }
            
            if (word == "guardspirit") {
                return new vscode.Hover({
                    language: "English",
                    value: "Priests of this nation have a chance of receiving a guardian angel when in battle. Nbr can be negative for montags."
                });
            }
            
            if (word == "guardspiritbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the chance of receiving a guardian spirit with +value percent."
                });
            }
            
            if (word == "halfdeathinc") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will only be half as affected by the death/growth scale regarding gold income. Abysia has this ability."
                });
            }
            
            if (word == "halfdeathpop") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will only be half as affected by the death/growth scale regarding population growth. Abysia has this ability."
                });
            }
            
            if (word == "halfstr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only one half of the weapon wielders strength will be added to the damage. This is normally used for the breath weapons of dragons."
                });
            }
            
            if (word == "haltheretic") {
                return new vscode.Hover({
                    language: "English",
                    value: "Works like Awe, except that it only works against sacred units."
                });
            }
            
            if (word == "hardmrneg") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effects of the weapon may be resisted by MR but there is a penalty to the MR check."
                });
            }
            
            if (word == "hatesterr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the nation less likely to start in one of the terrains in the terrain mask."
                });
            }
            
            if (word == "heal") {
                return new vscode.Hover({
                    language: "English",
                    value: "The site causes a healing check to be performed at the indicated percent chance on every unit in the province like a healing unit set to Heal Troops. If the healing check is successful a check against the healing difficulty of any affliction the unit has is performed. If the difficulty check is successful up to one affliction is removed."
                });
            }
            
            if (word == "healer") {
                return new vscode.Hover({
                    language: "English",
                    value: "Grants a commander the Heal Troops ability. The percent value is the chance of success for every unit in the province. Success chance is checked against every unit to see if the commander successfully uses the healing ability. If successful a check is made against the difficulty of each affliction and if it succeeds the affliction in question is healed. Some afflictions are harder to heal than others. This command still works but it is replaced in all instances of in-game occurrence with the #autohealer or #autodishealer mechanic."
                });
            }
            
            if (word == "heat") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is surrounded by heat like an Abysian. The heat aura is"
                });
            }
            
            if (word == "heatrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Heat scale requirement for recruitment."
                });
            }
            
            if (word == "heretic") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster decreases dominion in the province it resides in as if it was an enemy priest engaged in preaching. The value of the heretic ability acts as the priest level and should be set within the range of 1 \u2013 5."
                });
            }
            
            if (word == "hero1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero10") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero5") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero7") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero8") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hero9") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a hero to the modded nation. A nation can have up to ten different heroes. Use monster nbr -1 to remove a hero."
                });
            }
            
            if (word == "hiddenench") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 means the enchantment created by this spell is not visible during battles. It should be used on enchantments that does not affect battles."
                });
            }
            
            if (word == "hiddensite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a new, hidden site to the province. Use -1 for site number to place [sitename] instead. [sitename] must be added to event message text in brackets."
                });
            }
            
            if (word == "holy") {
                return new vscode.Hover({
                    language: "English",
                    value: "Holy (sacred) troops can be blessed by priests."
                });
            }
            
            if (word == "holyboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Priest level."
                });
            }
            
            if (word == "holyfire") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every turn any undead or demonic troops in the province have the indicated chance (percent) to be struck by holy fire which deals 10 points of armor-negating damage if they fail a MR check against an attack value of 12."
                });
            }
            
            if (word == "holypower") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every turn any undead troops in the province have the indicated chance (percent) to be struck by holy power which deals 10 points of armor- negating damage if they fail a MR check against an attack value of 12."
                });
            }
            
            if (word == "homecom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a monster that can be recruited as commander by the original owner of this site only."
                });
            }
            
            if (word == "homefort") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will start with this fort in its home province. This command does not affect what type of forts the nation can build. The command is only necessary if the home fort should deviate from the standard one for their fortera. See the table below for a list of forts."
                });
            }
            
            if (word == "homemon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a monster that can be recruited by the original owner of this site only."
                });
            }
            
            if (word === 'homerealm') {
                const markdown = new vscode.MarkdownString(`Any gods that belong to this realm (through the use of the #homerealm monster modding command) are automatically included in the nations default list of pretenders and need not be separately added to the list with the #addgod command. See Table Home realms. Unlike the homerealm of a pretender god the homerealm of a nation cannot be cleared.
|Nbr|Realm|
|:----:|:----:|
|1|North|
|2|Celtic|
|3|Mediterranean|
|4|Far East|
|5|Middle East|
|6|Middle America|
|7|Africa|
|8|India|
|9|Deeps|
|10|Default|
`);

        markdown.isTrusted = true;

        return new vscode.Hover(markdown);
    }
            
            if (word == "homeshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when moving into its home province."
                });
            }
            
            if (word == "homesick") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster takes damage equal to the indicated percentage of its total hit points every turn it spends away from its home province (the province where it was first recruited summoned or spawned)."
                });
            }
            
            if (word == "horrordeserter") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #deserter but the desertion chance is increased during astral corruption."
                });
            }
            
            if (word == "horrormark") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every turn any unit in the province has the indicated chance (percent) to be horror marked."
                });
            }
            
            if (word == "horsereanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priests with holy magic of level 3 or higher can reanimate longdead horsemen. Sceleria and Ashen Empire Ermor have this attribute."
                });
            }
            
            if (word == "horsetattoo") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic tattoo like the units of Marverni and Sauromatia have."
                });
            }
            
            if (word == "hp") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a bonus to hit points."
                });
            }
            
            if (word == "hpoverflow") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monsters hit points can increase past the normal maximum. The extra HP are permanently retained until lost due to damage. This command is useful for units that possess life drain attacks or that can #digest swallowed monsters."
                });
            }
            
            if (word == "hpoverslow") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monsters hit points can go over their normal maximum value by 0 - 1000 percent. They will slowly return to normal."
                });
            }
            
            if (word == "humanoid") {
                return new vscode.Hover({
                    language: "English",
                    value: "The default bodytype. Use this for humans ogres angels humanlike statues and similar."
                });
            }
            
            if (word == "iceforging") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster generates"
                });
            }
            
            if (word == "iceprot") {
                return new vscode.Hover({
                    language: "English",
                    value: "Protection varies with the temperature in the province. The protection value is added or subtracted for every step on the Cold scale."
                });
            }
            
            if (word == "iceweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon is made of ice and cannot be fire blessed."
                });
            }
            
            if (word == "icon") {
                return new vscode.Hover({
                    language: "English",
                    value: "A banner image for your mod. This image should be 128x32 or 256x64 pixels large."
                });
            }
            
            if (word == "id") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets an event identifier. Used for spells that create anonymous random events."
                });
            }
            
            if (word == "idealcold") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the preferred level of cold for the nation. This ranges from -3 (very hot) to 3 (very cold)."
                });
            }
            
            if (word == "illusion") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a monster glamour. These monsters cannot be discovered by scouts and have a mirror image protecting them in battles. This command adds 25 to the monsters existing stealth value if it already has the #stealthy attribute. Glamour does not grant stealth to monsters that have no stealth to begin with."
                });
            }
            
            if (word == "imagefile") {
                return new vscode.Hover({
                    language: "English",
                    value: " The image file of the map in TGA"
                });
            }
            
            if (word == "immobile") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is Immobile like the Monolith. Immobile units may teleport but cannot use the Cloud Trapeze spell.."
                });
            }
            
            if (word == "immortal") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is immortal like a Lich."
                });
            }
            
            if (word == "inanimate") {
                return new vscode.Hover({
                    language: "English",
                    value: "Inanimate beings are immune to some spells."
                });
            }
            
            if (word == "inanimateimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Lifeless beings are immune to this weapon."
                });
            }
            
            if (word == "inccorpses") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of unburied corpses increases by this amount +/- 25%. The value can be negative to remove corpses."
                });
            }
            
            if (word == "incdom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases dominion in the province by  candles."
                });
            }
            
            if (word == "incorporate") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster incorporates any swallowed creatures as a part of itself. Swallowed creatures take damage every combat round until dead or until the monster that swallowed them is killed.  The monster that incorporates them heals a number of hit points equal to damage inflicted every combat round."
                });
            }
            
            if (word == "incpop") {
                return new vscode.Hover({
                    language: "English",
                    value: "Province population increases by this amount +/- 25%."
                });
            }
            
            if (word == "incprovdef") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is good at organizing province defenses. PD is increased by"
                });
            }
            
            if (word == "incscale") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the specified scale in the province by one step."
                });
            }
            
            if (word == "incscale2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the specified scale in the province by two steps."
                });
            }
            
            if (word == "incscale3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the specified scale in the province by three steps."
                });
            }
            
            if (word == "incunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will increase or decrease unrest at his location. The value divided by 10 is the amount increased per month. A negative can be used to decrease unrest instead."
                });
            }
            
            if (word == "indepflag") {
                return new vscode.Hover({
                    language: "English",
                    value: "Replace the flag of independents with an image. The image must be 128 pixels wide and 128 pixels high. The flag should be positioned at the bottom of this image. This command is special in that it should be used when no nation is selected i.e. before #selectnation or #newnation."
                });
            }
            
            if (word == "indepmove") {
                return new vscode.Hover({
                    language: "English",
                    value: "This ability is used by certain horrors to make them move on the world map. A monster with this ability have percent chance of moving each month as long as it is owned by independents."
                });
            }
            
            if (word == "indepspells") {
                return new vscode.Hover({
                    language: "English",
                    value: "Usually independent mages will only know low level research spells. This command will give them access to all spell with this research level and lower when they fight as independent."
                });
            }
            
            if (word == "indepstay") {
                return new vscode.Hover({
                    language: "English",
                    value: "A 1 in this ability means that the monster will stop moving once it has reached a throne province."
                });
            }
            
            if (word == "infernoret") {
                return new vscode.Hover({
                    language: "English",
                    value: "Extra chance per month of returning from the Inferno the infernal realm of fire."
                });
            }
            
            if (word == "inquisitor") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has a bonus when preaching against enemy Dominion. Its holy magic level counts as double for this purpose. The monster must have the #holy tag."
                });
            }
            
            if (word == "insane") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a chance of being insane each turn. The Mad Priests of Rlyeh have a value of 50 in this attribute."
                });
            }
            
            if (word == "insanify") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster spreads insanity to both military units and population in the province. The percent value is the chance for a military unit in the same province to be infected."
                });
            }
            
            if (word == "inspirational") {
                return new vscode.Hover({
                    language: "English",
                    value: "All units under the command of this monster have their morale increased by"
                });
            }
            
            if (word == "inspiringres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster inspires other mages to be more effective researchers. All other mages in the same province gain a research bonus equal to"
                });
            }
            
            if (word == "internal") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon inflicts internal damage that cannot be negated by effects like mist form mossbody etc. Used on e.g. Incinerate and Disintegrate."
                });
            }
            
            if (word == "invisible") {
                return new vscode.Hover({
                    language: "English",
                    value: "Invisible units can only be seen by units with spirit sight. When a unit with invisibility is sneaking only patrolling units with spirit sight will be able to find it. In combat invisibility gives any melee attackers -10 to their attack skill unless they have spirit sight."
                });
            }
            
            if (word == "invulnerable") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has invulnerability to non-magical weapons. The invulnerability value counts as natural protection against normal weapons."
                });
            }
            
            if (word == "ironarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Indicates that the armor is made of iron."
                });
            }
            
            if (word == "ironskin") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item automatically applies the Ironskin spell to the bearer."
                });
            }
            
            if (word == "ironvul") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will take points amount of extra damage when wounded by an iron weapon in melee."
                });
            }
            
            if (word == "ironweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon is made of iron and is subject to rust and spells that damage iron equipment."
                });
            }
            
            if (word == "islance") {
                return new vscode.Hover({
                    language: "English",
                    value: "This item can only be used by mounted or flying units or centaurs."
                });
            }
            
            if (word == "islandnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation prefers to start on an island if possible or a coast if no suitable island could be found."
                });
            }
            
            if (word == "islandsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #startsite but the nation will only get the site if it starts on an island."
                });
            }
            
            if (word == "item") {
                return new vscode.Hover({
                    language: "English",
                    value: "A specific magic item for the commander. A maximum four items per band can be assigned."
                });
            }
            
            if (word == "itemcost1") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command makes the item bonus percent more expensive to forge. Negative values can also be used to make it cheaper. The itemcost1 command only affects the cost of the first magic path."
                });
            }
            
            if (word == "itemcost2") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command makes the item bonus percent more expensive to forge. Negative values can also be used to make it cheaper. The itemcost2 command only affects the cost of the second magic path."
                });
            }
            
            if (word == "itemdrawsize") {
                return new vscode.Hover({
                    language: "English",
                    value: "The value indicates how many percent larger size the item sprite should be drawn at. A negative value means it will be draw at a smaller size than normal."
                });
            }
            
            if (word == "itemslots") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets which item slots are available for this monster. See Table Item slot values for useful slot values. If you want to have 2 hand slots and 1 body slot then just add those two numbers together. Never add 1 hand and 1 hand use the 2 hands value instead. The bottom three entries in the table are some precalculated values for your convenience."
                });
            }
            
            if (word == "ivylord") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will receive extra units when summoning Vine Men of different kind."
                });
            }
            
            if (word == "kill") {
                return new vscode.Hover({
                    language: "English",
                    value: "Kills off a percentage of the province population."
                });
            }
            
            if (word == "kill2d6mon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Kills 2d6 non-commander units of the specified type in the province."
                });
            }
            
            if (word == "killcappop") {
                return new vscode.Hover({
                    language: "English",
                    value: "Kills a percentage of the capitals population when the game starts. Value can be negative to increase population instead.  These mod commands are instructions to the Dominions 5 artificial intelligence on certain aspects of managing the nation. They have no effect in a game where the nation is controlled by a human player."
                });
            }
            
            if (word == "killcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Kills a commander of the specified type in the province."
                });
            }
            
            if (word == "killfeatures") {
                return new vscode.Hover({
                    language: "English",
                    value: " Removes all magic sites from the active province."
                });
            }
            
            if (word == "killmon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Kills one non-commander unit of the specified type in the province."
                });
            }
            
            if (word == "killpop") {
                return new vscode.Hover({
                    language: "English",
                    value: "Kills off a fixed number of province population. One dekapop equals 10 inhabitants. The exact amount varies with +/- 25%."
                });
            }
            
            if (word == "knownfeature") {
                return new vscode.Hover({
                    language: "English",
                    value: " Puts a specific magic site in the active province. This site is already found at the start of the game"
                });
            }
            
            if (word == "kokytosret") {
                return new vscode.Hover({
                    language: "English",
                    value: "Extra chance per month of returning from Kokytos the infernal realm of ice."
                });
            }
            
            if (word == "lab") {
                return new vscode.Hover({
                    language: "English",
                    value: " Puts a laboratory in the active province."
                });
            }
            
            if (word == "labcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gold cost for building a lab. The default is 500."
                });
            }
            
            if (word == "lamialord") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will receive extra units when summoning Lamias of different kind. This ability will not be visible when inspecting the monster."
                });
            }
            
            if (word == "lanceok") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can use lances even though it is not flying or mounted. Use this attribute on centaurs."
                });
            }
            
            if (word == "land") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the active province and kills everyone in it. All the following commands will only affect the active province. Use this command if you want to activate a province in order to replace its random inhabitants with the monsters of your choice."
                });
            }
            
            if (word == "landcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable commanders for this nation in overwater forts. Only use this command for underwater nations."
                });
            }
            
            if (word == "landdamage") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will take damage equal to the indicated percentage of its total hit points every turn it spends in a land province instead of underwater."
                });
            }
            
            if (word == "landgold") {
                return new vscode.Hover({
                    language: "English",
                    value: "Permanent increase to province gold income. Can be negative to reduce income."
                });
            }
            
            if (word == "landname") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the name of a specific province.  6.4 Terrain Type in the Map File"
                });
            }
            
            if (word == "landprod") {
                return new vscode.Hover({
                    language: "English",
                    value: "Permanent increase to province resources. Can be negative to cause reduce resources."
                });
            }
            
            if (word == "landrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable units for this nation in overwater forts. Only use this command for underwater nations."
                });
            }
            
            if (word == "landshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when moving from a water province to a land province."
                });
            }
            
            if (word == "latehero") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this command on a hero unit to prevent it from appearing before this turn."
                });
            }
            
            if (word == "len") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the length of the weapon. This should be a value between 0 (fist) and 5 (pike). A spear has a value of 3 and a sword 1."
                });
            }
            
            if (word == "leper") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster spreads a very deadly disease that kills population and infects military units in the province. The percent value is the chance for a military unit in the same province to be infected."
                });
            }
            
            if (word == "lesserhorror") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monsters with this tag are used as lesser horrors."
                });
            }
            
            if (word == "level") {
                return new vscode.Hover({
                    language: "English",
                    value: "Level should be a number between 0 and 4 and is the level of magic required to find the site. Level 0 sites are automatically discovered."
                });
            }
            
            if (word == "likespop") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation gets cheaper PD from this poptype. Can be used multiple times for different poptypes."
                });
            }
            
            if (word == "likesterr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the nation more likely to start in one of the terrains in the terrain mask."
                });
            }
            
            if (word == "limitedregen") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like regeneration but doesnt work on inanimate beings."
                });
            }
            
            if (word == "linger") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this command for global events whose effects last for more than one turn."
                });
            }
            
            if (word == "lizard") {
                return new vscode.Hover({
                    language: "English",
                    value: "Four legged beast but lower. Use this for dragons."
                });
            }
            
            if (word == "loc") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command can restrict the random placement of a site to certain terrains or flag the site as unique."
                });
            }
            
            if (word == "loseeye") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item bearer loses an eye. The affliction cannot be healed until the item is removed."
                });
            }
            
            if (word == "luck") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants Luck to its bearer like Faithful."
                });
            }
            
            if (word == "luckevents") {
                return new vscode.Hover({
                    language: "English",
                    value: "How luck affects event frequency. Default is 5."
                });
            }
            
            if (word == "mag_air") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Air magic."
                });
            }
            
            if (word == "mag_astral") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Astral magic."
                });
            }
            
            if (word == "mag_blood") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Blood magic."
                });
            }
            
            if (word == "mag_death") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Death magic."
                });
            }
            
            if (word == "mag_earth") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Earth magic."
                });
            }
            
            if (word == "mag_fire") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Fire magic."
                });
            }
            
            if (word == "mag_nature") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Nature magic."
                });
            }
            
            if (word == "mag_priest") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Holy magic."
                });
            }
            
            if (word == "mag_water") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives active commander Water magic."
                });
            }
            
            if (word == "magic") {
                return new vscode.Hover({
                    language: "English",
                    value: "This is a magic weapon that can harm ethereal units with ease."
                });
            }
            
            if (word == "magicarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Indicates that the armor is magic. Magic armors are more resistant to being destroyed by magic effects."
                });
            }
            
            if (word == "magicbeing") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is a magic being."
                });
            }
            
            if (word == "magicboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item increases the bearers magic skill. Path is 0-8 or 51=elements 52=sorcery 53=all."
                });
            }
            
            if (word == "magiccommand") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases magic leadership by this amount."
                });
            }
            
            if (word == "magicimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is immune to the research effects of Drain and Magic scales. There is no research penalty for Drain scale and no research bonus for magic scale."
                });
            }
            
            if (word == "magicitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation that owns the event gains a magic item that is placed directly into the lab. Item rarity is listed in the table below. When rarity 9 is used, add the [itemname] in brackets at the end of the event message text defined by the #msg command."
                });
            }
            
            if (word == "magicpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get stat increases or decreases depending on the Magic scale."
                });
            }

            if (word === 'magicskill') {
                const markdown = new vscode.MarkdownString(` Gives a magic skill to the active monster. The path must be a number from the Magic path numbers table and level should be a number from 1 to 10. If the monster already has this magic skill then the old level will be replaced by the new one unless it is a random skill. Units with Holy magic must also have the #holy command.
|Nbr|Path|
|:----:|:----:|
|0|Fire|
|1|Air|
|2|Water|
|3|Earth|
|4|Astral|
|5|Death|
|6|Nature|
|7|Blood|
|8|Priest|
|50|Random|
|51|Elemental|
|52|Sorcery|
|53|All (not priest)|
`);

        markdown.isTrusted = true;

        return new vscode.Hover(markdown);
    }
            
            if (word == "magicstudy") {
                return new vscode.Hover({
                    language: "English",
                    value: "Research bonus depending on the magic scale of the province."
                });
            }
            
            if (word == "mainlevel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Main path level requirement to forge this magic item. The level can be anything from 1 to 8. The cost of forging the magic item also depends on the level requirements."
                });
            }
            
            if (word == "mainpath") {
                return new vscode.Hover({
                    language: "English",
                    value: "Main path required to forge this magic item. The path is a number from 0 to 7 (see table Magic path numbers)."
                });
            }
            
            if (word == "makemonsters1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster a special order that can summon a monster per month. #makemonsters2 to #makemonsters5 can also be used to summon more monsters per month."
                });
            }
            
            if (word == "makemonsters2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster a special order that can summon a monster per month. #makemonsters2 to #makemonsters5 can also be used to summon more monsters per month."
                });
            }
            
            if (word == "makemonsters3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster a special order that can summon a monster per month. #makemonsters2 to #makemonsters5 can also be used to summon more monsters per month."
                });
            }
            
            if (word == "makemonsters4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster a special order that can summon a monster per month. #makemonsters2 to #makemonsters5 can also be used to summon more monsters per month."
                });
            }
            
            if (word == "makemonsters5") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster a special order that can summon a monster per month. #makemonsters2 to #makemonsters5 can also be used to summon more monsters per month."
                });
            }
            
            if (word == "makepearls") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can turn"
                });
            }
            
            if (word == "manikinreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priest of this nation will create carrion beasts like Asphodel."
                });
            }
            
            if (word == "mapmove") {
                return new vscode.Hover({
                    language: "English",
                    value: "The speed at which the monster travels on the world map. The old Dominions 4 values are 1 for heavy infantry 2 for a lightly armed human or knights and 3 for light cavalry. You can use these values and the game will automatically convert them to values suitable for Dominions 5."
                });
            }
            
            if (word == "mapspeed") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increase the map movement value for the items bearer."
                });
            }
            
            if (word == "mapteleport") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #teleport but only grants teleport ability on the map not in combat."
                });
            }
            
            if (word == "maptextcol") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the color used to print province names. Each value should be between 0.0 and 1.0."
                });
            }
            
            if (word == "mason") {
                return new vscode.Hover({
                    language: "English",
                    value: "A mason is able to lead the construction of more advanced forts than what would otherwise be possible for the nation. A mason will be able to upgrade a fortress one step further than normally possible."
                });
            }
            
            if (word == "masterrit") {
                return new vscode.Hover({
                    language: "English",
                    value: "Pathboost for the purpose of casting rituals. A monster with this ability can cast rituals that would require"
                });
            }
            
            if (word == "mastersmith") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monsters magic paths are counted as"
                });
            }
            
            if (word == "maxage") {
                return new vscode.Hover({
                    language: "English",
                    value: "This maximum age for a monster. After this age it will risk getting afflictions and eventually die. Default is 50 for humans 500 for undead 1000 for demons. Different magic paths increase maxage 50% of this value per point of magic depending on the type of creature. Undead are affected by Death magic inanimate creatures by Earth magic demons by Blood magic and all others by Nature magic in that order (if the monster belongs to more than one of these categories at once e.g. lifeless undead)."
                });
            }
            
            if (word == "maxbounces") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the maximum number of bounces for a chain lightning (effect 134) type of spell effect."
                });
            }
            
            if (word == "maxprison") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation must not be imprisoned to more than this level. 0=awake 1=dormant 2=no limit."
                });
            }
            
            if (word == "maxsize") {
                return new vscode.Hover({
                    language: "English",
                    value: "This item can only by a unit of this size or smaller."
                });
            }
            
            if (word == "melee50") {
                return new vscode.Hover({
                    language: "English",
                    value: "This melee weapon only has 50% chance of being used."
                });
            }
            
            if (word == "melee50") {
                return new vscode.Hover({
                    language: "English",
                    value: "This melee weapon only has 50% chance of being used."
                });
            }
            
            if (word == "merccost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Mercenaries are this much more expensive. Can be negative."
                });
            }
            
            if (word == "mind") {
                return new vscode.Hover({
                    language: "English",
                    value: "Mindless beings are immune to this weapon."
                });
            }
            
            if (word == "mindslime") {
                return new vscode.Hover({
                    language: "English",
                    value: "Grants the mindslime ability."
                });
            }
            
            if (word == "mindvessel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Just read the wiki."
                });
            }
            
            if (word == "minmen") {
                return new vscode.Hover({
                    language: "English",
                    value: "Once the number of troops fall below this recruitment of new troops will start."
                });
            }
            
            if (word == "minpay") {
                return new vscode.Hover({
                    language: "English",
                    value: "The minimum amount of gold the band can be hired for."
                });
            }
            
            if (word == "minprison") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation must be imprisoned to at least this level. 0=no limit 1=dormant 2=imprisoned."
                });
            }
            
            if (word == "minsize") {
                return new vscode.Hover({
                    language: "English",
                    value: "This item can only by a unit of this size or larger."
                });
            }
            
            if (word == "minsizeleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "A unit with this Attribute can only be lead by a commander whos minimum Size is equal to or greater then the listed value. 0-6"
                });
            }
            
            if (word == "miscshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this for strange things like cubes or fountains."
                });
            }
            
            if (word == "misfortune") {
                return new vscode.Hover({
                    language: "English",
                    value: "How (mis)fortune affects the possibility of an event being good. Default is 15."
                });
            }
            
            if (word == "modname") {
                return new vscode.Hover({
                    language: "English",
                    value: "A short name for the mod. It will be displayed in the mod preferences."
                });
            }
            
            if (word == "mon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a monster that can be recruited by the owner of this site."
                });
            }
            
            if (word == "monpresentrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can only be recruited if a unit of monster name type is present in the recruiting province. Montag numbers can be used."
                });
            }
            
            if (word == "montag") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command assigns a monster tag value to a creature. The value must be a number between 1000 and 100000. The monster tag value is a summoning marker that can be used with the other monster summoning commands and in spell modding to summon randomly determined monsters from a defined list. When a summoning command or spell is used with the montag value a random creature with that montag value is summoned. Use a minus sign before the value when using it in this manner for the command to work correctly.  Example, Five monsters with a #montag 2500 could be set as random monster summons by assigning #summon2 -2500 to another monster. This would result in two random monsters from those five being summoned.  The monster tag can also be used as damage value for summoning spells which will then summon a random monster from the group with the same tag. To use it that way set spell damage to [minus]."
                });
            }
            
            if (word == "montagweight") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this command after a montag command to make it more likely to appear than other monster with the same montag. The weight defaults to 1 which gives this montag the same chance of occurring as other montags with weight 1 (or no specified weight). A weight of 2 will make it twice as likely to appear and so forth. Maximum weight is 100."
                });
            }
            
            if (word == "mor") {
                return new vscode.Hover({
                    language: "English",
                    value: "The morale of the monster. A normal human soldier has morale 10 a satyr of Pangaea has 8 and a fierce minotaur has 13. Giving a monster 50 in morale makes it mindless and prone to dissolving due to lack of proper leadership. Undead with a mind but nothing to lose usually have 30 in morale."
                });
            }
            
            if (word == "morale") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a morale bonus."
                });
            }
            
            if (word == "mountaincom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can be recruited in mountain provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "mountainrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can be recruited in mountain provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "mountainsurvival") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster has the Mountain Survival skill. Mountain terrain does not hinder movement and the monster can cross mountain passes even if it is cold in the provinces the pass connects."
                });
            }
            
            if (word == "mounted") {
                return new vscode.Hover({
                    language: "English",
                    value: "Indicates the monster is mounted. Mounted monsters have increased defense (+3) and do not suffer from armor encumbrance but should have about two extra in basic encumbrance."
                });
            }
            
            if (word == "mountedhumanoid") {
                return new vscode.Hover({
                    language: "English",
                    value: "Regarding hit locations this is the same as humanoid but it removes the boot item slot and is provided for convenience because humanoid cavalry is very common. Use this for cavalry centaurs and similar."
                });
            }
            
            if (word == "mr") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a magic resistance bonus."
                });
            }
            
            if (word == "mrnegates") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effects of the weapon can be resisted by MR."
                });
            }
            
            if (word == "mrnegateseasily") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effects of the weapon can be easily resisted by MR."
                });
            }
            
            if (word == "msg") {
                return new vscode.Hover({
                    language: "English",
                    value: "Message text for the event. For many event modding commands that need item or site names to be determined for the event to function, the item or site name to be added to the end of the text of this command in brackets."
                });
            }
            
            if (word == "multihero1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "multihero2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "multihero3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "multihero4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "multihero5") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "multihero6") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "multihero7") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives a multihero to the modded nation. Use e.g. #multihero1 to set the first of seven possible multiheroes. A multihero is a hero that never runs out, i.e. there is an infinite supply of that type of hero."
                });
            }
            
            if (word == "mute") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item bearer becomes Mute. The affliction cannot be healed until the item is removed."
                });
            }
            
            if (word == "naga") {
                return new vscode.Hover({
                    language: "English",
                    value: "Snake like lower part and a humanoid upper body. Use this for nagas."
                });
            }
            
            if (word == "name") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the name of the nation. Even though the name of a nation is changed the file names for the 2h and trn files will be the same as the old nations. If the name is changed then this must be the first command when modifying the nation."
                });
            }
            
            if (word == "nametype") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the type of random name that this monster gets when its a commander. For name numbers and their meaning see table Name Types. If you do not set the name type explicitly then Dominions will take a guess based on gender size resistances and so forth and sometimes come up with the correct result anyway. Nametypes 161 \u2013 299 should be used for modding purposes."
                });
            }
            
            if (word == "nat") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the nation for the following two commands."
                });
            }
            
            if (word == "natcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a monster that can be recruited as commander if the site is owned by the nation set by the #nat command."
                });
            }
            
            if (word == "nation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the nation that owns the event. The default owner is independents.  -1 = random enemy -2 = province owner The effects of the event are applied in the province where the event occurs and by the nation who owns the event. In an event with an attack, it can be used to set the attacking troops to be non-independents."
                });
            }
            
            if (word == "nationench") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the event owner to the nation that has this global enchantment active. This command is useful to create global enchantments that spawns units owned by the caster of the global enchantment."
                });
            }
            
            if (word == "nationinc") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will receive this much extra gold each month. The percentage value can be negative to make a nation that earn less gold."
                });
            }
            
            if (word == "nationrebate") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item is 20% cheaper to forge for this nation. Can be used multiple times on one item to enable it for a few nations. A nation nbr of -1 uses the last manipulated nation so this command can be used with #newnation."
                });
            }
            
            if (word == "natmon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a monster that can be recruited if the site is owned by the nation set by the #nat command."
                });
            }
            
            if (word == "natural") {
                return new vscode.Hover({
                    language: "English",
                    value: "Marks the weapon as a natural ranged weapon. Use this for things like breath weapons or mind blasts. Weapons with this attribute will not be affected by blesses like fire weapons."
                });
            }
            
            if (word == "natureattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "natureblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "natureboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Nature magic."
                });
            }
            
            if (word == "naturerange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Nature rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "neednoteat") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster doesnt need any food and doesnt consume any supplies. To create a monster that cannot starve but still eats combine this effect with a negative #supplybonus."
                });
            }
            
            if (word == "neighbour") {
                return new vscode.Hover({
                    language: "English",
                    value: " Makes it possible to move between these two provinces (in both directions). Use the map editor to set province neighbors. Doing it from the map file with a text editor is VERY difficult."
                });
            }
            
            if (word == "neighbourspec") {
                return new vscode.Hover({
                    language: "English",
                    value: " This command can be used to create a mountain pass or other type of special border between two provinces. Spcnbr indicates a special border types from these values: 0 = standard border"
                });
            }
            
            if (word == "newdom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changes dominion to that of the event owner and sets it to the level of 1d(value) candles."
                });
            }

            if (word == "newweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Weapon number for new weapons should be a number between 800 and 1999. It must not be the same as any other weapon. This new weapon will be affected by the following modding commands and there should be an #end command at the end."
                });
            }
            
            if (word == "nextingeo") {
                return new vscode.Hover({
                    language: "English",
                    value: "The spell after this will also take effect if it cast in this terrain. For combat spells only."
                });
            }
            
            if (word == "nextspell") {
                return new vscode.Hover({
                    language: "English",
                    value: "With this command the effect of another spell will also take place when the effect of the main spell occurs. The nextspell takes place on every area where the main spell takes effect. So make sure the area of the second spell isnt greater than 1 or there will be overlaps."
                });
            }
            
            if (word == "nhwound") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item bearer suffers a Never Healing Wound which cannot be healed until the item is removed."
                });
            }
            
            if (word == "noaging") {
                return new vscode.Hover({
                    language: "English",
                    value: "The wielder of this item has a chance of not aging each year."
                });
            }
            
            if (word == "noagingland") {
                return new vscode.Hover({
                    language: "English",
                    value: "Friendly units in the same province as this item have a chance of not aging each year."
                });
            }
            
            if (word == "nobadevents") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will reduce the chance of negative events in his current province. The value is the percent chance of negating a possible bad event."
                });
            }
            
            if (word == "nocastmindless") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 means mindless units cannot cast this spell."
                });
            }
            
            if (word == "nocoldblood") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be used by coldblooded beings."
                });
            }
            
            if (word == "nodeathsupply") {
                return new vscode.Hover({
                    language: "English",
                    value: "A death scale does not adversely affect supplies. Abysia has this ability."
                });
            }
            
            if (word == "nodemon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be used by demons."
                });
            }
            
            if (word == "nofind") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be found after battle."
                });
            }
            
            if (word == "noforeignrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Nation cannot recruit independent units.  These commands set the nations province defense (PD)."
                });
            }
            
            if (word == "noforgebonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Dwarven hammers and similar will not grant any rebate when used to create this item."
                });
            }
            
            if (word == "nogeodst") {
                return new vscode.Hover({
                    language: "English",
                    value: "Ritual cannot target provinces with any of these terrains. See table Terrain masks. Only used for spells that target faraway provinces"
                });
            }
            
            if (word == "nogeosrc") {
                return new vscode.Hover({
                    language: "English",
                    value: "Ritual cannot be cast from any of these terrains. See table Terrain masks."
                });
            }
            
            if (word == "noheal") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster does not heal naturally. If it is a magic being it will heal if it is located in a province with a lab."
                });
            }
            
            if (word == "nohof") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster cannot enter the Hall of Fame."
                });
            }
            
            if (word == "nohomelandnames") {
                return new vscode.Hover({
                    language: "English",
                    value: " When this switch is used"
                });
            }
            
            if (word == "noimmobile") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be used by immobile beings."
                });
            }
            
            if (word == "noinanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be used by inanimate beings."
                });
            }
            
            if (word == "noitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can only use misc items."
                });
            }
            
            if (word == "nolandtrace") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 = ritual range cannot trace over land 0 = ritual range can trace over land (default)"
                });
            }
            
            if (word == "noleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster cannot lead units when it is a commander. Use this for scouts and assassins.  Leadership Rules, Undead beings require undead leadership Demons require undead leadership Magic beings require magic leadership. Monsters that are both undead and magic being OR demon and magic being require undead leadership"
                });
            }
            
            if (word == "nolog") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event does not appear in the chronicle (event history) of the province where it occurs."
                });
            }
            
            if (word == "nomagicleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster cannot lead magic units when it is a commander (unless it it is a mage). This is the default."
                });
            }
            
            if (word == "nomounted") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be used by mounted beings."
                });
            }
            
            if (word == "nomovepen") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster ignores movement penalty from armor. This is used for chariots."
                });
            }
            
            if (word == "nonamefilter") {
                return new vscode.Hover({
                    language: "English",
                    value: " Map filter that displays province names is disabled when this command is used. Does not work correctly."
                });
            }
            
            if (word == "nopreach") {
                return new vscode.Hover({
                    language: "English",
                    value: "Priests of this nation cannot preach. Mictlan has this disadvantage."
                });
            }
            
            if (word == "norange") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will never stay put in order to fire. Horrors with range weapons have this ability."
                });
            }
            
            if (word == "norepel") {
                return new vscode.Hover({
                    language: "English",
                    value: "This weapon cannot be used to repel attacks."
                });
            }
            
            if (word == "noreqlab") {
                return new vscode.Hover({
                    language: "English",
                    value: "Recruiting this monster never requires a lab even if it is a mage."
                });
            }
            
            if (word == "noreqtemple") {
                return new vscode.Hover({
                    language: "English",
                    value: "Recruiting the monster never requires a temple even if it is sacred."
                });
            }
            
            if (word == "noriverpass") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is unable to cross rivers even when they are frozen like a vampire."
                });
            }
            
            if (word == "noslowrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes the slowrec attribute."
                });
            }
            
            if (word == "nostart") {
                return new vscode.Hover({
                    language: "English",
                    value: " Tags a province as nonstartable. No player will start here when placed at random. This command can also be set from the map editor"
                });
            }
            
            if (word == "nostr") {
                return new vscode.Hover({
                    language: "English",
                    value: "The strength of the weapon wielder will not be added to the damage. This is normally used for the weapons of mounts that have a damage value that is independent of the riders strength."
                });
            }
            
            if (word == "notdomshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when not inside a friendly dominion."
                });
            }
            
            if (word == "notext") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event does not generate a message."
                });
            }
            
            if (word == "notfornation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Restricts a spell so that it cannot be used by this nation. This command can be used multiple times on the same spell."
                });
            }
            
            if (word == "notmnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "This type of monster is unable to cast this ritual. Monster nbr can be negative for a montag. This command can be used multiple times on the same spell for non-montags."
                });
            }
            
            if (word == "noundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item cannot be used by undead."
                });
            }
            
            if (word == "noundeadgods") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation cannot choose any pretender that is undead. Marignon has this feature."
                });
            }
            
            if (word == "noundeadleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster cannot lead undead units when it is a commander (unless it it is a death or blood mage). This is the default."
                });
            }
            
            if (word == "nouw") {
                return new vscode.Hover({
                    language: "English",
                    value: "This ranged weapon cannot be used underwater. This is the default property of all ranged weapons but the command can be used to remove the ability to fire underwater from an existing ranged weapon (e.g. lightning mind blast or ethereal crossbow)."
                });
            }
            
            if (word == "nowatertrace") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 = ritual range cannot trace through water provinces 0 = Ritual range can trace through water provinces (default)"
                });
            }
            
            if (word == "nowish") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster cannot be wished for."
                });
            }
            
            if (word == "nratt") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the number of attacks per round for a weapon. For slow missile weapons set this value to -2 for every other round or -3 for every third round."
                });
            }
            
            if (word == "nreff") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the number of effects for this spell. For summoning spells this determines how many creatures are summoned. Add 1000 2000 or 3000 to this value to give more powerful casters more effects. Every 1000 gives one additional effect for every level of the caster. Add 500 instead to give one extra effect for every two levels the caster exceeds the requirement of the spell."
                });
            }
            
            if (word == "nrunits") {
                return new vscode.Hover({
                    language: "English",
                    value: "Number of troops in the band."
                });
            }
            
            if (word == "okleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "Leadership value 40. This is the default value and it is the standard for non-elite commanders. Commander cost +30. Commanded units have a morale modifier of 0 for two or fewer squads and -1 for every additional squad."
                });
            }
            
            if (word == "okmagicleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 40 magic beings. This is a very rare ability that only most magic beings possess."
                });
            }
            
            if (word == "okundeadleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 40 undead beings. This is a rare ability that usually only demons or undead beings possess."
                });
            }
            
            if (word == "older") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the monster start somewhat older or younger than its calculated or preset start age."
                });
            }
            
            if (word == "onebattlespell") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster will automatically cast this spell just before the battle starts. There is no fatigue cost. This spell cannot be a spell added by a mod it must be an original Dominions 5 spell. You can modify the spell used by this command though."
                });
            }
            
            if (word == "onisummon") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit has a chance of attracting one or more Ko-Oni per month. The Oni will only come if there is unrest or a turmoil scale in the province. The higher the unrest and turmoil the greater chance that a group of Ko-Oni will appear. The value of this ability will also modify this chance. A normal value is 50."
                });
            }
            
            if (word == "onlyatsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Ritual can only be cast in provinces containing this site."
                });
            }
            
            if (word == "onlycoastsrc") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 means this ritual can only be cast from a coast province."
                });
            }
            
            if (word == "onlycoldblood") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be used by coldblooded beings."
                });
            }
            
            if (word == "onlydemon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be used by demons."
                });
            }
            
            if (word == "onlyfriendlydst") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 = can only target allied provinces 0 = turn this feature off (default)"
                });
            }
            
            if (word == "onlygeodst") {
                return new vscode.Hover({
                    language: "English",
                    value: "Ranged ritual can only target one of these terrains. See table Terrain masks. Only used for spells that target faraway provinces."
                });
            }
            
            if (word == "onlygeosrc") {
                return new vscode.Hover({
                    language: "English",
                    value: "Ritual can only be cast from one of these terrains. See table Terrain masks for possible terrain mask values."
                });
            }
            
            if (word == "onlyinanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be used by inanimate beings."
                });
            }
            
            if (word == "onlymnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only this type of monster is able to cast this ritual. Monster nbr can be negative for a montag. This command can be used multiple times on the same spell for non-montags."
                });
            }
            
            if (word == "onlymounted") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be used by mounted beings."
                });
            }
            
            if (word == "onlyowndst") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 = can only target own provinces 0 = can target any province (default)"
                });
            }
            
            if (word == "onlyundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be used by undead."
                });
            }
            
            if (word == "order") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set special event orders that are enabled for the province (investigate, accept, decline etc). If several orders are needed to be available, add together all the mask values for the orders. The nil order resets all order options. See table below."
                });
            }
            
            if (word == "overcharged") {
                return new vscode.Hover({
                    language: "English",
                    value: "Grants the overcharged ability."
                });
            }
            
            if (word == "owner") {
                return new vscode.Hover({
                    language: "English",
                    value: " Changes the ownership of the active province. Nation nbr indicates the new owner. Nation numbers can be found in the Early Era Nations table and the three following tables."
                });
            }
            
            if (word == "ownsmonrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can only be recruited if a unit of monster name type is owned by the recruiting player. Montag numbers can be used."
                });
            }
            
            if (word == "path") {
                return new vscode.Hover({
                    language: "English",
                    value: "The path of the spell. Reqnr should be 0 for the first required path and 1 for the second required path. The path nbr should be a number between -1 and 8, see table Magic path numbers for spells."
                });
            }
            
            if (word == "pathboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The mage who gains this event has the specified path level increased by 1, to a maximum of 5. The target of this event is set by the target requirements of the event."
                });
            }
            
            if (word == "pathcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The cost for a new path in design points when this monster is used as a god. Standard is a value between 10 (arch mage) and 80 (dragon). By using this command the monster will also be selectable as a god."
                });
            }
            
            if (word == "pathlevel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Level required to cast this spell."
                });
            }
            
            if (word == "patience") {
                return new vscode.Hover({
                    language: "English",
                    value: "The patience value increases the chances of the assassin to catch his target unawares and without bodyguards. Each point of patience decreases the chance of bodyguards being present by 10%. If the bodyguard unit has the Bodyguard ability it reduces the effectiveness of the assassins Patience."
                });
            }
            
            if (word == "patrolbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "A value of ten will make this monster count as ten extra humans when it comes to patrolling. This value can also be negative for extra poor performance."
                });
            }
            
            if (word == "pen") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a penetration bonus that makes spells cast by the bearer harder to resist."
                });
            }
            
            if (word == "pierce") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon does piercing damage. Monsters with Pierce Resistance only take half damage."
                });
            }
            
            if (word == "pierceres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster takes half damage from piercing weapons."
                });
            }
            
            if (word == "pillagebonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "A monster with this ability excels at pillaging. A barbarian has a pillage bonus of one which makes them count as one man extra when it comes to pillaging."
                });
            }
            
            if (word == "plainshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when moving from a forest province to a non-forest province. If the monster also has a watershape the watershape takes precedence over the plainshape such as when moving from a forest to a water province."
                });
            }
            
            if (word == "plant") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is a plant. Plants cannot be turned into zombies by Raise Dead or other methods."
                });
            }
            
            if (word == "poison") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements is poisoned. The poison effect is armor negating but the damage will vary a bit anyway because of the usual +2d6 -2d6 calculations."
                });
            }
            
            if (word == "poisonarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Anyone striking this monster with short weapons will be poisoned."
                });
            }
            
            if (word == "poisoncloud") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster is surrounded by a poison cloud. Standard size is 6."
                });
            }
            
            if (word == "poisonres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a Poison Resistance bonus."
                });
            }
            
            if (word == "poisonskin") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a skin that exudes a paralyzing poison which does fatigue damage to anyone attacking it with length 0 weapons. The value is the damage rating of the poison."
                });
            }
            
            if (word == "polygetmagic") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 means a unit polymorphed by this ritual will get the magic of the target creature."
                });
            }
            
            if (word == "polyimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster cannot be polymorphed in combat."
                });
            }
            
            if (word == "pooramphibian") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can travel under water but is hindered by it."
                });
            }
            
            if (word == "poorleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "Leadership value 10. This is the standard value for mages. Commander cost +15. Commanded units have a morale modifier of -1 if in a single squad and an additional -1 for every additional squad."
                });
            }
            
            if (word == "poormagicleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 10 magic beings. This is a very rare ability that only most magic beings possess."
                });
            }
            
            if (word == "poorundeadleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 10 undead beings. This is a rare ability that usually only demons or undead beings possess."
                });
            }
            
            if (word == "popkill") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster kills [10 x amount] of population in the province it resides in every month. This applies to both commander and non-commander units with this attribute."
                });
            }
            
            if (word == "poppergold") {
                return new vscode.Hover({
                    language: "English",
                    value: "The amount of people required for one gold in taxes. Default is 100."
                });
            }
            
            if (word == "poptype") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the population type of the active province. This determines which troops may be recruited in the province. Poptype numbers can be found in the large table on the following page. If poptype is set with a number higher than existing poptypes"
                });
            }
            
            if (word == "population") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the population number of the active province."
                });
            }
            
            if (word == "prec") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a precision bonus."
                });
            }
            
            if (word == "precision") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the precision for this spell."
                });
            }
            
            if (word == "priestreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "All priests of this nation are able to reanimate the dead as if the had the #reanimpriest attribute. They also gain the 15 points of undead leadership per holy magic level they would have received from that attribute."
                });
            }
            
            if (word == "prophetshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unit will change into this monster when made a prophet. Monster nbr can be negative for montag usage."
                });
            }
            
            if (word == "prot") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monsters natural protection. This value should be 0 for all humans 5 for a lizardman or about 18 for a huge and scaly dragon."
                });
            }
            
            if (word == "provrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the range of a ritual in provinces."
                });
            }
            
            if (word == "purgecalendar") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes an event determined by attr from the global event calendar.  1 = the event that had been added after this event would be affected. 0 = current event -1 = the previous event. The event calendar contains the planned global events that will occur in the coming 7 months."
                });
            }
            
            if (word == "purgedelayed") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes an event from the delayed event list (same attr as previous command). Delayed events are events added by the #delay command."
                });
            }
            
            if (word == "quadruped") {
                return new vscode.Hover({
                    language: "English",
                    value: "Four legged beasts. Use this for Elephants lions wolves and similar."
                });
            }
            
            if (word == "quickness") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants Quickness (double movement +2 attack & defense attacks twice as often)."
                });
            }
            
            if (word == "raiseonkill") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster has a chance in percent to raise the people it kills as soulless."
                });
            }
            
            if (word == "raiseshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changes soulless to another kind of unit for the #raiseonkill or #dt_raise effects. Monster number can be negative for montag usage."
                });
            }
            
            if (word == "randequip") {
                return new vscode.Hover({
                    language: "English",
                    value: "How powerful magic equipment the commander will have. 0=none 3=extremely powerful stuff."
                });
            }
            
            if (word == "randomequip") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives random magic items to the active commander. Rich must be between 0 and 4. A value of 0 means small chance of getting a magic item and 4 means large chance of getting many powerful items."
                });
            }
            
            if (word == "randomspell") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a"
                });
            }
            
            if (word == "range") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the battlefield range for this spell. Add 5000 to this value to give longer range (5 extra per level) to more powerful casters."
                });
            }
            
            if (word == "range0") {
                return new vscode.Hover({
                    language: "English",
                    value: "This ranged weapon can also be used in melee."
                });
            }
            
            if (word == "range050") {
                return new vscode.Hover({
                    language: "English",
                    value: "This ranged weapon has a 50% chance of being used in melee."
                });
            }
            
            if (word == "raredomsummon") {
                return new vscode.Hover({
                    language: "English",
                    value: "There is a flat 8% chance of summoning one creature of this type when in a province with friendly dominion."
                });
            }
            
            if (word == "rarity") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the rarity of the event. Normal events should use number 1, 2, -1, -2, -11 or -12. The other numbers are always events that are best used for creating global enchantment effects or special dominion effects."
                });
            }
            
            if (word == "rcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The cost in resources. The resource cost of weapons and armor will be added to this. Most human troops have a rcost of one. Heavy cavalry have a base rcost of 8 - 20 (to represent the barding of the mount) combined with #ressize 2 for human-sized armor and weapons."
                });
            }
            
            if (word == "reanimator") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will reanimate this number of corpses automatically every turn."
                });
            }
            
            if (word == "reanimpriest") {
                return new vscode.Hover({
                    language: "English",
                    value: "A priest with this attribute will be able to raise undead."
                });
            }
            
            if (word == "recallgod") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation is better at Call God than other nations. This value is added to the priest level of all priests when they perform Call God."
                });
            }
            
            if (word == "reclimit") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can only be recruited in limited numbers. You can only recruit"
                });
            }
            
            if (word == "recrate") {
                return new vscode.Hover({
                    language: "English",
                    value: "The rate at which new troops are bought. A value of 100 means one per month."
                });
            }
            
            if (word == "recuperation") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants the recuperation ability."
                });
            }
            
            if (word == "reform") {
                return new vscode.Hover({
                    language: "English",
                    value: "This is a combat ability. The monster has this chance of getting a new healthy body when killed."
                });
            }
            
            if (word == "reformtime") {
                return new vscode.Hover({
                    language: "English",
                    value: " Alters the time taken to reform the immortal’s body. The standard time is 3 months, use #reformtime -2 if you want the immortal to reappear the next month."
                });
            }
            
            if (word == "regeneration") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster regenerates like a troll and heals damage every combat round. The percent value indicates how many percent of its total hit points are regenerated every turn. The standard value for regeneration is 10."
                });
            }
            
            if (word == "reinvigoration") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reduces the fatigue by points amount every turn in battle. This value can be negative to gain extra fatigue in battle instead. Lower fatigue reduces the chance of the monster suffering critical hits while higher fatigue increases it."
                });
            }
            
            if (word == "removesite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes a site from the province. Use -1 for site number to place [sitename] instead. [sitename] must be added to event message text in brackets. The site will be be removed regardless of being found or not."
                });
            }
            
            if (word == "req_2monsters") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster must be present in the province and there must be at least 2 of them."
                });
            }
            
            if (word == "req_5monsters") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster must be present in the province and there must be at least 5 of them."
                });
            }
            
            if (word == "req_anycode") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event code must be present somewhere in the world. Can be used multiple times for an event. If the command is used multiple times, one of the codes being present is sufficient to fulfill the requirement."
                });
            }
            
            if (word == "req_arenadone") {
                return new vscode.Hover({
                    language: "English",
                    value: "The will require that an arena battle has taken place (been resolved) earlier this turn. If set to zero an arena battle must not have taken place."
                });
            }
            
            if (word == "req_capital") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event can only happen in capital provinces. This includes conquered capital provinces.  1 = only in capitals 0 = never in capitals"
                });
            }
            
            if (word == "req_cave") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have cave terrain. 1 = must be cave, 0 = cannot be cave."
                });
            }
            
            if (word == "req_chaos") {
                return new vscode.Hover({
                    language: "English",
                    value: "Turmoil scale required."
                });
            }
            
            if (word == "req_claimedthrone") {
                return new vscode.Hover({
                    language: "English",
                    value: "The throne [sitename] must be claimed by someone. Combine with #req_site to target the throne province."
                });
            }
            
            if (word == "req_coast") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have coastal terrain. 1 = must be coast, 0 = cannot be coast."
                });
            }
            
            if (word == "req_code") {
                return new vscode.Hover({
                    language: "English",
                    value: "Province must have this event code. Can be used multiple times for an event. If the command is used multiple times, one of the codes being present is sufficient to fulfill the requirement. Use #req_code 0 for events that generate event codes. Otherwise they may break ongoing event chains."
                });
            }
            
            if (word == "req_cold") {
                return new vscode.Hover({
                    language: "English",
                    value: "Cold scale required."
                });
            }
            
            if (word == "req_commander") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a non-sneaking commander present for the event to happen. 1 = yes, 0 = no."
                });
            }
            
            if (word == "req_deadmnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster must be present or be among the dead monsters or the event cannot happen. Unique monsters and heroes stay among the dead monsters when they are killed, ordinary monsters are purged from memory when they are killed. Use this command to see if a unique monster has ever been summoned to the game."
                });
            }
            
            if (word == "req_death") {
                return new vscode.Hover({
                    language: "English",
                    value: "Death scale required."
                });
            }
            
            if (word == "req_domchance") {
                return new vscode.Hover({
                    language: "English",
                    value: "Requires a dominion and the higher dominion the higher the chance of this event happening. The owner of the dominion, friendly or not, does not matter for this command. The event will have dominion value * this value % chance of happening (if it should have happened without this command that is). This command can be used to create global enchantments that have the chance of something happening scale with dominion strength."
                });
            }
            
            if (word == "req_dominion") {
                return new vscode.Hover({
                    language: "English",
                    value: "The province must have the owners dominion at  candles or more."
                });
            }
            
            if (word == "req_domowner") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event requires this nation to have dominion in the province."
                });
            }
            
            if (word == "req_ench") {
                return new vscode.Hover({
                    language: "English",
                    value: "This enchantment must be active."
                });
            }
            
            if (word == "req_enchdom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This enchantment must be active and in its owners dominion."
                });
            }
            
            if (word == "req_era") {
                return new vscode.Hover({
                    language: "English",
                    value: "Can only happen in this era.  1 = early 2 = mid 3 = late"
                });
            }
            
            if (word == "req_farm") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have farm terrain. 1 = must be farm, 0 = cannot be farm."
                });
            }
            
            if (word == "req_forest") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have forest terrain. 1 = must be forest, 0 = cannot be forest."
                });
            }
            
            if (word == "req_fornation") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event can only happen for this nation. This command can be used multiple times for the same event to enable it for multiple nations."
                });
            }
            
            if (word == "req_fort") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a fort in the province. 1 = yes, 0 = no"
                });
            }
            
            if (word == "req_foundsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires [sitename] to be in the province and discovered."
                });
            }
            
            if (word == "req_freesites") {
                return new vscode.Hover({
                    language: "English",
                    value: "The province must have at least  free site slots for the event to happen. Remember to use this requirement if the event creates a site."
                });
            }
            
            if (word == "req_freshwater") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have fresh water. 1 = must have fresh water, 0 = cannot have fresh water."
                });
            }
            
            if (word == "req_friendlyench") {
                return new vscode.Hover({
                    language: "English",
                    value: "This enchantment must be active and friendly."
                });
            }
            
            if (word == "req_fullowner") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event requires this nation to control the province, any fort (if present) and to have positive dominion in the province."
                });
            }
            
            if (word == "req_gem") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be at least one gem of the required type in the gem treasury. Gem types are listed in the table below."
                });
            }
            
            if (word == "req_godismnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Requires the event owners Pretender God (or Disciple) to be a specific monster type.  Events with scale requirements can only trigger if the province has the required scale at the required level. The value for scale requirements can range from -3 to 3. When a negative number is used as an argument, the event can happen in the opposite scale as well.  For example, #req_growth -1 would allow the event to happen if the province has a Growth / Death scale of Death 1, neutral or any level of Growth, but cannot happen if the scale value is Death 2 or Death 3."
                });
            }
            
            if (word == "req_gold") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation must have at least this much gold in the treasury."
                });
            }
            
            if (word == "req_growth") {
                return new vscode.Hover({
                    language: "English",
                    value: "Growth scale required."
                });
            }
            
            if (word == "req_heat") {
                return new vscode.Hover({
                    language: "English",
                    value: "Heat scale required."
                });
            }
            
            if (word == "req_hiddensite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires [sitename] to be in the province and not discovered."
                });
            }
            
            if (word == "req_hostileench") {
                return new vscode.Hover({
                    language: "English",
                    value: "This enchantment must be active and hostile."
                });
            }
            
            if (word == "req_humanoidres") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a humanoid researcher present in the province for the event to happen."
                });
            }
            
            if (word == "req_indepok") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event can also happen to independents. 1 = yes, 0 = no."
                });
            }
            
            if (word == "req_lab") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a lab in the province. 1 = yes, 0 = no"
                });
            }
            
            if (word == "req_land") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires land province. 1 = land, 0 = sea."
                });
            }
            
            if (word == "req_lazy") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sloth scale required."
                });
            }
            
            if (word == "req_luck") {
                return new vscode.Hover({
                    language: "English",
                    value: "Luck scale required."
                });
            }
            
            if (word == "req_magic") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic scale required.  The argument of  means monster name or monster number."
                });
            }
            
            if (word == "req_maxdef") {
                return new vscode.Hover({
                    language: "English",
                    value: "There may not be more than  PD in the province for the event to happen. The value varies with +/- 25%."
                });
            }
            
            if (word == "req_maxdominion") {
                return new vscode.Hover({
                    language: "English",
                    value: "The province must have a dominion strength of no more than  for the event to happen. Negative values can be used and mean that enemy dominion of that strength or stronger is required for the event to happen."
                });
            }
            
            if (word == "req_maxpop") {
                return new vscode.Hover({
                    language: "English",
                    value: "There may not be more than this amount of population in the province. One dekapop = 10 population in game."
                });
            }
            
            if (word == "req_maxtroops") {
                return new vscode.Hover({
                    language: "English",
                    value: "There may not be more than this many troops in the province for the event to happen."
                });
            }
            
            if (word == "req_maxturn") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event cannot happen after this turn."
                });
            }
            
            if (word == "req_maxunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be more than  unrest in the province for the event to happen. The value varies with +/- 25%."
                });
            }
            
            if (word == "req_mindef") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be at least  PD in the province for the event to happen. The value varies with +/- 25%."
                });
            }
            
            if (word == "req_minpop") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be at least this much population in the province."
                });
            }
            
            if (word == "req_mintroops") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be at least this many troops in the province for the event to happen."
                });
            }
            
            if (word == "req_minunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be at least  unrest in the province for the event to happen. The value varies with +/- 25%."
                });
            }
            
            if (word == "req_mnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster must be present somewhere in the world or the event cannot happen. The command can be used multiple times and then all of the monsters must be in the world."
                });
            }
            
            if (word == "req_monster") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster must be present in the province."
                });
            }
            
            if (word == "req_mountain") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have mountain or border mountain terrain. 1 = must be mountain, 0 = cannot be mountain."
                });
            }
            
            if (word == "req_mydominion") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires province owners dominion. 0 = must not have owners dominion."
                });
            }
            
            if (word == "req_myench") {
                return new vscode.Hover({
                    language: "English",
                    value: "This enchantment must be active and owned by the event owner."
                });
            }
            
            if (word == "req_nation") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation must be in play for the event to happen."
                });
            }
            
            if (word == "req_nearbycode") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event code must be present in a neighboring province."
                });
            }
            
            if (word == "req_nearbysite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires [sitename] to be in the province or adjacent provinces."
                });
            }
            
            if (word == "req_nearowncode") {
                return new vscode.Hover({
                    language: "English",
                    value: "Current province or neighboring province owned by the same player must have this event code.  4.12 Enchantment Requirements These commands are intended for global enchantment creation."
                });
            }
            
            if (word == "req_noench") {
                return new vscode.Hover({
                    language: "English",
                    value: "This enchantment cannot be active."
                });
            }
            
            if (word == "req_noera") {
                return new vscode.Hover({
                    language: "English",
                    value: "Cannot happen in this era."
                });
            }
            
            if (word == "req_nomnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster must not be present in the world or the event cannot happen. This requirement is best used with unique monsters or national heroes. This command can be used multiple times and then none of the monsters may be in the world.  For example, #req_nomnr 563 would require the Queen of Storms to not have been summoned yet. If she has already been summoned, the event can no longer happen. If she is killed, the event can happen again until she is summoned once more."
                });
            }
            
            if (word == "req_nomonster") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster cannot be present in the province."
                });
            }
            
            if (word == "req_nonation") {
                return new vscode.Hover({
                    language: "English",
                    value: "If this nation is in play the event cannot occur."
                });
            }
            
            if (word == "req_nopathair") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be an Air mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathall") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a mage or priest of any kind of this level or higher in the province.  A single commander must fulfill all target requirements for the event to occur. Some commands may be used multiple times with different values (e.g. Monster types), in which case one of the conditions being present fulfills that requirement."
                });
            }
            
            if (word == "req_nopathastral") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be an Astral mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathblood") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a Blood mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathdeath") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a Death mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathearth") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be an Earth mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathfire") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a Fire mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathholy") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a Priest of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathnature") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a Nature mage of this level or higher in the province."
                });
            }
            
            if (word == "req_nopathwater") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be a Water mage of this level or higher in the province."
                });
            }
            
            if (word == "req_noseason") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event cannot happen in this season."
                });
            }
            
            if (word == "req_nositenbr") {
                return new vscode.Hover({
                    language: "English",
                    value: "There cannot be this site in the province. If there is, the event cannot happen. This command only accepts the site number as an attribute."
                });
            }
            
            if (word == "req_notanycode") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event code must not be present in the world. Can be used multiple times for an event. If the command is used multiple times, none of the codes may be present."
                });
            }
            
            if (word == "req_notforally") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation and its allies cannot receive the event. In a non-disciple game this will have the same effect as req_notfornation."
                });
            }
            
            if (word == "req_notfornation") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation cannot receive the event. The old variant req_notnation can also be used for the same effect."
                });
            }
            
            if (word == "req_notnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation cannot receive the event. OLD VARIANT"
                });
            }
            
            if (word == "req_noworlditem") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "req_order") {
                return new vscode.Hover({
                    language: "English",
                    value: "Order scale required."
                });
            }
            
            if (word == "req_owncapital") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event can only happen in event owners own capital province.  1 = only in event owners capital 0 = never in event owners capital"
                });
            }
            
            if (word == "req_pathair") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be an Air mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathastral") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be an Astral mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathblood") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a Blood mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathdeath") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a Death mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathearth") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be an Earth mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathfire") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a Fire mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathholy") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a Priest of at least this level in the province."
                });
            }
            
            if (word == "req_pathnature") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a Nature mage of at least this level in the province."
                });
            }
            
            if (word == "req_pathwater") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a Water mage of at least this level in the province."
                });
            }
            
            if (word == "req_permonth") {
                return new vscode.Hover({
                    language: "English",
                    value: "This event can only happen  times per month."
                });
            }
            
            if (word == "req_pop0ok") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event can also happen in provinces with no population. Standard events are limited to provinces with at least 50 population (5 dekapop)."
                });
            }
            
            if (word == "req_poptype") {
                return new vscode.Hover({
                    language: "English",
                    value: "The province must have the correct poptype."
                });
            }
            
            if (word == "req_preach") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event has a chance of  per priest level of happening when a priest is present and preaching the teachings of his god."
                });
            }
            
            if (word == "req_pregame") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event can happen before the first turn, right after the game has been created, but it will never occur otherwise. The message from this events will show up on the first turn of the game. There are no events like this in the standard game (unless you count the two introduction messages), but it can be used to create special start conditions for mods. These events must have an \u2018always rarity as no normal events will occur before the first turn."
                });
            }
            
            if (word == "req_prod") {
                return new vscode.Hover({
                    language: "English",
                    value: "Production scale required."
                });
            }
            
            if (word == "req_rare") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event is extra rare and only has a  chance of being valid when rolled. An always event can be combined with #req_rare to set its chance of happening (per province)."
                });
            }
            
            if (word == "req_researcher") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a researcher present in the province for the event to happen."
                });
            }
            
            if (word == "req_season") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires this season to happen.  0 = spring 1 = summer 2 = fall 3 = winter"
                });
            }
            
            if (word == "req_site") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires [sitename] to be in the province. It can be discovered or hidden."
                });
            }
            
            if (word == "req_story") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event only happens when story events are enabled. 1 = yes, 0 = no."
                });
            }
            
            if (word == "req_swamp") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have swamp. 1 = must be swamp, 0 = cannot be swamp."
                });
            }
            
            if (word == "req_targaff") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must have this affliction."
                });
            }
            
            if (word == "req_targally") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "req_targanimal") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be an animal."
                });
            }
            
            if (word == "req_targdemon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be a demon."
                });
            }
            
            if (word == "req_targforeignok") {
                return new vscode.Hover({
                    language: "English",
                    value: "Indicates that the target can be owned by someone else than the owner of the land. The default (without this command) is that all req_targ\u2026 commands only target commanders that are owned by the player that owns the land where the event occurs."
                });
            }
            
            if (word == "req_targgod") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must be god.  1 = must be pretender or disciple 0 = cannot be pretender or disciple"
                });
            }
            
            if (word == "req_targhumanoid") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets item slot requirement for target.  1 = must have hands 0 = must not have hands"
                });
            }
            
            if (word == "req_targimmobile") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be immobile."
                });
            }
            
            if (word == "req_targinanimate") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be an inanimate being."
                });
            }
            
            if (word == "req_targitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must have this magic item."
                });
            }
            
            if (word == "req_targmagicbeing") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be a magic being."
                });
            }
            
            if (word == "req_targmale") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets targets gender requirement.  1 = must be male 0 = must be female"
                });
            }
            
            if (word == "req_targmaxsize") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must be this size of smaller.  These commands set event code requirements that must be fulfilled for the event to take place. They are generally used in event chains where the event requires another event to have taken place previously.  There is a risk of incompatible mods if the same event codes are used across different mods!  Please use only negative event codes from -300 and downwards, or it may interfere with the events in the vanilla game (except for 0, which is default)."
                });
            }
            
            if (word == "req_targmindless") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be mindless."
                });
            }
            
            if (word == "req_targminsize") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must be this size or larger."
                });
            }
            
            if (word == "req_targmnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target commander must be this monster type. This command can be used multiple times."
                });
            }
            
            if (word == "req_targnoaff") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "req_targnoitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must not have this magic item."
                });
            }
            
            if (word == "req_targnomnr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target commander mustnt be this monster type. This command can be used multiple times."
                });
            }
            
            if (word == "req_targnoorder") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "req_targnopath1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 0 in target magic path."
                });
            }
            
            if (word == "req_targnopath2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 0-1 in target magic path."
                });
            }
            
            if (word == "req_targnopath3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 0-2 in target magic path."
                });
            }
            
            if (word == "req_targnopath4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 0-3 in target magic path."
                });
            }
            
            if (word == "req_targnotally") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "req_targnotowner") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "req_targorder") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must be performing these orders. This command can be used multiple times, in which case one of the conditions being present is sufficient to fulfill the requirement. Target orders are listed in the table below."
                });
            }
            
            if (word == "req_targowner") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must owned by this nation. Negative nation number cannot be used and the command can only be used once per event."
                });
            }
            
            if (word == "req_targpath1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 1+ in target magic path."
                });
            }
            
            if (word == "req_targpath2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 2+ in target magic path."
                });
            }
            
            if (word == "req_targpath3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 3+ in target magic path."
                });
            }
            
            if (word == "req_targpath4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Must have level 4+ in target magic path."
                });
            }
            
            if (word == "req_targprophet") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must be a prophet.  1 = must be a prophet 0 = cannot be a prophet"
                });
            }
            
            if (word == "req_targundead") {
                return new vscode.Hover({
                    language: "English",
                    value: "Target must (not) be an undead."
                });
            }
            
            if (word == "req_temple") {
                return new vscode.Hover({
                    language: "English",
                    value: "There must be a temple in the province. 1 = yes, 0 = no"
                });
            }
            
            if (word == "req_turn") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event cannot happen before this turn."
                });
            }
            
            if (word == "req_unclaimedthrone") {
                return new vscode.Hover({
                    language: "English",
                    value: "The throne [sitename] must be present in the game and unclaimed. Combine with #req_site to target the throne province."
                });
            }
            
            if (word == "req_unique") {
                return new vscode.Hover({
                    language: "English",
                    value: "The event can only happen  times during the course of the game."
                });
            }
            
            if (word == "req_unluck") {
                return new vscode.Hover({
                    language: "English",
                    value: "Misfortune scale required."
                });
            }
            
            if (word == "req_unmagic") {
                return new vscode.Hover({
                    language: "English",
                    value: "Drain scale required."
                });
            }
            
            if (word == "req_waste") {
                return new vscode.Hover({
                    language: "English",
                    value: "Event requires the province to have waste terrain. 1 = must be waste, 0 = cannot be waste."
                });
            }
            
            if (word == "req_worlditem") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "reqeyes") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be used by a being with eyes."
                });
            }
            
            if (word == "reqlab") {
                return new vscode.Hover({
                    language: "English",
                    value: "Recruiting the monster requires a lab."
                });
            }
            
            if (word == "reqnoplant") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "reqplant") {
                return new vscode.Hover({
                    language: "English",
                    value: "If you figure this one out please tell me so I can add it. "
                });
            }
            
            if (word == "reqseduce") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only units with the seduce ability can cast this ritual."
                });
            }
            
            if (word == "reqspellsinger") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only units with the spell singing ability can cast this ritual."
                });
            }
            
            if (word == "reqtaskmaster") {
                return new vscode.Hover({
                    language: "English",
                    value: "Only units with the task master ability can cast this ritual."
                });
            }
            
            if (word == "reqtemple") {
                return new vscode.Hover({
                    language: "English",
                    value: "Recruiting the monster requires a temple."
                });
            }
            
            if (word == "res") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a resource bonus to the site."
                });
            }
            
            if (word == "researchaff") {
                return new vscode.Hover({
                    language: "English",
                    value: "A researcher suffers an affliction."
                });
            }
            
            if (word == "researchbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes a commander better or worse at magic research. A sage has a value of 8."
                });
            }
            
            if (word == "researchlevel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Level of research required to learn this spell. The level should be a number between 0 and 9."
                });
            }
            
            if (word == "researchscale") {
                return new vscode.Hover({
                    language: "English",
                    value: "The amount of research bonus received per mage from a magic scale of +3. Default is 3."
                });
            }
            
            if (word == "resetcode") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes this event code from the entire world."
                });
            }
            
            if (word == "resetcodedelay") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes this event code from the entire world, but not immediately. It will be removed after all events have been executed this turn."
                });
            }
            
            if (word == "resetcodedelay2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Removes this event code from the entire world, but not immediately. It will be removed after all events have been executed on the next turn."
                });
            }
            
            if (word == "resolvearena1") {
                return new vscode.Hover({
                    language: "English",
                    value: "The area battles will be resolved and the winner rewarded. This event (or #resolvearena2) must occur the turn after the #arena event occurred."
                });
            }
            
            if (word == "resolvearena2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Same as #resolvearena1, but it will be an arena where the use of magic is prohibited."
                });
            }
            
            if (word == "resourcemult") {
                return new vscode.Hover({
                    language: "English",
                    value: "A multiplier for the amount of resource found in a land. Default is 100."
                });
            }
            
            if (word == "resources") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster generates"
                });
            }
            
            if (word == "ressize") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this command with a size value of 2 to give a cavalryman resource cost calculated based on size 2 instead of 3. Size value must be a number between 1 and 6."
                });
            }
            
            if (word == "restricted") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item is restricted to this nation only. Can be used multiple times on one item to enable it for a few nations. A nation nbr of -1 restricts the item to the last manipulated nation so this command can be used with #newnation."
                });
            }
            
            if (word == "restricteditem") {
                return new vscode.Hover({
                    language: "English",
                    value: "This item can only be used by monsters with the proper #userestricteditem ability value."
                });
            }
            
            if (word == "revealprov") {
                return new vscode.Hover({
                    language: "English",
                    value: "The name of the province is revealed to the entire world."
                });
            }
            
            if (word == "revealsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reveals the site called [sitename] in the province. [sitename] must be added to the event message text in brackets."
                });
            }
            
            if (word == "revolt") {
                return new vscode.Hover({
                    language: "English",
                    value: "Province revolts and turns independent."
                });
            }
            
            if (word == "riverstart") {
                return new vscode.Hover({
                    language: "English",
                    value: "This nation doesnt mind starting surrounded by rivers. Ctis has this ability."
                });
            }
            
            if (word == "rockcol") {
                return new vscode.Hover({
                    language: "English",
                    value: " Color the world with the specified colors for fights in the current province. Color values range from 0 to 255."
                });
            }
            
            if (word == "rpcost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The cost in recruitment points for the monster. 1 is standard for a simple commander and about 10 for a normal soldier.  A value of base price*1000 means it will be auto-calculated. Most human troops and commander have the value 10000 meaning that it will be calculated automatically based on the monsters age and that it has a base price of 10 gold commanders also have magic and other skills taken into account."
                });
            }
            
            if (word == "run") {
                return new vscode.Hover({
                    language: "English",
                    value: "The bearer of the item is able to move further on the battlefield (double combat speed)."
                });
            }
            
            if (word == "sacredonly") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon only affects sacred troops."
                });
            }
            
            if (word == "sacrificedom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Priests of this nation can make blood sacrifices to increase dominion. Mictlan has this benefit."
                });
            }
            
            if (word == "saildist") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the maximum sail distance in sea provinces. A commander with the sailing ability will be able to pass this many sea provinces. It default to 2"
                });
            }
            
            if (word == "sailing") {
                return new vscode.Hover({
                    language: "English",
                    value: "A commander with this ability is able to sail over two sea provinces with his troops. Ship size is the size of the boat and indicates how many size points the commander can transport. Standard value is 999. Max unit size is the maximum size unit that can be transported usually 2 or 3."
                });
            }
            
            if (word == "saltvul") {
                return new vscode.Hover({
                    language: "English",
                    value: "Units with this trait can take the listed value at most in Damage, when hit by the Enchanted Salt attack.  For those who don't know, the actual Damage you take from Salt is capped after its Damage Roll, and independently from its attack Damage (which is 1). For units without Salt Vulnerability, the cap is zero.  Salt can also Stun Vulnerable and non-Vulnerable targets, with the same chances as Shock Damage. The Stun chance is calculated before Salt Vulnerability is taken into account."
                });
            }
            
            if (word == "sample") {
                return new vscode.Hover({
                    language: "English",
                    value: "Uses this sample as sound effect for when the spell is cast. The sample must be in .sw (16-bit signed words 22050 Hz mono) or .al (a-law 22050 Hz mono) format. This command can also be used for weapons."
                });
            }
            
            if (word == "scalewalls") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can assassinate commanders even when they are in besieged castles."
                });
            }
            
            if (word == "scenario") {
                return new vscode.Hover({
                    language: "English",
                    value: " This command tags the map as a scenario and this will be indicated by a small burning star when selecting a map. It disables most game setup options"
                });
            }
            
            if (word == "school") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic school for this spell. The number ranges from -1 to 7 see Table Magic path numbers for spells."
                });
            }
            
            if (word == "scry") {
                return new vscode.Hover({
                    language: "English",
                    value: "A mage with the same path as the site may enter to scry a distant province. The scrying is a magic ritual which provides accurate scouting information on the province for"
                });
            }
            
            if (word == "scryrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "Set the maximum range of the scry ability. If not set a maximum range of 6 provinces will be used."
                });
            }
            
            if (word == "secondarycolor") {
                return new vscode.Hover({
                    language: "English",
                    value: "The animated background is made up of two colors the primary color (from #color) and this one. If the secondary color is not set it will be the same as the primary."
                });
            }
            
            if (word == "secondaryeffect") {
                return new vscode.Hover({
                    language: "English",
                    value: "This secondary effect will affect anyone harmed by the weapon. See Table secondary weapon effects for some premade effects. The effects are also weapons and share the same numbers as all other weapons and you can create a new secondary effect by creating a new weapon."
                });
            }
            
            if (word == "secondaryeffectalways") {
                return new vscode.Hover({
                    language: "English",
                    value: "This secondary effect will affect anyone attacked by the weapon no matter if it was a hit or not as long as the secondary effect itself has an area of effect of one or greater. If the secondary effect does not have an area of effect it will activate when the target is hit even if actual damage is not inflicted. See table secondary weapon effects for some premade effects. Only one of #secondaryeffectalways and #secondaryeffect can be used. You must use the always variant with area effects. For non-area effects either one can be used but you usually want the non-always variant for these weapons."
                });
            }
            
            if (word == "secondarylevel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Secondary path level requirement to forge this magic item. Works like #mainlevel."
                });
            }
            
            if (word == "secondarypath") {
                return new vscode.Hover({
                    language: "English",
                    value: "Secondary path required to forge this magic item. The path is a number from -1 to 7 from Table 20."
                });
            }
            
            if (word == "secondshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will assume another shape when it gets seriously wounded. Remember to give the other shape the #firstshape command if you want it to return to the primary form when it feels better. Werewolves in human form use this ability. Monster nbr can be negative for montags."
                });
            }
            
            if (word == "secondtmpshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will transform into another monster when it is killed in battle. This other monster will be removed after battle. Serpent Cataphracts use this ability. Monster nbr can be negative for montags."
                });
            }
            
            if (word == "seduce") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster the ability to seduce like a Nagini. The value indicates the difficulty of the morale check 10 is standard."
                });
            }
            
            if (word == "sethome") {
                return new vscode.Hover({
                    language: "English",
                    value: "The commander casting this ritual will get his home province set to the current province."
                });
            }
            
            if (word == "setland") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the active province. All the following commands will only affect the active province."
                });
            }
            
            if (word == "shapechance") {
                return new vscode.Hover({
                    language: "English",
                    value: "may be x% chance to enter or skip secondshapes"
                });
            }
            
            if (word == "shapechange") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is able to change shape to and from another monster at will. The other monster is not affected by this command and must be given #shapechange command with the first form as the value. Dragons use this ability. It is also possible to do multiple form shape changers such as the Jotun Skratti by chaining this command over several monsters."
                });
            }
            
            if (word == "shatteredsoul") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster suffers from a shattered soul like a Tartarian. There is a"
                });
            }
            
            if (word == "shock") {
                return new vscode.Hover({
                    language: "English",
                    value: "This weapon does shock damage. A shock resistant being will take reduced damage from this weapon."
                });
            }
            
            if (word == "shockres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a Shock Resistance bonus."
                });
            }
            
            if (word == "shrinkhp") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster shrinks to the following monster once it has this many hit points or less. Hydras use this mechanic."
                });
            }
            
            if (word == "siegebonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "A value of ten will make this monster count as ten extra humans when it comes to breaking down castle gates."
                });
            }
            
            if (word == "singlebattle") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster only fights in one battle and then leaves like the gladiators of Ermor and Pythium. It has to kill someone or get wounded to count as having fought."
                });
            }
            
            if (word == "size") {
                return new vscode.Hover({
                    language: "English",
                    value: "The size of the monster.  1 = hoburg 2 = human 3 = shambler cavalry 4 = giant chariot 5 = giant lobster 6 = dragon sphinx."
                });
            }
            
            if (word == "sizeresist") {
                return new vscode.Hover({
                    language: "English",
                    value: "Units that are size 3 or 4 have a chance of resisting the effects of the weapon. Size 5+ units always resist the effects and size 1 and 2 units never resist the effect. Str 15+ also has a chance to resist and Str 35+ always resists."
                });
            }
            
            if (word == "skip") {
                return new vscode.Hover({
                    language: "English",
                    value: "Once this weapon is used skip the next weapon."
                });
            }
            
            if (word == "skip2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Once this weapon is used skip the next 2 weapons."
                });
            }
            
            if (word == "skirmisher") {
                return new vscode.Hover({
                    language: "English",
                    value: "Units in Skirmish formation suffer a -1 penalty to Morale, unless they have the Skirmisher trait. <-25 - 25>"
                });
            }
            
            if (word == "skybox") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the sky (battleground background) to a tga/rgb pic of your choice for fights in the current province. The picture size should be a power of two. 512*512 is a good size."
                });
            }
            
            if (word == "slash") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon does slashing damage. Monsters with Slash Resistance only take half damage."
                });
            }
            
            if (word == "slashres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster takes half damage from slashing weapons."
                });
            }
            
            if (word == "slave") {
                return new vscode.Hover({
                    language: "English",
                    value: "Slaves are typically untrained fodder who are given weapons and herded into battle. They have low morale and are easily routed. Their morale is improved when led by a taskmaster."
                });
            }
            
            if (word == "slaver") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gets the capture slave ability. The number of slaves captured will be 1d6+4 (open ended) per month and unrest will increase by 1 for every slave captured."
                });
            }
            
            if (word == "slaverbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Modifies the number of slaves captured with the Slaver ability. E.g. a modifier of -2 will make the slaver ability catch 1d6+2 slaves per month."
                });
            }
            
            if (word == "sleepaura") {
                return new vscode.Hover({
                    language: "English",
                    value: "Grant the Sleep Aura effect with this area of effect. The Shuten-doji has this ability with area 10."
                });
            }
            
            if (word == "slimer") {
                return new vscode.Hover({
                    language: "English",
                    value: "Any unit attacking this monster must make a magic resistance check or become immobilized by oozing slime identical to the effects of the Slime spell. Strength works identically to #damagerev."
                });
            }
            
            if (word == "slothincome") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect sloth and productivity has on income. Default is 3."
                });
            }
            
            if (word == "slothpower") {
                return new vscode.Hover({
                    language: "English",
                    value: " The monster will get stat increases or decreases depending on the Sloth scale."
                });
            }
            
            if (word == "slothresearch") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster gains"
                });
            }
            
            if (word == "slothresources") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect sloth and productivity have on resources. Default is 15."
                });
            }
            
            if (word == "slowrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Takes double the amount of commander points to recruit this monster it can only be used on commanders."
                });
            }
            
            if (word == "snake") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this for snakes wyrms and other monsters without legs."
                });
            }
            
            if (word == "snaketattoo") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic tattoo like the units of Marverni and Sauromatia have."
                });
            }
            
            if (word == "sneakunit") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item will grant stealth to non-stealthy units."
                });
            }
            
            if (word == "snow") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is unhindered by snow."
                });
            }
            
            if (word == "sorceryrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Sorcery magic (Astral Death Nature Blood) rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "sound") {
                return new vscode.Hover({
                    language: "English",
                    value: "The sample that will sound when this spell is cast. Samples have the same number as the weapon samples see table Sound effects."
                });
            }
            
            if (word == "spec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets the special abilities of a spell. 8388608 is a useful number and it means that the spell can be cast under water. 64 is armor piercing 128 is armor negating and 4096 means MR negates. Add values together to make combinations."
                });
            }
            
            if (word == "speciallook") {
                return new vscode.Hover({
                    language: "English",
                    value: "This command surround a monster with a particle effect. Value can be from 1 to 3 and represents fire shield look astral shield look and a burning look respectively. A value of 100 to 199 will give the unit a fixed alpha value of 0-99 (low values will make it impossible to see)."
                });
            }
            
            if (word == "specstart") {
                return new vscode.Hover({
                    language: "English",
                    value: " Use this command to assign a specific nation to a specific start location. Nation numbers can be found in the Early Era Nations table and the three following tables. If you use the #specstart command"
                });
            }
            
            if (word == "spell") {
                return new vscode.Hover({
                    language: "English",
                    value: "Enables user of item to cast this spell in battle or as a ritual"
                });
            }
            
            if (word == "spellreqfly") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 means only flying units can cast this ritual."
                });
            }
            
            if (word == "spellsinger") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unit takes 50% longer to cast spells but at half fatigue cost."
                });
            }
            
            if (word == "spiritsight") {
                return new vscode.Hover({
                    language: "English",
                    value: "Spirit sight makes it possible to see into the spirit realm and see the true essence of beings. Units with spirit sight gets no penalties from darkness and can see invisible units."
                });
            }
            
            if (word == "spr") {
                return new vscode.Hover({
                    language: "English",
                    value: "Uses a user made image for item sprite. The image should be 32x32 or 64x64 with the item centered in the picture. The item itself should not be larger than 40x40 pixels. Black will be transparent unless the image is saved with alpha information in which case that will be used instead."
                });
            }
            
            if (word == "spr1") {
                return new vscode.Hover({
                    language: "English",
                    value: "The file name of the normal image for the monster. The size of the image should be 8 16 32 64 or 128 pixels wide/high. A human being should be about 32 pixels high and there should be 2 pixels of free space between his feet and the bottom of the image. You can use an alpha channel in the image or not. If not you should instead use black (RGB 0 0 0) as background and magenta (RGB 255 0 255) for shadows."
                });
            }
            
            if (word == "spr2") {
                return new vscode.Hover({
                    language: "English",
                    value: "The file name of the attack image for the monster. If this is not set then spr1 will be used for this image too."
                });
            }
            
            if (word == "spreadchaos") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations dominion spreads Turmoil outside its borders."
                });
            }
            
            if (word == "spreadcold") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations dominion spreads Cold outside its borders like Niefelheim."
                });
            }
            
            if (word == "spreaddeath") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations dominion spreads Death outside its borders.  NOTE, The value for all scale spread commands can be from 1-3 and indicates the maximum scale value it can raise nearby provinces to as well as the speed with which it spreads."
                });
            }
            
            if (word == "spreaddom") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster spreads the Dominion of the pretender god by its mere presence. The candles value should usually be one meaning that the monster spreads as much dominion as one prophet."
                });
            }
            
            if (word == "spreadheat") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations dominion spreads Heat outside its borders like Abysia."
                });
            }
            
            if (word == "spreadlazy") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations dominion spreads Sloth outside its borders."
                });
            }
            
            if (word == "springimmortal") {
                return new vscode.Hover({
                    language: "English",
                    value: "The immortal will reform his body in the spring."
                });
            }
            
            if (word == "springpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has increased hit points in spring and lowered hit points in autumn."
                });
            }
            
            if (word == "springshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changes into another monster when this season is active."
                });
            }
            
            if (word == "spy") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is a spy."
                });
            }
            
            if (word == "standard") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster increases the morale of units in the same squad by"
                });
            }
            
            if (word == "start") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets a recommended start location. By creating at least one start location for each player"
                });
            }
            
            if (word == "startaff") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a chance of starting with a random lesser affliction like a flagellant."
                });
            }
            
            if (word == "startage") {
                return new vscode.Hover({
                    language: "English",
                    value: "The start age for a monster. Usually there is no need to set this as it will be calculated automatically depending on maxage and skills. An age of zero clears this command and an age of -1 sets start age to zero. The startage value is the starting point for actual age calculations based on magic and other skills."
                });
            }
            
            if (word == "startcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will start with this commander. This command also removes all old start troops and must be used when changing start units."
                });
            }
            
            if (word == "startdom") {
                return new vscode.Hover({
                    language: "English",
                    value: "The default dominion strength this monster is used as a god. Standard is a value between 1 (arch mage) and 4 (oracle). This command also makes the monster selectable as a god."
                });
            }
            
            if (word == "startheroab") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a chance of starting with a heroic ability like you receive when entering the hall of fame."
                });
            }
            
            if (word == "startingaff") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster always starts with one (or more) afflictions as indicated by the affliction bitmask. See the Affliction table in the weapon modding section for suitable values."
                });
            }
            
            if (word == "startitem") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster starts with this item if it is a commander."
                });
            }
            
            if (word == "startmajoraff") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has a chance of starting with a random major affliction."
                });
            }
            
            if (word == "startscout") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nation will start with this unit as an extra commander."
                });
            }
            
            if (word == "startsite") {
                return new vscode.Hover({
                    language: "English",
                    value: "Adds a start site for this nation. Table Some magic sites shows some suitable start sites. This command can be used up to 4 times for multiple start sites. Assignment by site number is not possible."
                });
            }
            
            if (word == "startunitnbrs1") {
                return new vscode.Hover({
                    language: "English",
                    value: "The number of start units. Default is 20 units."
                });
            }
            
            if (word == "startunitnbrs2") {
                return new vscode.Hover({
                    language: "English",
                    value: "The number of start units in the second squad. Default is 20 units."
                });
            }
            
            if (word == "startunittype1") {
                return new vscode.Hover({
                    language: "English",
                    value: "The commander will have units of this type."
                });
            }
            
            if (word == "startunittype2") {
                return new vscode.Hover({
                    language: "English",
                    value: "The commander will have a second squad with these units."
                });
            }
            
            if (word == "stealthboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item will grant a stealth bonus to already stealthy units."
                });
            }
            
            if (word == "stealthcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations that owns the event gains a sneaking commander of the specified type in the province."
                });
            }
            
            if (word == "stealthy") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can sneak into enemy provinces. The default value when using this modding command is 0. Scouts are harder to detect and have a standard value of 10. A Spy has 20. The number of patrolling units required to have a 50% chance of detecting the sneaking monster is"
                });
            }
            
            if (word == "stonebeing") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is a stone being and immune to petrification."
                });
            }
            
            if (word == "stoneskin") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item automatically applies the Stoneskin spell to the bearer like the Boots of Stone."
                });
            }
            
            if (word == "stormimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "The bearer of the can fly during a storm."
                });
            }
            
            if (word == "stormpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster gets stat increases in combat during storms. This attribute also duplicates the effects of the #stormimmune attribute giving the monster the ability to fly during a storm. Only active in combat."
                });
            }
            
            if (word == "str") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a strength bonus."
                });
            }
            
            if (word == "strikeunits") {
                return new vscode.Hover({
                    language: "English",
                    value: "All units in the province are hit with an attack."
                });
            }
            
            if (word == "succubus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gives the monster the dream seduction ability like a Succubus. The value indicates the difficulty of the morale check 10 is standard."
                });
            }
            
            if (word == "summary") {
                return new vscode.Hover({
                    language: "English",
                    value: "A summary of the benefits and dominion themes of the nation."
                });
            }
            
            if (word == "summerpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has increased hit points in summer and lowered hit points in winter."
                });
            }
            
            if (word == "summershape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changes into another monster when this season is active."
                });
            }
            
            if (word == "summon") {
                return new vscode.Hover({
                    language: "English",
                    value: "A mage of the same magic path as the site may enter to summon the specified monster. To summon more than one monster of the same type the command must be used multiple times."
                });
            }
            
            if (word == "summon1") {
                return new vscode.Hover({
                    language: "English",
                    value: "Automatically summons monsters each month. The #summon1 command summons one monster per month and #summon2 to #summon5 more according to the number in the command."
                });
            }
            
            if (word == "summon2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Automatically summons monsters each month. The #summon1 command summons one monster per month and #summon2 to #summon5 more according to the number in the command."
                });
            }
            
            if (word == "summon3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Automatically summons monsters each month. The #summon1 command summons one monster per month and #summon2 to #summon5 more according to the number in the command."
                });
            }
            
            if (word == "summon4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Automatically summons monsters each month. The #summon1 command summons one monster per month and #summon2 to #summon5 more according to the number in the command."
                });
            }
            
            if (word == "summon5") {
                return new vscode.Hover({
                    language: "English",
                    value: "Automatically summons monsters each month. The #summon1 command summons one monster per month and #summon2 to #summon5 more according to the number in the command."
                });
            }
            
            if (word == "summonlvl2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #summon except that the mage summoning must be at least level 2."
                });
            }
            
            if (word == "summonlvl3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #summon except that the mage summoning must be at least level 3."
                });
            }
            
            if (word == "summonlvl4") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #summon except that the mage summoning must be at least level 4."
                });
            }
            
            if (word == "sunawe") {
                return new vscode.Hover({
                    language: "English",
                    value: "Works like Awe, except that it doesn’t work if there is no sun shining."
                });
            }
            
            if (word == "supayareanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priest of this nation will create supayas like Nazca."
                });
            }
            
            if (word == "superiorleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "Leadership value 160. Commander cost +150. Commanded units have a morale modifier of +3."
                });
            }
            
            if (word == "superiormagicleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 160 magic beings. This is a very rare ability that only most magic beings possess."
                });
            }
            
            if (word == "superiorundeadleader") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster has an innate ability to command 160 undead beings. This is a rare ability that usually only demons or undead beings possess."
                });
            }
            
            if (word == "supply") {
                return new vscode.Hover({
                    language: "English",
                    value: "The magic site provides"
                });
            }
            
            if (word == "supplybonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "A monster with this ability produces extra supplies. A negative value can also be used which will make the monster consume more supplies than usual."
                });
            }
            
            if (word == "supplymult") {
                return new vscode.Hover({
                    language: "English",
                    value: "A multiplier for the amount of supplies found in a land. Default is 100."
                });
            }
            
            if (word == "swampcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can be recruited in swamp provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "swamprec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can be recruited in swamp provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "swampsurvival") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster has the Swamp Survival skill. Swamp terrain does not hinder movement."
                });
            }
            
            if (word == "swift") {
                return new vscode.Hover({
                    language: "English",
                    value: "Grants extra combat speed to the wielder."
                });
            }
            
            if (word == "swimming") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can cross rivers."
                });
            }
            
            if (word == "syncretism") {
                return new vscode.Hover({
                    language: "English",
                    value: "Syncretism enable all priests to convert conquered temples instead of demolishing them."
                });
            }
            
            if (word == "tainted") {
                return new vscode.Hover({
                    language: "English",
                    value: "Percent chance of being horror marked each turn."
                });
            }
            
            if (word == "taskmaster") {
                return new vscode.Hover({
                    language: "English",
                    value: "All slaves under the command of this monster have their morale increased by"
                });
            }
            
            if (word == "taxboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Tax income increase in the province for one turn. Use negative numbers for a tax decrease. A value of -100 means no gold income for that turn."
                });
            }
            
            if (word == "taxcollector") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can collect taxes from provinces that cannot trace a route to the nearest fort."
                });
            }
            
            if (word == "teleport") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can teleport. Movement on the battlefield is instantaneous and the monster is not hindered by storms. The command automatically sets mapmove to 100 and the creature ignores terrain restrictions and the Sea of Ice spell."
                });
            }
            
            if (word == "temple") {
                return new vscode.Hover({
                    language: "English",
                    value: " Puts a temple in the active province."
                });
            }
            
            if (word == "templecost") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gold cost for building a temple. Default is 400."
                });
            }
            
            if (word == "templegems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The nations temples give gems up to a maximum of current dominion strength. Gem type is a value from 0 to 7 same value as magic paths (0=fire 7=blood)."
                });
            }
            
            if (word == "templepic") {
                return new vscode.Hover({
                    language: "English",
                    value: "Temple should look like this. See table below for some pic number values."
                });
            }
            
            if (word == "templetrainer") {
                return new vscode.Hover({
                    language: "English",
                    value: "A commander with this ability will be able to summon a monster per turn when in a temple province. Only one commander can do this per temple province."
                });
            }
            
            if (word == "tempscalecap") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changing any scale more than this does not yield extra design points. Default value is 3."
                });
            }
            
            if (word == "tempunits") {
                return new vscode.Hover({
                    language: "English",
                    value: "Units gained after this command are only temporary and disappear after the event has taken place, like the longdead horsemen from the Ghost Riders spell.  1 = temporary units 0 = permanent units"
                });
            }
            
            if (word == "terrain") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the terrain of a province. The terrain is calculated by adding certain numbers for different terrain types or other attributes."
                });
            }
            
            if (word == "thaucost") {
                return new vscode.Hover({
                    language: "English",
                    value: "All rituals of the Thaumaturgy school cast in this province cost"
                });
            }
            
            if (word == "thronekill") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster will automatically destroy thrones in the same province unless they are protected by a fort. Chance is the chance in percent that the throne will be destroyed each turn."
                });
            }
            
            if (word == "tmpairgems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of air gems that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tmpastralgems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of astral pearls that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tmpbloodslaves") {
                return new vscode.Hover({
                    language: "English",
                    value: "NOT IMPLEMENTED"
                });
            }
            
            if (word == "tmpdeathgems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of death gems that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tmpearthgems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of earth gems that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tmpfiregems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of fire gems that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tmpnaturegems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of nature gems that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tmpwatergems") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster produces a number of water gems that can be used in combat. The gems are not stable enough to be used for ritual spellcasting."
                });
            }
            
            if (word == "tombwyrmreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priests can reanimate soulless of Ctis longdead of Ctis tomb wyrms and other special Ctissian undead. Desert Tombs Ctis has this attribute."
                });
            }
            
            if (word == "tradecoast") {
                return new vscode.Hover({
                    language: "English",
                    value: "Income bonus for coastal forts. The nation gains more gold from coastal provinces than another nation with the same fort. Berytos has this ability. The default value is 0."
                });
            }
            
            if (word == "trample") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster can trample smaller beings."
                });
            }
            
            if (word == "trampswallow") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster automatically swallows the targets of a successful trampling attack. Swallowed monsters are removed from the battlefield until the swallowing monster is killed."
                });
            }
            
            if (word == "transform") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements is transformed into another monster, negative numbers can be used for montags."
                });
            }
            
            if (word == "transformation") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is a possible target for the Transformation spell. Value can be -1 for a bad result 0 to disable and 1 for a good result."
                });
            }
            
            if (word == "triple3mon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The trinity god has 3 different monsters. The monsters must be created after one another and the first one should be used as the god. Only the first monster needs this command."
                });
            }
            
            if (word == "triplegod") {
                return new vscode.Hover({
                    language: "English",
                    value: "The pretender is a Trinity God. Splits god into three when game starts. The type value determines how the magic should be split between the 3 pretenders. Type, 1=full magic 2=split magic 3=reduced magic 4=like the grey one 5=like titan of the crossroads."
                });
            }
            
            if (word == "triplegodmag") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic penalty for trinity gods when they are not in the same province. The penalty is usually set to 2."
                });
            }
            
            if (word == "troglodyte") {
                return new vscode.Hover({
                    language: "English",
                    value: "Use this for humanoids without a head."
                });
            }
            
            if (word == "turmoilevents") {
                return new vscode.Hover({
                    language: "English",
                    value: "How turmoil affects the event frequency. Default is 2."
                });
            }
            
            if (word == "turmoilincome") {
                return new vscode.Hover({
                    language: "English",
                    value: "The effect turmoil and order has on income. Default is 3."
                });
            }
            
            if (word == "twiceborn") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will get this shape if it dies and rises again due to the twiceborn ritual.  8.13 Monster Summoning"
                });
            }
            
            if (word == "twohanded") {
                return new vscode.Hover({
                    language: "English",
                    value: "Makes the weapon a two-handed weapon. This means the weapon cannot be combined with a shield if you have only two arms. Two-handed weapons also receive increased bonus damage from strength."
                });
            }
            
            if (word == "type") {
                return new vscode.Hover({
                    language: "English",
                    value: "Defines whether the item is 1-handed or 2- handed weapon a shield a helmet a body armor a pair of boots or a miscellaneous item. See table Item types."
                });
            }
            
            if (word == "undcommand") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases undead leadership by this amount."
                });
            }
            
            if (word == "undead") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster is an undead."
                });
            }
            
            if (word == "undeadimmune") {
                return new vscode.Hover({
                    language: "English",
                    value: "Undead beings are immune to this weapon."
                });
            }
            
            if (word == "undeadonly") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon only affects undead."
                });
            }
            
            if (word == "undeadreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "All undead priests of this nation are able to reanimate the dead as if the had the #reanimpriest attribute."
                });
            }
            
            if (word == "undisciplined") {
                return new vscode.Hover({
                    language: "English",
                    value: "Undisciplined monsters cannot be given orders in battle. They can only deploy in the skirmish formation and will attack the enemy without regard for any battle plan."
                });
            }
            
            if (word == "undregen") {
                return new vscode.Hover({
                    language: "English",
                    value: "Works like regeneration but only affects undead beings."
                });
            }
            
            if (word == "unify") {
                return new vscode.Hover({
                    language: "English",
                    value: "Any one of the trinity gods can use the unify order to call the other parts of the trinity."
                });
            }
            
            if (word == "unique") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item can only be forged once making the item behave like an artifact without being construction level 8."
                });
            }
            
            if (word == "unit") {
                return new vscode.Hover({
                    language: "English",
                    value: "What type of monster the mercenaries are."
                });
            }
            
            if (word == "units") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives a squad of soldiers to the active commander."
                });
            }
            
            if (word == "unrepel") {
                return new vscode.Hover({
                    language: "English",
                    value: "Attacks with this weapon cannot be repelled."
                });
            }
            
            if (word == "unrest") {
                return new vscode.Hover({
                    language: "English",
                    value: " Sets the unrest level of the active province."
                });
            }
            
            if (word == "unresthalfinc") {
                return new vscode.Hover({
                    language: "English",
                    value: "The amount of unrest that cuts income in half. Default is 50."
                });
            }
            
            if (word == "unresthalfres") {
                return new vscode.Hover({
                    language: "English",
                    value: "The amount of unrest that cuts resources in half. Default is 100."
                });
            }
            
            if (word == "unsurr") {
                return new vscode.Hover({
                    language: "English",
                    value: "<0 - 1000>  A unit with Unsurroundable will receive a reduced harassment penalty from being attacked multiple times in a round."
                });
            }
            
            if (word == "unteleportable") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster cannot use Teleport Gateway or Astral Travel spells to move. It can still use Stygian Paths and Faery Trod."
                });
            }
            
            if (word == "userestricteditem") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster can use restricted items of the same value. Value can be 1-10000. See Item Modding for more information."
                });
            }
            
            if (word == "uwbug") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monsters with this tag are summoned by the Swarm spell underwater."
                });
            }
            
            if (word == "uwbuild") {
                return new vscode.Hover({
                    language: "English",
                    value: "Determines the ability of a land nation to build forts underwater. A value of 1 means yes."
                });
            }
            
            if (word == "uwcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable commanders in underwater forts for this land-based nation. This command can be repeated multiple time for many different commanders."
                });
            }
            
            if (word == "uwdamage") {
                return new vscode.Hover({
                    language: "English",
                    value: "This monster takes damage equal to the indicated percentage of its total hit points every turn it spends underwater (i.e. in a sea province). Vampires have #uwdamage 100 so they cannot go underwater at all."
                });
            }
            
            if (word == "uwfireshield") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like fireshield but works underwater too."
                });
            }
            
            if (word == "uwheat") {
                return new vscode.Hover({
                    language: "English",
                    value: "Like #heat but also works underwater."
                });
            }
            
            if (word == "uwnation") {
                return new vscode.Hover({
                    language: "English",
                    value: "Underwater nation. The nations capital is in a sea province."
                });
            }
            
            if (word == "uwok") {
                return new vscode.Hover({
                    language: "English",
                    value: "This ranged weapon can be used underwater and is not affected by storms."
                });
            }
            
            if (word == "uwrec") {
                return new vscode.Hover({
                    language: "English",
                    value: "Add a unit to the list of recruitable units in underwater forts for this land-based nation. This command can be repeated multiple time for many different units."
                });
            }
            
            if (word == "uwregen") {
                return new vscode.Hover({
                    language: "English",
                    value: "Works like regeneration but only works underwater."
                });
            }
            
            if (word == "uwwallcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets wall commander for underwater forts. Works just like the overwater counterpart."
                });
            }
            
            if (word == "uwwallmult") {
                return new vscode.Hover({
                    language: "English",
                    value: "Modifier for the number of units from the previous #uwwallunit command. Works just like the overwater counterpart."
                });
            }
            
            if (word == "uwwallunit") {
                return new vscode.Hover({
                    language: "English",
                    value: "Sets wall defenders for underwater forts. Works just like the overwater counterpart."
                });
            }
            
            if (word == "version") {
                return new vscode.Hover({
                    language: "English",
                    value: "The version number of your mod. E.g. 1.10 or 1.00."
                });
            }
            
            if (word == "victorycondition") {
                return new vscode.Hover({
                    language: "English",
                    value: " The game will end when one player fulfills a special condition"
                });
            }
            
            if (word == "victorypoints") {
                return new vscode.Hover({
                    language: "English",
                    value: " The player who has control over this province will control from one to seven victory points. If the province has a fort then the controller of the fort controls the victory points."
                });
            }
            
            if (word == "visitors") {
                return new vscode.Hover({
                    language: "English",
                    value: "The province is attacked by Bogus the Troll and his Companions."
                });
            }
            
            if (word == "voidgate") {
                return new vscode.Hover({
                    language: "English",
                    value: "A mage with the same path as the site may enter to summon Void creatures. Void Summoning skill increases the success chance. A mage who does not have the Voidsanity attribute may become insane or feebleminded."
                });
            }
            
            if (word == "voidret") {
                return new vscode.Hover({
                    language: "English",
                    value: "Extra chance per month of returning from the Void the plane between worlds and the home of horrors and the Void beings of Rlyeh."
                });
            }
            
            if (word == "voidsanity") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants a voidsanity bonus."
                });
            }
            
            if (word == "walkable") {
                return new vscode.Hover({
                    language: "English",
                    value: "1 = ritual range must trace along a walkable path 0 = ritual range need not be walkable (default)"
                });
            }
            
            if (word == "wallcom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Commander that is in charge of the wall defenders. There can be multiple of these commands."
                });
            }
            
            if (word == "wallmult") {
                return new vscode.Hover({
                    language: "English",
                    value: "Modifier for the number of units from the previous #wallunit command. 10 is the standard amount."
                });
            }
            
            if (word == "wallunit") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unit type the will man the walls when the castle is stormed. There can be multiple of these commands each one should be followed by a #wallmult command."
                });
            }
            
            if (word == "warning") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the amount of bodyguards the commander can have."
                });
            }
            
            if (word == "wastecom") {
                return new vscode.Hover({
                    language: "English",
                    value: "This commander can be recruited in wasteland provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "wasterec") {
                return new vscode.Hover({
                    language: "English",
                    value: "This unit can be recruited in wasteland provinces with or without fort. See the box below for all command names."
                });
            }
            
            if (word == "wastesurvival") {
                return new vscode.Hover({
                    language: "English",
                    value: "Monster has the Waste Survival skill. Waste terrain does not hinder movement."
                });
            }
            
            if (word == "waterattuned") {
                return new vscode.Hover({
                    language: "English",
                    value: "Chance of getting a bonus level of magic when transformed into this being.  In place of [path] insert the name of the magic path in all lower case for the correct command (#fireattuned #airattuned etc)."
                });
            }
            
            if (word == "waterblessbonus") {
                return new vscode.Hover({
                    language: "English",
                    value: "Gods of this nation will get extra bless design points of this type."
                });
            }
            
            if (word == "waterboost") {
                return new vscode.Hover({
                    language: "English",
                    value: "One commander determined by target requirements or the monster number may gain +1 Water magic."
                });
            }
            
            if (word == "waterbreathing") {
                return new vscode.Hover({
                    language: "English",
                    value: "The item grants water breathing to its bearer."
                });
            }
            
            if (word == "waterrange") {
                return new vscode.Hover({
                    language: "English",
                    value: "All Water rituals cast in this province have their range increased by"
                });
            }
            
            if (word == "watershape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster changes to this shape when moving from a land province to a water province."
                });
            }
            
            if (word == "weapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "Defines what kind of a weapon if any the unit gets when it uses the item. Works on misc item boots shield 2-h weapon 1-h weapon. Does not work for helmets or armor. Use #weapon 0 to clear an existing weapon from a copied item."
                });
            }
            
            if (word == "wightreanim") {
                return new vscode.Hover({
                    language: "English",
                    value: "Reanimating priests with holy magic of level 4 or higher can reanimate undead Lictors. Ashen Empire Ermor has this attribute."
                });
            }
            
            if (word == "wild") {
                return new vscode.Hover({
                    language: "English",
                    value: "The throne is wild and is likely to be defended by wild monsters."
                });
            }
            
            if (word == "winterpower") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster has increased hit points in winter and lowered hit points in summer."
                });
            }
            
            if (word == "wintershape") {
                return new vscode.Hover({
                    language: "English",
                    value: "Changes into another monster when this season is active."
                });
            }
            
            if (word == "wolftattoo") {
                return new vscode.Hover({
                    language: "English",
                    value: "Magic tattoo like the units of Marverni and Sauromatia have."
                });
            }
            
            if (word == "woodenarmor") {
                return new vscode.Hover({
                    language: "English",
                    value: "Indicates that the armor is made of wood."
                });
            }
            
            if (word == "woodenweapon") {
                return new vscode.Hover({
                    language: "English",
                    value: "The weapon is made of wood."
                });
            }
            
            if (word == "worldage") {
                return new vscode.Hover({
                    language: "English",
                    value: "Everyone in the world ages this many years. Negative numbers reduce age."
                });
            }
            
            if (word == "worldcurse") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every unit in the world has a  chance of being cursed."
                });
            }
            
            if (word == "worlddarkness") {
                return new vscode.Hover({
                    language: "English",
                    value: "The entire world is covered in darkness for this turn."
                });
            }
            
            if (word == "worlddecscale") {
                return new vscode.Hover({
                    language: "English",
                    value: "Decreases the specified scale in every province in the world by one step."
                });
            }
            
            if (word == "worlddecscale2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Decreases the specified scale in every province in the world by two steps."
                });
            }
            
            if (word == "worlddecscale3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Decreases the specified scale in every province in the world by three steps."
                });
            }
            
            if (word == "worlddisease") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every unit in the world has a  chance of becoming diseased."
                });
            }
            
            if (word == "worldheal") {
                return new vscode.Hover({
                    language: "English",
                    value: "Each unit in the world has a  chance of having one affliction healed."
                });
            }
            
            if (word == "worldincdom") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases dominion in every province in the world by  candles."
                });
            }
            
            if (word == "worldincscale") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the specified scale in every province in the world by one step."
                });
            }
            
            if (word == "worldincscale2") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the specified scale in every province in the world by two steps."
                });
            }
            
            if (word == "worldincscale3") {
                return new vscode.Hover({
                    language: "English",
                    value: "Increases the specified scale in every province in the world by three steps."
                });
            }
            
            if (word == "worldmark") {
                return new vscode.Hover({
                    language: "English",
                    value: "Every unit in the world has a  chance of being horrormarked."
                });
            }
            
            if (word == "worldritrebate") {
                return new vscode.Hover({
                    language: "English",
                    value: "The casting cost of rituals of this school is reduced by 20% for this turn. School numbers are listed in the table below. Worldritrebate can only be used on normal global events (rarity 11 and 12)."
                });
            }
            
            if (word == "worldunrest") {
                return new vscode.Hover({
                    language: "English",
                    value: "Unrest in every province in the world is increased by . Can be negative to reduce unrest."
                });
            }
            
            if (word == "woundfend") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster is less likely to suffer an affliction when taking damage. A value of 1 makes it half as likely a value of 2 makes it one third as likely etc. Air Elementals and similar have a value of 99 making it almost impossible to get an affliction."
                });
            }
            
            if (word == "xp") {
                return new vscode.Hover({
                    language: "English",
                    value: " Gives experience points to the active commander."
                });
            }
            
            if (word == "xploss") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster loses 0-100% of xp when changing shape (e.g. when losing its rider)."
                });
            }
            
            if (word == "xpshape") {
                return new vscode.Hover({
                    language: "English",
                    value: "The monster will change into the next monster type (next monster number) after reaching this amount of xp."
                });
            }
            
            if (word == "yearaging") {
                return new vscode.Hover({
                    language: "English",
                    value: "The wielder of this item will age this many extra years each year."
                });
            }
            
            if (word == "yearturn") {
                return new vscode.Hover({
                    language: "English",
                    value: "Power of the Turning Year. This unit is more powerful during the height of each season and will get increased Strength Attack and Defence during those months."
                });
            }
            


            
        }
    });
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}