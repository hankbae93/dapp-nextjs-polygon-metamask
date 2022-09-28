export const CONTRACT_ADDRESS = "0xd96fF3bA3EAC33A784622B65dB7f7aF614953782";
export const CONTRACT_ABI = [
	{
		inputs: [],
		name: "InvalidA",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "a",
				type: "uint256",
			},
		],
		name: "ChangeA",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_a",
				type: "uint256",
			},
		],
		name: "setA",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "test1",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
