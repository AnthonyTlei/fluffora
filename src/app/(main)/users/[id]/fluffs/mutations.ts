import { useSession } from "@/app/(main)/SessionProvider";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createFluff } from "./actions";
import { FluffsPage } from "@/lib/types";

export function useCreateFluffMutation() {
  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: createFluff,
    onSuccess: async (newFluff) => {
      const queryFilter = {
        queryKey: ["fluffs", `user-${user.id}`],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<FluffsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  fluffs: [newFluff, ...firstPage.fluffs],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );
    },
    onError(error) {
      console.error(error);
    },
  });

  return mutation;
}
