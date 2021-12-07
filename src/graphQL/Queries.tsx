import { gql } from "@apollo/client";

export const LOAD_POSTS = (count: any) => gql`
    query {
        allPosts(count:${count}){
            id
            title
            body
            published
            __typename
            createdAt
            likelyTopics{
                label
                likelihood
            }
            author{
                id
                firstName
                lastName
                email
                avatar
            }
        }
    }
`;