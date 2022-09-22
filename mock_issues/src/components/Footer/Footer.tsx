import styled from "styled-components";
import { MarkGithubIcon } from "@primer/octicons-react";

const navlists = [
	"Terms",
	"Privacy",
	"Security",
	"Status",
	"Docs",
	"Contact GitHub",
	"Pricing",
	"API",
	"Training",
	"Blog",
	"About",
];
export default function Footer() {
	return (
		<WrapperBox>
			<InsideWrapperBox>
				<LogoIncBox>
					<CatLogoIcon size={24} />
					<RegisterSpan>© 2022 GitHub, Inc.</RegisterSpan>
				</LogoIncBox>
				<NavListBoxUl>
					{navlists.map((element) => {
						return (
							<NavListItem>
								<NavListA>{element}</NavListA>
							</NavListItem>
						);
					})}
				</NavListBoxUl>
			</InsideWrapperBox>
		</WrapperBox>
	);
}

const WrapperBox = styled.div`
	margin-top: 40px;

	padding-left: 16px;
	padding-right: 16px;

	@media screen and (min-width: 544px) {
		padding-left: 40px;
		padding-right: 40px;
	}
	@media screen and (min-width: 768px) {
	}
	@media screen and (min-width: 1012px) {
		padding-left: 16px;
		padding-right: 16px;
	}
	@media screen and (min-width: 1280px) {
		width: 1248px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const InsideWrapperBox = styled.div`
	border-top: 1px solid #d0d7de;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding-top: 40px;
	padding-bottom: 8px;
	@media screen and (min-width: 1012px) {
		justify-content: flex-start;
	}
`;

const LogoIncBox = styled.div`
	display: flex;
	list-style: none;
	margin-bottom: 8px;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	font-size: 12px;
	color: #57606a;
	order: 1;
	margin-top: 8px;
	@media screen and (min-width: 1012px) {
		margin-top: 0px;
		order: 0;
		width: 16.66666666%;
	}
`;

const RegisterSpan = styled.span`
	margin-left: 8px;
`;

const NavListBoxUl = styled.ul`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
	@media screen and (min-width: 768px) {
		width: 100%;
	}
	@media screen and (min-width: 1012px) {
		width: 66.66666664%;
		justify-content: space-between;
	}
`;

const NavListItem = styled.li`
	margin-right: 16px;
`;
const NavListA = styled.a`
	color: #0969da;
	text-decoration: none;
	background-color: transparent;
	font-size: 12px;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

const CatLogoIcon = styled(MarkGithubIcon)`
	fill: #6e7781;
	cursor: pointer;
	&:hover {
		fill: #000;
	}
`;
