import { Attribute } from "@/interfaces/Attribute";
import { Option } from "@/interfaces/Option";
import { API_BASE_URL } from "@/libs/constants";
import { useState } from "react";
import { toast } from "react-toastify";

const useApi = () => {
  const [isWorking, setIsWorking] = useState<boolean>(false);

  const createAttributes = async (
    idea: string,
    prompt_type: string = "product",
    num_attrs: number = 4
  ) => {
    setIsWorking(true);

    try {
      const response = await fetch(`${API_BASE_URL}/attributes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          prompt_type,
          num_attrs,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let index = 0;
        const attributes: Array<Attribute> = [];
        for (const attribute of data.attributes) {
          attributes.push({
            id: index++,
            label: attribute,
            description: attribute,
            value: null,
            options: [],
            image: "",
          });
        }

        setIsWorking(false);
        return attributes;
      } else {
        if (response.status == 500) {
          toast.error("Error occured on creating attributes.");
        } else {
          const data = await response.json();
          toast.error(
            data.message
              ? data.message
              : "Error occured on creating attributes."
          );
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Error occured on creating attributes.");
    } finally {
      setIsWorking(false);
    }
    return [];
  };

  const createLevels = async (
    idea: string,
    attributes: Array<Attribute>,
    prompt_type: string = "product",
    num_levels: number = 4
  ) => {
    setIsWorking(true);

    try {
      const attributesParam = attributes.map((attribute) => attribute.label);
      const response = await fetch(`${API_BASE_URL}/levels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          attributes: attributesParam,
          prompt_type,
          num_levels,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as Array<any>;
        const result: Array<Attribute> = attributes.map((attribute) => {
          const foundAttribute = data.find(
            (value) => value.attribute.attribute == attribute.label
          );
          const levels = foundAttribute ? foundAttribute.attribute.levels : [];
          return {
            ...attribute,
            options: levels.map((level: string, index: number) => {
              return {
                id: index,
                label: level,
                description: level,
                value: null,
                image: "",
              } as Option;
            }),
          };
        });

        setIsWorking(false);
        return result;
      } else {
        if (response.status == 500) {
          toast.error("Error occured on creating levels.");
        } else {
          const data = await response.json();
          toast.error(
            data.message ? data.message : "Error occured on creating levels."
          );
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Error occured on creating levels.");
    } finally {
      setIsWorking(false);
    }
    return [];
  };

  const createExperiment = async (
    idea: string,
    persona_desc: string,
    attributes: Array<Attribute>,
    add_neither: boolean = true,
    prompt_type: string = "product"
  ) => {
    setIsWorking(true);

    try {
      const attributesParam = attributes.map((attribute) => {
        return {
          attribute: attribute.label,
          levels: attribute.options.map((option) => option.label),
        };
      });
      const response = await fetch(`${API_BASE_URL}/experiment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          persona_desc,
          attributes: attributesParam,
          add_neither,
          prompt_type,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setIsWorking(false);
        return data;
      } else {
        if (response.status == 500) {
          toast.error("Error occured on creating experiment.");
        } else {
          const data = await response.json();
          toast.error(
            data.message
              ? data.message
              : "Error occured on creating experiment."
          );
        }

        setIsWorking(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Error occured on creating experiment.");
    } finally {
      setIsWorking(false);
    }
    return null;
  };

  return { isWorking, createAttributes, createLevels, createExperiment };
};

export default useApi;
