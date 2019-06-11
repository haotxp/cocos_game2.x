window.__require=function t(e,o,n){function i(c,s){if(!o[c]){if(!e[c]){var r=c.split("/");if(r=r[r.length-1],!e[r]){var a="function"==typeof __require&&__require;if(!s&&a)return a(r,!0);if(u)return u(r,!0);throw new Error("Cannot find module '"+c+"'")}}var l=o[c]={exports:{}};e[c][0].call(l.exports,function(t){return i(e[c][1][t]||t)},l,l.exports,t,e,o,n)}return o[c].exports}for(var u="function"==typeof __require&&__require,c=0;c<n.length;c++)i(n[c]);return i}({bulletGroup:[function(require,module,exports){"use strict";cc._RF.push(module,"3807dSPT35G8ZA8afVANPPV","bulletGroup");var bulletPosition=cc.Class({name:"bulletPosition",properties:{positionX:{default:"",tooltip:"\u5b50\u5f39\u76f8\u5bf9Hero\u7684\u4f4d\u7f6e"}}}),infiniteBullet=cc.Class({name:"infiniteBullet",properties:{name:"",rate:0,poolAmount:0,prefab:cc.Prefab,position:{default:[],type:bulletPosition,tooltip:"\u5b50\u5f39\u4f4d\u7f6e"}}}),finiteBullet=cc.Class({extends:infiniteBullet,name:"finiteBullet",properties:{duration:0,ufoBulletName:""}});cc.Class({extends:cc.Component,properties:function(){return{infiniteBullet:{default:null,type:infiniteBullet,tooltip:"\u65e0\u9650\u5b50\u5f39"},finiteBullet:{default:[],type:finiteBullet,tooltip:"\u6709\u9650\u5b50\u5f39"},hero:cc.Node,bulletSound:{default:null,type:cc.AudioClip}}},onLoad:function(){D.common.initNodePool(this,this.infiniteBullet),D.common.batchInitNodePool(this,this.finiteBullet)},startAction:function(){this.startShoot=function(){this.genNewBullet(this.infiniteBullet),cc.audioEngine.play(this.bulletSound)}.bind(this),this.schedule(this.startShoot,this.infiniteBullet.rate)},genNewBullet:function(t){for(var e=t.name+"Pool",o=0;o<t.position.length;o++){var n=D.common.genNewNode(this[e],t.prefab,this.node),i=this.getBulletPosition(t.position[o].positionX);n.setPosition(i),n.getComponent("bullet").bulletGroup=this}},getBulletPosition:function getBulletPosition(positionStr){var heroP=this.hero.getPosition(),newV2_x=heroP.x+eval(positionStr),newV2_y=heroP.y;return cc.v2(newV2_x,newV2_y)},changeBullet:function(t){this.unschedule(this.startShoot);for(var e=0;e<this.finiteBullet.length;e++)if(this.finiteBullet[e].ufoBulletName===t){var o=function(t){this.genNewBullet(this.finiteBullet[t]),cc.audioEngine.play(this.bulletSound)}.bind(this,e);this.schedule(o,this.finiteBullet[e].rate,this.finiteBullet[e].duration);var n=this.finiteBullet[e].rate*this.finiteBullet[e].duration;this.schedule(this.startShoot,this.infiniteBullet.rate,cc.macro.REPEAT_FOREVER,n)}},destroyBullet:function(t){D.common.putBackPool(this,t)}}),cc._RF.pop()},{}],bullet:[function(t,e,o){"use strict";cc._RF.push(e,"a045eQGS9BIPK4Bgej4gBpi","bullet"),cc.Class({extends:cc.Component,properties:{speed:cc.Integer},onLoad:function(){},onCollisionEnter:function(t,e){this.bulletGroup.destroyBullet(e.node)},update:function(t){this.node.y+=t*this.speed,this.node.y>this.node.parent.height&&this.bulletGroup.destroyBullet(this.node)}}),cc._RF.pop()},{}],common:[function(t,e,o){"use strict";cc._RF.push(e,"3885cJjRVdDoZUt3qzsftJ3","common"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){D.common=this,D.commonState.poolObj={}},batchInitNodePool:function(t,e){for(var o=0;o<e.length;o++){var n=e[o];this.initNodePool(t,n)}},initNodePool:function(t,e){var o=e.name+"Pool";t[o]=new cc.NodePool,D.commonState.poolObj[o]=t[o];for(var n=0;n<e.poolAmount;n++){var i=cc.instantiate(e.prefab);t[o].put(i)}},genNewNode:function(t,e,o){var n=null;return n=t.size()>0?t.get():cc.instantiate(e),o.addChild(n),n},putBackPool:function(t,e){t[e.name+"Pool"].put(e)},clearAllPool:function(){D.commonState.poolObj.forEach(function(t){t.clear()})}}),cc._RF.pop()},{}],end:[function(t,e,o){"use strict";cc._RF.push(e,"a8ea0Z+J35ON6pbq6T4wAAG","end"),cc.Class({extends:cc.Component,properties:{newScore:{default:null,type:cc.Label},restartBtn:{default:null,type:cc.Button},historyBtn:{default:null,type:cc.Button},quitBtn:{default:null,type:cc.Button},buttonSound:{default:null,type:cc.AudioClip}},onLoad:function(){this.newScore.string=D.commonState.gameScore?D.commonState.gameScore.toString():"0"},restartGame:function(){cc.audioEngine.play(this.buttonSound),cc.director.loadScene("Game")},quitGame:function(){cc.audioEngine.play(this.buttonSound),cc.director.loadScene("Start")}}),cc._RF.pop()},{}],enemyGroup:[function(t,e,o){"use strict";cc._RF.push(e,"11f27pfJodDE6qxzKgoFqaj","enemyGroup");var n=cc.Class({name:"enemyG",properties:{name:"",prefab:cc.Prefab,freq:0,poolAmount:0}});cc.Class({extends:cc.Component,properties:{enemyGroup:{default:[],type:n},mainScript:{default:null,type:t("main")}},onLoad:function(){D.common.batchInitNodePool(this,this.enemyGroup)},startAction:function(){for(var t=0;t<this.enemyGroup.length;t++){var e=this.enemyGroup[t].name,o=this.enemyGroup[t].freq;this[e]=function(t){this.genNewEnemy(this.enemyGroup[t])}.bind(this,t),this.schedule(this[e],o)}},genNewEnemy:function(t){var e=t.name+"Pool",o=D.common.genNewNode(this[e],t.prefab,this.node),n=this.getNewEnemyPosition(o);o.setPosition(n),o.getComponent("enemy").enemyGroup=this,o.getComponent("enemy").enemyInit()},getNewEnemyPosition:function(t){var e=2*(Math.random()-.5)*(this.node.parent.width/2-t.width/2),o=this.node.parent.height/2+t.height/2;return cc.v2(e,o)},destroyEnemy:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;D.common.putBackPool(this,t),e&&this.mainScript.changeScore(e)}}),cc._RF.pop()},{main:"main"}],enemy:[function(t,e,o){"use strict";cc._RF.push(e,"32e26kzmGlK4odAEOcH4Z7A","enemy"),cc.Class({extends:cc.Component,properties:{score:{default:0,type:cc.Integer,tooltip:"\u654c\u673a\u5206\u6570"},HP:{default:0,type:cc.Integer,tooltip:"\u654c\u673a\u8840\u91cf"},speedMax:0,speedMin:0,initSpriteFrame:{default:null,type:cc.SpriteFrame,tooltip:"\u521d\u59cb\u5316\u56fe\u50cf"},explosionSound:{default:null,type:cc.AudioClip}},onLoad:function(){this.speed=Math.random()*(this.speedMax-this.speedMin+1)+this.speedMin,cc.director.getCollisionManager().enabled=!0,this.enemyInit()},enemyInit:function(){this.enemyHp=this.HP;var t=this.node.getComponent(cc.Sprite);t.spriteFrame!=this.initSpriteFrame&&(t.spriteFrame=this.initSpriteFrame)},onCollisionEnter:function(t,e){if("bullet"===t.node.group)return 0===this.enemyHp?(this.enemyHp--,void this.explodingAnim()):void(this.enemyHp>0&&this.enemyHp--)},explodingAnim:function(){cc.audioEngine.play(this.explosionSound);var t=this.getComponent(cc.Animation),e=this.node.name+"_exploding";t.play(e),t.on("finished",this.onHandleDestroy,this)},update:function(t){this.node.y-=t*this.speed,this.node.y<-this.node.parent.height/2&&this.enemyGroup.destroyEnemy(this.node)},onHandleDestroy:function(){this.enemyGroup.destroyEnemy(this.node,this.score)}}),cc._RF.pop()},{}],global:[function(t,e,o){"use strict";cc._RF.push(e,"5e8abuccWVB27wHfN03ylCQ","global"),window.D={common:null,commonState:{}},cc._RF.pop()},{}],hero:[function(t,e,o){"use strict";cc._RF.push(e,"35228kMYCZE1bmZTk9kWR9s","hero"),cc.Class({extends:cc.Component,properties:function(){return{bulletGroup:{default:null,type:t("bulletGroup")},mainScript:{default:null,type:t("main")}}},onLoad:function(){this.onDrag(),cc.director.getCollisionManager().enabled=!0},onDrag:function(){this.node.on("touchmove",this.onHandleHeroMove,this)},offDrag:function(){this.node.off("touchmove",this.onHandleHeroMove,this)},onHandleHeroMove:function(t){var e=t.getLocation(),o=this.node.parent.convertToNodeSpaceAR(e);this.node.setPosition(o)},onCollisionEnter:function(t,e){if("ufo"===t.node.group)switch(t.node.name){case"doubleBullet":this.bulletGroup.changeBullet(t.node.name);break;case"tnt":this.mainScript.receiveBomb()}else if("enemy"===t.node.group){var o=this.getComponent(cc.Animation),n=this.node.name+"_exploding";o.play(n),o.on("finished",this.onHandleDestroy,this)}},onHandleDestroy:function(){this.offDrag(),this.mainScript.gameOver()}}),cc._RF.pop()},{bulletGroup:"bulletGroup",main:"main"}],main:[function(t,e,o){"use strict";cc._RF.push(e,"a45d2fCne1FZ4aswnM6yL8+","main"),cc.Class({extends:cc.Component,properties:function(){return{pause:cc.Button,scoreDisplay:cc.Label,bombAmount:cc.Label,bombDisplay:cc.Node,pauseSprite:{default:[],type:cc.SpriteFrame,tooltip:"\u6682\u505c\u6309\u94ae\u56fe\u7247\u7ec4"},hero:{default:null,type:t("hero")},bulletGroup:{default:null,type:t("bulletGroup")},enemyGroup:{default:null,type:t("enemyGroup")},ufoGroup:{default:null,type:t("ufoGroup")},bgm:{default:null,type:cc.AudioClip},gameOverSound:{default:null,type:cc.AudioClip},bombSound:{default:null,type:cc.AudioClip},buttonSound:{default:null,type:cc.AudioClip}}},onLoad:function(){console.log("update to 2.1 by yangyang"),this.initState(),this.enemyGroup.startAction(),this.bulletGroup.startAction(),this.ufoGroup.startAction(),cc.audioEngine.play(this.bgm,!0)},initState:function(){D.commonState.pauseState=!1,D.commonState.bombAmount=0,D.commonState.gameScore=0},handlePause:function(){return cc.audioEngine.play(this.buttonSound),D.commonState.pauseState?(this.pause.normalSprite=this.pauseSprite[0],this.pause.pressedSprite=this.pauseSprite[1],this.pause.hoverSprite=this.pauseSprite[1],cc.director.resume(),this.hero.onDrag(),D.commonState.pauseState=!D.commonState.pauseState):(this.pause.normalSprite=this.pauseSprite[2],this.pause.pressedSprite=this.pauseSprite[3],this.pause.hoverSprite=this.pauseSprite[3],cc.director.pause(),this.hero.offDrag(),D.commonState.pauseState=!D.commonState.pauseState)},useBomb:function(){if(D.commonState.bombAmount>0){cc.audioEngine.play(this.bombSound);for(var t=new(Function.prototype.bind.apply(Array,[null].concat(function(t){if(Array.isArray(t)){for(var e=0,o=Array(t.length);e<t.length;e++)o[e]=t[e];return o}return Array.from(t)}(this.enemyGroup.node.children)))),e=0;e<t.length;e++)t[e].getComponent("enemy").explodingAnim();D.commonState.bombAmount--,this.bombAmount.string=String(D.commonState.bombAmount)}},receiveBomb:function(){D.commonState.bombAmount++,this.bombAmount.string=String(D.commonState.bombAmount)},changeScore:function(t){D.commonState.gameScore+=t,this.scoreDisplay.string=D.commonState.gameScore.toString()},gameOver:function(){D.common.clearAllPool(),cc.audioEngine.play(this.gameOverSound),cc.director.loadScene("End")}}),cc._RF.pop()},{bulletGroup:"bulletGroup",enemyGroup:"enemyGroup",hero:"hero",ufoGroup:"ufoGroup"}],start:[function(t,e,o){"use strict";cc._RF.push(e,"44cfefVxUNO/ZxMfj0BGy8V","start"),cc.Class({extends:cc.Component,properties:{loadAnimation:{default:null,type:cc.Animation},startButton:{default:null,type:cc.Button},buttonSound:{default:null,type:cc.AudioClip}},onLoad:function(){this.loadAnimation.play(),cc.director.preloadScene("Game")},startGame:function(){cc.audioEngine.play(this.buttonSound),cc.director.loadScene("Game")}}),cc._RF.pop()},{}],ufoGroup:[function(t,e,o){"use strict";cc._RF.push(e,"9ed9f/6UllKjIZCU2qyzWUA","ufoGroup");var n=cc.Class({name:"ufoG",properties:{name:"",prefab:cc.Prefab,freq:0,poolAmount:0,delayMax:{default:0,tooltip:"\u6700\u5927\u5ef6\u65f6"},delayMin:{default:0,tooltip:"\u6700\u5c0f\u5ef6\u65f6"}}});cc.Class({extends:cc.Component,properties:{ufoG:{default:[],type:n}},onLoad:function(){D.common.batchInitNodePool(this,this.ufoG)},startAction:function(){for(var t=0;t<this.ufoG.length;t++){var e=this.ufoG[t].name,o=this.ufoG[t].freq;this[e]=function(t){var e=Math.random()*(this.ufoG[t].delayMax-this.ufoG[t].delayMin)+this.ufoG[t].delayMin;this.scheduleOnce(function(){this.genNewUfo(this.ufoG[t])}.bind(this),e)}.bind(this,t),this.schedule(this[e],o)}},genNewUfo:function(t){var e=t.name+"Pool",o=D.common.genNewNode(this[e],t.prefab,this.node),n=this.getNewEnemyPosition(o);o.setPosition(n),o.getComponent("ufo").ufoGroup=this},getNewEnemyPosition:function(t){var e=2*(Math.random()-.5)*(this.node.parent.width/2-t.width/2),o=this.node.parent.height/2+t.height/2;return cc.v2(e,o)},destroyUfo:function(t){D.common.putBackPool(this,t)}}),cc._RF.pop()},{}],ufo:[function(t,e,o){"use strict";cc._RF.push(e,"1e1f8IcusZDA5to30UQq95v","ufo"),cc.Class({extends:cc.Component,properties:{speedMax:0,speedMin:0,getUfoSound:{default:null,type:cc.AudioClip}},onLoad:function(){this.speed=Math.random()*(this.speedMax-this.speedMin+1)+this.speedMin,cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(t,e){cc.audioEngine.play(this.getUfoSound),this.ufoGroup.destroyUfo(this.node)},update:function(t){this.node.y-=t*this.speed,this.node.y<-this.node.parent.height/2&&this.ufoGroup.destroyUfo(this.node)}}),cc._RF.pop()},{}]},{},["end","bullet","bulletGroup","common","enemy","enemyGroup","global","hero","main","ufo","ufoGroup","start"]);