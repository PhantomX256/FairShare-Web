/**
 * Converts the date from string format into relative
 * time like "2 days ago" or such.
 */
export function getRelativeTime(stringDate: string) {
	const diff = Date.now() - new Date(stringDate).getTime();

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const months = Math.floor(days / 30);

	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
	if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
	if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
	if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
	return "More than a year ago";
}