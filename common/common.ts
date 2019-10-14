const enviroment = {
    url: process.env.DB_URL || 'mongodb+srv://jose123:jose123@mycluster-jf4qr.mongodb.net/test?retryWrites=true&w=majority',
    port: process.env.PORT || 5000,
    jwtSecret: "mysecret"
}

export default enviroment