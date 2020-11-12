import axios from "axios";

const placesUrl = process.env.PLACES_BASE_URL;
const placesKey = process.env.PLACES_API_KEY;

export default async (req, res) => {
  if (req.method === "GET") {
    const { placeId } = req.query;

    try {
      const response = await axios.get(
        `${placesUrl}/details/json?fields=geometry,formatted_address,address_components&key=${placesKey}&place_id=${placeId}`
      );

      if (response.status !== 200 || response.data.status !== "OK") {
        res.status(500).send({
          error: "Unable to get location details",
          message: response.data.error_message,
        });
        return;
      }

      res.status(200).send(response.data.result);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Unable to get location details" });
    }
  } else {
    res.status(405).send({ error: "Request method not supported" });
  }
};
