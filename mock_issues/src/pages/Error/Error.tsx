import errorImage from "./error.png";
import { useParams } from "react-router-dom";
export default function Error() {
	const { status, message } = useParams();

	return (
		<div
			className="min-h-[200px] object-cover flex items-center mb-[-40px]"
			style={{
				backgroundImage: `url(${errorImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="flex-1">
				<div className="text-[#fff] ml-[3%] text-[15vw] font-medium">
					{status ?? 404}
				</div>
				<div className="text-[#fff] ml-[3%] text-[8vw] font-medium">
					{message ?? "not found"}
				</div>
			</div>
		</div>
	);
}
