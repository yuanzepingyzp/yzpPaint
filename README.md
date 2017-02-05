# yzpPaint
##Example
```javascript
var test=yzppen("canvas").moveTo().shape("square",{coord:{x:100,y:100},width:100,height:100,fillets:[10,10,10,10]}).fill("rgb(100,100,100)").stroke(5,"rgb(100,200,200)");
  var circle=yzppen("canvas").moveTo({x:200,y:500}).shape("circle",{coord:{x:200,y:500},radius:100}).fill("rgb(100,200,200)").stroke(5,"rgb(100,100,100)");
  var test2=yzppen("canvas").moveTo({x:500,y:200}).lineTo([{x:800,y:200},{x:500,y:400}]).stroke(10,"rgb(100,100,100)");
```
