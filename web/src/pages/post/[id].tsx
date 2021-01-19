import { Box } from "@chakra-ui/core";
import Heading from "@chakra-ui/core/dist/Heading";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
    const [{data, fetching}] = useGetPostFromUrl()

    if (fetching) {
        return(
            <Layout>
                <div className="glass--short">
                <div>loading...</div>
                </div>
            </Layout>
        )
    }

    if(!data?.post) {
        return <Layout>
            <div className="glass--short">
            <div>This post could not be found.</div>
            </div>
        </Layout>
    }
            
    return (
        <Layout>
            <Box className="glass--column glass--short" p={12}>
            <Heading mb={4}>{data.post.title}</Heading>
            {data.post.text}
            </Box>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);