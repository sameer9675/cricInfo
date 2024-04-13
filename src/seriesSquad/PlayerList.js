import React, { useState } from 'react';
import './team.css';
import ShowPlayerDetail from './ShowPlayerDetail';
import CommonUtility from '../CommonUtility.json'
import axios from 'axios';


function PlayerList({ teamDetail }) {

    const [showPlayerDetail, setShowPlayerDetail] = useState(null);

    const getHorizontalLineHeight = () => {
        const teamSize = teamDetail.players.length;
        const row = Math.ceil(teamSize / 2);;
        // here gap is 1.6 rem between row and 1 rem is considered as 16 px (default one)
        //60 is image height
        return row * 60 + (row - 1) * 1.6 * 16;
    }

    const handlePlayerDetailShow = (id) => {
        const reqApi = ` https://api.cricapi.com/v1/players_info?apikey=${CommonUtility.CRIC_API_KEY_1}&id=${id}`

        axios.get(reqApi)
            .then(response => {
                const dataObj = response.data;
                //API failure
                if (dataObj.status != 'success') {
                    alert('Failed to load the data');
                    return;
                }

                // Handle success
                setShowPlayerDetail(dataObj.data)
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }

    function GetPlayerContainers({ playerData }) {
        return (
            <li className="playerDetail">
                <img src={playerData.playerImg} alt={playerData.name} />
                <div onClick={() => handlePlayerDetailShow(playerData.id)}>
                    <p>{`${playerData.name} ${playerData.role.includes('WK') ? '(WK)' : ''}`}</p>
                    <span>{playerData.role}</span>
                </div>
            </li>
        );
    }


    const { shortname, teamName, players } = teamDetail;
    return (
        <>
            {
                !showPlayerDetail ? (
                    <div className='playerList-container'>
                        <div className='playerList-header'>
                            <img src={`IPLLogo/${shortname}.png`} alt={teamName} />
                            <p>{teamName}</p>
                        </div>
                        <ul className="playerList" >
                            {
                                players.map((playerData) => (
                                    <GetPlayerContainers
                                        playerData={playerData}
                                        key={playerData.name}
                                    />
                                ))
                            }
                            <div className='horizontalLine' style={{ height: `${getHorizontalLineHeight()}px` }}></div>
                        </ul>
                    </div>
                ) : (
                    <ShowPlayerDetail
                        playerDetail={showPlayerDetail}
                    />
                )
            }
        </>
    )
}
export default PlayerList