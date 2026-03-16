import { brazilianStates } from "../schemas/constants/brazilianStates";

export const brazilianStatesOptions = brazilianStates.map((state) => ({
  value: state,
  label: state,
}));
