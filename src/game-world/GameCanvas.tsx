import { useEffect, useRef, useState } from "react";
import type Phaser from "phaser";

/** Browser-only, standalone engine smoke test; not connected to RPG state. */
export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let game: Phaser.Game | undefined;

    async function mountGame() {
      try {
        // Phaser touches browser APIs at import time, so isolate the import too.
        const { default: Phaser } = await import("phaser");
        if (cancelled) return;

        // Convert existing CSS theme tokens to the numeric colors Phaser uses.
        const styles = getComputedStyle(container);
        const colorCanvas = document.createElement("canvas");
        colorCanvas.width = colorCanvas.height = 1;
        const context = colorCanvas.getContext("2d");
        if (!context) throw new Error("Canvas is unavailable");
        const color = (token: string) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = styles.getPropertyValue(token).trim();
          context.fillRect(0, 0, 1, 1);
          const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
          return (r << 16) | (g << 8) | b;
        };
        const background = color("--background");
        const gold = color("--gold");
        const arcane = color("--arcane");

        class SmokeScene extends Phaser.Scene {
          create() {
            this.cameras.main.setBackgroundColor(background);
            const player = this.add.graphics();
            player.lineStyle(2, arcane, 0.6);
            player.strokeEllipse(400, 252, 64, 18);
            player.fillStyle(gold);
            player.fillCircle(400, 211, 9);
            player.fillTriangle(400, 224, 385, 247, 415, 247);
          }
        }

        game = new Phaser.Game({
          type: Phaser.CANVAS,
          parent: container,
          width: 800,
          height: 400,
          backgroundColor: background,
          scene: SmokeScene,
          scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
          audio: { noAudio: true },
          banner: false,
        });
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void mountGame();
    return () => {
      cancelled = true;
      game?.destroy(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Phaser smoke test: a gold placeholder player on a dark background"
      className="relative aspect-[2/1] w-full overflow-hidden rounded-sm border border-border bg-background"
    >
      {failed && (
        <p role="alert" className="absolute inset-0 flex items-center justify-center text-destructive">
          Phaser could not start. Please reload to try again.
        </p>
      )}
    </div>
  );
}