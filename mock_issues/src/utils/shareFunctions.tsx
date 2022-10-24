function lightOrDark(bgcolor) {
	if (bgcolor.length === 7) {
		const r = parseInt(bgcolor.slice(1, 3), 16);
		const g = parseInt(bgcolor.slice(3, 5), 16);
		const b = parseInt(bgcolor.slice(5, 7), 16);
		const hsp = r * 0.3 + g * 0.6 + b * 0.1;
		if (hsp > 127.5) {
			return "#000000";
		} else {
			return "#ffffff";
		}
	} else if (bgcolor.length === 4) {
		const r = parseInt(bgcolor.slice(1, 2) + bgcolor.slice(1, 2), 16);
		const g = parseInt(bgcolor.slice(2, 3) + bgcolor.slice(2, 3), 16);
		const b = parseInt(bgcolor.slice(3, 4) + bgcolor.slice(3, 4), 16);
		const hsp = r * 0.3 + g * 0.6 + b * 0.1;
		if (hsp > 127.5) {
			return "#000000";
		} else {
			return "#ffffff";
		}
	}
	if (bgcolor === "#ffff" || "#0000") return "#000000";
}

function countRestTime(timeString) {
	const time = new Date(timeString);
	const timeNow = Date.now();
	const diffTime = timeNow - time.getTime();

	const diffDays = Math.floor(diffTime / (24 * 3600 * 1000));
	let hours, minutes, seconds;
	if (diffDays <= 0) {
		const leave1 = diffTime % (24 * 3600 * 1000);
		hours = Math.floor(leave1 / (3600 * 1000));
		if (hours <= 0) {
			const leave2 = leave1 % (3600 * 1000);
			minutes = Math.floor(leave2 / (60 * 1000));
			if (minutes <= 0) {
				const leave3 = leave2 % (60 * 1000);
				seconds = Math.round(leave3 / 1000);
				return `${seconds} seconds ago`;
			} else {
				return `${minutes} minutes ago`;
			}
		} else {
			return `${hours} hours ago`;
		}
	} else if (diffDays <= 30) {
		return `${diffDays} days ago`;
	} else {
		time.toLocaleString("default", { month: "short" });

		time.toLocaleString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		return `on ${time.toLocaleString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})}`;
	}
}

export { lightOrDark, countRestTime };
