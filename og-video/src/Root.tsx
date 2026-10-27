import { Composition } from "remotion";
import { GorroVideo } from "./GorroVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Gorro"
      component={GorroVideo}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
