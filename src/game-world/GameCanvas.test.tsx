import { act, render, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GameCanvas } from "./GameCanvas";

const { createGame, destroy } = vi.hoisted(() => ({
  createGame: vi.fn(),
  destroy: vi.fn(),
}));

vi.mock("phaser", () => ({
  default: {
    Game: class {
      constructor(config: unknown) { createGame(config); }
      destroy = destroy;
    },
    Scene: class {},
    CANVAS: 1,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
  },
}));

describe("GameCanvas lifecycle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      getImageData: () => ({ data: [20, 30, 40, 255] }),
    } as unknown as CanvasRenderingContext2D);
  });

  it("does not initialize Phaser during server rendering", () => {
    renderToString(<GameCanvas />);
    expect(createGame).not.toHaveBeenCalled();
  });

  it("creates one game per mount and destroys it on unmount", async () => {
    const first = render(<GameCanvas />);
    await waitFor(() => expect(createGame).toHaveBeenCalledTimes(1));
    first.unmount();
    expect(destroy).toHaveBeenCalledExactlyOnceWith(true);

    const second = render(<GameCanvas />);
    await waitFor(() => expect(createGame).toHaveBeenCalledTimes(2));
    second.unmount();
    expect(destroy).toHaveBeenCalledTimes(2);
  });

  it("does not create a game if unmounted before the import resolves", async () => {
    const view = render(<GameCanvas />);
    view.unmount();
    await act(async () => { await Promise.resolve(); });
    expect(createGame).not.toHaveBeenCalled();
    expect(destroy).not.toHaveBeenCalled();
  });
});