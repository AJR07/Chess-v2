import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/system";

export default function Home() {
	const theme = createTheme({
		status: {
			danger: orange[500],
		},
	});
	return (
		<div id="home">
			
		</div>
	);
}