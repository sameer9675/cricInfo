import React, { useEffect, useState } from 'react';
import CommonUtility from '../CommonUtility.json';
import axios from 'axios'; // Import Axios like this
import './team.css'
import { storeInLS, getFromLS } from '../Utility.js';
import PlayerList from './PlayerList.js';



function Team({
	id
}) {
	const [data, setData] = useState(null);
	const [showPlayer, setShowPlayer] = useState(null);

	useEffect(() => {
		fetchDate();
	}, [])

	const fetchDate = () => {

		const lsKey = `seriesId:${id}`;
		const teamDetailsFromLocalStorage = getFromLS(lsKey);

		if (teamDetailsFromLocalStorage) {
			setData(teamDetailsFromLocalStorage);
			return;
		}

		const reqApi = `https://api.cricapi.com/v1/series_squad?apikey=${CommonUtility.CRIC_API_KEY_1}&id=${id}`

		axios.get(reqApi)
			.then(response => {
				const dataObj = response.data;
				//API failure
				if (dataObj.status != 'success') {
					alert('Failed to load the data');
					return;
				}

				storeInLS(lsKey, dataObj.data);

				// Handle success
				setData(dataObj.data)
				console.log('Response:', response);
			})
			.catch(error => {
				// Handle error
				console.error('Error:', error);
			});
	}

	const handleClickOnTeam = (teamDetail) => {
		setShowPlayer(teamDetail);
	}


	function TeamCard({ teamDetail }) {

		if (teamDetail.teamName === 'Royal Challengers Bengaluru') {
			return;
		}

		return (
			<li
				className='team-card'
				onClick={() => handleClickOnTeam(teamDetail)}
			>
				<img src={`IPLLogo/${teamDetail.shortname}.png`} alt={teamDetail.teamName}></img>
				<p>{teamDetail.teamName}</p>
			</li>
		);
	}

	return (
		<>
			{
				!showPlayer ? (
					<div style={{ margin: '3rem' }}>
						<ul className='team-container'>
							{data &&
								data.map((team) => (

									<TeamCard
										teamDetail={team}
										key={team['teamName']}
									/>
								))
							}
						</ul>
					</div>
				) : (
					<PlayerList
						teamDetail={showPlayer}
					/>
				)
			}
		</>
	)
}

export default Team
