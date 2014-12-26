

Proxima Servers (Proxy Servers)
- nodejs proxy server
- utilizes redis for caching
- leveldb for logging and monitoring
- passport for authentication 
- firewall : 
	- 80 PUBLIC
	- 9980 Internal Api Routing (Secured through firewall)
	- 9901-9920 for web socket traffic

Redis Configuration
- Redis port : 6400  (local cache)




Stars ( API Servers )
- nodes are server that host individual apistation instances. 
- nodes are responsible for their own:
	- redis 
	- leveldb
	- nodejs (express) api's
	- must be CORS ready 

Firewall
- 80 PUBLIC 
- 9980 Internal Api Routing (Secured through firewall)
- 9901-9920 : Web Socket Connections


Database Servers 
- database
- python data crunshing, 
- analytics (olap, etc)

- Internal Access Only



