import { getSession, signOut } from 'next-auth/react';
import UsersSchema from '../lib/userSchema';
import connectDB from '../lib/connectDB';
import { useState } from 'react';
import axios from 'axios';

// gets a prop from getServerSideProps
function User({ user, bio }) {
	const [value, setValue] = useState('');
	async function updateBio() {
		const { data } = await axios.post(
			'/api/updateBio',
			{
				profileId: user.profileId,
				bio: value,
			},
			{ headers: { 'content-type': 'application/json' } }
		);

		console.log(`updated bio: ${data.bio}`);
		location.reload();
	}
	return (
		<div>
			<h4>User session:</h4>
			<div>Address: {user.address}</div>
			<div>Bio: {bio}</div>
			<br />
			<input
				type='text'
				onChange={e => setValue(e.target.value)}
				value={value}
			/>
			<button onClick={updateBio}>Update Bio</button>
			<button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	// redirect if not authenticated
	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}

	await connectDB();

	const mongoUser = await UsersSchema.findOne({
		profileId: session?.user.profileId,
	}).lean();

	if (mongoUser !== null) {
		mongoUser.bio = mongoUser.bio.toString();
	}

	return {
		props: { user: session.user, bio: mongoUser.bio },
	};
}

export default User;
