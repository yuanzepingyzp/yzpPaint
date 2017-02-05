window.onload=function(){
  var test=yzppen("canvas").moveTo().shape("square",{coord:{x:100,y:100},width:100,height:100,fillets:[10,10,10,10]}).fill("rgb(100,100,100)").stroke(5,"rgb(100,200,200)");
  var circle=yzppen("canvas").moveTo({x:200,y:500}).shape("circle",{coord:{x:200,y:500},radius:100}).fill("rgb(100,200,200)").stroke(5,"rgb(100,100,100)");
  var test2=yzppen("canvas").moveTo({x:500,y:200}).lineTo([{x:800,y:200},{x:500,y:400}]).stroke(10,"rgb(100,100,100)");
}
function yzppen(id){
  return new Yzppen(id);
}
function Yzppen(id){
  var canvas=document.getElementById(id);
  var context=canvas.getContext("2d");
  /*入参形如({x:100,y:100})*/
  this.moveTo=function(coord){
    context.beginPath();
    if(coord){
      context.moveTo(coord.x,coord.y);
    }else{
      context.moveTo(0,0);
    }
    return this;
  };
  /*入参形如[{x:100,y:100},{x:100,y:200}]*/
  this.lineTo=function(coords){
    for(var i=0;i<coords.length;i++){
        context.lineTo(coords[i].x,coords[i].y);
    }
    return this;
  };
  this.arcTo=function(coord1,coord2,radius){
    context.arcTo(coord1.x,coord1.y,coord2.x,coord2.y,radius);
    return this;
  };
  this.fill=function(fillStyle){
    context.fillStyle=fillStyle;
    context.fill();
    return this;
  };
  this.stroke=function(lineWidth,strokeStyle){
    context.lineWidth=lineWidth;
    context.strokeStyle=strokeStyle;
    context.stroke();
    return this;
  };
  /*入参形如gradient("radial",{start:{x:100,y:100,radius:10},end:{x:100,y:100,radius:30},colorStop:[{point:0,color:"rgb(100,200,200)"},{point:1,color:"rgb(100,240,240)"}]})*/
  this.gradient=function(type,config){
    var gradient;
    switch (type)
    {
      case "linear":
      gradient=context.createLinearGradient(config.start.x,config.start.y,config.end.x,config.end.y);
      for(var i=0;i<config.colorStop.length;i++){
        gradient.addColorStop(config.colorStop[i].point,config.colorStop[i].color);
      }
      break;
      case "radial":
      gradient=context.createRadialGradient(config.start.x,config.start.y,config.start.radius,config.end.x,config.end.y,config.end.radius)
      for(var i=0;i<config.colorStop.length;i++){
        gradient.addColorStop(config.colorStop[i].point,config.colorStop[i].color);
      }
      break;
    }
    return gradient;
  };
  /*入参形如("circle",{coord:{x:100,y:100},radius)画圆*/
  /*入参形如("square",{coord:{x:100,y:100},width:50,height:50,fillets:[5,5,5,5]})画矩形*/
  this.shape=function(type,config){
    switch (type)
    {
      case "circle":
      context.arc(config.coord.x,config.coord.y,config.radius,0,2*Math.PI);
      context.closePath();
      break;
      case "square":
      this.moveTo(config.coord.x+config.fillets[0],config.coord.y).lineTo([{x:config.coord.x+config.width-config.fillets[1],y:config.coord.y}]).arcTo({x:config.coord.x+config.width,y:config.coord.y},{x:config.coord.x+config.width,y:config.coord.y+config.fillets[1]},config.fillets[1]).lineTo([{x:config.coord.x+config.width,y:config.coord.y+config.height-config.fillets[2]}]).arcTo({x:config.width+config.coord.x,y:config.height+config.coord.y},{x:config.width+config.coord.x-config.fillets[2],y:config.coord.y+config.height},config.fillets[2]).lineTo([{x:config.coord.x+config.fillets[3],y:config.coord.y+config.height}]).arcTo({x:config.coord.x,y:config.coord.y+config.height},{x:config.coord.x,y:config.coord.y+config.height-config.fillets[3]},config.fillets[3]).lineTo([{x:config.coord.x,y:config.coord.y+config.fillets[0]}]).arcTo({x:config.coord.x,y:config.coord.y},{x:config.coord.x+config.fillets[0],y:config.coord.y},config.fillets[0]);
      context.closePath();
      break;
    }
    return this;
  };
  /*入参形如({offset:{x:10,y:10},blur:10,color:"rgb(100,100,100)"})*/
  this.shadow=function(config){
    context.shadowOffsetX=config.offset.x;
    context.shadowOffsetY=config.offset.y;
    context.shadowBlur=config.blur;
    context.shadowColor=config.color;
    return this;
  };
  this.text=function(type,config){
    context.beginPath();
    context.font="Regular 10px 微软雅黑";
    context.strokeStyle=config.color;
    context.lineWidth=config.lineWidth;
    context.strokeText(config.content,config.coord.x,config.coord.y);
  }
}
