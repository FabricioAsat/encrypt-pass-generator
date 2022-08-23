import { ChangeEvent, useState } from "react";

const alphabet = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const randomEncryptValue = 7; //

export const Encrypter = () => {
	const [copied, setCopied] = useState<boolean>(false);
	const [textToEncrypt, setTextToEncrypt] = useState<string>("");
	const [textEncrypted, setTextEncrypted] = useState<string>("");

	// * Handle the states of the textarea.
	function handleChangeTextToEncrypt(e: ChangeEvent<HTMLTextAreaElement>, to: string) {
		if (to === "toEncrypt") setTextToEncrypt(e.target.value);
		if (to === "encrypt") setTextEncrypted(e.target.value);
	}

	// * Copy te encrypt or decrypt text in the clipboard
	function handleCopyText(textToCopy: string) {
		navigator.clipboard.writeText(textToCopy);

		setCopied(true);
		const time = setTimeout(() => {
			setCopied(false);
			clearTimeout(time);
		}, 500);
	}

	// * Encrypt function
	function encryptText() {
		let word = "";

		for (const letter of textToEncrypt.toLowerCase()) {
			if (!alphabet.includes(letter)) {
				word += letter;
				continue;
			}

			word += alphabet[(alphabet.indexOf(letter) + randomEncryptValue) % alphabet.length];
		}
		setTextEncrypted(word);
		setTextToEncrypt("");
	}

	// * Decrypt function
	function decryptText() {
		let word = "";

		for (const letter of textEncrypted.toLowerCase()) {
			if (!alphabet.includes(letter)) {
				word += letter;
				continue;
			}
			word +=
				alphabet[
					(alphabet.length + alphabet.indexOf(letter) - randomEncryptValue) % alphabet.length
				];
		}
		setTextEncrypted("");
		setTextToEncrypt(word);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-x-8 px-4">
			{copied && (
				<div className="fixed bottom-5 left-5 bg-gray-900 text-teal-400 px-4 py-2">
					<small className="shortSize italic font-bold">Password copied</small>
				</div>
			)}

			<article className="flex flex-col items-center lg:gap-y-5">
				<textarea
					name=""
					id=""
					cols={30}
					rows={10}
					maxLength={261}
					value={textToEncrypt}
					onChange={(e) => {
						handleChangeTextToEncrypt(e, "toEncrypt");
					}}
					placeholder="Text to encrypt - 300 characters maximum."
					className="w-full max-w-lg bg-inherit border-2 outline-none text-center border-teal-400 shortSize lg:lowShortSize font-bold py-2 hover:cursor-text placeholder:text-center placeholder:italic resize-none m-5 px-5 rounded-md"
				/>

				<div className="flex gap-x-5">
					<button
						onClick={encryptText}
						disabled={!textToEncrypt}
						className="font-bold italic bg-teal-400 text-darkDark px-4 py-2 rounded-md disabled:opacity-50">
						Encrypt
					</button>
					<button
						className={`shortSize py-2 px-4 text-teal-400 font-bold ${
							!textToEncrypt ? "opacity-20" : "opacity-100"
						}`}
						disabled={!textToEncrypt}
						onClick={() => {
							handleCopyText(textToEncrypt);
						}}>
						Copy text
					</button>
				</div>
			</article>

			<article className="flex flex-col items-center lg:gap-y-5">
				<textarea
					name=""
					id=""
					cols={30}
					rows={10}
					maxLength={300}
					placeholder="Encrypted text - 300 characters maximum"
					onChange={(e) => {
						handleChangeTextToEncrypt(e, "encrypt");
					}}
					value={textEncrypted}
					className="w-full max-w-lg bg-inherit border-2 outline-none text-center border-teal-400 shortSize lg:lowShortSize font-bold py-2 hover:cursor-text placeholder:text-center placeholder:italic resize-none m-5 px-5 rounded-md"
				/>

				<div className="flex gap-x-5">
					<button
						onClick={decryptText}
						disabled={!textEncrypted}
						className="font-bold italic bg-teal-400 text-darkDark px-4 py-2 rounded-md disabled:opacity-50">
						Decrypt
					</button>
					<button
						className={`shortSize py-2 px-4 text-teal-400 font-bold ${
							!textEncrypted ? "opacity-20" : "opacity-100"
						}`}
						disabled={!textEncrypted}
						onClick={() => {
							handleCopyText(textEncrypted);
						}}>
						Copy text
					</button>
				</div>
			</article>
		</div>
	);
};
