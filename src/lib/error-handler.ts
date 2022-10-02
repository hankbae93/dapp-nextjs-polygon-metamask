import { AssertionError } from "assert";
import { ethers, BigNumber } from "ethers";
import { defaultAbiCoder, Interface } from "ethers/lib/utils";

export function getReasonFromError(error: any, iface: Interface): string {
  const returnData = getReturnDataFromError(error);
  const decodeData = decodeReturnData(returnData, iface);

  return decodeData;
}

// method id of 'Error(string)'
const ERROR_STRING_PREFIX = "0x08c379a0";

// method id of 'Panic(uint256)'
const PANIC_CODE_PREFIX = "0x4e487b71";

const PANIC_CODES = {
  ASSERTION_ERROR: 0x1,
  ARITHMETIC_UNDER_OR_OVERFLOW: 0x11,
  DIVISION_BY_ZERO: 0x12,
  ENUM_CONVERSION_OUT_OF_BOUNDS: 0x21,
  INCORRECTLY_ENCODED_STORAGE_BYTE_ARRAY: 0x22,
  POP_ON_EMPTY_ARRAY: 0x31,
  ARRAY_ACCESS_OUT_OF_BOUNDS: 0x32,
  TOO_MUCH_MEMORY_ALLOCATED: 0x41,
  ZERO_INITIALIZED_VARIABLE: 0x51,
};

function getReturnDataFromError(error: any): string {
  if (!(error instanceof Error)) {
    throw new AssertionError({ message: "Expected an Error object" });
  }

  // cast to any again so we don't have to cast it every time we access
  // some property that doesn't exist on Error
  error = error as any;

  const errorData = error.data ?? error.error?.data;

  if (errorData === undefined) {
    return "";
  }

  const returnData = typeof errorData === "string" ? errorData : errorData.data;

  if (returnData === undefined || typeof returnData !== "string") {
    return "";
  }

  return returnData;
}

function decodeReturnData(returnData: string, iface: Interface): string {
  if (returnData === "0x") {
    return "";
  } else if (returnData.startsWith(ERROR_STRING_PREFIX)) {
    const encodedReason = returnData.slice(ERROR_STRING_PREFIX.length);
    let reason: string;
    try {
      reason = defaultAbiCoder.decode(["string"], `0x${encodedReason}`)[0];
    } catch (e: any) {
      return "";
    }

    return reason;
  } else if (returnData.startsWith(PANIC_CODE_PREFIX)) {
    const encodedReason = returnData.slice(PANIC_CODE_PREFIX.length);
    let code: BigNumber;
    try {
      code = defaultAbiCoder.decode(["uint256"], `0x${encodedReason}`)[0];
    } catch (e: any) {
      return "";
    }

    const panicDescription =
      panicErrorCodeToReason(code) ?? "unknown panic code";
    return panicDescription;
  }

  const customErrorName = findCustomErrorById(iface, returnData.slice(0, 10));
  return customErrorName;
}

function panicErrorCodeToReason(errorCode: BigNumber): string | undefined {
  switch (errorCode.toNumber()) {
    case 0x1:
      return "Assertion error";
    case 0x11:
      return "Arithmetic operation underflowed or overflowed outside of an unchecked block";
    case 0x12:
      return "Division or modulo division by zero";
    case 0x21:
      return "Tried to convert a value into an enum, but the value was too big or negative";
    case 0x22:
      return "Incorrectly encoded storage byte array";
    case 0x31:
      return ".pop() was called on an empty array";
    case 0x32:
      return "Array accessed at an out-of-bounds or negative index";
    case 0x41:
      return "Too much memory was allocated, or an array was created that is too large";
    case 0x51:
      return "Called a zero-initialized variable of internal function type";
  }
}

function findCustomErrorById(iface: Interface, id: string): string {
  const customErrorEntry = Object.entries(iface.errors).find(
    ([signature]) => ethers.utils.id(signature).slice(0, 10) === id
  );
  if (customErrorEntry === undefined) {
    return "";
  }

  return customErrorEntry[1].name;
}

function findCustomErrorByName(iface: Interface, name: string) {
  const customErrorEntry = Object.entries(iface.errors).find(
    ([, fragment]) => fragment.name === name
  );
  if (customErrorEntry === undefined) {
    return undefined;
  }
  const [customErrorSignature] = customErrorEntry;
  const customErrorId = ethers.utils.id(customErrorSignature).slice(0, 10);
  return {
    id: customErrorId,
    name,
    signature: customErrorSignature,
  };
}
