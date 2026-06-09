import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userService } from "../services/user.service";

export const useUpdateProfile = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      userService.updateProfile,

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