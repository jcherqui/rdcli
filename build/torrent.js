'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.getInfosTorrent=getInfosTorrent;exports.getTorrentList=getTorrentList;exports.selectFile=selectFile;exports.addMagnet=addMagnet;exports.addTorrent=addTorrent;exports.convertMagnet=convertMagnet;exports.convertTorrent=convertTorrent;var _requestPromise=require('request-promise');var _requestPromise2=_interopRequireDefault(_requestPromise);var _config=require('config');var _config2=_interopRequireDefault(_config);var _debug=require('debug');var _debug2=_interopRequireDefault(_debug);var _fs=require('fs');var _fs2=_interopRequireDefault(_fs);var _ora=require('ora');var _ora2=_interopRequireDefault(_ora);var _coSleep=require('co-sleep');var _coSleep2=_interopRequireDefault(_coSleep);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _marked=[getInfosTorrent,getTorrentList,selectFile,addMagnet,addTorrent,convertMagnet,convertTorrent].map(regeneratorRuntime.mark);var log=(0,_debug2.default)('torrent');function getInfosTorrent(idTorrent,token){var options,data;return regeneratorRuntime.wrap(function getInfosTorrent$(_context){while(1){switch(_context.prev=_context.next){case 0:log('get infos torrent '+idTorrent);options={uri:_config2.default.apiEndpoint+'/torrents/info/'+idTorrent+'?auth_token='+token,json:true};data=void 0;_context.next=5;return(0,_requestPromise2.default)(options).then(function(body){data=body;}).catch(function(e){throw new Error(e.error.error);});case 5:return _context.abrupt('return',data);case 6:case'end':return _context.stop();}}},_marked[0],this);}function getTorrentList(token){var options,data;return regeneratorRuntime.wrap(function getTorrentList$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:log('get torrent list');options={uri:_config2.default.apiEndpoint+'/torrents?auth_token='+token,json:true};data=void 0;_context2.next=5;return(0,_requestPromise2.default)(options).then(function(body){data=body;}).catch(function(e){throw new Error(e.error.error);});case 5:return _context2.abrupt('return',data);case 6:case'end':return _context2.stop();}}},_marked[1],this);}function selectFile(idTorrent,token){var files=arguments.length<=2||arguments[2]===undefined?'all':arguments[2];var options,data;return regeneratorRuntime.wrap(function selectFile$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:log('select file '+idTorrent);options={method:'POST',uri:_config2.default.apiEndpoint+'/torrents/selectFiles/'+idTorrent+'?auth_token='+token,json:true,form:{files:files}};data=void 0;_context3.next=5;return(0,_requestPromise2.default)(options).then(function(body){data=body;}).catch(function(e){throw new Error(e.error.error);});case 5:return _context3.abrupt('return',data);case 6:case'end':return _context3.stop();}}},_marked[2],this);}function addMagnet(magnet,token){var options,data;return regeneratorRuntime.wrap(function addMagnet$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:log('add magnet '+magnet);options={method:'POST',uri:_config2.default.apiEndpoint+'/torrents/addMagnet?auth_token='+token,json:true,form:{magnet:encodeURI(magnet),host:'uptobox.com'}};data=void 0;_context4.next=5;return(0,_requestPromise2.default)(options).then(function(body){data=body;}).catch(function(e){throw new Error(e.error.error);});case 5:return _context4.abrupt('return',data.id);case 6:case'end':return _context4.stop();}}},_marked[3],this);}function addTorrent(torrent,token){var options,data;return regeneratorRuntime.wrap(function addTorrent$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:log('add torrent '+torrent);options={uri:_config2.default.apiEndpoint+'/torrents/addTorrent?auth_token='+token,json:true};data=void 0;_context5.next=5;return _fs2.default.createReadStream(torrent).pipe(_requestPromise2.default.put(options)).then(function(body){data=body;});case 5:return _context5.abrupt('return',data.id);case 6:case'end':return _context5.stop();}}},_marked[4],this);}function convertMagnet(magnet,token){var idMagnet,link,status,progressConvert,spinner,infos;return regeneratorRuntime.wrap(function convertMagnet$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:log('convert magnet '+magnet);_context6.next=3;return addMagnet(magnet,token);case 3:idMagnet=_context6.sent;_context6.next=6;return selectFile(idMagnet,token);case 6:link=[];status='wait';progressConvert=0;spinner=(0,_ora2.default)('Convert magnet progress: '+progressConvert+'% ('+status+')').start();case 10:if(link.length){_context6.next=22;break;}_context6.next=13;return getInfosTorrent(idMagnet,token);case 13:infos=_context6.sent;status=infos.status;link=infos.links;progressConvert=Number(infos.progress);spinner.text='Convert magnet progress: '+progressConvert+'% ('+status+')';_context6.next=20;return(0,_coSleep2.default)(_config2.default.requestDelay);case 20:_context6.next=10;break;case 22:spinner.stop();return _context6.abrupt('return',link.toString());case 24:case'end':return _context6.stop();}}},_marked[5],this);}function convertTorrent(torrent,token){var idTorrent,link,status,progressConvert,spinner,infos;return regeneratorRuntime.wrap(function convertTorrent$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:log('convert torrent '+torrent);_context7.next=3;return addTorrent(torrent,token);case 3:idTorrent=_context7.sent;_context7.next=6;return selectFile(idTorrent,token);case 6:link=[];status='wait';progressConvert=0;spinner=(0,_ora2.default)('Convert torrent progress: '+progressConvert+'% ('+status+')').start();case 10:if(link.length){_context7.next=22;break;}_context7.next=13;return getInfosTorrent(idTorrent,token);case 13:infos=_context7.sent;status=infos.status;link=infos.links;progressConvert=Number(infos.progress);spinner.text='Convert torrent progress: '+progressConvert+'% ('+status+')';_context7.next=20;return(0,_coSleep2.default)(_config2.default.requestDelay);case 20:_context7.next=10;break;case 22:spinner.stop();return _context7.abrupt('return',link.toString());case 24:case'end':return _context7.stop();}}},_marked[6],this);}