import React, { useEffect, useState } from 'react';
import CommonUtility from '../CommonUtility.json';
import axios from 'axios';
import { sortByDate, storeInLS, getFromLS } from '../Utility';
import MatchCard from './MatchCard';


// TODO : first learn async await and promise as it going to be use here

function SeriesMatches({
    id
}) {

    const [seriesMatchList, setSeriesMatchList] = useState(null);
    const [showSeries, setShowSeries] = useState(true);

    const getEachMatchInfo = async (id) => {

        //remove this once development is done
        const lsKey = `seriesMatches:${id}`;
        const seriesDetailsFromLs = getFromLS(lsKey);
        if (seriesDetailsFromLs) {
            setSeriesMatchList(seriesDetailsFromLs);
            return;
        }

        const seriesReqApi = `https://api.cricapi.com/v1/series_info?apikey=${CommonUtility.CRIC_API_KEY_1}&id=${id}`;

        var seriesInfoRes = await axios.get(seriesReqApi);
        var seriesData;
        if (seriesInfoRes.data.status === "success") {
            seriesData = seriesInfoRes.data.data;
        } else {
            return;
        }

        const seriesInfo = seriesData['info'];
        const seriesMatchList = seriesData['matchList'];
        const sortedMatchList = sortByDate(seriesMatchList);

        var finalObj = {};
        finalObj['series_info'] = seriesInfo;
        finalObj['series_matches'] = sortedMatchList;

        var overallMatchs = [];

        // Refer this -> more detail -> https://www.freecodecamp.org/news/javascript-async-and-await-in-loops-30ecc5fb3939/
        for (let match = 0; match < sortedMatchList.length; match++) {
            const element = sortedMatchList[match];
            if (element['status'] === "Match not started") {
                break;
            }
            const matchReqApi = `https://api.cricapi.com/v1/match_scorecard?apikey=${CommonUtility.CRIC_API_KEY_1}&id=${element.id}`

            const matchInfo = await axios.get(matchReqApi);
            if (matchInfo.data.status === "success") {
                overallMatchs.push(matchInfo.data.data);
            } else {
                overallMatchs.push(null);
            }
        }

        finalObj['series_done_matches'] = overallMatchs;

        storeInLS(lsKey, finalObj);

        setSeriesMatchList(finalObj);
    };

    useEffect(() => {
        getEachMatchInfo(id);
    }, [])

    return (
        <>
            {
                seriesMatchList && (
                    showSeries ? (
                        <MatchCard
                            matches={seriesMatchList['series_matches']}
                            matches_done={seriesMatchList['series_done_matches']}
                        />
                    ) : (
                        <div></div>
                    )
                )
            }
        </>
    )
}

export default SeriesMatches
