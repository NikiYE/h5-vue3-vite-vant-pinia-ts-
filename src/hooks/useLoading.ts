import { showToast, closeToast } from "vant";

export function useLoading() {
  const startLoading = () => {
    showToast({
      type: "loading",
      duration: 0,
      forbidClick: true,
      message: "Loading...",
    });
  };
  const stopLoading = () => {
    closeToast();
  };

  onBeforeUnmount(stopLoading);

  return { startLoading, stopLoading };
}
