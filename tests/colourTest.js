describe("Colour ratio", function() {

	// convert hex to rgb
	describe("hexToRgb", function() {
		it ("Return array", function() {
			var colour = "#ffffff";
			var rgb = hexToRgb(colour);

			expect(rgb.length).toBe(3);
		});

		it ("Convert 3 hex in white", function() {
			var colour = "#fff";
			var rgb = hexToRgb(colour);

			expect(rgb[0]).toBe(255);
			expect(rgb[1]).toBe(255);
			expect(rgb[2]).toBe(255);
		});

		it ("Convert white", function() {
			var colour = "#ffffff";
			var rgb = hexToRgb(colour);

			expect(rgb[0]).toBe(255);
			expect(rgb[1]).toBe(255);
			expect(rgb[2]).toBe(255);
		});

		it ("Convert light blue", function() {
			var colour = "#40B9D2";
			var rgb = hexToRgb(colour);

			expect(rgb[0]).toBe(64);
			expect(rgb[1]).toBe(185);
			expect(rgb[2]).toBe(210);
		});
	});		

	// convert rgb to hsl
	describe("getLuminanceFromRgb", function() {
		it ("Get luminance from white", function() {
			var rgb = [255,255,255];
			var luminance = getLuminanceFromRgb(rgb);

			expect(luminance).toBe(1);
		});

		it ("Get luminance from black", function() {
			var rgb = [0,0,0];
			var luminance = getLuminanceFromRgb(rgb);

			expect(luminance).toBe(0);
		});

		it ("Get luminance from blue", function() {
			var rgb = [0,0,255];
			var luminance = getLuminanceFromRgb(rgb);

			expect(luminance).toBe(0.0722);
		});

		it ("Get luminance from yellow", function() {
			var rgb = [255,255,0];
			var luminance = getLuminanceFromRgb(rgb);

			expect(luminance).toBe(0.9278);
		});
	});	

	// check contrast ratio
	describe("Contrast ratio", function() {		
		it ("White/white colour scenario", function() {
			var foreground = "#ffffff";
			var background = "#ffffff";

			var ratio = contrastRatio(foreground, background);
			
			expect(ratio).toBe(1);
		});

		it ("Black/white colour scenario", function() {
			var foreground = "#ffffff";
			var background = "#000000";

			var ratio = contrastRatio(foreground, background);
			
			expect(ratio).toBe(21);
		});

		it ("Blue/yellow colour scenario", function() {
			var foreground = "#0000ff";
			var background = "#ffff00";

			var ratio = contrastRatio(foreground, background);
			
			expect(ratio).toBe(8);
		});

		it ("Blue/white colour scenario", function() {
			var foreground = "#0000ff";
			var background = "#ffffff";

			var ratio = contrastRatio(foreground, background);
			
			expect(ratio).toBe(8.6);
		});
	});		

	describe("WCAG check", function() {			
		it ("Fail scenario", function() {
			var ratio = 1;
			var result = wcagCheck(ratio);
			
			expect(result).toBe("Fail");
		});

		it ("AA-large scenario", function() {
			var ratio = 3;
			var result = wcagCheck(ratio);
			
			expect(result).toBe("AA-large");
		});

		it ("AA scenario", function() {
			var ratio = 4.5;
			var result = wcagCheck(ratio);
			
			expect(result).toBe("AA");
		});

		it ("AAA scenario", function() {
			var ratio = 7;
			var result = wcagCheck(ratio);
			
			expect(result).toBe("AAA");
		});
	});
});