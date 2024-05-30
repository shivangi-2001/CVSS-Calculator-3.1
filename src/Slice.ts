import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { bm,bg, severityRating } from "./Data";

// Define a type for the slice state
interface CounterState {
  baseScore: number;
  severity: string;
  selectButtons: Record<string, string>;
  vector: string;
}

// Define the type for the action payload for setting select buttons
interface SelectButtonsPayload {
  groupKey: string;
  buttonKey: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  baseScore: 8.8,
  severity: "High",
  selectButtons: {
    AV: "A",
    AC: "L",
    PR: "N",
    UI: "N",
    S: "U",
    C: "H",
    I: "H",
    A: "H",
  },
  vector: "CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
};

const calculate = (selectedValues: Record<string, string>) => {
  const exploitabilityCoefficient = 8.22;
  const scopeCoefficient = 1.08;
  let baseScore;
  let impactSubScore;

  const Weight = {
    AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
    AC: { H: 0.44, L: 0.77 },
    PR: {
      U: { N: 0.85, L: 0.62, H: 0.27 },
      C: { N: 0.85, L: 0.68, H: 0.5 },
    },
    UI: { N: 0.85, R: 0.62 },
    S: { U: 6.42, C: 7.52 },
    C: { N: 0, L: 0.22, H: 0.56 },
    I: { N: 0, L: 0.22, H: 0.56 },
    A: { N: 0, L: 0.22, H: 0.56 },
  };

  try {
    const metricWeight: Record<string, number> = {};

    for (const [key, value] of Object.entries(selectedValues)) {
      if (key === "PR") {
        metricWeight[key] = Weight[key][selectedValues.S][value];
      } else {
        metricWeight[key] = Weight[key][value];
      }
    }

    const exploitabilitySubScore =
      exploitabilityCoefficient *
      metricWeight.AV *
      metricWeight.AC *
      metricWeight.PR *
      metricWeight.UI;

    const impactSubScoreMultiplier =
      1 - (1 - metricWeight.C) * (1 - metricWeight.I) * (1 - metricWeight.A);

    if (selectedValues.S === "U") {
      impactSubScore = metricWeight.S * impactSubScoreMultiplier;
    } else {
      impactSubScore =
        metricWeight.S * (impactSubScoreMultiplier - 0.029) -
        3.25 * Math.pow(impactSubScoreMultiplier - 0.02, 15);
    }

    if (impactSubScore <= 0) {
      baseScore = 0;
    } else {
      if (selectedValues.S === "U") {
        baseScore = Math.min(exploitabilitySubScore + impactSubScore, 10);
      } else {
        baseScore = Math.min(
          (exploitabilitySubScore + impactSubScore) * scopeCoefficient,
          10
        );
      }
    }

    return Math.ceil(baseScore * 10) / 10;
  } catch (err) {
    return 0; // Return 0 if there's an error
  }
};

export const CVSSSlice = createSlice({
  name: "cvss",
  initialState,
  reducers: {
    setSelectButtons: (state, action: PayloadAction<SelectButtonsPayload>) => {
      const { groupKey, buttonKey } = action.payload;
      state.selectButtons[groupKey] = buttonKey;
      state.baseScore = calculate(state.selectButtons);
    },
    setBaseScore: (state) => {
      const selectedValues = state.selectButtons
      const baseScore = calculate(selectedValues)
      state.baseScore= baseScore
      state.severity = severityRating(baseScore).name;
    },
    setvector: (state) => {
      const vectorParts = ["CVSS:3.0"];
        for (const [groupKey, groupName] of Object.entries(bg)) {
          const selectedButtonIndex = state.selectButtons[groupKey];
          if (selectedButtonIndex !== undefined) {
            const value = Object.keys(bm[groupKey]).find(
              (key) => key === selectedButtonIndex
            );
            vectorParts.push(`${groupKey}:${value}`);
          } else {
            vectorParts.push(`${groupKey}:_`);
          }
        }
        state.vector = vectorParts.join("/");
    }
  },
});

export const { setBaseScore, setSelectButtons, setvector } = CVSSSlice.actions;

export const selectCount = (state: RootState) => state.cvss;

export default CVSSSlice.reducer;
