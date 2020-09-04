(this.webpackJsonpsite=this.webpackJsonpsite||[]).push([[0],{100:function(t,e){},101:function(t,e,n){},102:function(t,e,n){"use strict";n.r(e);var i=n(21),o=n.n(i),a=n(53),r=n.n(a);n(78),n(79);var s=function(){return o.a.createElement("div",{className:"Footer"},"Footer tmp ")};var c=function(){return o.a.createElement("div",{className:"Header"},"Header")},h=n(47),u=n.n(h),l=n(15),d=n(6),f=n(11),v=n(32),m=function(){function t(e,n,i,o,a){Object(d.a)(this,t),this.p=a,e instanceof v.a?(this.model=e,this.input_nodes=n,this.hidden_nodes=i,this.output_nodes=o):(this.input_nodes=e,this.hidden_nodes=n,this.output_nodes=i,this.model=this.createModel())}return Object(f.a)(t,[{key:"copy",value:function(e){var n=this;return v.g((function(){for(var i=n.createModel(),o=n.model.getWeights(),a=[],r=0;r<o.length;r++)a[r]=o[r].clone();return i.setWeights(a),new t(i,n.input_nodes,n.hidden_nodes,n.output_nodes,e)}))}},{key:"mutate",value:function(t){var e=this;v.g((function(){for(var n=e.model.getWeights(),i=[],o=0;o<n.length;o++){for(var a=n[o],r=n[o].shape,s=a.dataSync().slice(),c=0;c<s.length;c++)if(Math.random(1)<t){var h=s[c];s[c]=h+e.p.randomGaussian()}var u=v.e(s,r);i[o]=u}e.model.setWeights(i)}))}},{key:"dispose",value:function(){this.model.dispose()}},{key:"predict",value:function(t){var e=this;return v.g((function(){var n=v.f([t]);return e.model.predict(n).dataSync()}))}},{key:"createModel",value:function(){var t=v.c(),e=v.b.dense({units:this.hidden_nodes,inputShape:[this.input_nodes],activation:"sigmoid"});t.add(e);var n=v.b.dense({units:this.output_nodes,activation:"softmax"});return t.add(n),t}}]),t}();function p(t){var e,n=function(){function e(t,n,i){Object(d.a)(this,e),this.x=t,this.amount=n,this.width=s*n,this.height=20*i}return Object(f.a)(e,[{key:"show",value:function(){t.fill(0),t.rect(this.x,400-this.height,this.width,this.height)}},{key:"update",value:function(){this.x-=c}},{key:"colision",value:function(t,e){return t+20>=this.x&&t<=this.x+this.width&&e>=400-this.height}},{key:"behindScene",value:function(){return this.x<-50}}]),e}(),i=function(){function t(e,n){Object(d.a)(this,t),this.p=n,this.position_X=100,this.position_Y=200,this.height=50,this.bottom_Y=this.position_Y-this.height,this.gravity=.6,this.velocity=0,this.lift=-10,this.score=0,this.fitness=0,this.brain=e?e.copy(n):new m(4,4,2,n)}return Object(f.a)(t,[{key:"show",value:function(){this.p.fill(0),this.p.rect(this.position_X,this.bottom_Y-this.height,20,this.height)}},{key:"update",value:function(){this.score++,this.velocity+=this.gravity,this.velocity>16&&(this.velocity=16),this.bottom_Y+this.velocity>400?(this.bottom_Y=400,this.velocity=0):this.bottom_Y+=this.velocity,this.show()}},{key:"dispose",value:function(){this.brain.dispose()}},{key:"jump_low",value:function(){this.isGrounded()&&(this.velocity=this.lift)}},{key:"jump_high",value:function(){this.isGrounded()&&(this.velocity=1.2*this.lift)}},{key:"isGrounded",value:function(){return 400===this.bottom_Y}},{key:"mutate",value:function(){this.brain.mutate(g)}},{key:"think",value:function(t){for(var e=null,n=1/0,i=0;i<t.length;i++){var o=t[i].x-this.position_X;o<n&&o>0&&(e=t[i],n=o)}var a=[];a[0]=e.x,a[1]=this.bottom_Y,a[2]=e.width,a[3]=e.height;var r=this.brain.predict(a);r[0]>r[1]&&this.jump_low()}}]),t}(),o=!0,a=[1,1,1,2,2,3],r=[1,1,1,1,1,1,1,1,2,2],s=22,c=6,h=0,u=[],p=[],y=[],g=.1,b=1;function k(){w();for(var t=0;t<20;t++)p[t]=_();for(var e=0;e<20;e++)y[e].dispose();y=[]}function _(){for(var e=0,n=t.random(1);n>0;)n-=y[e].fitness,e++;e--;var o=y[e],a=new i(o.brain,t);return a.mutate(),a}t.setup=function(){t.createCanvas(1e3,500);var n=t.createP("Speed: ");(e=t.createSlider(1,10,1)).parent(n),v.d("cpu");for(var o=0;o<20;o++)p.push(new i(null,t))};var w=function(){var t,e=0,n=Object(l.a)(y);try{for(n.s();!(t=n.n()).done;){e+=t.value.score}}catch(r){n.e(r)}finally{n.f()}var i,o=Object(l.a)(y);try{for(o.s();!(i=o.n()).done;){var a=i.value;a.fitness=a.score/e}}catch(r){o.e(r)}finally{o.f()}};function j(){if(h%90===0){var e=t.random(100,300),i=t.random(a),o=t.random(r);u.push(new n(1e3+e,i,o)),h=0}h++}function E(){for(var t=0;t<u.length;t++){u[t].update(),u[t].show();for(var e=0;e<p.length;e++)u[t].colision(p[e].position_X,p[e].bottom_Y)&&y.push(p.splice(e,1)[0])}}function O(){for(var t=u.length-1;t>=0;t--)u[t].behindScene()&&u.splice(t,1)}t.draw=function(){if(o){for(var n=0;n<e.value();n++){t.background(189,96,96),t.line(0,400,1e3,400),j(),E(),O();var i,a=Object(l.a)(p);try{for(a.s();!(i=a.n()).done;){var r=i.value;r.think(u),r.update()}}catch(c){a.e(c)}finally{a.f()}0===p.length&&(h=0,k(),b++,u=[])}t.textSize(32);var s=p.length;t.text("Generation: "+b,500,30),t.text("Live: "+s,30,30),o=!1}}}var y=function(){return o.a.createElement("div",null,o.a.createElement(u.a,{sketch:p}))},g=n(22),b=n(13),k=n(14);function _(t){var e;t.setup=function(){e=t.createCanvas(300,200),t.noStroke()},t.draw=function(){t.background("orangered"),t.ellipse(150,100,100,100)},t.myCustomRedrawAccordingToNewPropsHandler=function(n){e&&t.fill(n.color)}}var w=function(t){Object(b.a)(n,t);var e=Object(k.a)(n);function n(){var t;return Object(d.a)(this,n),(t=e.call(this)).state={color:[255*Math.random(),255*Math.random(),255*Math.random()]},t.randomColor=t.randomColor.bind(Object(g.a)(t)),t}return Object(f.a)(n,[{key:"randomColor",value:function(){this.setState({color:[255*Math.random(),255*Math.random(),255*Math.random()]})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("button",{onClick:this.randomColor},"Random Color"),o.a.createElement(u.a,{sketch:_,color:this.state.color}))}}]),n}(i.Component);var j=function(){return o.a.createElement("div",{className:"Main"},o.a.createElement(w,null),o.a.createElement(y,null))};n(101);var E=function(){return o.a.createElement("div",{className:"MyBody"},o.a.createElement(c,null),o.a.createElement(j,null),o.a.createElement(s,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},73:function(t,e,n){t.exports=n(102)},78:function(t,e,n){},79:function(t,e,n){},84:function(t,e){},85:function(t,e){},93:function(t,e){},99:function(t,e){}},[[73,1,2]]]);
//# sourceMappingURL=main.b30e0d55.chunk.js.map