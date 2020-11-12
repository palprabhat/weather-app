import AsyncSelect from "react-select/async";
import axios from "axios";
import { components } from "react-select";
import { useState } from "react";
import { useTheme } from "../context/themeContext";

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

const Suggestions = (props) => {
  const {
    structured_formatting: {
      main_text,
      secondary_text,
      main_text_matched_substrings,
    },
  } = props.data;

  const { offset, length } = main_text_matched_substrings[0];
  const mainTextLength = main_text.length;

  return (
    <components.Option {...props} className="flex justify-start item-center">
      <div>
        <strong>{main_text.substr(offset, length)}</strong>
        {main_text.substr(length, mainTextLength)} ,{secondary_text}
      </div>
    </components.Option>
  );
};

const LocationSearch = ({ onSelect }) => {
  const [selected, setSelected] = useState("");
  // const theme = useTheme();

  return (
    <AsyncSelect
      instanceId="location-search"
      placeholder="Location"
      isClearable
      cacheOptions
      defaultValue={selected}
      components={{ Option: Suggestions }}
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
