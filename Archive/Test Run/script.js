async function getSheetData(cellRange){ try{
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1LcLawIQ8Fg-p2LyErc3qZaKSPL1xC26IJ73LUhLfMgI/values/${cellRange}?key=AIzaSyAI0onZCCrXdpxMu9jiVgvRwIRcf5aCco4');
        const data = await response.json();
        if(data.values && data.values.length > 0)
            return data.values[0][0];
        else
            throw new Error('No data found.');
    } catch(error){
        console.error('Error fetching data:', error);
        return 'Error loading data.';
}   }

async function displaySheetData(cellRange, elementId){
    const cellValue = await getSheetData(cellRange);
    document.getElementById(elementId).textContent = cellValue;
}