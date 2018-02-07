/**
 * index.js
 *
 * used as the entry point for node.js app server
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization =====================================================
var express = 		require('express'),
 	app	 	=		express(),
 	http	=		require('http').Server(app);

var path	=		require('path');



const PORT = 8003;

// Configuration ======================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.route('/').get((req, res) => {
	var date = new Date();
	res.render('main', {time: date.getHours() + " : " + date.getMinutes()});
});

// Launch a web server ================================================
http.listen(PORT, () => {
	console.log("Server opened at port: " + PORT);
})