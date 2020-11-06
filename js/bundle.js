(()=>{"use strict";(()=>{let e;const t=(e,t)=>{let n=e+Math.random()*(t+1-e);return Math.floor(n)};window.util={isEscEvent:(e,t)=>{27===e.keyCode&&(e.preventDefault(),t())},isEnterEvent:e=>{13===e.keyCode&&e.preventDefault()},getRandomInteger:t,getRandomItem:e=>e[t(0,e.length-1)],createErrorMessage:e=>{const t=document.createElement("div");t.classList.add("server-error"),t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},debounce:t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,300)}}})(),(()=>{const e=document.querySelector(".setup"),t=document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item"),n=document.querySelector(".setup-similar-list"),i=function(e){let n=t.cloneNode(!0);return n.querySelector(".setup-similar-label").textContent=e.name,n.querySelector(".wizard-coat").style.fill=e.colorCoat,n.querySelector(".wizard-eyes").style.fill=e.colorEyes,n};window.render={renderFragment:t=>{const s=t.length>4?4:t.length;n.innerHTML="";const r=document.createDocumentFragment();for(let e=0;e<s;e++)r.appendChild(i(t[e]));n.appendChild(r),e.querySelector(".setup-similar").classList.remove("hidden")}}})(),(()=>{let e={};const t=document.querySelector(".setup"),n=t.querySelector(".setup-wizard"),i=n.querySelector(".wizard-coat"),s=t.querySelector("input[name=coat-color]"),r=n.querySelector(".wizard-eyes"),a=t.querySelector("input[name=eyes-color]"),o=t.querySelector(".setup-fireball-wrap"),d=t.querySelector("input[name=fireball-color]"),c=(t,n,i)=>{t.addEventListener("click",(function(){const s=window.util.getRandomItem(i);"div"===t.tagName.toLowerCase()?t.style.backgroundColor=s:(t.style.fill=s,t.classList.contains("wizard-coat")&&e.onCoatChange(s),t.classList.contains("wizard-eyes")&&e.onEyesChange(s)),n.value=s}))};c(i,s,["rgb(146, 100, 161)","rgb(215, 210, 55)","rgb(241, 43, 107)","rgb(101, 137, 164)","rgb(0, 0, 0)","rgb(215, 210, 55)","rgb(56, 159, 117)","rgb(241, 43, 107)"]),c(r,a,["red","orange","yellow","green","lightblue","blue","purple"]),c(o,d,["#ee4830","#30a8ee","#5ce6c0","#e848d5","#e6e848"]),window.wizard={setCoatChangeHandler:t=>{e.onCoatChange=t},setEyesChangeHandler:t=>{e.onEyesChange=t}}})(),(()=>{const e=(e,t,n)=>{e.addEventListener("load",(function(){200===e.status?t(e.response):n("Статус ответа: "+e.status+" "+e.statusText)})),e.addEventListener("error",(function(){n("Произошла ошибка соединения")})),e.addEventListener("timeout",(function(){n("Запрос не успел выполниться за "+e.timeout+"мс")}))};window.backend={save:function(t,n,i){const s=new XMLHttpRequest;s.responseType="json",s.open("POST","https://21.javascript.pages.academy/code-and-magick"),s.timeout=1e4,e(s,n,i),s.send(t)},load:function(t,n){const i=new XMLHttpRequest;i.responseType="json",i.open("GET","https://21.javascript.pages.academy/code-and-magick/data"),i.timeout=1e4,e(i,t,n),i.send()}}})(),window.GameConstants={Fireball:{size:fireballSize||24,speed:getFireballSpeed||function(e){return e?2:5}},Wizard:{speed:wizardSpeed||2,width:wizardWidth||61,getHeight:getWizardHeight||function(e){return 1.377*e},getX:getWizardX||function(e){return e/3},getY:getWizardY||function(e){return e-100}}},window.Game=function(){var e=300,t=700,n=["Кекс","Катя","Игорь"],i={},s="-reversed";i[0]={width:61,height:84,url:"img/wizard.gif"},i[0+s]={width:61,height:84,url:"img/wizard-reversed.gif"},i[1]={width:24,height:24,url:"img/fireball.gif"};var r={0:function(n,i,s){i.keysPressed.UP&&n.y>0&&(n.direction=-9&n.direction,n.direction=4|n.direction,n.y-=n.speed*s*2),i.keysPressed.UP||n.y<e-n.height&&(n.direction=-5&n.direction,n.direction=8|n.direction,n.y+=n.speed*s/3),i.keysPressed.LEFT&&(n.direction=-3&n.direction,n.direction=1|n.direction,n.x-=n.speed*s),i.keysPressed.RIGHT&&(n.direction=-2&n.direction,n.direction=2|n.direction,n.x+=n.speed*s),n.y<0&&(n.y=0),n.y>e-n.height&&(n.y=e-n.height),n.x<0&&(n.x=0),n.x>t-n.width&&(n.x=t-n.width)},1:function(e,n,i){1&e.direction&&(e.x-=e.speed*i),2&e.direction&&(e.x+=e.speed*i),(e.x<0||e.x>t)&&(e.state=1)}},a={CONTINUE:0,WIN:1,FAIL:2,PAUSE:3,INTRO:4},o={0:function(e){return e.garbage.filter((function(e){return 1===e.type})).filter((function(e){return e.x<10&&e.y>240}))[0]?a.WIN:a.CONTINUE}},d={0:function(n){return n.objects.push({direction:2,height:window.GameConstants.Wizard.getHeight(window.GameConstants.Wizard.width),speed:window.GameConstants.Wizard.speed,sprite:i[0],state:0,type:0,width:window.GameConstants.Wizard.width,x:window.GameConstants.Wizard.getX(t),y:window.GameConstants.Wizard.getY(e)}),n}},c=function(e){this.container=e,this.canvas=document.createElement("canvas"),this.canvas.width=e.clientWidth,this.canvas.height=e.clientHeight,this.container.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._pauseListener=this._pauseListener.bind(this),this.setDeactivated(!1)};c.prototype={level:0,setDeactivated:function(e){this._deactivated!==e&&(this._deactivated=e,e?this._removeGameListeners():this._initializeGameListeners())},getInitialState:function(){return{currentStatus:a.CONTINUE,garbage:[],lastUpdated:null,keysPressed:{ESC:!1,LEFT:!1,RIGHT:!1,SPACE:!1,UP:!1},levelStartTime:null,objects:[],startTime:null}},initializeLevelAndStart:function(e){(e=void 0===e||e)||!this.state?(this._imagesArePreloaded=void 0,this.state=this.getInitialState(),this.state=d[this.level](this.state)):this.state.currentStatus=a.CONTINUE,this.state.levelStartTime=Date.now(),this.state.startTime||(this.state.startTime=this.state.levelStartTime),this._preloadImagesForLevel(function(){this.render(),this._initializeGameListeners(),this.update()}.bind(this))},pauseLevel:function(e){e&&(this.state.currentStatus=e),this.state.keysPressed.ESC=!1,this.state.lastUpdated=null,this._removeGameListeners(),window.addEventListener("keydown",this._pauseListener),this._drawPauseScreen()},_pauseListener:function(e){if(32===e.keyCode&&!this._deactivated){e.preventDefault();var t=this.state.currentStatus===a.WIN||this.state.currentStatus===a.FAIL;this.initializeLevelAndStart(t),window.removeEventListener("keydown",this._pauseListener)}},_drawPauseScreen:function(){var e;switch(this.state.currentStatus){case a.WIN:if(window.renderStatistics){var t=this._generateStatistics(new Date-this.state.startTime),n=this._shuffleArray(Object.keys(t));return void window.renderStatistics(this.ctx,n,n.map((function(e){return t[e]})))}e="Вы победили Газебо!\nУра!";break;case a.FAIL:e="Вы проиграли!";break;case a.PAUSE:e="Игра на паузе!\nНажмите Пробел, чтобы продолжить";break;case a.INTRO:e="Добро пожаловать!\nНажмите Пробел для начала игры"}this._drawMessage(e)},_generateStatistics:function(e){for(var t={Вы:e},i=0;i<n.length;i++){var s=e+(3e3*Math.random()-1500);s<1e3&&(s=1e3),t[n[i]]=s}return t},_shuffleArray:function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}return e},_drawMessage:function(e){var t=this.ctx,n=function(e,n,i,s){t.beginPath(),t.moveTo(e,n),t.lineTo(e+10,n+s/2),t.lineTo(e,n+s),t.lineTo(e+i/2,n+s-10),t.lineTo(e+i,n+s),t.lineTo(e+i-10,n+s/2),t.lineTo(e+i,n),t.lineTo(e+i/2,n+10),t.lineTo(e,n),t.stroke(),t.closePath(),t.fill()};t.fillStyle="rgba(0, 0, 0, 0.7)",n(190,40,320,100),t.fillStyle="rgba(256, 256, 256, 1.0)",n(180,30,320,100),t.fillStyle="#000",t.font="16px PT Mono",e.split("\n").forEach((function(e,n){t.fillText(e,200,80+20*n)}))},_preloadImagesForLevel:function(e){if(void 0===this._imagesArePreloaded&&(this._imagesArePreloaded=[]),this._imagesArePreloaded[this.level])e();else for(var t=Object.keys(i),n=t.length,s=this,r=function(t){var i=new Image(t.width,t.height);i.onload=function(){t.image=i,0==--n&&(s._imagesArePreloaded[s.level]=!0,e())},i.src=t.url},a=0;a<t.length;a++)r(i[t[a]])},updateObjects:function(e){var t=this.state.objects.filter((function(e){return 0===e.type}))[0];this.state.keysPressed.SHIFT&&(this.state.objects.push({direction:t.direction,height:window.GameConstants.Fireball.size,speed:window.GameConstants.Fireball.speed(!!(1&t.direction)),sprite:i[1],type:1,width:window.GameConstants.Fireball.size,x:2&t.direction?t.x+t.width:t.x-window.GameConstants.Fireball.size,y:t.y+t.height/2}),this.state.keysPressed.SHIFT=!1),this.state.garbage=[];var n=this.state.objects.filter((function(t){return r[t.type](t,this.state,e),1!==t.state||(this.state.garbage.push(t),!1)}),this);this.state.objects=n},checkStatus:function(){if(this.state.currentStatus===a.CONTINUE){this.commonRules||(this.commonRules=[function(e){return 1===e.objects.filter((function(e){return 0===e.type}))[0].state?a.FAIL:a.CONTINUE},function(e){return e.keysPressed.ESC?a.PAUSE:a.CONTINUE},function(e){return Date.now()-e.startTime>18e4?a.FAIL:a.CONTINUE}]);for(var e=this.commonRules.concat(o[this.level]),t=a.CONTINUE;t===a.CONTINUE&&e.length;)t=e.shift()(this.state);this.state.currentStatus=t}},setGameStatus:function(e){this.state.currentStatus!==e&&(this.state.currentStatus=e)},render:function(){this.ctx.clearRect(0,0,t,e),this.state.objects.forEach((function(e){if(e.sprite){var t=1&e.direction,n=i[e.type+(t?s:"")]||i[e.type];this.ctx.drawImage(n.image,e.x,e.y,e.width,e.height)}}),this)},update:function(){this.state.lastUpdated||(this.state.lastUpdated=Date.now());var e=(Date.now()-this.state.lastUpdated)/10;switch(this.updateObjects(e),this.checkStatus(),this.state.currentStatus){case a.CONTINUE:this.state.lastUpdated=Date.now(),this.render(),requestAnimationFrame(function(){this.update()}.bind(this));break;case a.WIN:case a.FAIL:case a.PAUSE:case a.INTRO:this.pauseLevel()}},_onKeyDown:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!0;break;case 39:this.state.keysPressed.RIGHT=!0;break;case 38:this.state.keysPressed.UP=!0;break;case 27:this.state.keysPressed.ESC=!0}e.shiftKey&&(this.state.keysPressed.SHIFT=!0)},_onKeyUp:function(e){switch(e.keyCode){case 37:this.state.keysPressed.LEFT=!1;break;case 39:this.state.keysPressed.RIGHT=!1;break;case 38:this.state.keysPressed.UP=!1;break;case 27:this.state.keysPressed.ESC=!1}e.shiftKey&&(this.state.keysPressed.SHIFT=!1)},_initializeGameListeners:function(){window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp)},_removeGameListeners:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp)}},c.Verdict=a;var l=new c(document.querySelector(".demo"));return window.restartGame=function(e,t){i[0].url=e,i[0+s].url=t,l.initializeLevelAndStart(),l.setGameStatus(a.INTRO)},window.restartGame("img/wizard.gif","img/wizard-reversed.gif"),l}(),(()=>{const e="#000000",t=function(e,t,n,i){e.fillStyle=i,e.fillRect(t,n,420,270)};window.renderStatistics=function(n,i,s){t(n,110,20,"rgba(0, 0, 0, 0.7)"),t(n,100,10,"#fff"),n.fillStyle=e,n.font="16px PT Mono",n.fillText("Ура вы победили!",120,35),n.fillText("Список результатов:",120,55);const r=s.reduce((function(e,t){return Math.max(e,t)}));for(let t=0;t<i.length;t++){n.fillStyle=e,n.fillText(i[t],150+90*t,260);let a=150*s[t]/r;n.fillText(s[t].toFixed(0),150+90*t,260-a-30),n.fillStyle="Вы"===i[t]?"rgba(255, 0, 0, 1)":`hsl(240, ${100*Math.random()}%, 50%)`,n.fillRect(150+90*t,260-a-20,40,a)}}})(),(()=>{let e="rgb(101, 137, 164)",t="black",n=[];const i=function(n){let i=0;return n.colorCoat===e&&(i+=2),n.colorEyes===t&&(i+=1),i},s=()=>{window.render.renderFragment(n.sort((function(e,t){let n=i(t)-i(e);return 0===n&&(n=function(e,t){return e>t?1:e<t?-1:0}(e.name,t.name)),n})))};window.wizard.setEyesChangeHandler((function(e){t=e,window.util.debounce(s)})),window.wizard.setCoatChangeHandler((function(t){e=t,window.util.debounce(s)})),window.backend.load((e=>{n=[...e],s()}),(function(e){window.util.createErrorMessage(e)}))})(),(()=>{const e=document.querySelector(".setup"),t=document.querySelector(".setup-open"),n=e.querySelector(".setup-close"),i=e.querySelector(".setup-user-name"),s=e.querySelector(".upload"),r=e.querySelector(".setup-wizard-form");let a;const o=function(e){document.activeElement!==i&&window.util.isEscEvent(e,l)},d=function(e){window.util.isEnterEvent(e)},c=function(){e.classList.remove("hidden"),a||(a={x:e.style.left,y:e.style.top}),e.style.left=a.x,e.style.top=a.y,document.addEventListener("keydown",o),i.addEventListener("keydown",d)},l=function(){e.classList.add("hidden"),document.removeEventListener("keydown",o),i.removeEventListener("keydown",d)};t.addEventListener("click",c),t.addEventListener("keydown",(function(e){"Enter"===e.key&&c()})),n.addEventListener("click",l),n.addEventListener("keydown",(function(e){"Enter"===e.key&&l()})),s.addEventListener("mousedown",(function(t){t.preventDefault();let n={x:t.clientX,y:t.clientY},i=!1;const r=t=>{t.preventDefault(),i=!0;let s=n.x-t.clientX,r=n.y-t.clientY;n={x:t.clientX,y:t.clientY},e.style.top=e.offsetTop-r+"px",e.style.left=e.offsetLeft-s+"px"},a=function(e){if(e.preventDefault(),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",a),i){const e=t=>{t.preventDefault(),s.removeEventListener("click",e)};s.addEventListener("click",e)}};document.addEventListener("mousemove",r),document.addEventListener("mouseup",a)})),r.addEventListener("submit",(function(t){t.preventDefault(),window.backend.save(new FormData(r),(function(){e.classList.add("hidden")}))}))})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".upload input[type=file]"),n=document.querySelector(".setup-user-pic");t.addEventListener("change",(function(){const i=t.files[0],s=i.name.toLowerCase();if(e.some((function(e){return s.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){n.src=e.result})),e.readAsDataURL(i)}}))})()})();