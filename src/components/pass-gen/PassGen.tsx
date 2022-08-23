import { ChangeEvent, useEffect, useState } from "react";

type optionsType = { length: number; capital: boolean; digits: boolean; symbols: boolean };

const allowedCharacters = {
	basic: "abcdefghijklmnopqrstuvwxyz",
	capital: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	digits: "1234567890",
	symbols: `!"'#$%&*+,-./:;<=>?@[\]^_|~`,
};

export const PassGen = () => {
	const [copied, setCopied] = useState<boolean>(false);
	const [passValue, setPassValue] = useState<string>("");
	const [characters, setCharacters] = useState<string>(allowedCharacters.basic);
	const [options, setOptions] = useState<optionsType>({
		length: 50,
		capital: false,
		digits: false,
		symbols: false,
	});

	// * Handler de estados y longitud para la password
	function handleOptionsChange(e: ChangeEvent<HTMLInputElement>, type: string) {
		switch (type) {
			case "length":
				setOptions({ ...options, length: parseInt(e.target.value) });
				break;
			case "capital":
				setOptions({ ...options, capital: !options.capital });
				break;
			case "digits":
				setOptions({ ...options, digits: !options.digits });
				break;
			case "symbols":
				setOptions({ ...options, symbols: !options.symbols });
				break;
			default:
				break;
		}
	}

	// * Establece los caracteres permitidos en la password
	useEffect(() => {
		if (options.capital && !characters.includes(allowedCharacters.capital)) {
			setCharacters(characters + allowedCharacters.capital);
		} else if (!options.capital && characters.includes(allowedCharacters.capital)) {
			setCharacters(characters.replace(allowedCharacters.capital, ""));
		}

		if (options.digits && !characters.includes(allowedCharacters.digits)) {
			setCharacters(characters + allowedCharacters.digits);
		} else if (!options.digits && characters.includes(allowedCharacters.digits)) {
			setCharacters(characters.replace(allowedCharacters.digits, ""));
		}

		if (options.symbols && !characters.includes(allowedCharacters.symbols)) {
			setCharacters(characters + allowedCharacters.symbols);
		} else if (!options.symbols && characters.includes(allowedCharacters.symbols)) {
			setCharacters(characters.replace(allowedCharacters.symbols, ""));
		}
	}, [options]);

	// * Genera la password
	function handleGeneratePassword() {
		let pass = "";
		for (let i = 0; i <= options.length; i++) {
			pass += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		setPassValue(pass);
	}

	// * Copia la password
	function handleCopyPass() {
		navigator.clipboard.writeText(passValue);

		setCopied(true);
		const time = setTimeout(() => {
			setCopied(false);
			clearTimeout(time);
		}, 500);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 justify-items-center">
			{copied && (
				<div className="fixed bottom-5 left-5 bg-gray-900 text-teal-400 px-4 py-2">
					<small className="shortSize italic font-bold">Password copied</small>
				</div>
			)}

			<aside className="flex flex-col items-center shortSize">
				<p className="text-teal-400 text-center font-bold">Select your preferred password type.</p>

				<article className="flex flex-col gap-y-4 py-4 items-center md:items-start">
					<section className="flex w-full justify-start gap-x-4 select-none">
						<label htmlFor="length">Pass length?</label>

						<div className="flex gap-x-4 items-center">
							<input
								type="range"
								name="length"
								id="length"
								min={10}
								max={50}
								onChange={(e) => handleOptionsChange(e, "length")}
								className="appearance-none w-full h-0.5 bg-teal-400 rounded-full outline-none slider-thumb cursor-pointer"
							/>
							<p>{options.length}</p>
						</div>
					</section>

					<section className="flex w-full justify-start gap-x-4 select-none">
						<input
							type="checkbox"
							name="capital"
							id="capital"
							className="accent-teal-400 cursor-pointer"
							checked={options.capital}
							onChange={(e) => handleOptionsChange(e, "capital")}
						/>
						<label
							htmlFor="capital"
							className={`cursor-pointer ${options.capital ? "opacity-100" : "opacity-70"}`}>
							Include capital letters? [A-Z]
						</label>
					</section>

					<section className="flex w-full justify-start gap-x-4 select-none">
						<input
							type="checkbox"
							name="digits"
							id="digits"
							className="accent-teal-400 cursor-pointer"
							checked={options.digits}
							onChange={(e) => handleOptionsChange(e, "digits")}
						/>
						<label
							htmlFor="digits"
							className={`cursor-pointer ${options.digits ? "opacity-100" : "opacity-70"}`}>
							Include digits? [0-9]
						</label>
					</section>

					<section className="flex w-full justify-start gap-x-4 select-none">
						<input
							type="checkbox"
							name="symbols"
							id="symbols"
							className="accent-teal-400 cursor-pointer"
							checked={options.symbols}
							onChange={(e) => handleOptionsChange(e, "symbols")}
						/>
						<label
							htmlFor="symbols"
							className={`cursor-pointer ${options.symbols ? "opacity-100" : "opacity-70"}`}>
							Include symbols? (@*!%&$...)
						</label>
					</section>
				</article>

				<button
					className="font-bold italic bg-teal-400 text-darkDark px-4 py-2 rounded-md"
					onClick={handleGeneratePassword}>
					Generate Password
				</button>
			</aside>

			<span className="flex flex-col justify-center gap-x-3 gap-y-4 w-full max-w-2xl px-10 lg:col-span-2">
				<input
					disabled={true}
					value={passValue}
					type="text"
					placeholder="The password will be displayed here."
					className="w-full bg-inherit border-b-2 outline-none border-teal-400 placeholder:text-center shortSize lg:lowShortSize text-center font-bold py-2 hover:cursor-text"
				/>

				<span className="flex items-center justify-center">
					<button
						className={`shortSize py-2 px-4 text-teal-400 font-bold ${
							!passValue ? "opacity-20" : "opacity-100"
						}`}
						disabled={!passValue}
						onClick={handleCopyPass}>
						Copy password
					</button>
				</span>
			</span>
		</div>
	);
};
