import CommonUtility from './CommonUtility.json';
import axios from 'axios';
import { sortByDate } from './Utility';

export function fetchSeriesMatches(id) {

    const reqApi = `https://api.cricapi.com/v1/series_info?apikey=${CommonUtility.CRIC_API_KEY_1}&id=${id}`

    axios.get(reqApi)
        .then(response => {
            const dataObj = response.data;
            //API failure
            if (dataObj.status != 'success') {
                alert('Failed to load the data');
                return;
            }
            return dataObj.data;
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
}


export function fetchMatchInfo(id) {

    const reqApi = `https://api.cricapi.com/v1/match_info?apikey=${CommonUtility.CRIC_API_KEY_1}&id=${id}`

    axios.get(reqApi)
        .then(response => {
            const dataObj = response.data;
            //API failure
            if (dataObj.status != 'success') {
                return null;
            }

            return dataObj.data;
        })
        .catch(error => {
            // Handle error
            return null;
        });
}