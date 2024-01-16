import { showToast } from "vant";

export function useLoading() {
  let toast: any = null;

  const startLoading = () => {
    toast = showToast({
      type: "loading",
      duration: 0,
      forbidClick: true,
      message: "Loading...",
    });
  };
  const stopLoading = () => {
    toast && toast.clear();
  };

  onBeforeUnmount(stopLoading);

  return { startLoading, stopLoading };
}
