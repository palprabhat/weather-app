import axios from "axios";
import { useState } from "react";
import AsyncSelect from "./asyncSelect";

const getAutocomplete = async (inputValue) => {
  const response = await axios.get(`/api/autocomplete?search=${inputValue}`);
  const data = response.data;

  return data.predictions.map((prediction) => {
    return {
      label: prediction.description,
      value: prediction.place_id,
      structured_formatting: prediction.structured_formatting,
    };
  });
};

const getLonLat = async (placeId) => {
  if (placeId) {
    const response = await axios.get(`/api/location?placeId=${placeId}`);
    const data = response.data;
    const { lat, lng } = data.geometry.location;

    return { lat, lon: lng };
  }
};

const LocationSearch = ({ onSelect }) => {
  const [selected, setSelected] = useState("");
  // const theme = useTheme();

  return (
    <AsyncSelect
      instanceId="location-search"
      placeholder="Location"
      defaultValue={selected}
      loadOptions={getAutocomplete}
      onChange={async (data) => {
        setSelected(data);
        if (data) {
          const { lat, lon } = await getLonLat(data.value);
          onSelect({ lat, lon, place: data.label });
        }
      }}
    />
  );
};

export default LocationSearch;
