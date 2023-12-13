import { useContext } from "solid-js";
import { ThemeContext } from "~/components/themeProvider";

export default function useTheme() {
	return useContext(ThemeContext);
}
