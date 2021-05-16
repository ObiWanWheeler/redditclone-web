import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import {
	Post,
	RegularPostFragment,
	useVoteMutation,
} from "../generated/graphql";
import { formatDate } from "../utils/formatDate";
import { UpdootWidget } from "./UpdootWidget";

interface PostProps {
	post: RegularPostFragment & Pick<Post, "textSnippet">;
}

const iconButtonOptions = {
	variant: "solid",
	mx: 0.5,
};

export const PostPreview: React.FC<PostProps> = ({ post }) => {
	const [{ fetching }, vote] = useVoteMutation();
	const updoots = useState(0);

	return (
		<Flex
			key={`post-${post.id}-container`}
			p={5}
			shadow="md"
			borderWidth="1px"
			flexDirection="row"
		>
			<UpdootWidget post={post} direction={"column"} />
			<Box>
				<Heading fontSize="xl">
					<NextLink href={`post/${post.id}`}>
						<Link>{post.title}</Link>
					</NextLink>
				</Heading>
				<Text mt={4}>{post.textSnippet}</Text>
				<p>
					by {post.author.username} on {formatDate(post.createdAt)}
				</p>
			</Box>
		</Flex>
	);
};
