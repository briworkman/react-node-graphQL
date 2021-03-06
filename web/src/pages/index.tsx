import { Box, Link, Text, Stack, Flex, Button, Spinner, IconButton } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { useDeletePostMutation, useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link';
import React, { useState } from "react";
import { UpvoteSection } from "../components/UpvoteSection";
import { UserSection } from "../components/UserSection";

const Index = () => {
  const [variables, setVariables] = useState({limit: 15, cursor: null as null | string})

  const [{data: meData}] = useMeQuery();
  const [{ data, fetching }] = usePostsQuery({
    variables
  });

  const [, deletePost] = useDeletePostMutation()

  if(!fetching && !data) {
    return <Flex justify='center' mt={6}>
            <Text fontSize='xl'>
            Oops! It looks like something went wrong 😕
            </Text>
            </Flex>
  }

  return (
    <Layout>
        {!data && fetching ? 
        <Flex justify="center">
          <Spinner color="teal" />
        </Flex>
       : (
         <div className="glass">
        <div className='postsContainer'>
          <Stack spacing={8}>
            {data!.posts.posts.map(p => !p ? null : (
              <Box key={p.id} bg="white" borderRadius="10px">
              <NextLink href="/post/[id]" as={`/post/${p.id}`} >
              <Link>
              <Flex p={5} shadow="md" borderWidth="1px" >
                <UpvoteSection post={p}/>
                      <Box>
                        <UserSection post={p}/>
                        <Text mt={4}>{p.textSnippet}</Text>
                      </Box>
                {meData?.me?.id !== p.creator.id ? null :
                <Box ml="auto">
                  <NextLink href="/post/edit/[id]" as={`/post/edit/${p.id}`}>
                    <IconButton 
                      as={Link}
                      icon="edit" 
                      aria-label="Edit Post" 
                      mr={2} 
                      variant="outline"
                      variantColor="teal"
                    />
                  </NextLink>
                  <IconButton 
                    icon="delete" 
                    aria-label="Delete Post" 
                    onClick={() => {deletePost({id: p.id})}} 
                    variant="outline"
                    variantColor="red"
                  />
                </Box>
                }
              </Flex>
              </Link>
              </NextLink>
              </Box>
            ))
            }
          </Stack>
          {data?.posts.hasMore ?           
            <Flex>
              <Button onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data!.posts.posts[data!.posts.posts.length - 1].createdAt
                })
              }} isLoading={fetching} m='auto' my={8}>
                See More
              </Button>
            </Flex> : null}
        </div>
        </div>
      )}
    </Layout>
  )
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
