interface ArcadeMachineProps {
  onJoystickMove?: (position: number) => void; // -1 to 1, representing up/down
  onButtonPress?: (isPressed: boolean) => void;
  onDraw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  orbitControlsRef: React.RefObject<any>;
  screenLightModifier: number;
}

export type { ArcadeMachineProps };
