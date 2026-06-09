import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../services/user.service";

export const useUpdateCover = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      userService.updateCover,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "my-profile",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "profile",
        ],
      });
    },
  });
};