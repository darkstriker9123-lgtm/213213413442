"use strict";
var TranslationLanguage = "EN";
/** @type {Record<string, string[]>} */
var TranslationCache = {};

/**
 * Dictionary for all supported languages and their files
 * @constant
 */
var TranslationDictionary = [

	{
		LanguageCode: "EN",
		LanguageName: "English",
		EnglishName: "English",
		Files: [
		]
	},
/*	{
		LanguageCode: "DE",
		LanguageName: "Deutsch",
		EnglishName: "German",
		Files: [
		]
	},*/
	{
		LanguageCode: "FR",
		LanguageName: "Français",
		EnglishName: "French",
		Files: [
			"Screen/Character/Create/Translation_Create_FR.txt",
			"Screen/Character/Inventory/Translation_Inventory_FR.txt",
			"Screen/Character/Picture/Translation_Picture_FR.txt",
			"Screen/Character/Profile/Translation_Profile_FR.txt",
			"Screen/Character/SaveGame/Translation_SaveGame_FR.txt",
			"Screen/Class/BossOffice/Translation_BossOffice_FR.txt",
			"Screen/Class/Detention/Translation_Detention_FR.txt",
			"Screen/Class/DetentionEnd/Translation_DetentionEnd_FR.txt",
			"Screen/Home/BossHouse/Translation_BossHouse_FR.txt",
			"Screen/Home/HomeBedroom/Translation_HomeBedroom_FR.txt",
			"Screen/Home/HomeBedroomEnd/Translation_HomeBedroomEnd_FR.txt",
			"Screen/Intro/FirstBossMeeting/Translation_FirstBossMeeting_FR.txt",
			"Screen/Intro/IntroBedroom/Translation_IntroBedroom_FR.txt",
			"Screen/Intro/IntroBedroomEnd/Translation_IntroBedroomEnd_FR.txt",
			"Screen/Intro/Start/Translation_Start_FR.txt",
			"Screen/Intro/Warning/Translation_Warning_FR.txt",
			"Screen/MiniGame/FreeBondage/Translation_FreeBondage_FR.txt",
			"Screen/MiniGame/Translation_MiniGame_FR.txt",
			"Screen/Outro/Epilogue/Translation_Epilogue_FR.txt",
		]
	},
/*	{
		LanguageCode: "RU",
		LanguageName: "Русский",
		EnglishName: "Russian",
		Files: [
		]
	},*/
	{
		LanguageCode: "CN",
		LanguageName: "中文",
		EnglishName: "Chinese",
		Files: [
			"Screen/Character/Create/Translation_Create_CN.txt",
			"Screen/Character/Inventory/Translation_Inventory_CN.txt",
			"Screen/Character/Picture/Translation_Picture_CN.txt",
			"Screen/Character/Profile/Translation_Profile_CN.txt",
			"Screen/Character/SaveGame/Translation_SaveGame_CN.txt",
			"Screen/Class/BossOffice/Translation_BossOffice_CN.txt",
			"Screen/Class/Detention/Translation_Detention_CN.txt",
			"Screen/Class/DetentionEnd/Translation_DetentionEnd_CN.txt",
			"Screen/Home/BossHouse/Translation_BossHouse_CN.txt",
			"Screen/Home/HomeBedroom/Translation_HomeBedroom_CN.txt",
			"Screen/Home/HomeBedroomEnd/Translation_HomeBedroomEnd_CN.txt",
			"Screen/Intro/FirstBossMeeting/Translation_FirstBossMeeting_CN.txt",
			"Screen/Intro/IntroBedroom/Translation_IntroBedroom_CN.txt",
			"Screen/Intro/IntroBedroomEnd/Translation_IntroBedroomEnd_CN.txt",
			"Screen/Intro/Start/Translation_Start_CN.txt",
			"Screen/Intro/Warning/Translation_Warning_CN.txt",
			"Screen/MiniGame/FreeBondage/Translation_FreeBondage_CN.txt",
			"Screen/MiniGame/Translation_MiniGame_CN.txt",
			"Screen/Outro/Epilogue/Translation_Epilogue_CN.txt",
		]
	},
	{
		LanguageCode: "ES",
		LanguageName: "Español",
		EnglishName: "Spanish",
		Files: [
			"Screen/Character/Create/Translation_Create_ES.txt",
			"Screen/Character/Inventory/Translation_Inventory_ES.txt",
			"Screen/Character/Picture/Translation_Picture_ES.txt",
			"Screen/Character/Profile/Translation_Profile_ES.txt",
			"Screen/Character/SaveGame/Translation_SaveGame_ES.txt",
			//"Screen/Class/BossOffice/Translation_BossOffice_FR.txt",
			//"Screen/Class/Detention/Translation_Detention_FR.txt",
			//"Screen/Class/DetentionEnd/Translation_DetentionEnd_FR.txt",
			//"Screen/Home/BossHouse/Translation_BossHouse_FR.txt",
			//"Screen/Home/HomeBedroom/Translation_HomeBedroom_FR.txt",
			//"Screen/Home/HomeBedroomEnd/Translation_HomeBedroomEnd_FR.txt",
			"Screen/Intro/FirstBossMeeting/Translation_FirstBossMeeting_ES.txt",
			"Screen/Intro/IntroBedroom/Translation_IntroBedroom_ES.txt",
			"Screen/Intro/IntroBedroomEnd/Translation_IntroBedroomEnd_ES.txt",
			"Screen/Intro/Start/Translation_Start_ES.txt",
			"Screen/Intro/Warning/Translation_Warning_ES.txt",
			//"Screen/MiniGame/FreeBondage/Translation_FreeBondage_FR.txt",
			//"Screen/MiniGame/Translation_MiniGame_FR.txt",
			//"Screen/Outro/Epilogue/Translation_Epilogue_FR.txt",
		]
	},	
/*	{
		LanguageCode: "TW",
		LanguageName: "繁體中文",
		EnglishName: "TraditionalChinese",
		Files: [
		]
	},
	{
		LanguageCode: "UA",
		LanguageName: "Українська",
		EnglishName: "Ukrainian",
		Files: [
		]
	},*/
];

