import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { BgVideo } from "@/components/BgVideo";

vi.mock("@/lib/video-interaction", () => ({
  playVideo: vi.fn(),
  playWhenReady: () => () => {},
  watchVideoInteraction: () => () => {},
}));
vi.mock("@/lib/video-visibility", () => ({
  watchVideoVisibility: (_video: HTMLVideoElement, onChange: (visible: boolean) => void) => {
    onChange(true);
    return () => {};
  },
}));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it.each([false, true])("plays the hero at half speed with mobile=%s", (mobile) => {
  vi.spyOn(window, "matchMedia").mockReturnValue({ matches: mobile } as MediaQueryList);
  const { container } = render(<BgVideo desktop="/media/videos/factory-hero-v3.mp4" mobile="/media/videos/factory-hero-mobile.mp4" poster="/media/posters/factory-hero-poster.jpg" playbackRate={0.5} />);
  const video = container.querySelector("video");
  expect(video?.getAttribute("src")).toBe(mobile ? "/media/videos/factory-hero-mobile.mp4" : "/media/videos/factory-hero-v3.mp4");
  expect(video?.playbackRate).toBe(0.5);
  expect(video?.defaultPlaybackRate).toBe(0.5);
});