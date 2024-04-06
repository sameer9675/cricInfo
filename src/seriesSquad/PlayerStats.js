import React from 'react';
import { battingHeader, bowlingHeader } from '../Utility';
import './team.css'

function getHeader(type) {
    var headerArr;
    if (type === 'batting') {
        headerArr = battingHeader;
    } else {
        headerArr = bowlingHeader;
    }

    return (
        <thead>
            <tr>
                <th></th>
                {
                    headerArr.map((col) => (
                        <th key={col} >{col}</th>
                    ))
                }
            </tr>
        </thead>
    );
}

function getBodyData(type, stats) {
    var body = {}
    stats.forEach(element => {
        if (element.fn === type) {
            const { matchtype, stat, value } = element;
            if (body[matchtype]) {
                body[matchtype][stat] = value;
            } else {
                body[matchtype] = {};
                body[matchtype][stat] = value;
            }
        }
    });

    return body;

}

function getTableRow(matchStatPair, matchType, type) {
    var statArr;
    if (type === 'batting') {
        statArr = battingHeader;
    } else {
        statArr = bowlingHeader;
    }
    return (
        <tr key={matchType}>
            <td>{matchType}</td>
            {
                statArr.map((stat) => (
                    <td key={`${matchType},${stat}`}>{matchStatPair[matchType][stat.toLocaleLowerCase()]}</td>
                ))
            }
        </tr>
    );
}

function fetchEachMatchData(type, matchStatPair) {
    var finalArr = [];
    Object.keys(matchStatPair).forEach((key) => {
        var tmpArr = getTableRow(matchStatPair, key, type);
        finalArr.push(tmpArr);
    })
    return finalArr;
}

function getBody(type, stats) {
    var matchStatPair;
    if (type === 'batting') {
        matchStatPair = getBodyData(type, stats);
    } else {
        matchStatPair = getBodyData(type, stats);
    }

    const fetchedData = fetchEachMatchData(type, matchStatPair);

    return (
        <tbody>
            {fetchedData}
        </tbody>
    );
}

function PlayerStats({
    stats
}) {

    return (
        <div className='playerStats-outer-container'>
            <div className='playerStats-inner-container'>
                <div className='playerDetail-info-header'>Batting Career Summary</div>
                <table>
                    {getHeader('batting')}
                    {getBody('batting', stats)}
                </table>
            </div>
            <div className='playerStats-inner-container'>
                <div className='playerDetail-info-header'>Bowling Career Summary</div>
                <table>
                    {getHeader('bowling')}
                    {getBody('bowling', stats)}
                </table>
            </div>
        </div>
    )
}

export default PlayerStats
