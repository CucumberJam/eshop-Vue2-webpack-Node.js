import { VueLoaderPlugin }   from 'vue-loader';
import path from 'path';
export default {
    context: path.resolve('src/public'),
    entry: './main.js',
    mode: 'development',
    target: 'web',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve('dist/public'),
        publicPath: "/",
 //       clean: true,
 //       assetModuleFilename: 'dist/public/asset/[name]/[name][ext]'
    },
    stats: {
        errorDetails: true,
        children: true,
    },
    plugins: [
/*        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),*/
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
/*            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/images/[name].[hash][ext]'
                }
            },*/
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },
        ],
    },
}