import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from "@chakra-ui/react"
import { Wrapper, WrapperVariations } from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useMutation } from "urql"

interface registerProps {

}

const REGISTER_MUTATION = `
    mutation Register($username: String!, $password: String!){
        register(options: { username: $username, password: $password }) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`

const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useMutation(REGISTER_MUTATION)
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => {
                return register(values)
            }}
        >
            {({ isSubmitting }) => (
                <Wrapper variant={WrapperVariations.Small}>
                    <Form>
                        <InputField
                            name="username"
                            placeholder="Username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            colorScheme="teal"
                            isLoading={isSubmitting}
                        >
                            Register
                        </Button>
                    </Form>
                </Wrapper>
            )}
        </Formik>
    )

}

export default Register;
