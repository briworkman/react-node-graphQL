import { Box, Heading, Link, Text, Stack, Flex, Button, Spinner } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link';
import React, { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({limit: 10, cursor: null as null | string})

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
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={4}>{p.textSnippet}</Text>
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
