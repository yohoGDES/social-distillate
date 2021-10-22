module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_colors.scss";
          @import "@/assets/styles/_variables.scss";
                `
      }
    }
  }
}
