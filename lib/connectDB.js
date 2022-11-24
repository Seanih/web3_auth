import mongoose from 'mongoose';

const connectDB = async () => {
	//checks if connection already exists
	if (mongoose.connections[0].readyState) {
		console.log('already connected...');
		return;
	}

	mongoose.connect(process.env.MONGODB_URI, {}, err => {
		if (err) throw err;
		console.log('Connected to MongoDB.');
	});
};

export default connectDB;