/**
 * Checks whether we're running a translation
 */
function TranslationEnabled() {
	return (TranslationLanguage != null) && (TranslationLanguage.trim() != "") && (TranslationLanguage.trim().toUpperCase() != "EN");
}

/**
 * Checks if a file can be translated in the selected language
 * @param {string} FullPath - Full path of the file to check for a corresponding translation file
 * @returns {boolean} - Returns TRUE if a translation is available for the given file
 */
function TranslationAvailable(FullPath) {
	var FileName = FullPath.trim().toUpperCase();
	for (let L = 0; L < TranslationDictionary.length; L++)
		if (TranslationDictionary[L].LanguageCode == TranslationLanguage)
			for (let F = 0; F < TranslationDictionary[L].Files.length; F++)
				if (TranslationDictionary[L].Files[F].trim().toUpperCase() == FileName)
					return true;
	return false;
}

/**
 * Parse a TXT translation file and returns it as an array
 * @param {string} str - Content of the translation text file
 * @returns {string[]} - Array of strings with each line divided. For each translated line, the english string precedes the translated one in the array.
 */
function TranslationParseTXT(str) {

	const arr = [];
	let c;
	str = str.replace(/\r\n/g, '\n').trim();

	// iterate over each character, keep track of current row (of the returned array)
	for (let row = c = 0; c < str.length; c++) {
		let cc = str[c];        // current character, next character
		arr[row] = arr[row] || "";             // create a new row if necessary
		if (cc == '\n') { ++row; continue; }   // If it's a newline, move on to the next row
		arr[row] += cc;                        // Otherwise, append the current character to the row
	}

	// Removes any comment rows (starts with ###)
	for (let row = arr.length - 1; row >= 0; row--)
		if (arr[row].indexOf("###") == 0) {
			arr.splice(row, 1);
		}

	// Trims the full translated array
	for (let row = 0; row < arr.length; row++)
		arr[row] = arr[row].trim();
	return arr;
}

/**
 * Translates a string to another language from the array, the translation is always the one right after the english line
 * @param {string} S - The original english string to translate
 * @param {readonly string[]} T - The active translation dictionary
 * @returns {string} - The translated string
 */
function TranslationString(S, T) {
	if(S && S.trim()){
		S = S.trim();
		let r = T.findIndex(_=>_===S);
		if(r >= 0) return T[r+1];
	}
	return S;
}

/**
 * Translates a character dialog from the specified array
 * @param {Character} C - The character for which we need to translate the dialog array.
 * @param {readonly string[]} T - The active translation dictionary
 * @returns {void} - Nothing
 */
function TranslationDialogArray(C, T) {
	for (let D = 0; D < C.Dialog.length; D++) {
		C.Dialog[D].Option = TranslationString(C.Dialog[D].Option, T);
		C.Dialog[D].Result = TranslationString(C.Dialog[D].Result, T);
	}
}

/**
 * Translates the current dialog
 * @param {readonly string[]} T - The active translation dictionary
 * @returns {void} - Nothing
 */
function TranslationDialogRun(T) {
	if (T == null) return;
	for (let D of DialogCurrent) {
        if ((D.Option != null) && (D.Option != "")) {
            D.Option = TranslationString(D.Option, T);
            D.Option = D.Option.replaceAll("PlayerName", Character[0].DisplayName);
        }
        if ((D.Text != null) && (D.Text != "")) {
            D.Text = TranslationString(D.Text, T);
            D.Text = D.Text.replaceAll("PlayerName", Character[0].DisplayName);
        }
	}		
}

/**
 * When no translation is available, replace the player name manually in the English strings
 * @returns {void} - Nothing
 */
function TranslationFixPlayerName() {
	for (let Line of DialogCurrent) {
		Line.Option = Line.Option.replaceAll("PlayerName", Character[0].DisplayName);
		Line.Text = Line.Text.replaceAll("PlayerName", Character[0].DisplayName);
	}	
}

/**
 * Prpares to translate the current dialog
 * @returns {void} - Nothing
 */
