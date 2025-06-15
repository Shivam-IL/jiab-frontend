import { useDispatch } from "react-redux";
import { setGlobalApiLoading } from "@/store/global/loading.slice";

export const useGlobalLoader = () => {
  const dispatch = useDispatch();

  const showLoader = () => {
    dispatch(setGlobalApiLoading(true));
  };

  const hideLoader = () => {
    dispatch(setGlobalApiLoading(false));
  };

  return {
    showLoader,
    hideLoader,
  };
}; 