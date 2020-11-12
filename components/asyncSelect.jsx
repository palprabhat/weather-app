import ReactAsyncSelect from "react-select/async";
import { components } from "react-select";
import { FiSearch } from "react-icons/fi";
import { useDarkTheme } from "../context/themeContext";

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

const AsyncSelect = (props) => {
  const darkTheme = useDarkTheme();
  return (
    <ReactAsyncSelect
      styles={{
        container: (styles) => ({ ...styles, outline: "none" }),
        control: (styles) => ({
          ...styles,
          boxShadow: "none",
          backgroundColor: darkTheme ? "#2d3748" : "",
          borderColor: darkTheme ? "#2d3748" : "",
        }),
        input: (styles) => ({
          ...styles,
          color: darkTheme ? "#ffffff" : "",
        }),
        menu: (styles) => ({
          ...styles,
          backgroundColor: darkTheme ? "#2d3748" : "",
          border: darkTheme ? "1px solid" : "",
          borderColor: darkTheme ? "#718096" : "",
        }),
        singleValue: (styles) => ({
          ...styles,
          color: darkTheme ? "#b5b5b5" : "",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#4a5568",
          // primary50: "#f36b25",
          // primary: "#f36b25",
        },
      })}
      isClearable
      defaultMenuIsOpen={true}
      cacheOptions
      components={{
        Option: Suggestions,
        NoOptionsMessage,
        DropdownIndicator,
      }}
      {...props}
    />
  );
};

export default AsyncSelect;
