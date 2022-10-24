import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useGetSearchUsersListsQuery } from "api/searchUsersSlice";

export default function UsersLists() {
	const { searchname } = useParams();
	const { data: searchUsersData } = useGetSearchUsersListsQuery(searchname);

	return (
		<>
			{searchUsersData ? (
				<WrapperBox>
					<CountTitle>{`${searchUsersData.total_count
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} users`}</CountTitle>
					<Line />
					<div>
						{searchUsersData?.items?.map((element) => {
							return (
								<ItemBox>
									<ImageBox>
										<img src={element.avatar_url} />
									</ImageBox>
									<div>
										<UserName to={`/${element.login}/repos`}>
											{element.login}
										</UserName>
									</div>
								</ItemBox>
							);
						})}
					</div>
				</WrapperBox>
			) : (
				<></>
			)}
		</>
	);
}

const WrapperBox = styled.div`
	// margin-top: 16px;
	// margin-bottom: 16px;
	// padding-right: 8px;
	// padding-left: 8px;
	margin-left: auto;
	margin-right: auto;
	width: 80%;
	margin-top: 20px;
	margin-bottom: 50px;
`;

const CountTitle = styled.div`
	font-weight: 600;
	font-size: 20px;
	padding-bottom: 16px;
`;

const ImageBox = styled.div`
	width: 20px;
	height: 20px;
	margin-right: 16px;
`;

const Line = styled.div`
	border-top: 1px solid #d0d7de;
`;
const ItemBox = styled.div`
	padding: 16px;
	padding-left: 0px;
	padding-right: 0px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #d0d7de;
	&:last-child {
		border-bottom-width: 0px;
	}
`;

const UserName = styled(Link)`
	font-weight: 600;
	color: #0969da;
`;
