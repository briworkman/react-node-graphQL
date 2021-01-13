import { Box, Button, Flex, useToast } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const toast = useToast();
    useIsAuth()
    const [, createPost] = useCreatePostMutation();

    return (
        <Layout variant='small'>
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {
                    const { error } = await createPost({ input: values });
                    if (!error) {
                        toast({
                            position: "bottom-left",
                            title: "Post Created!",
                            description: "Your post has been successfully created",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          })
                        router.push('/')
                    } else {
                        toast({
                            position: "bottom-left",
                            title: "An error occurred.",
                            description: "We were unable to create your post.",
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          })
                    }
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
                                variantColor="teal"
                            >
                                share!
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost)