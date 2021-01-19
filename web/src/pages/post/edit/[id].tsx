import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from 'react';
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { usePostQuery, useUpdatePostMutation } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIdFromUrl } from "../../../utils/useGetIdFromUrl";

const EditPost = () => {
    const router = useRouter()
    const intId = useGetIdFromUrl()
    const [{data, fetching}] = usePostQuery({
        pause: intId === -1,
        variables: {
            id: intId
        }
    })

    const [, updatePost] = useUpdatePostMutation()

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
            <Layout variant='small'>
                <div className="glass--short">
            <Formik
                initialValues={{ title: data.post.title, text: data.post.text }}
                onSubmit={async (values) => {
                    await updatePost({id: intId, ...values})
                    router.push("/")
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="Title"
                            label="Title"
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="text"
                                placeholder="What would you like to share?"
                                label="Body"
                            />
                        </Box>
                        <Flex align={'center'}>
                            <Button
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Update Post!
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
            </div>
        </Layout>
        );
}

export default withUrqlClient(createUrqlClient)(EditPost)