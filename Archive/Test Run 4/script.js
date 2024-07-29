async function getSheetData(cellRange) {
    try {
        // Ensure the URL is correctly formatted
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1LcLawIQ8Fg-p2LyErc3qZaKSPL1xC26IJ73LUhLfMgI/values/${cellRange}?key=AIzaSyBw_tO848SgZDJeoZwGr10lUb5w3ks0H4U`);
        const data = await response.json();
        
        // Check if data exists and is valid
        if (data.values && data.values.length > 0 && data.values[0].length > 0) {
            return data.values[0][0];
        } else {
            throw new Error('No data found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error loading data.';
    }
}

async function displaySheetData(cellRange, elementId) {
    const cellValue = await getSheetData(cellRange);
    const element = document.getElementById(elementId);
    if (element) {
        if (cellValue.slice(-4) == ".png" || cellValue.slice(-4) == ".jpg" || cellValue.slice(-5) == ".jpeg")
            element.src = cellValue;
        else
            element.innerHTML = cellValue.replace(/\n/g, '<br>');
    } else {
        console.error(`Element with id ${elementId} not found.`);
    }
}