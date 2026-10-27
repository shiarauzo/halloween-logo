import { Composition } from "remotion";
import { LandingVideo } from "./LandingVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Landing"
      component={LandingVideo}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
