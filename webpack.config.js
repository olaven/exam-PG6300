/**
 * 
 * NOTE: This file is copied (except css-loaders) from: 
 * https: //github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-10/webpack.config.js
 */
    
const path = require("path");

module.exports = {
	entry: "./src/client/index.jsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public")
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		contentBase: "./public"
	}
};