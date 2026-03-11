/**
 * Converts the date from string format into relative
 * time like "2 days ago" or such.
 */
export function getRelativeTime(stringDate?: string) {
	const diff = stringDate ? Date.now() - new Date(stringDate).getTime() : 0;

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const months = Math.floor(days / 30);

	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
	if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"}`;
	if (days < 30) return `${days} day${days === 1 ? "" : "s"}`;
	if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
	return "More than a year ago";
}

export function getMonthAndYear(stringDate: string) {
	return new Date(stringDate).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
	});
}

export function getCurrentDayMonthDate() {
	const now = new Date();

	const ordinal = (n: number) => {
		const s = ["th", "st", "nd", "rd"];
		const v = n % 100;
		return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
	};

	const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
	const month = now.toLocaleDateString("en-US", { month: "long" });
	const day = ordinal(now.getDate());

	return `${weekday}, ${month} ${day}`;
}

export function minutes(x: number) {
	return 1000 * 60 * x;
}