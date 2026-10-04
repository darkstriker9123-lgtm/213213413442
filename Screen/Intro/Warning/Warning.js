"use strict";

/**
 * Loads the Warning screen
 * @returns {void} - Nothing
 */
function WarningLoad() {
	CommonBackground = "Intro";
}

/**
 * Runs & draws the Warning screen
 * @returns {void} - Nothing
 */
function WarningRun() {
	for (let L = 0; L <= 10; L++)
		DrawTextFit(TextGet("Line" + L.toString()), 1000, 130 + L * 60, 1940, "White", "Black");
	DrawButton(650, 840, 300, 60, TextGet("Refuse"), "White", "");
	DrawButton(1050, 840, 300, 60, TextGet("Agree"), "White", "");
}

/**
 * Handles click events in the Warning screen
 * @returns {void} - Nothing
 */
function WarningClick() {
	if (MouseIn(650, 840, 300, 60)) window.location = 'https://spork.org/';
	if (MouseIn(1050, 840, 300, 60)) CommonSetScreen("Intro", "Start");
}
