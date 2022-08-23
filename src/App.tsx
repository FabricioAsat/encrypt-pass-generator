import { Encrypter } from "./components/encrypter/Encrypter";
import { PassGen } from "./components/pass-gen/PassGen";

function App() {
	return (
		<div className="max-w-6xl mx-auto pb-20">
			{/* Presentación. */}
			<aside className="flex flex-col items-center gap-y-3 py-6 px-4">
				<h1 className="longSize select-none">
					Welcome to a new <b className="text-violet-600 italic">Proyect</b>
				</h1>
				<p className="shortSize italic">
					This is a project to test logic and learn new methods of the language. In this project I
					will make a <b className="text-teal-400">password generator</b>, a{" "}
					<b className="text-teal-400">César encryptor</b>. With this I reviewed some Strings
					methods, and used a new functionality, the copy to clipboard.
				</p>
			</aside>

			<div className="flex flex-col gap-y-8">
				<aside className="py-8 rounded-xl bg-darkDark shadow-lg shadow-darkDark">
					<h2 className="text-center mediumSize text-violet-600 font-extrabold pb-4">
						Password Generator
					</h2>
					<PassGen />
				</aside>

				<aside className="py-8 rounded-xl shadow-lg shadow-darkDark bg-darkDark">
					<h2 className="text-center mediumSize text-violet-600 font-extrabold pb-4">Encryptor</h2>
					<Encrypter />
				</aside>
			</div>
		</div>
	);
}

export default App;
