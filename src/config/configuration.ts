export default () => ({
	port: process.env.PORT,
	mongo_db: process.env.MONGO_URL,
	jwt_secret: process.env.JWT_SECRET
});