function TranslationDialogPrepare() {

	// Only translate if we play in a foreign language
	if (!TranslationEnabled()) {
		TranslationFixPlayerName();
		return;
	}

	// If the translation is available, we open the txt file, parse it and returns the result to build the dialog
	var FullPath = "Screen/" + CommonModule + "/" + CommonScreen + "/Translation_" + CommonScreen + "_" + TranslationLanguage + ".txt";
	if (TranslationAvailable(FullPath)) {

		// If the translation data is already cached, we run it right away
		if (TranslationCache[FullPath]) {
			TranslationDialogRun(TranslationCache[FullPath]);
			return;
		}

		// Gets the translation data before running it
		CommonGet(FullPath, function() {
			if (this.status == 200) {
				TranslationCache[FullPath] = TranslationParseTXT(this.responseText);
				TranslationDialogRun(TranslationCache[FullPath]);
			}
		});

	} else {

		// Since no translation is available, replace the player name manually in the English strings
		TranslationFixPlayerName();

	}
}

/**
 * Translates the current free bondage mini game dialog
 * @param {readonly string[]} T - The active translation dictionary
 * @returns {void} - Nothing
 */
function TranslationMiniGameFreeBondageRun(T) {
	if (T == null) return;
	for (let D of MiniGameFreeBondageMenu) {
        if ((D.Text != null) && (D.Text != "")) {
            D.Text = TranslationString(D.Text, T);
            D.Text = D.Text.replaceAll("PlayerName", Character[0].DisplayName);
        }
        if ((D.Dialog != null) && (D.Dialog != "")) {
            D.Dialog = TranslationString(D.Dialog, T);
            D.Dialog = D.Dialog.replaceAll("PlayerName", Character[0].DisplayName);
        }
	}
	for (let D of MiniGameFreeBondageZone) {
        if ((D.Dialog != null) && (D.Dialog != "")) {
            D.Dialog = TranslationString(D.Dialog, T);
            D.Dialog = D.Dialog.replaceAll("PlayerName", Character[0].DisplayName);
        }
	}
	for (let D of MiniGameFreeBondageStressZone) {
        if ((D.Dialog != null) && (D.Dialog != "")) {
            D.Dialog = TranslationString(D.Dialog, T);
            D.Dialog = D.Dialog.replaceAll("PlayerName", Character[0].DisplayName);
        }
	}
	for (let D of MiniGameFreeBondageArousalZone) {
        if ((D.Dialog != null) && (D.Dialog != "")) {
            D.Dialog = TranslationString(D.Dialog, T);
            D.Dialog = D.Dialog.replaceAll("PlayerName", Character[0].DisplayName);
        }
	}	
}

/**
 * Prpares to translate the free bondage mini game
 * @returns {void} - Nothing
 */
function TranslationMiniGameFreeBondagePrepare() {

	// Only translate if we play in a foreign language
	if (!TranslationEnabled()) return;

	// If the translation is available, we open the txt file, parse it and returns the result to build the dialog
	var FullPath = "Screen/MiniGame/FreeBondage/Translation_FreeBondage_" + TranslationLanguage + ".txt";
	if (TranslationAvailable(FullPath)) {

		// If the translation data is already cached, we run it right away
		if (TranslationCache[FullPath]) {
			TranslationMiniGameFreeBondageRun(TranslationCache[FullPath]);
			return;
		}

		// Gets the translation data before running it
		CommonGet(FullPath, function() {
			if (this.status == 200) {
				TranslationCache[FullPath] = TranslationParseTXT(this.responseText);
				TranslationMiniGameFreeBondageRun(TranslationCache[FullPath]);
			}
		});

	}

}

/**
 * Translates the current free bondage mini game dialog
 * @param {readonly string[]} T - The active translation dictionary
 * @returns {void} - Nothing
 */
function TranslationMiniGameRun(T) {
	if (T == null) return;
	for (let D of MiniGameText) {
        if ((D.Text != null) && (D.Text != "")) {
            D.Text = TranslationString(D.Text, T);
            D.Text = D.Text.replaceAll("PlayerName", Character[0].DisplayName);
        }
	}
}

/**
 * Prpares to translate the free bondage mini game
 * @returns {void} - Nothing
 */
function TranslationMiniGamePrepare() {

	// Only translate if we play in a foreign language
	if (!TranslationEnabled()) return;

	// If the translation is available, we open the txt file, parse it and returns the result to build the dialog
	var FullPath = "Screen/MiniGame/Translation_MiniGame_" + TranslationLanguage + ".txt";
	if (TranslationAvailable(FullPath)) {

		// If the translation data is already cached, we run it right away
		if (TranslationCache[FullPath]) {
			TranslationMiniGameRun(TranslationCache[FullPath]);
			return;
		}

		// Gets the translation data before running it
		CommonGet(FullPath, function() {
			if (this.status == 200) {
				TranslationCache[FullPath] = TranslationParseTXT(this.responseText);
				TranslationMiniGameRun(TranslationCache[FullPath]);
			}
		});

	}

}

/**
 * Loads the previous translation language from local storage if it exists
 * @returns {void} - Nothing
 */
function TranslationLoad() {
	var L = localStorage.getItem("BondageTeacherLanguage");
	if (L != null) TranslationLanguage = L;
}
