import React from 'react';
import { countPrefixObj } from '../Utility';



const getCardHeaderData = (matchCount, venue) => {
    // nullish operator ??
    const cntString = matchCount.toString() + (countPrefixObj[matchCount] ?? countPrefixObj['rest'])

    //fetching state
    const matchVenueArray = venue.split(',');
    const matchVenue = matchVenueArray[matchVenueArray.length - 1];

    return `${cntString} Match, ${matchVenue}`
}

const getTeamScore = (teamName, matchScoreCard) => {
    return matchScoreCard ? (
        matchScoreCard[0]['inning'].includes(teamName) ?
            `${matchScoreCard[0]['r']} (${matchScoreCard[0]['o']})` :
            `${matchScoreCard[1]['r']} (${matchScoreCard[1]['o']})`
    ) : null;
}


const getCardFooter = (matchStatus, matchDateTimeGMT) => {
    if ("Match not started".includes(matchStatus)) {
        const matchTimeToCurrentTimeZone = new Date(`${matchDateTimeGMT}Z`);
        const dayMonthFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short" }).format;
        const dateDayArray = dayMonthFormat(matchTimeToCurrentTimeZone).split(' '); // 0-> month , 1 -> day
        const [date, hour, minute] = [matchTimeToCurrentTimeZone.getDate(), matchTimeToCurrentTimeZone.getHours(), matchTimeToCurrentTimeZone.getMinutes()];
        const amOrPm = matchTimeToCurrentTimeZone.toLocaleTimeString().split(' ')[1].toLowerCase();

        return `${dateDayArray[1]}, ${date} ${dateDayArray[0]}, ${hour}:${minute} ${amOrPm}`;
    } else {
        return matchStatus;
    }
}


const getMatchDetail = (teamInfo, matchScoreCard) => {
    if (!teamInfo) {
        return;
    }
    const team1 = {
        name: `${teamInfo[0]['shortname']}`,
        logo: `IPLLogo/${teamInfo[0].shortname}.png`,
        score: getTeamScore(teamInfo[0]['name'], matchScoreCard)
    }
    const team2 = {
        name: `${teamInfo[1]['shortname']}`,
        logo: `IPLLogo/${teamInfo[1].shortname}.png`,
        score: getTeamScore(teamInfo[1]['name'], matchScoreCard)
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={team1.logo} alt="" height={20} width={20} />
                            <p>{team1.name}</p>
                        </td>
                        {
                            matchScoreCard && <td>{team1.score}</td>
                        }
                    </tr>
                    <tr>
                        <td>
                            <img src={team2.logo} alt="" height={20} width={20} />
                            <p>{team2.name}</p>
                        </td>
                        {
                            matchScoreCard && <td>{team2.score}</td>
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function MatchCard({
    matches,
    matches_done
}) {

    function Card({ match, index }) {

        if (!match) {
            return;
        }
        const { name, status, date, dateTimeGMT, teams, teamInfo, venue } = match;

        //way to decalre multiple variable in one line -> https://www.basedash.com/blog/how-to-declare-multiple-variables-in-javascript
        const [matchName, matchStatus, matchDate, matchDateTimeGMT] = [name, status, date, dateTimeGMT];
        const matchScoreCard = index < matches_done.length && matches_done[index] ? matches_done[index]['score'] : null;


        const headerData = getCardHeaderData(index + 1, venue);

        return (
            <>
                <div className="matchCard-Header">{headerData}</div>
                {getMatchDetail(teamInfo, matchScoreCard)}
                {getCardFooter(matchStatus, matchDateTimeGMT)}
            </>
        )
    }

    return (
        <div className='matchCard-container'>
            {
                matches.map((match, index) => <Card match={match} index={index} key={match.id} />)
            }
        </div>
    )
}

export default MatchCard
