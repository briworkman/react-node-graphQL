import React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { teal } from '../utils/constants/colors';

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} color="white">login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button onClick={() => logout()} isLoading={logoutFetching} variant="link" color="white">logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg={teal} color="white" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
