export function storeInLS(key, value) {
    if (typeof (value) === 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
};


// exporting an array -> refer this -> https://stackoverflow.com/questions/54532123/export-array-to-be-used-in-another-javascript-file
export const battingHeader = ['M', 'Inn', 'NO', 'Runs', 'HS', 'Avg', 'BF', 'SR', '100s', '200s', '50s', '4s', '6s'];

export const bowlingHeader = ['M', 'Inn', 'B', 'Runs', 'Wkts', 'BBI', 'BBM', 'Econ', 'Avg', 'SR', '5W', '10W'];