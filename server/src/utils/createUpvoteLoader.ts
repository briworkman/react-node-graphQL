import DataLoader from "dataloader";
import { Upvote } from "../entities/Upvote";

// [1, 78, 8, 9]
// [{id: 1, username: 'tim'}, {}, {}, {}]
export const createUpvoteLoader = () =>
  new DataLoader<{postId: number, userId: number}, Upvote | null>(async (keys) => {
    const upvotes = await Upvote.findByIds(keys as any);
    const upvoteIdsToUpvote: Record<string, Upvote> = {};
    upvotes.forEach((upvote) => {
        upvoteIdsToUpvote[`${upvote.userId}|${upvote.postId}`] = upvote;
    });

    return keys.map((key) => upvoteIdsToUpvote[`${key.userId}|${key.postId}`]);
  });