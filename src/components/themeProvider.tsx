import {
	Accessor,
	ParentComponent,
	createContext,
	createRenderEffect,
} from "solid-js";
import useLocalstorage from "~/store/useLocalstorage";

type ColorThemeType = "dark" | "light";

const defaultPreferedColorTheme = window.matchMedia(
	"(prefers-color-scheme: dark)"
)
	? "dark"
	: "light";

const [storedColorTheme, updateColorTheme] = useLocalstorage<ColorThemeType>(
	"color-theme",
	defaultPreferedColorTheme
);

export const ThemeContext = createContext<
	[Accessor<ColorThemeType>, typeof updateColorTheme]
>([storedColorTheme, updateColorTheme]);

const ThemeProvider: ParentComponent = (props) => {
	createRenderEffect(() => {
		document.body.setAttribute("data-color-theme", storedColorTheme());
	});

	return (
		<ThemeContext.Provider value={[storedColorTheme, updateColorTheme]}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
