interface ArcadeMachineProps {
  onJoystickMove?: (position: number) => void;
  onButtonPress?: (isPressed: boolean) => void;
  onDraw?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  orbitControlsRef: React.RefObject<any>;
  screenLightModifier: number;
  isTransitioning?: boolean;
}

export type { ArcadeMachineProps };
