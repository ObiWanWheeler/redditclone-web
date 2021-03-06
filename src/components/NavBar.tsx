import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	});
	const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();
	let body;
	if (fetching) {
		body = null;
	} else if (!data?.me.user?.id) {
		body = (
			<React.Fragment>
				<NextLink href="login">
					<Link mr="4">Login</Link>
				</NextLink>
				<NextLink href="register">
					<Link mr="4">Register</Link>
				</NextLink>
			</React.Fragment>
		);
	} else {
		body = (
			<Flex align="center">
				<Box mr="4">{data.me.user.username}</Box>
				<Box mr="4">
					<NextLink href="create_post">
						<Button>Create Post</Button>
					</NextLink>
				</Box>
				<Box mr="4">
					<Button
						onClick={() => logout()}
						isLoading={fetchingLogout}
						variant="link"
					>
						Logout
					</Button>
				</Box>
			</Flex>
		);
	}

	return (
		<Box
			position="sticky"
			top={0}
			zIndex={1}
			color="black"
			fontWeight="bold"
			bg="tan"
			py="4"
		>
			<Flex maxW={"45%"} align="center" mx="auto">
				<Box my="auto" mr="auto" px={5} py={3} fontSize="4xl">
					<NextLink href="/">
						<Link>"Reddit" (no, really)</Link>
					</NextLink>
				</Box>
				<Box my="auto" ml="auto" px={5} py={3} fontSize="md">
					{body}
				</Box>
			</Flex>
		</Box>
	);
};
