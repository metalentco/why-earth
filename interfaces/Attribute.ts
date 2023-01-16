import { Option } from "./Option";

export type Attribute = {
  id: number;
  label: string;
  value: any;
  description: string;
  options: Array<Option>;
  image: string;
};
