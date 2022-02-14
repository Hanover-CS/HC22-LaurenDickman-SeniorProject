import { fetchDataFromAPI, clickOnDropDownMenu, getNames, createListOfProficiencyOptions, getArrayOfIndexs, getInfoNames,
    getArrayNumberChooses, clearAllFromList} from './help.js';
import {proficiencyAsk, skillChoice} from './skill_code.js';
import {spellsAsk, spellCastingAsk} from './spell_code.js';

const api_classes = 'https://www.dnd5eapi.co/api/classes/';

let option3_skillList = document.getElementById("skillOptions3");
let page_6_Display = document.getElementById('page_6_button');
let tabsList = document.getElementsByClassName('tab');
let userHitDie =  document.getElementById('char_die_hit');
let userEquiment = document.getElementById('char_equiment');
let userSpellCasterClass = document.getElementById('char_casting');
let spell_list = document.getElementById("spellList");
let spellCasting_list = document.getElementById("extra_spells");
let weapon_list = document.getElementById("weaponList");
let armor_list = document.getElementById("armorList");
let shield_list = document.getElementById("shieldList");
let kit_list = document.getElementById("kitList");
let skill_list_1 = document.getElementById("skillList");
let skill_list_2 = document.getElementById("skill2List");
let skill_list_3 = document.getElementById("skill3List");
let className = document.getElementById("class_name");
let userClassName = document.getElementById("char_class");
let die = document.getElementById('hit');
let throwHits = document.getElementById('throws');
let userSavingThrows = document.getElementById('char_saving_throws');

let wantedEquiment = document.getElementById("preffer_equiment")
let casting = document.getElementById('spellscasting');
let otherClasses = document.getElementById("subclasses");
let skillsNum = document.getElementById("skills");

export async function setupPage2() {
    classChoice();
}

function classChoice() {
    let ul = document.getElementById('classList');
    let button = document.getElementById('class_option');
    clickOnDropDownMenu(ul, classAsk, button);
}

async function classAsk(input) {
    let url = api_classes + input;
    const data = await fetchDataFromAPI(url);
    printClassData(data);
    // spellsAsk(input);
    // spellCastingAsk(input);
    proficiencyAsk(input);
    skillChoice();
}


async function printClassData(data) {
    clearAllInfomormation();
    const { index, name, hit_die, proficiency_choices, proficiencies, saving_throws, subclasses, spellcasting } = data;

    let array_skills = gettingNamesFromProficiency(proficiency_choices);
    let array_Skill_Names = gettingNamesOfTheSkills(array_skills);

    await createListOfProficiencyOptions(array_Skill_Names, skill_list_1);
    await createListOfProficiencyOptions(array_Skill_Names, skill_list_2);
    await createListOfProficiencyOptions(array_Skill_Names, skill_list_3);

    showSpellTab(spellcasting, name, index);
    className.textContent = name;
    userClassName.textContent = name;
    die.textContent = hit_die;
    userHitDie.textContent = "1d"+ hit_die;
    throwHits.textContent = getNames(saving_throws);
    userSavingThrows.textContent = getNames(saving_throws);

    showingTheExtraSkillButton(proficiency_choices);
    wantedEquiment.textContent = getNames(proficiencies);
    userEquiment.textContent = getNames(proficiencies);
    casting.textContent = getInfoNames(spellcasting);
    otherClasses.textContent = getNames(subclasses);
}

function clearAllInfomormation() {
    clearAllFromList(spell_list);
    clearAllFromList(spellCasting_list);
    clearAllFromList(weapon_list);
    clearAllFromList(armor_list);
    clearAllFromList(shield_list);
    clearAllFromList(kit_list);
    clearAllFromList(skill_list_1);
    clearAllFromList(skill_list_2);
    clearAllFromList(skill_list_3);
}

function gettingNamesOfTheSkills(array_skills) {
    let array_Skill_Names = new Array;
    for (let i = 0; i < array_skills.length; i++) {
        array_Skill_Names.push(getArrayOfIndexs(array_skills[i]));
    }
    return array_Skill_Names;
}

function showingTheExtraSkillButton(proficiency_choices) {
    let arrSkillNumber = getArrayNumberChooses(proficiency_choices);
    skillsNum.textContent = arrSkillNumber[0];
    if (arrSkillNumber[0] == 3) {
        option3_skillList.style.visibility = 'visible';
    }
}

function gettingNamesFromProficiency(proficiency_choices) {
    let array = proficiency_choices.map(function (el) {
        return el.from;
    });
    return array
}

function showSpellTab(spells, name, index){
    if (spells != undefined) {
        userSpellCasterClass.textContent = name;
        spellsAsk(index);
        spellCastingAsk(index);
        page_6_Display.tabIndex = "6";
        page_6_Display.style.visibility = 'visible';
    } else {
        page_6_Display.tabIndex = "0";
        page_6_Display.style.visibility = 'hidden';
    }
}