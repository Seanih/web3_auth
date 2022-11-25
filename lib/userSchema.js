import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		profileId: {
			type: String,
		},
		bio: {
			type: String,
			default: 'This is the default bio...',
		},
	},
	{ timestamps: true }
);

let UsersSchema = mongoose.models.users || mongoose.model('users', userSchema);

export default UsersSchema;
