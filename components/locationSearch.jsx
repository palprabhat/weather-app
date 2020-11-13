import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { FiSearch } from "react-icons/fi";
import { useDarkTheme } from "../context/themeContext";

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

const Option = (props) => {
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

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      Enter a city name
    </components.NoOptionsMessage>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FiSearch />
    </components.DropdownIndicator>
  );
};

const LocationSearch = ({ onLocationSelect }) => {
  const darkTheme = useDarkTheme();
  const [selected, setSelected] = useState("");

  const styles = useMemo(() => {
    return {
      container: (styles) => ({ ...styles, outline: "none" }),
      control: (styles) => ({
        ...styles,
        boxShadow: "none",
        backgroundColor: darkTheme ? "#2d3748" : styles.backgroundColor,
        borderColor: darkTheme ? "#2d3748" : styles.borderColor,
      }),
      input: (styles) => ({
        ...styles,
        color: darkTheme ? "#ffffff" : styles.color,
      }),
      menu: (styles) => ({
        ...styles,
        backgroundColor: darkTheme ? "#2d3748" : styles.backgroundColor,
        border: darkTheme ? "1px solid" : styles.border,
        borderColor: darkTheme ? "#718096" : styles.borderColor,
      }),
      singleValue: (styles) => ({
        ...styles,
        color: darkTheme ? "#e2e8f0" : styles.color,
      }),
    };
  }, [darkTheme]);

  useEffect(async () => {
    if (selected) {
      const { lat, lon } = await getLonLat(selected.value);
      onLocationSelect({ lat, lon, place: selected.label });
    }
  }, [selected]);

  return (
    <AsyncSelect
      instanceId="location-search"
      placeholder="Location"
      styles={styles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: darkTheme ? "#4a5568" : theme.colors.primary25,
        },
      })}
      isClearable
      cacheOptions
      components={{
        Option,
        NoOptionsMessage,
        DropdownIndicator,
      }}
      defaultValue={selected}
      loadOptions={getAutocomplete}
      onChange={(data) => {
        if (data) {
          const selectedData = { ...data };
          setSelected(selectedData);
        }
      }}
    />
  );
};

export default LocationSearch;
