const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = (env, { mode }) => {
    const config = {
        entry: ['webpack-dev-server/client?http://0.0.0.0:3001', './src/index.ts'],
        mode: mode || 'development',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: 3001,
            historyApiFallback: true,
        },
        output: {
            publicPath: 'auto',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'authui',
                library: { type: 'var', name: 'authui' },
                filename: 'remoteEntry.js',
                exposes: {
                    './useAuth': './src/hooks/useAuth',
                    './CallbackPage': './src/pages/CallbackPage',
                },
                shared: {
                    ...deps,
                    react: { singleton: true, eager: true, requiredVersion: deps.react },
                    'react-dom': {
                        singleton: true,
                        eager: true,
                        requiredVersion: deps['react-dom'],
                    },
                },
            }),
        ],
    };

    if (!mode || mode !== 'production') {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        );
    }

    return config;
};
