function round10(number, decimals) {
	decimals = +decimals || 0;
	
	var multiplier = Math.pow(10, decimals);
	
	return Math.round(number * multiplier) / multiplier;
};

function hexToRgb (hex) {
	var rgb = [0,0,0];

	hex = (hex +'').replace(/#/, '');

	if (hex.length == 3){
		hex = hex + hex;	
	} 

	for (var i = 0; i < 6; i+=2) {
	   rgb[i/2] = parseInt(hex.substr(i,2),16);
	}

	return rgb;
}

function getLuminanceFromRgb (rgbValue) {
	var rgb = rgbValue.slice(0,3);
		
	for(var i=0; i<3; i++) {
		var value = rgbValue[i] / 255;
		
		value = value < 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
		
		rgb[i] = value;
	}

	// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef	
	// 0.2126 * R + 0.7152 * G + 0.0722 * B
	return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio (foreground, background) {
	var foregroundRgb = hexToRgb(foreground);
	var backgroundRgb = hexToRgb(background);

	var l1 = getLuminanceFromRgb(foregroundRgb) + 0.05;
	var l2 = getLuminanceFromRgb(backgroundRgb) + 0.05;

	var ratio = l1/l2;
		
	if (l2 > l1) {
		ratio = 1 / ratio;
	}
		
	ratio = round10(ratio, 1);

	return ratio;
}

function wcagCheck(ratio) {
	if (ratio >= 7){
		return "AAA";
	} else if (ratio >= 4.5 && ratio < 7){
		return "AA";
	} else if (ratio >= 3 && ratio < 4.5){
		return "AA-large";
	} else {
		return "Fail";
	}
}