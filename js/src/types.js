//@flow

export type ValidateResponse = {
	ok: boolean;
} | boolean;

export type ValidateStepCallback = () => Promise<ValidateResponse>;
