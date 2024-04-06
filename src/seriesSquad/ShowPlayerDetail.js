import React from 'react';
import PlayerStats from './PlayerStats';
import './team.css'

function ShowPlayerDetail({ playerDetail }) {

    const getDOB = () => {
        const DOB = playerDetail.dateOfBirth;
        var finalString = "";
        const birthYear = DOB.slice(0, 10);
        const birthYearSplit = birthYear.split('-');

        //getting the month from the date
        var date = new Date(birthYear);
        var monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
        var shortName = monthName(date);

        const currentAge = ((new Date().getUTCFullYear() - new Date(birthYear).getUTCFullYear())) - 1;
        finalString = finalString + shortName + birthYearSplit[2] + ', ' + birthYear[0] + `(${currentAge} years)`

        return finalString;
    }

    return (
        <div className='playerDetial-container'>
            <div className='playerDetail-header'>
                <img src={`${playerDetail.playerImg}`} alt={`${playerDetail.name}`} />
                <div>
                    <h1>{playerDetail.name}</h1>
                    <h3>{playerDetail.country}</h3>
                </div>
            </div>
            <div className='playerDetail-info-container'>
                <div className='playerDetail-personalInfo-container'>
                    <div className='playerDetail-info-header'>Personal Information</div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Born</td>
                                <td>{getDOB()}</td>
                            </tr>
                            <tr>
                                <td>Birth place</td>
                                <td>{playerDetail.placeOfBirth}</td>
                            </tr>
                            <tr>
                                <td>Role</td>
                                <td>{playerDetail.role}</td>
                            </tr>
                            <tr>
                                <td>Batting Style</td>
                                <td>{playerDetail.battingStyle}</td>
                            </tr>
                            <tr>
                                <td>Bowling Style</td>
                                <td>{playerDetail.bowlingStyle}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PlayerStats
                    stats={playerDetail.stats}
                />
            </div>
        </div>
    )
}

export default ShowPlayerDetail
