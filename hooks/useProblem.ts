import { useEffect, useState } from "react";
import { Attribute } from "@/interfaces/Attribute";
import { Desire } from "@/interfaces/Desire";
import {
  DEFAULT_DESIRES,
  DEFAULT_GROUPS,
  TAG_ATTRIBUTES,
  TAG_PROBLEM,
} from "@/libs/constants";
import { Group } from "@/interfaces/Group";

const useProblem = () => {
  const [problem, setProblem] = useState<string>("");
  const [attributes, setAttributes] = useState<Array<Attribute>>([]);
  const [persona, setPersona] = useState<Array<Desire>>(DEFAULT_DESIRES);
  const [groups, setGroups] = useState<Array<Group>>(DEFAULT_GROUPS);

  useEffect(() => {
    if (window) {
      const problem = localStorage.getItem(TAG_PROBLEM);
      setProblem(problem ?? "");

      const attributes = JSON.parse(localStorage.getItem(TAG_ATTRIBUTES)!);
      setAttributes(attributes ?? []);
    }
  }, []);

  const updateProblem = (problem: string) => {
    setProblem(problem);

    localStorage.setItem(TAG_PROBLEM, problem);
  };

  const updateAttributes = (attributes: Array<Attribute>) => {
    setAttributes(attributes);

    localStorage.setItem(TAG_ATTRIBUTES, JSON.stringify(attributes));
  };

  const updatePersona = (desires: Array<Desire>) => {
    setPersona(desires);
  };

  const updateGroups = (groups: Array<Group>) => {
    setGroups(groups);
  };

  return {
    problem,
    updateProblem,
    attributes,
    updateAttributes,
    persona,
    updatePersona,
    groups,
    updateGroups,
  };
};

export default useProblem;
