import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useProblem from "@/hooks/useProblem";
import { Attribute } from "@/interfaces/Attribute";
import { Desire } from "@/interfaces/Desire";
import { Group } from "@/interfaces/Group";

export const ProblemContext = createContext({
  problem: "",
  updateProblem: (problem: string) => {},
  attributes: Array<Attribute>(),
  updateAttributes: (attributes: Array<Attribute>) => {},
  persona: Array<Desire>(),
  updatePersona: (desires: Array<Desire>) => {},
  groups: Array<Group>(),
  updateGroups: (groups: Array<Group>) => {},
});

export const ProblemProvider = ({ children }: { children: any }) => {
  const {
    problem,
    updateProblem,
    attributes,
    updateAttributes,
    persona,
    updatePersona,
    groups,
    updateGroups,
  } = useProblem();

  return (
    <ProblemContext.Provider
      value={{
        problem,
        updateProblem,
        attributes,
        updateAttributes,
        persona,
        updatePersona,
        groups,
        updateGroups,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblemValue = () => useContext(ProblemContext);

ProblemProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
