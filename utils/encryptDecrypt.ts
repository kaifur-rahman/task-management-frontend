import Cryptr from "cryptr";

let cryptr: Cryptr | null = null;

const getCryptr = (): Cryptr => {
  if (!cryptr) {
    const secretKey = process.env.ENCRYPTION_SECRET_KEY;
    if (!secretKey) {
      throw new Error("Cannot get secret key for encryption/decryption");
    }
    cryptr = new Cryptr(secretKey);
  }
  return cryptr;
};

export const encrypt = (plainText: string): string => {
  try {
    const cryptr = getCryptr();
    return cryptr.encrypt(plainText);
  } catch (err: unknown) {
    throw new Error(`Error in encrypting: ${(err as Error).message}`);
  }
};

export const decrypt = (encryptedText: string): string => {
  try {
    const cryptr = getCryptr();
    return cryptr.decrypt(encryptedText);
  } catch (err: unknown) {
    throw new Error(`Error in decrypting: ${(err as Error).message}`);
  }
};
