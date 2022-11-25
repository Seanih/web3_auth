import connectDB from '../../lib/connectDB';
import UsersSchema from '../../lib/userSchema';

export default async function handler(req, res) {
	const { profileId, bio } = req.body;

	await connectDB();

	try {
		await UsersSchema.findOneAndUpdate({ profileId }, { bio });

		res.status(200).json(bio);
	} catch (error) {
		res.status(400).json({ error });
		console.log(error);
	}
}
