import { Avatar, Flex, Text } from "@chakra-ui/core";
import moment from "moment";
import React from 'react'
import { Post } from "../generated/graphql";

interface UserSectionProps {
    post: Post
}

export const UserSection: React.FC<UserSectionProps> = ({post}) => {
    const postedAt = moment(`${post.createdAt}`, 'x').fromNow()

        return (
            <Flex align='center'>
                <Avatar name={post.creator.username} size='sm' mr={2}/>
                <Flex>
                    <Text mr={1}>{post.creator.username}</Text>
                    <Text>&#8226;</Text>
                    <Text ml={1}>{postedAt}</Text>
                </Flex>
            </Flex>
        );
}