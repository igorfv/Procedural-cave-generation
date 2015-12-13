// Generate Seed from string
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


// Generate random from Seed
var Seed = (function(){
	return {
		"value" : 0,
		"setValue" : function setValue(value) {
			if(typeof value != "number") {
				if(typeof value == "string") {
					this.value = value.hashCode();
				}
				else {
					this.value = Math.random()*(Math.pow(1000, 3)) << 0;
				}
			}
			else
			{
				this.value = value;
			}
		},
		"random" : function random() {
		  var x = Math.sin(this.value++) * 10000;
		  return x - Math.floor(x);
		}
	}
})();




//Draw helper
var drawPointHelper = function(ctx, x, y, w, h, value){

		ctx.fillStyle = "#000";

		if(value == 0) {
			ctx.fillStyle = "#fff";			
		}
		
	  ctx.fillRect (x, y, 1, 1);
};