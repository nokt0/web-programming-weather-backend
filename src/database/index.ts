const { MONGO_HOST, MONGO_DATABASE, MONGO_USER,MONGO_PASSWORD } = process.env;

export const dbConnection = {
  url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
