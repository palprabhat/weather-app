import axios from "axios";

const weatherUrl = process.env.OPEN_WEATHER_BASE_URL;
const weatherKey = process.env.OPEN_WEATHER_API_KEY;

export default async (req, res) => {
  if (req.method === "GET") {
    const { lat, lon } = req.query;

    try {
      const response = await axios.get(
        `${weatherUrl}/onecall?appid=${weatherKey}&units=metric&exclude=minutely&lat=${lat}&lon=${lon}`
      );

      if (response.status !== 200) {
        res.status(500).send({
          error: "Unable to get weather details",
          message: response.data.message,
        });
        return;
      }

      res.status(200).send(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Unable to get weather details" });
    }
  } else {
    res.status(405).send({ error: "Request method not supported" });
  }
};
