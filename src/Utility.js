export function storeInLS(key, value) {
    if (typeof (value) === 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
};

export function getFromLS(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}


// exporting an array -> refer this -> https://stackoverflow.com/questions/54532123/export-array-to-be-used-in-another-javascript-file
export const battingHeader = ['M', 'Inn', 'NO', 'Runs', 'HS', 'Avg', 'BF', 'SR', '100s', '200s', '50s', '4s', '6s'];

export const bowlingHeader = ['M', 'Inn', 'B', 'Runs', 'Wkts', 'BBI', 'BBM', 'Econ', 'Avg', 'SR', '5W', '10W'];

export const sortByDate = arr => {
    //comparator to sort by date
    const sorter = (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    arr.sort(sorter);

    return arr;
};


export const countPrefixObj = {
    1: "st",
    2: "nd",
    3: "rd",
    rest: 'th'
}