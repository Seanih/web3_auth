import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
	const [apiData, setApiData] = useState('');

	const getName = async () => {
		let { data } = await axios.get('/api/hello');

		setApiData(data.name);
	};
	return (
		<div className={styles.container}>
			<button onClick={getName}>Get Name</button>
			{apiData && <p>{apiData}</p>}
		</div>
	);
}
