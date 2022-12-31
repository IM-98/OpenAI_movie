const axios = require("axios");


exports.handler = (event, context, callback) => {
  
  const data = JSON.parse(event.body);

  
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  }

  axios.post(`https://api.openai.com/v1/completions`, data, headers)
    
  .then(res => {
    console.log(res)
      let titres;
      titres = res.data.choices[0].text;


      axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_OMDB}&t=${titres}`)
        
      .then(res => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify({ data: res.data })
          })
        })
    })
}
