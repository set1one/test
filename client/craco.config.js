module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/general/_colors.scss";
          @import "src/general/_fonts.scss";
        `,
      },
    },
  },
};
