import { Environment, EnvironmentVariable } from "@hoppscotch/data";
import { getEffectiveFinalMetaData } from "../../../utils/getters";
import { describe, expect, test } from "vitest";


//import "@relmify/jest-fp-ts";

const DEFAULT_ENV = <EnvironmentVariable[]> [{ key: "PARAM", value: "parsed_param", secret: false }];

describe("getEffectiveFinalMetaData", () => {
  test("Empty list of meta-data.", () => {
    expect(getEffectiveFinalMetaData([], DEFAULT_ENV)).toSubsetEqualRight([]);
  });

  test("Non-empty active list of meta-data with unavailable ENV.", () => {
    expect(
      getEffectiveFinalMetaData(
        [{ value: "<<UNKNOWN_VALUE>>", key: "<<UNKNOWN_KEY>>", active: true, description: "" }],
        DEFAULT_ENV
      )
    ).toSubsetEqualRight([{ active: true, key: "", value: "" }]);
  });

  test("Inactive list of meta-data.", () => {
    expect(
      getEffectiveFinalMetaData(
        [{ value: "<<PARAM>>", key: "KEY", active: false, description: "" }],
        DEFAULT_ENV
      )
    ).toSubsetEqualRight([]);
  });

  test("Active list of meta-data.", () => {
    expect(
      getEffectiveFinalMetaData(
        [{ value: "<<PARAM>>", key: "PARAM", active: true, description: "" }],
        DEFAULT_ENV
      )
    ).toSubsetEqualRight([
      { active: true, key: "PARAM", value: "parsed_param" },
    ]);
  });
});
