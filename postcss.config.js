module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS 7',
        'last 3 iOS versions',
        'ie >= 10'
      ]
    })
  ]
}