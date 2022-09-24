'use-strict';
const webpack = require('webpack');
require('dotenv').config();

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const paths = {
  modules: path.resolve('node_modules'),
  public: path.resolve('packages/ui/assets/public'),
  ui: path.resolve('packages/ui'),
  build: path.resolve('dist'),
  globals: path.resolve('packages/ui/globals.ts'),
  App: path.resolve('packages/ui/index.tsx'),
};

module.exports = function (_, webpackEnv) {
  const isDevelopment = webpackEnv.mode === 'development';
  const isProduction = webpackEnv.mode === 'production';
  const isProfile = process.argv.includes('--profile');
  const isProductionProfile = isProduction && isProfile;
  const port = process.env.PORT || 8080;

  return {
    target: 'web',
    entry: ['@fontsource/nunito', paths.globals, paths.App],
    output: {
      path: paths.build,
      filename: isDevelopment
        ? 'static/js/[name].js'
        : isProduction && 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDevelopment
        ? 'static/js/[name].chunk.js'
        : isProduction && 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext]',
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      client: {
        logging: 'none',
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; preload',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Frame-Options',
          value: 'deny',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      port,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: [
            isDevelopment && 'style-loader',
            isProduction && MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ].filter(Boolean),
        },
        {
          test: /\.(svg|txt|woff2?|eot|ttf|otf)$/i,
          include: paths.public,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      alias: {
        App: path.resolve('packages/ui/App'),
        assets: path.resolve('packages/ui/assets'),
        services: path.resolve('packages/ui/services'),
        utils: path.resolve('packages/ui/utils'),
      },
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
      modules: [paths.ui, paths.modules],
      fallback: {
        contentBase: paths.build,
        events: false,
        url: false,
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isProductionProfile,
            keep_fnames: isProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
            sourceMap: false,
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'A List of Companies',
        templateParameters: {},
        meta: {
          viewport: 'initial-scale=1, width=device-width',
          description: 'A list of companies',
        },
        templateContent: ({ htmlWebpackPlugin }) => `
          <!DOCTYPE html>
          <html lang='en'>
            <head>
              <title>${htmlWebpackPlugin.options.title}</title>
              ${htmlWebpackPlugin.tags.headTags}
            </head>
            <body>
              ${htmlWebpackPlugin.tags.bodyTags}
              <noscript>You need to enable javascript to run this app</noscript>
              <div id="root"></div>
            </body>
          </html>
        `,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new WebpackManifestPlugin({
        fileName: 'manifest.json',
        publicPath: '/',
        filter: ({ name }) => !name.includes('.map'),
        seed: {
          short_name: 'CompanyList',
          name: 'CompanyList',
          start_url: '.',
          display: 'standalone',
          background_color: '#ffffff',
        },
      }),
      new FaviconsWebpackPlugin('packages/ui/assets/favicon.ico'),
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_ENV: JSON.stringify(webpackEnv.mode),
            MAPBOX_API_KEY: JSON.stringify(process.env.MAPBOX_API_KEY),
          },
        },
      }),
      new ESLintPlugin(),
    ].filter(Boolean),
  };
};
