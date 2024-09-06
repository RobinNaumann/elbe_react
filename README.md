# elbe

a cross platform UI framework for the web and Flutter [(see this package)](https://pub.dev/packages/elbe)

so far, it has been optimized for React. It provides a variety of Widgets and theming options. Check out [the demo](https://robbb.in/elbe) or the example within this package (`./example`)

## usage

1. install the package in your React/Preact app:
   ```bash
   npm i elbe-ui
   ```
2. add the styles to your main `.scss`/`.sass` file:

   ```scss
   @use "elbe-ui/elbe.scss" with (
     $c-accent: #448aff,
     //$g-radius: 0,
     //$t-font-body: "Comic Sans MS",
     //...
   );
   ```

3. start using the components :)

# contribute

as of now, this is mainly a personal project for different stuff I built. So things might be a little rough around the edges. If you find any issues or want to help make elbe better, I'd love to hear from you :)
