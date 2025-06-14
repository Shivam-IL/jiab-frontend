import { useQuery } from "@tanstack/react-query";
import { ReferenceService } from "../services/ReferenceService";
import { keys } from "../utils";

const referenceServiceInstance = ReferenceService.getInstance()

const useGetGenres = () => {
  return useQuery({
    queryKey: keys.reference.getGenres(),
    queryFn: () => referenceServiceInstance.getGenres(),
  });
};

const useGetJokesFormats = () => {
  return useQuery({
    queryKey: keys.reference.getJokesFormats(),
    queryFn: () => referenceServiceInstance.getJokesFormats(),
  });
};

const useGetLanguages = () => {
  return useQuery({
    queryKey: keys.reference.getLanguages(),
    queryFn: () => referenceServiceInstance.getLanguages(),
  });
};

export { useGetGenres, useGetJokesFormats, useGetLanguages };
