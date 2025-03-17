import Encryptor from "tiny-encryptor"

const CRYPTO_KEY_ENV = "CRYPTO_KEY"

function getSecret(): string {
	const secret = process.env[CRYPTO_KEY_ENV]
	if (!secret) throw new Error("No secret provided in environment variables")
	return secret
}

export async function encryptImage(base64Image: string): Promise<string> {
	if (typeof base64Image !== "string" || base64Image.length === 0) {
		throw new Error("Invalid input: base64Image must be a non-empty string")
	}

	const secret = getSecret()
	const encrypted = await Encryptor.encrypt(base64Image, secret)
	return Buffer.from(encrypted).toString("base64")
}

export async function decryptImage(encryptedImage: string): Promise<string> {
	if (typeof encryptedImage !== "string" || encryptedImage.length === 0) {
		throw new Error("Invalid input: encryptedImage must be a non-empty string")
	}

	const secret = getSecret()
	const encryptedBuffer = Buffer.from(encryptedImage, "base64")

	try {
		const decryptedUint8Array = await Encryptor.decrypt(encryptedBuffer, secret)
		return Buffer.from(decryptedUint8Array).toString("utf-8")
	} catch (error) {
		throw new Error("Decryption failed: " + (error instanceof Error ? error.message : String(error)))
	}
}
