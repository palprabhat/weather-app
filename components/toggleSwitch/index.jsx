// design style from https://codepen.io/nathangath/pen/qYeOJJ

import styles from "./toggleSwitch.module.scss";

const ToggleSwitch = ({
  id = "toggleSwitch",
  size,
  onChange,
  checked,
  ...props
}) => {
  return (
    <div className={styles.toggleContainer}>
      <input
        type="checkbox"
        id={id}
        className={styles.themeToggle}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={id} style={{ fontSize: size }}>
        <span></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
