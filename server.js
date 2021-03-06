
import http from 'http';

//自定义
import router from './src/router';

http.createServer(function (req, res) {
	// 过滤favicon.ico
	if (req.url == "/favicon.ico") {
		res.writeHead(204);
		res.end();
		return;
	}

	
	if (req.headers.origin) {
		// 跨域配置
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'token, content-type');
		// 如果客户端带cookie时，需要指定 Access-Control-Allow-Origin, Access-Control-Allow-Credentials
		// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		res.setHeader('Access-Control-Allow-Credentials', true);
	}

	// 浏览器预解析请求拦截
	if (req.method == 'OPTIONS') {
		res.writeHead(204, { 'Content-Length': 0 });
		res.end();
		return;
	}

	// 入口
	router(req, res);
}).listen('8888');

console.log('服务已启动 http://localhost:%d', 8888);