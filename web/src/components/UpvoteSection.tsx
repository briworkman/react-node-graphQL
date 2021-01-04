import { Flex, IconButton } from "@chakra-ui/core";
import React from 'react'
import { PostSnippetFragment, PostsQuery, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
    post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({
    post
}) => {
    const [, vote] = useVoteMutation();
        return (
            <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
                  <IconButton 
                    onClick={() => {vote({postId: post.id, value: 1})}}
                    aria-label='upvote post'
                    icon="chevron-up"
                  />
                  {post.points}
                  <IconButton
                    onClick={() => {vote({postId: post.id, value: -1})}}
                    aria-label='downvote post'
                    icon="chevron-down"
                   />
                </Flex>
        );
}
