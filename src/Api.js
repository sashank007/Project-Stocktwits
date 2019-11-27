import fetch from "isomorphic-unfetch";

const getTweetsURI =
  "https://ag359tbfl0.execute-api.us-east-1.amazonaws.com/dev/getTweets";

export default function getAllTweets(symbol) {
  return fetch(getTweetsURI, {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      symbol: symbol
    })
  });
}
