import { codecDecode, codecEncode } from "@/shared";
import { config } from "@/shared";
import { rewriteJs } from "@rewriters/js";

export type URLMeta = {
	origin: URL;
	base: URL;
	topFrameName?: string;
	parentFrameName?: string;
};

function tryCanParseURL(url: string, origin?: string | URL): URL | null {
	try {
		return new URL(url, origin);
	} catch {
		return null;
	}
}

export function rewriteBlob(url: string, meta: URLMeta) {
	const blob = new URL(url.substring("blob:".length));

	return "blob:" + meta.origin.origin + blob.pathname;
}

export function unrewriteBlob(url: string) {
	const blob = new URL(url.substring("blob:".length));

	return "blob:" + location.origin + blob.pathname;
}

export function rewriteUrl(url: string | URL, meta: URLMeta) {
	if (url instanceof URL) url = url.toString();

	if (url.startsWith("javascript:")) {
		return (
			"javascript:" +
			rewriteJs(url.slice("javascript:".length), "(javascript: url)", meta)
		);
	} else if (url.startsWith("blob:")) {
		return location.origin + config.prefix + url;
	} else if (url.startsWith("data:")) {
		return location.origin + config.prefix + url;
	} else if (url.startsWith("mailto:") || url.startsWith("about:")) {
		return url;
	} else {
		let base = meta.base.href;

		if (base.startsWith("about:")) base = unrewriteUrl(self.location.href); // jank!!!!! weird jank!!!
		const realUrl = tryCanParseURL(url, base);
		if (!realUrl) return url;
		const encodedHash = codecEncode(realUrl.hash.slice(1));
		const realHash = encodedHash ? "#" + encodedHash : "";
		realUrl.hash = "";

		return (
			location.origin + config.prefix + codecEncode(realUrl.href) + realHash
		);
	}
}

export function unrewriteUrl(url: string | URL) {
	if (url instanceof URL) url = url.toString();
	// remove query string
	// if (url.includes("?")) {
	// 	url = url.split("?")[0];
	// }

	const prefixed = location.origin + config.prefix;

	if (url.startsWith("javascript:")) {
		//TODO
		return url;
	} else if (url.startsWith("blob:")) {
		// realistically this shouldn't happen
		return url;
	} else if (url.startsWith(prefixed + "blob:")) {
		return url.substring(prefixed.length);
	} else if (url.startsWith(prefixed + "data:")) {
		return url.substring(prefixed.length);
	} else if (url.startsWith("mailto:") || url.startsWith("about:")) {
		return url;
	} else {
		const realUrl = tryCanParseURL(url);
		if (!realUrl) return url;
		const decodedHash = codecDecode(realUrl.hash.slice(1));
		const realHash = decodedHash ? "#" + decodedHash : "";
		realUrl.hash = "";

		return codecDecode(realUrl.href.slice(prefixed.length) + realHash);
	}
}
