export default function timeFormat(date) {
	var time;
	var d = new Date(date);
	var n = new Date();
	//获取时间戳
	var dd = d.getTime();
	var h = d.getHours();
	var m = d.getMinutes();
	var Y = d.getFullYear();
	var M = d.getMonth() + 1;
	var D = d.getDate();
	//现在时间
	var nn = n.getTime();
	var hh = n.getHours();
	var mm = n.getMinutes();
	var YY = n.getFullYear();
	var MM = n.getMonth() + 1;
	var DD = n.getDate();

	if (D == DD && M == MM && Y == YY) {
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		time = h + ':' + m;
		return time;
	} else if (D + 1 == DD && M == MM && Y == YY) {
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		time = '昨天' + ' ' + h + ':' + m;
		return time;
	} else {
		if (M < 10) {
			M = '0' + M;
		}
		if (D < 10) {
			D = '0' + D;
		}
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		time = Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m;
		return time;
	}
}