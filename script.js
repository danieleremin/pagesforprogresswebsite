let sheetDataCache = {};

async function fetchEntireSheet(sheetName) {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1DfMX-TuX8fgsHcBSlhRKNAgSGzxMMyFZGLwAdFHH8yM/values/${sheetName}?key=AIzaSyDEk0NnhmepHPJKwBiFJ-E1ynznV1I3RW8`);
        const data = await response.json();

        if (data.values && data.values.length > 0) {
            // Store data in a global cache
            sheetDataCache[sheetName] = data.values;
        } else {
            throw new Error('No data found.');
        }
    } catch (error) {
        console.error('Error fetching entire sheet:', error);
    }
}

function getCachedSheetData(sheetName, cellRange) {
    const rangeMatch = cellRange.match(/^([A-Z]+)([0-9]+)$/);
    if (!rangeMatch) {
        throw new Error('Invalid cell range format.');
    }

    const col = rangeMatch[1];
    const row = parseInt(rangeMatch[2], 10);

    const colIndex = col.charCodeAt(0) - 'A'.charCodeAt(0);
    const rowIndex = row - 1;

    if (sheetDataCache[sheetName] && sheetDataCache[sheetName][rowIndex]) {
        return sheetDataCache[sheetName][rowIndex][colIndex];
    } else {
        throw new Error('Data not found in cache.');
    }
}

async function displaySheetData(sheetName, cellRange, elementId) {
    try {
        const cellValue = getCachedSheetData(sheetName, cellRange);
        const element = document.getElementById(elementId);
        if (element) {
            if (cellValue.slice(-4) == ".png" || cellValue.slice(-4) == ".jpg" || cellValue.slice(-5) == ".jpeg") {
                element.src = cellValue;
            } else {
                element.innerHTML = cellValue.replace(/\n/g, '<br>');
            }
        } else {
            console.error(`Element with id ${elementId} not found.`);
        }
    } catch (error) {
        console.error('Error displaying data:', error);
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = 'Error loading data.';
        }
    }
}
