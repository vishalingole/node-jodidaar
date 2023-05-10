//Use the ApiKey and APISecret from config.js
const payload = {
    iss: process.env.API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.API_SECRET);
console.log(token)