import { Children } from "react";

export const findByType = (children, component) => {
  const elements = [];

  const type = [component.displayName || component.name];

  Children.forEach(children, (child) => {
    const childType = child?.type?.displayName || child?.type?.name;

    if (type.includes(childType)) {
      elements.push(child);
    }
  });

  return elements[0];
};
