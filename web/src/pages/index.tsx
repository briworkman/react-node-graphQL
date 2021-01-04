import { Box, Heading, Link, Text, Stack, Flex, Button, Spinner, Icon, IconButton } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link';
import React, { useState } from "react";
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {
  const [variables, setVariables] = useState({limit: 15, cursor: null as null | string})

  const [{ data, fetching }] = usePostsQuery({
    variables
  });

  if(!fetching && !data) {
    return <Flex justify='center' mt={6}>
            <Text fontSize='xl'>
            Oops! It looks like something went wrong 😕
            </Text>
            </Flex>
  }

  return (
    <Layout>
      <Flex align='center'>
        <Heading>LiReddit</Heading>
      <NextLink href='/create-post'>
        <Link ml='auto'>
          create post
      </Link>
      </NextLink>
      </Flex>
      <br />
      {!data && fetching ? 
        <Flex justify="center">
          <Spinner color="teal" />
        </Flex>
       : (
        <div>
          <Stack spacing={8}>
            {data!.posts.posts.map(p => (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpvoteSection post={p}/>
                <Box>
                  <Heading fontSize="xl">{p.title}</Heading> 
                  <Text>Posted by {p.creator.username}</Text>
                  <Text mt={4}>{p.textSnippet}</Text>
                </Box>
              </Flex>
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
              }} isLoading={fetching} m='auto' my={8} variantColor="teal">
                see more
              </Button>
            </Flex> : null}
        </div>
      )}
    </Layout>
  )
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
