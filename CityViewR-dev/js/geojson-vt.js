!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.geojsonvt=e()}}(function(){return function e(t,n,r){function o(s,u){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!u&&l)return l(s,!0);if(i)return i(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var f=n[s]={exports:{}};t[s][0].call(f.exports,function(e){var n=t[s][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,n){"use strict";function r(e,t,n,r,s,l,a,f){if(n/=t,r/=t,a>=n&&f<=r)return e;if(a>r||f<n)return null;for(var h=[],p=0;p<e.length;p++){var m,c,d=e[p],g=d.geometry,v=d.type;if(m=d.min[s],c=d.max[s],m>=n&&c<=r)h.push(d);else if(!(m>r||c<n)){var x=1===v?o(g,n,r,s):i(g,n,r,s,l,3===v);x.length&&h.push(u(d.tags,v,x,d.id))}}return h.length?h:null}function o(e,t,n,r){for(var o=[],i=0;i<e.length;i++){var s=e[i],u=s[r];u>=t&&u<=n&&o.push(s)}return o}function i(e,t,n,r,o,i){for(var u=[],l=0;l<e.length;l++){var a,f,h,p=0,m=0,c=null,d=e[l],g=d.area,v=d.dist,x=d.outer,y=d.length,M=[];for(f=0;f<y-1;f++)a=c||d[f],c=d[f+1],p=m||a[r],m=c[r],p<t?m>n?(M.push(o(a,c,t),o(a,c,n)),i||(M=s(u,M,g,v,x))):m>=t&&M.push(o(a,c,t)):p>n?m<t?(M.push(o(a,c,n),o(a,c,t)),i||(M=s(u,M,g,v,x))):m<=n&&M.push(o(a,c,n)):(M.push(a),m<t?(M.push(o(a,c,t)),i||(M=s(u,M,g,v,x))):m>n&&(M.push(o(a,c,n)),i||(M=s(u,M,g,v,x))));a=d[y-1],p=a[r],p>=t&&p<=n&&M.push(a),h=M[M.length-1],i&&h&&(M[0][0]!==h[0]||M[0][1]!==h[1])&&M.push(M[0]),s(u,M,g,v,x)}return u}function s(e,t,n,r,o){return t.length&&(t.area=n,t.dist=r,void 0!==o&&(t.outer=o),e.push(t)),[]}t.exports=r;var u=e("./feature")},{"./feature":3}],2:[function(e,t,n){"use strict";function r(e,t){var n=[];if("FeatureCollection"===e.type)for(var r=0;r<e.features.length;r++)o(n,e.features[r],t);else"Feature"===e.type?o(n,e,t):o(n,{geometry:e},t);return n}function o(e,t,n){if(null!==t.geometry){var r,u,l,f,h=t.geometry,p=h.type,m=h.coordinates,c=t.properties,d=t.id;if("Point"===p)e.push(a(c,1,[s(m)],d));else if("MultiPoint"===p)e.push(a(c,1,i(m),d));else if("LineString"===p)e.push(a(c,2,[i(m,n)],d));else if("MultiLineString"===p||"Polygon"===p){for(l=[],r=0;r<m.length;r++)f=i(m[r],n),"Polygon"===p&&(f.outer=0===r),l.push(f);e.push(a(c,"Polygon"===p?3:2,l,d))}else if("MultiPolygon"===p){for(l=[],r=0;r<m.length;r++)for(u=0;u<m[r].length;u++)f=i(m[r][u],n),f.outer=0===u,l.push(f);e.push(a(c,3,l,d))}else{if("GeometryCollection"!==p)throw new Error("Input data is not a valid GeoJSON object.");for(r=0;r<h.geometries.length;r++)o(e,{geometry:h.geometries[r],properties:c},n)}}}function i(e,t){for(var n=[],r=0;r<e.length;r++)n.push(s(e[r]));return t&&(l(n,t),u(n)),n}function s(e){var t=Math.sin(e[1]*Math.PI/180),n=e[0]/360+.5,r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r=r<0?0:r>1?1:r,[n,r,0]}function u(e){for(var t,n,r=0,o=0,i=0;i<e.length-1;i++)t=n||e[i],n=e[i+1],r+=t[0]*n[1]-n[0]*t[1],o+=Math.abs(n[0]-t[0])+Math.abs(n[1]-t[1]);e.area=Math.abs(r/2),e.dist=o}t.exports=r;var l=e("./simplify"),a=e("./feature")},{"./feature":3,"./simplify":5}],3:[function(e,t,n){"use strict";function r(e,t,n,r){var i={id:r||null,type:t,geometry:n,tags:e||null,min:[1/0,1/0],max:[-(1/0),-(1/0)]};return o(i),i}function o(e){var t=e.geometry,n=e.min,r=e.max;if(1===e.type)i(n,r,t);else for(var o=0;o<t.length;o++)i(n,r,t[o]);return e}function i(e,t,n){for(var r,o=0;o<n.length;o++)r=n[o],e[0]=Math.min(r[0],e[0]),t[0]=Math.max(r[0],t[0]),e[1]=Math.min(r[1],e[1]),t[1]=Math.max(r[1],t[1])}t.exports=r},{}],4:[function(e,t,n){"use strict";function r(e,t){return new o(e,t)}function o(e,t){t=this.options=l(Object.create(this.options),t);var n=t.debug;n&&console.time("preprocess data");var r=1<<t.maxZoom,o=f(e,t.tolerance/(r*t.extent));this.tiles={},this.tileCoords=[],n&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),o=m(o,t.buffer/t.extent,s),o.length&&this.splitTile(o,0,0,0),n&&(o.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)))}function i(e,t,n){return 32*((1<<e)*n+t)+e}function s(e,t,n){return[n,(n-e[0])*(t[1]-e[1])/(t[0]-e[0])+e[1],1]}function u(e,t,n){return[(n-e[1])*(t[0]-e[0])/(t[1]-e[1])+e[0],n,1]}function l(e,t){for(var n in t)e[n]=t[n];return e}function a(e,t,n){var r=e.source;if(1!==r.length)return!1;var o=r[0];if(3!==o.type||o.geometry.length>1)return!1;var i=o.geometry[0].length;if(5!==i)return!1;for(var s=0;s<i;s++){var u=h.point(o.geometry[0][s],t,e.z2,e.x,e.y);if(u[0]!==-n&&u[0]!==t+n||u[1]!==-n&&u[1]!==t+n)return!1}return!0}t.exports=r;var f=e("./convert"),h=e("./transform"),p=e("./clip"),m=e("./wrap"),c=e("./tile");o.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,solidChildren:!1,tolerance:3,extent:4096,buffer:64,debug:0},o.prototype.splitTile=function(e,t,n,r,o,l,f){for(var h=[e,t,n,r],m=this.options,d=m.debug,g=null;h.length;){r=h.pop(),n=h.pop(),t=h.pop(),e=h.pop();var v=1<<t,x=i(t,n,r),y=this.tiles[x],M=t===m.maxZoom?0:m.tolerance/(v*m.extent);if(!y&&(d>1&&console.time("creation"),y=this.tiles[x]=c(e,v,n,r,M,t===m.maxZoom),this.tileCoords.push({z:t,x:n,y:r}),d)){d>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,n,r,y.numFeatures,y.numPoints,y.numSimplified),console.timeEnd("creation"));var P="z"+t;this.stats[P]=(this.stats[P]||0)+1,this.total++}if(y.source=e,o){if(t===m.maxZoom||t===o)continue;var b=1<<o-t;if(n!==Math.floor(l/b)||r!==Math.floor(f/b))continue}else if(t===m.indexMaxZoom||y.numPoints<=m.indexMaxPoints)continue;if(m.solidChildren||!a(y,m.extent,m.buffer)){y.source=null,d>1&&console.time("clipping");var w,Z,z,E,S,C,F=.5*m.buffer/m.extent,O=.5-F,T=.5+F,j=1+F;w=Z=z=E=null,S=p(e,v,n-F,n+T,0,s,y.min[0],y.max[0]),C=p(e,v,n+O,n+j,0,s,y.min[0],y.max[0]),S&&(w=p(S,v,r-F,r+T,1,u,y.min[1],y.max[1]),Z=p(S,v,r+O,r+j,1,u,y.min[1],y.max[1])),C&&(z=p(C,v,r-F,r+T,1,u,y.min[1],y.max[1]),E=p(C,v,r+O,r+j,1,u,y.min[1],y.max[1])),d>1&&console.timeEnd("clipping"),e.length&&(h.push(w||[],t+1,2*n,2*r),h.push(Z||[],t+1,2*n,2*r+1),h.push(z||[],t+1,2*n+1,2*r),h.push(E||[],t+1,2*n+1,2*r+1))}else o&&(g=t)}return g},o.prototype.getTile=function(e,t,n){var r=this.options,o=r.extent,s=r.debug,u=1<<e;t=(t%u+u)%u;var l=i(e,t,n);if(this.tiles[l])return h.tile(this.tiles[l],o);s>1&&console.log("drilling down to z%d-%d-%d",e,t,n);for(var f,p=e,m=t,c=n;!f&&p>0;)p--,m=Math.floor(m/2),c=Math.floor(c/2),f=this.tiles[i(p,m,c)];if(!f||!f.source)return null;if(s>1&&console.log("found parent tile z%d-%d-%d",p,m,c),a(f,o,r.buffer))return h.tile(f,o);s>1&&console.time("drilling down");var d=this.splitTile(f.source,p,m,c,e,t,n);if(s>1&&console.timeEnd("drilling down"),null!==d){var g=1<<e-d;l=i(d,Math.floor(t/g),Math.floor(n/g))}return this.tiles[l]?h.tile(this.tiles[l],o):null}},{"./clip":1,"./convert":2,"./tile":6,"./transform":7,"./wrap":8}],5:[function(e,t,n){"use strict";function r(e,t){var n,r,i,s,u=t*t,l=e.length,a=0,f=l-1,h=[];for(e[a][2]=1,e[f][2]=1;f;){for(r=0,n=a+1;n<f;n++)i=o(e[n],e[a],e[f]),i>r&&(s=n,r=i);r>u?(e[s][2]=r,h.push(a),h.push(s),a=s):(f=h.pop(),a=h.pop())}}function o(e,t,n){var r=t[0],o=t[1],i=n[0],s=n[1],u=e[0],l=e[1],a=i-r,f=s-o;if(0!==a||0!==f){var h=((u-r)*a+(l-o)*f)/(a*a+f*f);h>1?(r=i,o=s):h>0&&(r+=a*h,o+=f*h)}return a=u-r,f=l-o,a*a+f*f}t.exports=r},{}],6:[function(e,t,n){"use strict";function r(e,t,n,r,i,s){for(var u={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:n,y:r,z2:t,transformed:!1,min:[2,1],max:[-1,0]},l=0;l<e.length;l++){u.numFeatures++,o(u,e[l],i,s);var a=e[l].min,f=e[l].max;a[0]<u.min[0]&&(u.min[0]=a[0]),a[1]<u.min[1]&&(u.min[1]=a[1]),f[0]>u.max[0]&&(u.max[0]=f[0]),f[1]>u.max[1]&&(u.max[1]=f[1])}return u}function o(e,t,n,r){var o,s,u,l,a=t.geometry,f=t.type,h=[],p=n*n;if(1===f)for(o=0;o<a.length;o++)h.push(a[o]),e.numPoints++,e.numSimplified++;else for(o=0;o<a.length;o++)if(u=a[o],r||!(2===f&&u.dist<n||3===f&&u.area<p)){var m=[];for(s=0;s<u.length;s++)l=u[s],(r||l[2]>p)&&(m.push(l),e.numSimplified++),e.numPoints++;3===f&&i(m,u.outer),h.push(m)}else e.numPoints+=u.length;if(h.length){var c={geometry:h,type:f,tags:t.tags||null};null!==t.id&&(c.id=t.id),e.features.push(c)}}function i(e,t){var n=s(e);n<0===t&&e.reverse()}function s(e){for(var t,n,r=0,o=0,i=e.length,s=i-1;o<i;s=o++)t=e[o],n=e[s],r+=(n[0]-t[0])*(t[1]+n[1]);return r}t.exports=r},{}],7:[function(e,t,n){"use strict";function r(e,t){if(e.transformed)return e;var n,r,i,s=e.z2,u=e.x,l=e.y;for(n=0;n<e.features.length;n++){var a=e.features[n],f=a.geometry,h=a.type;if(1===h)for(r=0;r<f.length;r++)f[r]=o(f[r],t,s,u,l);else for(r=0;r<f.length;r++){var p=f[r];for(i=0;i<p.length;i++)p[i]=o(p[i],t,s,u,l)}}return e.transformed=!0,e}function o(e,t,n,r,o){var i=Math.round(t*(e[0]*n-r)),s=Math.round(t*(e[1]*n-o));return[i,s]}n.tile=r,n.point=o},{}],8:[function(e,t,n){"use strict";function r(e,t,n){var r=e,i=s(e,1,-1-t,t,0,n,-1,2),u=s(e,1,1-t,2+t,0,n,-1,2);return(i||u)&&(r=s(e,1,-t,1+t,0,n,-1,2)||[],i&&(r=o(i,1).concat(r)),u&&(r=r.concat(o(u,-1)))),r}function o(e,t){for(var n=[],r=0;r<e.length;r++){var o,s=e[r],l=s.type;if(1===l)o=i(s.geometry,t);else{o=[];for(var a=0;a<s.geometry.length;a++)o.push(i(s.geometry[a],t))}n.push(u(s.tags,l,o,s.id))}return n}function i(e,t){var n=[];n.area=e.area,n.dist=e.dist;for(var r=0;r<e.length;r++)n.push([e[r][0]+t,e[r][1],e[r][2]]);return n}var s=e("./clip"),u=e("./feature");t.exports=r},{"./clip":1,"./feature":3}]},{},[4])(4)});