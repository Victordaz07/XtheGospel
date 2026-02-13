import { describe, it, expect } from "vitest";
import { isTrackUnlocked, isPathUnlocked } from "./unlockLogic";
import { paths, tracksById, lessonsById } from "../data/trainingPaths";

function makeCtx(overrides?: Partial<any>) {
  return {
    stage: "covenanted",
    completedLessons: {},
    paths,
    tracksById,
    lessonsById,
    ...overrides,
  };
}

describe("unlockLogic – no regression", () => {
  it("blocks Melchizedek if one Aaronic lesson is incomplete", () => {
    const ctx = makeCtx({
      completedLessons: {
        // Core completed
        "core-1": { completedAt: "x", percent: 100 },
        "core-2": { completedAt: "x", percent: 100 },
        "core-3": { completedAt: "x", percent: 100 },
        "core-4": { completedAt: "x", percent: 100 },

        // Aaronic almost completed (one at 99%)
        "deacon-1": { completedAt: "x", percent: 100 },
        "deacon-2": { completedAt: "x", percent: 99 }, // not completed
        "teacher-1": { completedAt: "x", percent: 100 },
        "teacher-2": { completedAt: "x", percent: 100 },
        "priest-1": { completedAt: "x", percent: 100 },
        "priest-2": { completedAt: "x", percent: 100 },
      },
    });

    expect(isTrackUnlocked("melchizedek-elder", ctx)).toBe(false);
  });

  it("unlocks Melchizedek when Core + all Aaronic lessons are 100%", () => {
    const ctx = makeCtx({
      completedLessons: {
        "core-1": { completedAt: "x", percent: 100 },
        "core-2": { completedAt: "x", percent: 100 },
        "core-3": { completedAt: "x", percent: 100 },
        "core-4": { completedAt: "x", percent: 100 },

        "deacon-1": { completedAt: "x", percent: 100 },
        "deacon-2": { completedAt: "x", percent: 100 },
        "teacher-1": { completedAt: "x", percent: 100 },
        "teacher-2": { completedAt: "x", percent: 100 },
        "priest-1": { completedAt: "x", percent: 100 },
        "priest-2": { completedAt: "x", percent: 100 },
      },
    });

    expect(isTrackUnlocked("melchizedek-elder", ctx)).toBe(true);
  });

  it("returns false for any path when stage !== covenanted", () => {
    const ctx = makeCtx({ stage: "seeking" });
    expect(isPathUnlocked("core-foundations", ctx)).toBe(false);
  });
});
